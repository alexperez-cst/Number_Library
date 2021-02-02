const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const numberTypeSchema = new Schema({
    name:{type:String,minlength:1,maxlength:100,required:true}
});

numberTypeSchema.virtual('url')
                .get(function(){
                    return '/home/numbertype/' + this._id;
                });

module.exports = mongoose.model('NumberType',numberTypeSchema);
