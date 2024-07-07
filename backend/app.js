const express = require('express')
const app = express()

require('dotenv').config();

const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1800000,
    sameSite: true,
    secure: false
  }
}));

const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./serverStorage');

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true
}));

const port = process.env.PORT

const traininggeneration = require('./src/routes/traininggeneration')

app.use('/', traininggeneration)

app.listen(port, () => {
  console.log(`Training Generation em execução`)
})