const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateRandomNumber = require('../utils/randomNumber')
const postPrompt = require('../dataAccess/iaApi');
const prompted = require('../utils/prompt');
const FormatJson = require('../utils/formatJson');

module.exports = class traininggeneration{
    static traininggeneration(req, res){
        console.log('Gerando treino DADOS = ' + JSON.stringify(req.body));
        postPrompt(prompted(req.session.userJson)).then((response) => {
            let formatJson = FormatJson(response)
            formatJson.token = jwt.sign({}, process.env.SECRET_KEY_JWT, { expiresIn: '30m' });
            res.status(200).json(formatJson);
        })
    }


    static reportGeneration(req, res) {
        
    }
}