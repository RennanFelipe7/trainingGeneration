const fs = require('fs');
const path = require('path');

function deleteFile(filename) {
    return new Promise((resolve, reject) => {
        try {
            const filePath = path.resolve(__dirname, "../downloads", filename);
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(`Erro ao excluir o arquivo: ${err.message}`);
                } else {
                    resolve(true);
                }
            });
        } catch (error) {
            reject(`Erro ao acessar o arquivo: ${error.message}`);
        }
    });
}

module.exports = deleteFile;
