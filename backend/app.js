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
new LocalStorage('./serverStorage');

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true,
  exposedHeaders: 'Authorization'
}));

const port = process.env.PORT || 8000

const traininggeneration = require('./src/routes/traininggeneration')

app.use('/', traininggeneration)

const cron = require('node-cron');

cron.schedule('*/15 * * * *', () => {
  let currentIpsAndCounts = [];
  const blockingTime = 15 * 60 * 1000;
  try {
    const ipsAndCounts = fs.readFileSync('serverStorage/bloquer.txt', 'utf8');
    currentIpsAndCounts = ipsAndCounts.split('\n').map(item => item.replace('\r', ''));
    console.log('Original = ' + currentIpsAndCounts);
  } catch (err) { 
    console.error('Não foi possível ler o arquivo contendo os IPs devido ao erro: ' + err);
  }

  currentIpsAndCounts = currentIpsAndCounts.map(item => {
    let [currentIp, count, timestamp, isBlockedFile] = item.split(';');
    const currentTime = Date.now();
    if (!((currentTime - parseInt(timestamp, 10) > blockingTime) && isBlockedFile === 'true')) {
      return item;
    }
    return null;
  }).filter(item => item !== null);

  try {
    fs.writeFileSync('serverStorage/bloquer.txt', currentIpsAndCounts.join('\n'), 'utf8');
  } catch (err) {
    console.error('Não foi possível escrever no arquivo contendo os IPs devido ao erro: ' + err);
  }
});

if(process.env.ENVIRONMENT === 'development') {
  const sslServer = https.createServer({
    key: fs.readFileSync('./certs/mykey.key'),
    cert: fs.readFileSync('./certs/mycert.crt')
  }, app);
  app.set('port', port)
  sslServer.listen(port, () => {
    console.log(`Training Generation em execução no ambiente de: ` + process.env.ENVIRONMENT)
  })
}else{
  app.listen(port, () => {
    console.log(`Training Generation em execução no ambiente de: ` + process.env.ENVIRONMENT)
  })
}
