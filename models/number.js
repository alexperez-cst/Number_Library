const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const numberSchema = new Schema({
    name:{type:String,minlength:1,maxlength:100,required:true},
    number:{type:String,minlength:1,maxlength:100,required:true},
    description:{type:String,minlength:1,required:true},
    author:{type:Schema.Types.ObjectId,ref:'Mathematician',required:true},
    number_type:{type:Schema.Types.ObjectId,ref:'NumberType',required:true}
});

numberSchema.virtual('url')
            .get(function(){
                return '/home/number/'+this._id;
            });

module.exports = mongoose.model('Number',numberSchema);
