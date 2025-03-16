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
const keysHaveArrayAndOnlyKey = require('../utils/keysHaveArrayAndOnlyKey');
const trainingScheme = require('../utils/trainingScheme.js')
const reorderTrainingJson = require('../utils/reoderTrainingJson.js');
const recaptchaTokenIsValid = require('../utils/recaptchaTokenIsValid.js');

module.exports = class traininggeneration{
    static async traininggeneration(req, res){
        const userAgent = req.headers['user-agent'].split('/')[0]
        let trainingInputs = req.body
        let requiredKeys = []
        let userAgentOfBrowser = ['mozilla', 'chrome', 'safari']
        if(userAgentOfBrowser.includes(userAgent.toLowerCase()) && process.env.ENVIRONMENT !== 'development'){
            const recaptchaToken = trainingInputs["g-recaptcha-response"];
            try {
                const isValid = await recaptchaTokenIsValid(recaptchaToken)
                if(!isValid){
                    return res.status(400).json({ error: "Chave de validação do recaptcha inválida."});
                }   
            } catch (error) {
                console.log("Não foi possível verificar o recaptcha devido ao erro: " + error);
                return res.status(500).json({ error: "Erro na verificação do recaptcha."});
            }
            requiredKeys = ["peso", "biotipo_corporal", "objetivos_do_treino", "altura", "nivel_de_condicionamento_fisico", "preferencias_de_exercicio", "restricoes_de_saude", "disponibilidade", "idade", "sexo", "historico_de_lesoes", "nome", "g-recaptcha-response"];
        }else{
            requiredKeys = ["peso", "biotipo_corporal", "objetivos_do_treino", "altura", "nivel_de_condicionamento_fisico", "preferencias_de_exercicio", "restricoes_de_saude", "disponibilidade", "idade", "sexo", "historico_de_lesoes", "nome"];
        }
        if(jsonIsValid(requiredKeys, trainingInputs)){
            if(jsonTrainingGenerationIsEmpty(trainingInputs)){
                return res.status(422).json({ error: "Campo(s) vazio(s). Preencha todos os campos" });
            }else{
                const validationResult = jsonHasCorrectEntries(requiredKeys, trainingInputs);
                if(validationResult.success){
                    let isValidBrazilianJSON = functionIsValidBrazilianJSON(requiredKeys, trainingInputs)
                    if(isValidBrazilianJSON.isValid){
                        let nome = trainingInputs["nome"]
                        delete trainingInputs["nome"]
                        postPrompt(prompted(trainingInputs), trainingScheme).then((response) => { 
                            let formatJson;
                            try {
                                formatJson = FormatJson(response)
                            } catch (error) {
                                return res.status(502).json({ error: "Não foi possível gerar o treino no momento, tente novamente em " + process.env.RATE_LIMIT_TIME_OF_TRAINING + " minutos"});
                            }
                            const requiredKeysDaysOfWeek = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];
                            if (jsonIsValid(requiredKeysDaysOfWeek, formatJson)) {                
                                const requiredProperty = ["nome", "repeticoes", "descanso"];
                                if(jsonExercisesIsEmpty(formatJson)){
                                    return res.status(502).json({ error: "Não foi possível gerar o treino no momento, tente novamente em " + process.env.RATE_LIMIT_TIME_OF_TRAINING + " minutos"});
                                }
                                if(keysHaveArrayAndOnlyKey(formatJson)){
                                    if(jsonFilledIsValid(requiredProperty, formatJson)){
                                        const requiredKeysDaysOfWeekWithName = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo", "nome"];
                                        formatJson["nome"] = nome
                                        const validationResult = jsonHasCorrectEntries(requiredKeysDaysOfWeekWithName, formatJson)
                                        if(validationResult.success){
                                            formatJson = reorderTrainingJson(formatJson)
                                            formatJson.nome = nome
                                            res.setHeader('Authorization', `token ${req.session.token}`);
                                            res.status(200).header('Content-Type', 'application/json').send(formatJson);
                                        }else{
                                            return res.status(502).json({ error: "Não foi possível gerar o treino no momento, tente novamente em " + process.env.RATE_LIMIT_TIME_OF_TRAINING + " minutos"});
                                        }
                                    }else{
                                        return res.status(502).json({ error: "Não foi possível gerar o treino no momento, tente novamente em " + process.env.RATE_LIMIT_TIME_OF_TRAINING + " minutos"});
                                    }
                                }else{
                                     return res.status(502).json({ error: "Não foi possível gerar o treino no momento, tente novamente em " + process.env.RATE_LIMIT_TIME_OF_TRAINING + " minutos"});
                                }
                            }else{ 
                                return res.status(502).json({ error: "Não foi possível gerar o treino no momento, tente novamente em " + process.env.RATE_LIMIT_TIME_OF_TRAINING + " minutos"});
                            }
                        }).catch(() =>{
                            return res.status(500).json({ error: "Não foi possível gerar o treino no momento, tente novamente em " + process.env.RATE_LIMIT_TIME_OF_TRAINING + " minutos"});
                        })
                    }else{
                        return res.status(400).json({ error: "O caractere é inválido " + isValidBrazilianJSON.invalidChar})
                    }
                }else{
                    return res.status(422).json({ error: "Foram encontrados os seguintes erros: " +  validationResult.errors});
                }
            }
        }else{
            return res.status(422).json({ error: "JSON inválido. Chaves faltando ou incorretas." });
        }
    }


    static async reportGeneration(req, res) {

        const userAgent = req.headers['user-agent'].split('/')[0]
        let trainingInputs = req.body
        let requiredKeys = []
        let userAgentOfBrowser = ['mozilla', 'chrome', 'safari']

        if(userAgentOfBrowser.includes(userAgent.toLowerCase()) && process.env.ENVIRONMENT !== 'development'){
            const recaptchaToken = trainingInputs["g-recaptcha-response"];
            try {
                const isValid = await recaptchaTokenIsValid(recaptchaToken)
                if(!isValid){
                    return res.status(400).json({ error: "Chave de validação do recaptcha inválida."});
                }   
            } catch (error) {
                console.log("Não foi possível verificar o recaptcha devido ao erro: " + error);
                return res.status(500).json({ error: "Erro na verificação do recaptcha."});
            }
            requiredKeys = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo", "nome", "g-recaptcha-response"];
        }else{
            requiredKeys = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo", "nome"];
        }
        
        if(jsonIsValid(requiredKeys, trainingInputs)){
            if(jsonExercisesIsEmpty(trainingInputs)){
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
                            delete req.body['g-recaptcha-response']
                            let pdf
                            await createPDF(req.body, nome).then((response) => {
                                pdf = response
                                res.set('Content-Type', 'application/pdf');
                                res.status(200).send(pdf);
                            }).catch((err) => {
                                console.log('Não foi possível gerar o PDF devido ao erro: ' + err)
                                return res.status(500).json({ error: "Não foi possível gerar o PDF no momento, tente novamente."});
                            })
                        }else{
                            return res.status(400).json({ error: "O caractere é inválido " + isValidBrazilianJSON.invalidChar})
                        }
                    }else{
                        return res.status(422).json({ error: "Foram encontrados os seguintes erros: " +  validationResult.errors});
                    }
                }else{
                    return res.status(422).json({ error: "JSON inválido. Chaves faltando ou incorretas." });
                }
            }
        }else{
            return res.status(422).json({ error: "JSON inválido. Chaves faltando ou incorretas." });
        }

    }
}
