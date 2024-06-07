const express = require('express')
const {checkPass, storePass, getPasses} = require('./hash')
const {signup, login} = require('./salt');
const { addHmac, getHmacs, checkHmac } = require('./hmac');
const router = express.Router();

function errCaught(res, err){
    console.error(err);
    switch(err.code){
        case 'ERR_INVALID_ARG_TYPE':
            res.status(500).json({message: `Uuups ${res.req.url} recieved something unexpected`});
            break;
        default:
            res.status(500).json({message: `Uuups ${res.req.url} something went wrong`});
            break;
    }
}

function respond(res, status, response){
    console.log(`${res.req.url} - ${status} - ${response}`);
    res.status(status).json(response);
}

function isEmptyString(val){
    if(typeof val != "string"){
        return true;
    }
    else if(val.trim() === ""){
        return true;
    }
    return false;
}

router.get('/', (req, res) => {
    res.send("Hellou people");
})

//#region HASH
router.post('/hash', (req, res) =>{
    let [status, response] = [200, {}];

    if(isEmptyString(req.query.password)){
        respond(400, {message: "Invalid pass"});
    }

    try {
        const isStored = storePass(req.query.password);
        if(isStored){
            [status, response] = [200, {message: "Pass added"}];
        }else{
            [status, response] = [406, {message: "Pass cant be added"}];
        }
        respond(res, status, response);
    } catch (error) {
        errCaught(res, error);
    }
})

router.get('/getAllPasses', (req, res) => {
    let [status, response] = [200, {}];
    try {
        [status, response] = [200, getPasses()];
        respond(res, status, response);
    } catch (error) {
        errCaught(res, error);
    }
})

router.get('/hashLogin', (req, res) =>{
    let [status, response] = [200, {}];
    try {
        if(checkPass(req.query.password)){
            [status, response] = [200, {message: "Logged In"}];
        }else{
            [status, response] = [404, {message: "Invalid"}];
        }
        respond(res, status, response);
    } catch (error) {
        errCaught(res, error);
    }
})
//#endregion HASH

//#region SALT
router.post('/signup', (req, res) => {
    const [pass, email] = [req.query.password, req.query.email];
    let [status, response] = [200, {}];
    if(isEmptyString(email) || isEmptyString(pass)){
        [status, response] = [406, {message: "Neither password word nor email can be empty"}];
    }
    try {
        const user = signup(email, pass);
        [status, response] = [200, {message: user}];
        respond(res, status, response);
    } catch (error) {
        errCaught(res, error);
    }
})

router.get('/login', (req, res) => {
    const [pass, email] = [req.query.password, req.query.email];
    let [status, response] = [200, {}];
    if(isEmptyString(email) || isEmptyString(pass)){
        respond(406, {message: "Neither password word nor email can be empty"});
    }
    try {
        [status, response] = [200, {message: `Logged in ${login(email, pass)}`}];
        respond(res, status, response);
    } catch (error) {
        errCaught(res, error);
    }
})
//#endregion SALT
//#region HMAC
router.post('/hmac', (req, res) => {
    const msg = req.query.message;
    let [status, response] = [200, {}];
    try {
        [status, response] = [200, {message: `Message added ${addHmac(msg)}`}];
        respond(res, status, response);
    } catch (error) {
        errCaught(res, error)
    }
})
router.get('/getHmac', (req, res) => {
    let [status, response] = [200, {}];
    try {
        [status, response] = [200, {hmacs: getHmacs()}];
        respond(res, status, response);
    } catch (error) {
        errCaught(res, error)
    }
})
router.get('/checkHmac', (req, res) => {
    let [status, response] = [200, {}];
    const msg = req.query.message;
    try {
        [status, response] = [200, {message: `Message found ${checkHmac(msg)}`}];
        respond(res, status, response);
    } catch (error) {
        errCaught(res, error)
    }
})
//#endregion HMAC
module.exports = router