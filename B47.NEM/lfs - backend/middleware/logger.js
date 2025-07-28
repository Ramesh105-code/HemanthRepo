const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const log = '${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode}\n';
        fs.appendFileSync(path.join(__dirname, '../logs/requests.log'), log);
    });
    next();
};