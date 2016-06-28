/**
 * Created by youngboo on 2016/6/25.
 */
var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var Movie = require('./db/models/movie')
var mongoose = require('mongoose');

app.set('views','./views/pages');
app.set('view engine','jade');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')));

var busboy = require('connect-busboy');

// default options, no immediate parsing
app.use(busboy());

//app.use(express.multipart());
app.listen(port);

//数据库连接
mongoose.connect('mongodb://127.0.0.1/test');
console.log('servers tarted:'+port);
var movies = [{
    title:'独立日',
    _id:1,
    doctor:'我',
    poster:'https://img.alicdn.com/tps/TB1S8xMKFXXXXaXXpXXXXXXXXXX-520-280.jpg'
},{
    title:'独立日',
    _id:1,
    doctor:'我',
    poster:'https://img.alicdn.com/tps/TB1S8xMKFXXXXaXXpXXXXXXXXXX-520-280.jpg'
}]
app.get('/',(req,res)=>{
    //console.log('index:'+Movie);
    Movie.fetch((err,movies)=>{
        if(err){
            console.log(err);
        }
        res.render('index',{
            title:'my-sender',
            movies:movies
        })
    });

});
app.get('/list',(req,res)=>{
    res.render('list',{
        title:"my-sender list",
        movies:movies
    })
});
app.get('/upload',(req,res)=>{
    res.render('upload',{
        title:"my-sender upload"
    })
});
app.get('/detail:id',(req,res)=>{
    res.render('detail',{
        title:"my-sender detail"
    })
});
/*app.post('/upload/file',(req,res,next)=>{

    var posterData = req.files.uploadPoster;
    var filePath = posterData.path;
    var originalFilename = posterData.originalFilename;

    if (originalFilename) {
        fs.readFile(filePath, function(err, data) {
            var timestamp = Date.now();
            var type = posterData.type.split('/')[1];
            var poster = timestamp + '.' + type;
            var newPath = path.join(__dirname, '../../', '/public/upload/' + poster);

            fs.writeFile(newPath, data, function(err) {
                req.poster = poster;
                next();
            })
        })
    }
    else {
        next();
    }
});*/
app.post('/upload/file',(req,res,next)=>{
    //console.log(req);
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log(filedname);
        console.log(file);
    });
/*    var posterData = req.files.uploadPoster;
    var filePath = posterData.path;
    var originalFilename = posterData.originalFilename;

    if (originalFilename) {
        fs.readFile(filePath, function(err, data) {
            var timestamp = Date.now();
            var type = posterData.type.split('/')[1];
            var poster = timestamp + '.' + type;
            var newPath = path.join(__dirname, '../../', '/public/upload/' + poster);

            fs.writeFile(newPath, data, function(err) {
                req.poster = poster;
                next();
            })
        })
    }
    else {
        next();
    }*/
});
