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
//app.use(bodyParser);
app.use(express.static(path.join(__dirname,'bower_components')));
app.listen(port);
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
app.get('/add',(req,res)=>{
    res.render('add',{
        title:"my-sender add"
    })
});
app.get('/detail:id',(req,res)=>{
    res.render('detail',{
        title:"my-sender detail"
    })
});