const express = require('express')
const app = express()
const https = require('https');
const fs = require('fs');

require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1800000,
    sameSite: true,
    secure: true,
  }
}));

const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./serverStorage');

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true,
  exposedHeaders: 'Authorization'
}));

const port = process.env.PORT

const traininggeneration = require('./src/routes/traininggeneration')

app.use('/', traininggeneration)

const sslServer = https.createServer({
  key: fs.readFileSync('./certs/mykey.key'),
  cert: fs.readFileSync('./certs/mycert.crt')
}, app);

sslServer.listen(port, () => {
  console.log(`Training Generation em execução`)
})