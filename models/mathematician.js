const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {DateTime} = require('luxon');
const mathematicianSchema = new Schema({
  name: {type: String, minlength: 1, maxlength: 100, required: true},
  family_name: {type: String, minlength: 1, maxlength: 100, required: true},
  date_birth: {type: Date},
  date_death: {type: Date},
});


mathematicianSchema.virtual('fullname')
                   .get(function(){
                     return `${this.name} ${this.family_name}`
                   });
mathematicianSchema.virtual('date_birth_formatted')
                   .get(function(){
                       return this.date_birth ? DateTime.fromJSDate(this.date_birth).toLocaleString(DateTime.DATE_MED) : '';
                   });
mathematicianSchema.virtual('date_death_formatted')
                   .get(function(){
                       return this.date_death ? DateTime.fromJSDate(this.date_death).toLocaleString(DateTime.DATE_MED) : '';
                   });
mathematicianSchema.virtual('date_birth_yyyy_mm_dd')
                   .get(function(){
                       return !this.date_birth ? '' : DateTime.fromJSDate(this.date_birth).toFormat('yyyy-MM-dd');
                   });
mathematicianSchema.virtual('date_death_yyyy_mm_dd')
                   .get(function(){
                       return !this.date_death ? '' : DateTime.fromJSDate(this.date_death).toFormat('yyyy-MM-dd');
                   });
mathematicianSchema.virtual('lifespan')
                   .get(function(){
                       return `${this.date_birth_formatted} - ${this.date_death_formatted}`;
                   })
mathematicianSchema.virtual('url')
  .get(function () {
    return '/home/mathematician/' + this._id;
  });

module.exports = mongoose.model('Mathematician', mathematicianSchema);
