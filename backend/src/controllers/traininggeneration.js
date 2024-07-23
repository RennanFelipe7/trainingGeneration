const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateRandomNumber = require('../utils/randomNumber')
const postPrompt = require('../dataAccess/iaApi');
const prompted = require('../utils/prompt');
const FormatJson = require('../utils/formatJson');
const createPDF = require('../utils/createPDF');
const jsonIsValid = require('../utils/jsonIsValid');
const jsonIsEmpty = require('../utils/jsonIsEmpty');
const jsonHasCorrectEntries = require('../utils/jsonHasCorrectEntries');
module.exports = class traininggeneration{
    static traininggeneration(req, res){

        let trainingInputs = req.body
        const requiredKeys = ["peso", "biotipo_corporal", "objetivos_do_treino", "altura", "nivel_de_condicionamento_fisico", "preferencias_de_exercicio", "restricoes_de_saude", "disponibilidade", "idade", "sexo", "historico_de_lesoes", "nome"];

        if(jsonIsValid(requiredKeys, trainingInputs)){
            if(jsonIsEmpty(trainingInputs)){
                return res.status(422).json({ error: "Campo(s) vazio(s). Preencha todos os campos" });
            }else{
                const validationResult = jsonHasCorrectEntries(requiredKeys, trainingInputs);
                if(validationResult.success){
                    postPrompt(prompted(trainingInputs)).then((response) => {
                        let formatJson = FormatJson(response)
                        formatJson.token = jwt.sign({}, process.env.SECRET_KEY_JWT, { expiresIn: '30m' });
                        formatJson.nome = trainingInputs.nome
                        res.status(200).header('Content-Type', 'application/json').send(formatJson);
                    })
                }else{
                    return res.status(422).json({ error: "foram encontrados os seguintes erros: " +  validationResult.errors});
                }
            }
        }else{
            return res.status(422).json({ error: "JSON inválido. Chaves faltando ou incorretas." });
        }
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