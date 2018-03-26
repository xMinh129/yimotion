var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
  teacher_name: {type: String},
  class_name: {type: String},
  updated_at: { type: Date, default: Date.now },
  statistics: []
});

module.exports = mongoose.model('Class', ClassSchema);
