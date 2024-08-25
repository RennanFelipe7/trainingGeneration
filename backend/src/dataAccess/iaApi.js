const axios = require('axios');
const mock = require('../mock/responseMockApi')
require('dotenv').config();

module.exports = function postPrompt(prompt) {
    return new Promise((resolve, reject) => {
        const data = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        };

        if(process.env.USE_MOCK == 'true'){
            resolve(mock())
        }else{
            axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.KEY_OF_CONNECTION_IA}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error); 
            })
        };        
    });
};
