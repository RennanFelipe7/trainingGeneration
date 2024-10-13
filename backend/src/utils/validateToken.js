const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function validateToken(req, res, next) {

  let tokenAuthorization = req.headers['authorization'];
  let tokenCookies = req.cookies.token;
  console.log('tokenAuthorization = ' + tokenAuthorization);
  console.log('tokenCookies ='+ tokenCookies);
  if (tokenAuthorization?.startsWith('Bearer ') && tokenCookies) {
    console.log('PASSO 1'); 
    tokenAuthorization = tokenAuthorization.slice(7, tokenAuthorization.length);
  } else {
    console.log('PASSO 2'); 
    return res.status(401).json({ error: 'Token inválido' });
  }
  console.log('req.session.token = ' + req.session.token);
  if(tokenAuthorization === req.session.token){
    console.log('PASSO 3'); 
    jwt.verify(tokenAuthorization, process.env.SECRET_KEY_JWT, (err) => {
    console.log('PASSO 4'); 
      if (err) {
        console.log('PASSO 5'); 
        return res.status(401).json({ error: 'Token inválido' });
      }
      jwt.verify(tokenCookies, process.env.SECRET_KEY_JWT, (err) => {
        console.log('PASSO 6'); 
        if (err) {
          console.log('PASSO 7'); 
          return res.status(401).json({ error: 'Token inválido' });
        }
        next();
      });
    });
  }else{
    console.log('PASSO 8'); 
    return res.status(401).json({ error: 'Token inválido' });
  }
  
}
