const {scryptSync, randomBytes, timingSafeEqual} = require('crypto') 

let users = [];

function signup(email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashed = scryptSync(password, salt, 64).toString('hex');
    
    const user = {email: email, password: `${salt}:${hashed}`};
    users.push(user);

    return user;
}

function login(email, password) {
    const user = users.find((val) => val.email === email);

    if(user === undefined) return false;

    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);
    
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    return match;
}

module.exports = {
    signup, 
    login
}