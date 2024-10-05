require('dotenv').config();

module.exports = {
    apps: [{
        name: 'traininggeneration',
        script: 'app.js',
        instances: 'max',
        exec_mode: 'cluster',
        env: {
            PORT: process.env.PORT || 8000
        }
    }]
};