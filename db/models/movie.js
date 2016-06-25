/**
 * Created by youngboo on 2016/6/25.
 */
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('Movie',MovieSchema);
module.exports = Movie;