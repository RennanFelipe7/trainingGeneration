
const express = require('express')
const rotas = express.Router()
const traininggeneration = require('../controllers/traininggeneration')

rotas.post('/traininggeneration', traininggeneration.traininggeneration)
rotas.post('/reportGeneration', traininggeneration.reportGeneration)

module.exports = rotas
