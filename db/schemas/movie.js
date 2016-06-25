/**
 * Created by youngboo on 2016/6/25.
 */
var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
    doctor:String,
    title:String,
    language:String,
    country:String,
    poster:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});
MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = new Date();
    }
    next();

});
MovieSchema.statics = {
    fetch:function(cb){
        return this.find().exec(cb);
    },
    findById:function(id,cb){
        return this.find({_id:id}).exec(cb);
    }
};
module.exports = MovieSchema;