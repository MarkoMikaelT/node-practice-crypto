const {createHmac} = require('crypto')

let hmacs = [];
const key = "12345";

function newHmac(val) {
    const hmac = createHmac('sha256', key).update(val).digest('hex');
    console.log(hmac)
    return hmac;
}

function addHmac(msg) {
    const newhmac = newHmac(msg);
    hmacs.push(newhmac);
    return newhmac;
}

function getHmacs() {
    return hmacs;
}

function checkHmac(msg) {
    const hmacToCheck = newHmac(msg);
    return hmacs.find((hm) => hm === hmacToCheck) !== undefined;
}

module.exports={
    addHmac,
    getHmacs,
    checkHmac
}