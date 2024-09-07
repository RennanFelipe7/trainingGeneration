module.exports = function responseMockApi(){
    const json = {
        "segunda":{
            "exercicios":[
                {
                    "nome":"Remada alta",
                    "repeticoes":12,
                    "descanso":"1 minuto"
                },
                {
                    "nome":"Rosca direta barra",
                    "repeticoes":10,
                    "descanso":"1 minuto"
                }
            ]
        },
        "terca":{
            "exercicios":[
                {
                    "nome":"Agachamento livre",
                    "repeticoes":15,
                    "descanso":"1 minuto"
                },
                {
                    "nome":"Elevação terra unilateral",
                    "repeticoes":12,
                    "descanso":"1 minuto"
                }
            ]
        },
        "quarta":{
            "exercicios":[
                {
                    "nome":"Supino reto",
                    "repeticoes":12,
                    "descanso":"1 minuto"
                },
                {
                    "nome":"Voador inverso",
                    "repeticoes":15,
                    "descanso":"1 minuto"
                }
            ]
        },
        "quinta":{
            "exercicios":[
                {
                    "nome":"Flexão de perna máquina",
                    "repeticoes":15,
                    "descanso":"1 minuto"
                },
                {
                    "nome":"Stiff",
                    "repeticoes":12,
                    "descanso":"1 minuto"
                }
            ]
        },
        "sexta":{
            "exercicios":[
                {
                    "nome":"Remada baixa polia",
                    "repeticoes":10,
                    "descanso":"1 minuto"
                },
                {
                    "nome":"Remada unilateral halteres",
                    "repeticoes":12,
                    "descanso":"1 minuto"
                }
            ]
        },
        "sabado":{
            "exercicios":[
                {
                    "nome":"Hiperextensão",
                    "repeticoes":15,
                    "descanso":"1 minuto"
                },
                {
                    "nome":"Panturrilha na máquina",
                    "repeticoes":20,
                    "descanso":"1 minuto"
                }
            ]
        },
        "domingo":{
            "exercicios":[
                {
                    "nome":"Descanso",
                    "repeticoes":0,
                    "descanso":"0 minutos"
                }
            ]
        }
    }
    
    return(
        {
            "candidates":[
                {
                    "content":{
                        "parts":[
                            {
                                "text":"```json\n" + JSON.stringify(json) + "\n```"
                            }
                        ],
                        "role":"model"
                    },
                    "finishReason":"STOP",
                    "index":0,
                    "safetyRatings":[
                        {
                            "category":"HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            "probability":"NEGLIGIBLE"
                        },
                        {
                            "category":"HARM_CATEGORY_HATE_SPEECH",
                            "probability":"NEGLIGIBLE"
                        },
                        {
                            "category":"HARM_CATEGORY_HARASSMENT",
                            "probability":"NEGLIGIBLE"
                        },
                        {
                            "category":"HARM_CATEGORY_DANGEROUS_CONTENT",
                            "probability":"NEGLIGIBLE"
                        }
                    ]
                }
            ],
            "usageMetadata":{
                "promptTokenCount":835,
                "candidatesTokenCount":333,
                "totalTokenCount":1168
            }
        }
    )
}