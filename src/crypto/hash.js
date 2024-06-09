const {createHash} = require('crypto')

let passes = []

function hash(str){
    return createHash('sha256').update(str).digest('hex')
}

function getPasses(){
    return passes
}

function addPass(pass){
    passes.push(pass)
}

function storePass(pass){
    const hashed = hash(pass)
    if(!checkPass(pass)){
        addPass(hashed)
        return true
    }else{
        return false
    }
}

function checkPass(pass){
    const hashToCheck = hash(pass)
    return passes.find((val) => val === hashToCheck) !== undefined
}

module.exports = {
    storePass,
    getPasses,
    checkPass
}