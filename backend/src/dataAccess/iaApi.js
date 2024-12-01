const axios = require('axios');
const mock = require('../mock/responseMockApi')
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = function postPrompt(prompt, schema) {
    return new Promise((resolve, reject) => {
        if (process.env.USE_MOCK == 'true') {
            resolve(mock())
        } else {
            const genAI = new GoogleGenerativeAI(process.env.KEY_OF_CONNECTION_IA);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash-latest",
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                    temperature: 0,
                    maxOutputTokens: 5000
                },
            });

            model.generateContent(prompt)
                .then(result => resolve(result.response))
                .catch(error => reject(error));
        }
    });
};
