const axios = require('axios');
const mock = require('../mock/iaApi.json')
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

        axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.KEY_OF_CONNECTION_IA}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error); 
        });

        //resolve(mock)
    });
};
