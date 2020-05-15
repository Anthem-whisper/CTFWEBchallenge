const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync('1.txt', 'utf8');
const publicKey  = fs.readFileSync('2.txt', 'utf8');

module.exports = {
    async sign(data) {
        data = Object.assign(data, {pk:publicKey});
        return (await jwt.sign(data, privateKey, { algorithm:'RS256' }))
    },
    async decode(token) {
        return (await jwt.verify(token, publicKey, { algorithms: ['RS256', 'HS256'] }));
    }
}