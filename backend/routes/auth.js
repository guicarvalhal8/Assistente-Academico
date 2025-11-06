const router = require('express').Router();
const Aluno = require('../models/aluno.model');

router.route('/login').post((req, res) => {
  const { matricula, senha } = req.body;

  // Simulate user lookup
  if (matricula === '12345' && senha === 'password') {
    res.json({
      message: 'Login successful',
      aluno: {
        matricula: '12345',
        curso: 'Sistemas de Informação',
        semanaAtual: 8
      }
    });
  } else {
    res.status(400).json('Error: Invalid credentials');
  }
});

module.exports = router;
