const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const professorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  senha: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  nome: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
});

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;
