const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formulaSchema = new Schema({
  name: {type: String, minlength: 1, maxlength: 100, required: true},
  formula: {type: String, required: true},
  description: {type: String, minlength: 1, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'Mathematician'},
});

formulaSchema.virtual('url')
  .get(function () {
    return '/home/formula/' + this._id;
  });

module.exports = mongoose.model('Formula', formulaSchema);
