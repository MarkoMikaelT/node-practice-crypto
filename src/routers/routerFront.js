const express = require('express')
const routerFront = express.Router();
const fs = require('node:fs/promises')
const testHtml = './front/test.html'

routerFront.get('/', async (req, res) => {
    try {
        const html = await fs.readFile(testHtml)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } catch (error) {
        console.log(error)
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end("<h1>Uuups something went wrong</h1>");
    }
})

module.exports = routerFront