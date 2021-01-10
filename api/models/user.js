let mongoose = require("mongoose");

const footballschema = new mongoose.Schema({
    // id: {type:Number},
    name: {type:String, default:'Neymar', required:true},
    age: {type:Number, required:true},
    club: {type:String, required:true},
    position: {type:String, required:true},
    password: {type:String}
  });

module.exports = mongoose.model('Football', footballschema);