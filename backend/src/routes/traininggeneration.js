
const express = require('express')
const rotas = express.Router()
const traininggeneration = require('../controllers/traininggeneration')
const limiter = require('../utils/limiter')
require('dotenv').config();

rotas.post('/traininggeneration', limiter(process.env.RATE_LIMIT_OF_TRAINING, 'Máximo de solicitação para geração de treino alcançada, aguarde ' + process.env.RATE_LIMIT_OF_TRAINING + ' minuto(s) e tente novamente.'), traininggeneration.traininggeneration)
rotas.post('/reportGeneration', limiter(process.env.RATE_LIMIT_OF_PDF, 'Máximo de solicitação para geração de PDF alcançada, aguarde ' + process.env.RATE_LIMIT_OF_PDF + ' minuto(s) e tente novamente.'), traininggeneration.reportGeneration)

module.exports = rotas
