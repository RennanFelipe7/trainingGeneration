const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateRandomNumber = require('../utils/randomNumber')
const postPrompt = require('../dataAccess/iaApi');
const prompted = require('../utils/prompt');
const FormatJson = require('../utils/formatJson');
const createPDF = require('../utils/createPDF');
module.exports = class traininggeneration{
    static traininggeneration(req, res){

        postPrompt(prompted(req.body)).then((response) => {
            let formatJson = FormatJson(response)
            formatJson.token = jwt.sign({}, process.env.SECRET_KEY_JWT, { expiresIn: '30m' });
            formatJson.nome = req.body.nome
            res.status(200).header('Content-Type', 'application/json').send(formatJson);
        })
    }


    static async reportGeneration(req, res) {

        delete req.body['token']
        let nome = req.body.nome
        delete req.body['nome']
        let pdf

        await createPDF(req.body, nome).then((response) => {
            pdf = response
        }).catch((err) => {
            console.log(err)
        })

        setTimeout(() => {
            res.set('Content-Type', 'application/pdf');
            res.status(200).send(pdf);
        }, 2000);

    }
}