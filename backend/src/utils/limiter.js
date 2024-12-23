const rateLimit = require('express-rate-limit');

module.exports = function limiter (time, messageError, maxRequest){
    const limiter = rateLimit({
        windowMs: time * 60000,
        limit: maxRequest,
        handler: (req, res, next) => {
            return res.status(429).header('Content-Type', 'application/json').send({error: messageError});
        },
        keyGenerator: (req, res) => {
            return req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress
        },
        skipSuccessfulRequests: false,
        skipFailedRequests: true,
    });

    return limiter;
}