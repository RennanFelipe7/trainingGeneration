const crypto = require('crypto')

module.exports = function randomNumber() {
    const randomBytes = crypto.randomBytes(4);
    const randomNumber = parseInt(randomBytes.toString('hex'), 16);
    const eightDigitRandomNumber = randomNumber % 100000000;
    return eightDigitRandomNumber
}