const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function validateToken(req, res, next) {

  let tokenAuthorization = req.headers['authorization'];
  let tokenCookies = req.cookies.token;

  if (tokenAuthorization?.startsWith('Bearer ') && tokenCookies) {
    tokenAuthorization = tokenAuthorization.slice(7, tokenAuthorization.length);
  } else { 
    return res.status(401).json({ error: 'Token inválido' });
  }

  if(tokenAuthorization === req.session.token){ 
    jwt.verify(tokenAuthorization, process.env.SECRET_KEY_JWT, (err) => {
      if (err) { 
        return res.status(401).json({ error: 'Token inválido' });
      }
      jwt.verify(tokenCookies, process.env.SECRET_KEY_JWT, (err) => {
        if (err) { 
          return res.status(401).json({ error: 'Token inválido' });
        }
        next();
      });
    });
  }else{ 
    return res.status(401).json({ error: 'Token inválido' });
  }
  
}
