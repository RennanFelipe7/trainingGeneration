module.exports = {
    apps: [{
        name: 'traininggeneration',
        script: 'app.js',
        instances: 'max',
        exec_mode: 'cluster',
        env: {
            PORT: 3000
        },
        env_production: {
            NODE_ENV: "production",
            PORT: 8080
        }
    }]
};
