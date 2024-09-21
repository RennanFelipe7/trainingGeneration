const fs = require('fs');
require('dotenv').config();

module.exports = function bloquer(req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let ipsAndConts;
    let currentIpsAndCounts = [];
    let isBlocked = false;
    try {
        ipsAndConts = fs.readFileSync('serverStorage/bloquer.txt', 'utf8');
        currentIpsAndCounts = ipsAndConts.split('\n').map(item => item.replace('\r', ''));
    } catch (err) {
        console.error('Não foi possível ler o arquivo contendo os IPs devido ao erro: ' + err);
    }
    const currentTime = Date.now();
    if (currentIpsAndCounts.some(item => item.includes(ip))) {
        currentIpsAndCounts = currentIpsAndCounts.map(item => {
            if (item.includes(ip)) {
                let [currentIp, count, timestamp, isBlockedFile] = item.split(';');
                if(isBlockedFile === 'true'){
                    isBlocked = true;
                    return currentIp + ';' + count + ';' + timestamp + ';' + 'true';
                }
                count = parseInt(count, 10);
                timestamp = parseInt(timestamp, 10);
                if (currentTime - timestamp < (process.env.MINUTE_TO_BLOCK * 60 * 1000)) {
                    if (count >= process.env.LIMIT_TO_LOCK) {
                        isBlocked = true;
                        return currentIp + ';' + count + ';' + timestamp + ';' + 'true';
                    } else {
                        count++;
                    }
                } else {
                    count = 1;
                    timestamp = currentTime;
                }
                return currentIp + ';' + count + ';' + timestamp + ';' + isBlockedFile;
            }
            return item;
        });
    } else {
        currentIpsAndCounts.push(ip + ';' + 1 + ';' + currentTime + ';' + 'false');
    }

    try {
        fs.writeFileSync('serverStorage/bloquer.txt', currentIpsAndCounts.join('\n'), 'utf8');
    } catch (err) {
        console.error('Não foi possível escrever no arquivo contendo os IPs devido ao erro: ' + err);
    }

    if (isBlocked) {
        return res.status(403).header('Content-Type', 'application/json').send({error: 'Você está temporariamente bloqueado, tente novamente em 15 minutos'});
    }
    next();
}
