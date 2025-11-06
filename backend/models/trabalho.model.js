const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trabalhoSchema = new Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descricao: {
    type: String,
    required: true,
    trim: true
  },
  curso: {
    type: String,
    required: true,
    trim: true
  },
  professor: {
    type: Schema.Types.ObjectId,
    ref: 'Professor'
  },
  link: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
});

const Trabalho = mongoose.model('Trabalho', trabalhoSchema);

module.exports = Trabalho;
