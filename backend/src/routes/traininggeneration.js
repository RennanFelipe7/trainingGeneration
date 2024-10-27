
const express = require('express')
const rotas = express.Router()
const traininggeneration = require('../controllers/traininggeneration')
const limiter = require('../utils/limiter')
const createAndSetToken = require('../utils/createAndSetToken')
const validateToken = require('../utils/validateToken')
require('dotenv').config();
const bloquer = require('../utils/bloquer')

rotas.post('/traininggeneration', bloquer, limiter(process.env.RATE_LIMIT_TIME_OF_TRAINING, 'Máximo de solicitação para geração de treino alcançada, aguarde ' + process.env.RATE_LIMIT_TIME_OF_TRAINING + ' minuto(s) e tente novamente.', process.env.RATE_LIMIT_MAX_OF_TRAINING), createAndSetToken, traininggeneration.traininggeneration)
rotas.post('/reportGeneration', bloquer, limiter(process.env.RATE_LIMIT_TIME_OF_REPORT, 'Máximo de solicitação para geração de PDF alcançada, aguarde ' + process.env.RATE_LIMIT_TIME_OF_REPORT + ' minuto(s) e tente novamente.', process.env.RATE_LIMIT_MAX_OF_REPORT), validateToken, traininggeneration.reportGeneration)

module.exports = rotas
