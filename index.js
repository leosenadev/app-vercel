var cors = require('cors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { createServer } = require('node:http');
const { join, dirname } = require('node:path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(logger('dev'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



const corsOptions = {
    origin: '*',
    method: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    exposedHeaders: [

        'Autorization',
        'X-Requested-With',
        'Content-Type',
        'Cache-Control:no-cache',
        'Access-Control-Allow-Origin:*'
    ],
    preflightContinue: true,

};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {

    res.render("<h1>API LSS.TECNOLOGIAS</h1>");
});

app.get('/api/json', (req, res) => {
    let data = { ok: 'ok' }
    res.json(data);
});


app.get('/api/teste', (req, res) => {
    res.send("OK");
});

server.listen(8181, () => {
    console.log("Server on 8181");
})

