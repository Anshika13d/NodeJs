const http = require("http")
const fs = require("fs")
const Myurl = require("url")

const myServer = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end();

    //console.log(req.headers);
    //console.log("New Req rec.")
    //res.end("Hello from server in port 8000")

    //to create a log of the data of user
    const log = `${Date.now()}: ${req.method}  ${req.url} New Request Recieved\n`
    
    const myurl = Myurl.parse(req.url, true)
    console.log(myurl);

    fs.appendFile("log.txt", log, (err, data) => {
        switch (myurl.pathname){
            case '/': 
                res.end("Home page");
            break
            case '/about' : 
                const username = myurl.query.search
                res.end(`hey, ${username}`)
            break
            case '/search':
                const s = myurl.query.search_query
                res.end(s) 
            break
            case '/signup':
                if(req.method === "GET"){
                    //DB query
                    res.end("This is a form");
                }
                else if(req.method === "POST"){
                    res.end("Success");
                }
            break
            default: res.end("404 NOT FOUND");
        }
        
    })
})

//to listen the request that is coming from the server
myServer.listen(8000, () => console.log('server started'))
















//express


const express = require("express");

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello from home page')
});

app.get('/about', (req, res) => {
    return res.send(`Hello from About page to ${req.query.name}`)
})

app.get('/contact', (req, res) => {
    return res.send('Contact Us')
})

const port = 8000;
app.listen(port, () => console.log("server started"));