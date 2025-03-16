require('dotenv').config();

const axios = require('axios');

module.exports = function recaptchaTokenIsValid(token) {
    return new Promise((resolve, reject) => {
        axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_VALIDATION_KEY}&response=${token}`)
            .then(response => {
                if (response.data.success) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
};
