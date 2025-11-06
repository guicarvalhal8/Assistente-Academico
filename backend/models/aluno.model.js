const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const alunoSchema = new Schema({
  matricula: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  senha: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  curso: {
    type: String,
    required: true,
    trim: true
  },
  semanaAtual: {
    type: Number,
    required: true,
    default: 1
  }
}, {
  timestamps: true,
});

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
