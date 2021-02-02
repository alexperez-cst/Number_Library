const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mathematicianSchema = new Schema({
    name:{type:String,minlength:1,maxlength:100,required:true},
    family_name:{type:String,minlength:1,maxlength:100,required:true},
    date_birth:{type:Date},
    date_death:{type:Date},
});

mathematicianSchema.virtual('url')
                   .get(function(){
                       return '/home/mathematician/'+this._id;
                   });

module.exports = mongoose.model('Mathematician',mathematicianSchema);
