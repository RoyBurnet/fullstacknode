const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdeasSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  details:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    defaulte: Date.now
  }
});

mongoose.model('ideas', IdeasSchema);