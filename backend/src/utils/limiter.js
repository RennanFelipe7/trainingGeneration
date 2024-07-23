const rateLimit = require('express-rate-limit');

module.exports = function limiter (time, messageError){
    const limiter = rateLimit({
        windowMs: time * 60000,
        max: 1,
        handler: (req, res, next) => {
            res.status(429).header('Content-Type', 'application/json').send({error: messageError});
        }
    });

    return limiter;
}