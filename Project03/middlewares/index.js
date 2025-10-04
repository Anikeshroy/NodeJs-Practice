const fs = require('fs')

function logreqres(fileName) {
    return (req, res, next) => {
        fs.appendFile(fileName, `\n${Date.now()}: ${req.method}: ${req.path}: ${req.ip}`, (err, data) => {
            next();
        });
    };
}

module.exports = {
    logreqres,
};