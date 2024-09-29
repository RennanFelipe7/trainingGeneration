const jwt = require('jsonwebtoken');
require('dotenv').config();
const postPrompt = require('../dataAccess/iaApi');
const prompted = require('../utils/prompt');
const FormatJson = require('../utils/formatJson');
const createPDF = require('../utils/createPDF');
const jsonIsValid = require('../utils/jsonIsValid');
const jsonTrainingGenerationIsEmpty = require('../utils/jsonTrainingGenerationIsEmpty');
const jsonHasCorrectEntries = require('../utils/jsonHasCorrectEntries');
const jsonExercisesIsEmpty = require('../utils/jsonExercisesIsEmpty');
const jsonFilledIsValid = require('../utils/jsonFilledIsValid');
const functionIsValidBrazilianJSON = require('../utils/isValidBrazilianJSON');

module.exports = class traininggeneration{
    static traininggeneration(req, res){
        let trainingInputs = req.body
        const requiredKeys = ["peso", "biotipo_corporal", "objetivos_do_treino", "altura", "nivel_de_condicionamento_fisico", "preferencias_de_exercicio", "restricoes_de_saude", "disponibilidade", "idade", "sexo", "historico_de_lesoes", "nome"];
        if(jsonIsValid(requiredKeys, trainingInputs)){
            if(jsonTrainingGenerationIsEmpty(trainingInputs)){
                req.session.skipRateLimit = true;
                return res.status(422).json({ error: "Campo(s) vazio(s). Preencha todos os campos" });
            }else{
                const validationResult = jsonHasCorrectEntries(requiredKeys, trainingInputs);
                if(validationResult.success){
                    let isValidBrazilianJSON = functionIsValidBrazilianJSON(requiredKeys, trainingInputs)
                    if(isValidBrazilianJSON.isValid){
                        let nome = trainingInputs["nome"]
                        delete trainingInputs["nome"]
                        postPrompt(prompted(trainingInputs)).then((response) => { 
                            let formatJson;
                            try {
                                formatJson = FormatJson(response)
                            } catch (error) {
                                console.log('Não foi possível formatar o json devido ao erro: ' + error);
                                req.session.skipRateLimit = true;
                                return res.status(502).json({ error: "Não foi possível gerar o treino no momento, tente novamente em " + process.env.RATE_LIMIT_OF_TRAINING + " minutos"});
                            }
                            const requiredKeysDaysOfWeek = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];
                            if (jsonIsValid(requiredKeysDaysOfWeek, formatJson)) {                
                                const requiredProperty = ["nome", "repeticoes", "descanso"];
                                if(jsonExercisesIsEmpty(formatJson)){
                                    req.session.skipRateLimit = true;
                                    return res.status(502).json({ error: "Não foi possível gerar o treino no momento, tente novamente em " + process.env.RATE_LIMIT_OF_TRAINING + " minutos"});
                                }
                                if(jsonFilledIsValid(requiredProperty, formatJson)){ 
                                    req.session.skipRateLimit = false;
                                    formatJson.nome = trainingInputs.nome
                                    formatJson["nome"] = nome
                                    res.setHeader('Authorization', `token ${req.session.token}`);
                                    res.status(200).header('Content-Type', 'application/json').send(formatJson);
                                }else{
                                    req.session.skipRateLimit = true;
                                    return res.status(502).json({ error: "Não foi possível gerar o treino no momento, tente novamente em " + process.env.RATE_LIMIT_OF_TRAINING + " minutos"});
                                }
                            }else{
                                req.session.skipRateLimit = true; 
                                return res.status(502).json({ error: "Não foi possível gerar o treino no momento, tente novamente em " + process.env.RATE_LIMIT_OF_TRAINING + " minutos"});
                            }
                        })
                    }else{
                        return res.status(400).json({ error: "O caractere é inválido " + isValidBrazilianJSON.invalidChar})
                    }
                }else{
                    req.session.skipRateLimit = true;
                    return res.status(422).json({ error: "Foram encontrados os seguintes erros: " +  validationResult.errors});
                }
            }
        }else{
            req.session.skipRateLimit = true;
            return res.status(422).json({ error: "JSON inválido. Chaves faltando ou incorretas." });
        }
    }


    static async reportGeneration(req, res) {
        let trainingInputs = req.body
        const requiredKeys = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo", "nome"];
        
        if(jsonIsValid(requiredKeys, trainingInputs)){
            if(jsonExercisesIsEmpty(trainingInputs)){
                req.session.skipRateLimit = true;
                return res.status(422).json({ error: "Campo(s) vazio(s). Preencha todos os campos" });
            }else{
                const requiredProperty = ["nome", "repeticoes", "descanso"];
                if(jsonFilledIsValid(requiredProperty, trainingInputs)){
                    const validationResult = jsonHasCorrectEntries(requiredKeys, trainingInputs);
                    if(validationResult.success){
                        let isValidBrazilianJSON = functionIsValidBrazilianJSON(requiredKeys, trainingInputs)
                        if(isValidBrazilianJSON.isValid){
                            let nome = req.body.nome
                            delete req.body['nome']
                            let pdf
                            await createPDF(req.body, nome).then((response) => {
                                pdf = response
                            }).catch((err) => {
                                console.log(err)
                            })
                            req.session.skipRateLimit = false;
                            setTimeout(() => {
                                res.set('Content-Type', 'application/pdf');
                                res.status(200).send(pdf);
                            }, 2000);
                        }else{
                            return res.status(400).json({ error: "O caractere é inválido " + isValidBrazilianJSON.invalidChar})
                        }
                    }else{
                        req.session.skipRateLimit = true;
                        return res.status(422).json({ error: "Foram encontrados os seguintes erros: " +  validationResult.errors});
                    }
                }else{
                    req.session.skipRateLimit = true;
                    return res.status(422).json({ error: "JSON inválido. Chaves faltando ou incorretas." });
                }
            }
        }else{
            req.session.skipRateLimit = true;
            return res.status(422).json({ error: "JSON inválido. Chaves faltando ou incorretas." });
        }

    }
}
