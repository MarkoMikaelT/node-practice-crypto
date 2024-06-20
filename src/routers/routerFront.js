const express = require('express')
const routerFront = express.Router();
const fs = require('node:fs/promises')
const header = './front/header.html'
const signupPage = './front/signupPage.html'
const loginPage = './front/loginPage.html'

async function getPage(path){
    const head = await fs.readFile(header);
    const page = await fs.readFile(path);
    return Buffer.concat([head, page])
}

routerFront.get('/', async (req, res) => {
    try {
        const html = await getPage(signupPage)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } catch (error) {
        console.log(error)
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end("<h1>Uuups something went wrong</h1>");
    }
})

routerFront.get('/login', async (req, res) => {
    const html = await getPage(loginPage)
    try {    
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } catch (error) {
        console.log(error)
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(html + "<h1>Uuups something went wrong</h1>" );
    }
})

module.exports = routerFront