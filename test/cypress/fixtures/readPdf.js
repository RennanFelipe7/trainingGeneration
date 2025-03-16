const fs = require('fs');
const path = require("path");
const pdf = require('pdf-parse');

async function readPdf(filename) {
    return await new Promise((resolve, reject) => {
        try {
            const filePath = path.resolve(__dirname, "../downloads", filename);
            const dataBuffer = fs.readFileSync(filePath);
            pdf(dataBuffer).then((data) => {
                resolve(data.text);
            }).catch((error) => {
                reject(`Erro ao processar o PDF: ${error.message}`);
            });
        } catch (error) {
            reject(`Erro ao ler o arquivo PDF: ${error.message}`);
        }
    });
}

module.exports = readPdf;