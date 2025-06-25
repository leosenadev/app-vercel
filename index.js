var cors = require('cors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { createServer } = require('node:http');
const { join, dirname } = require('node:path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server,{ cors: {
    origin: "*"
  }});
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

app.set('View engine','ejs');
app.set('View','./View');

app.get('/teste', (req, res) => {
    res.render("index");
 
});

app.get('/', (req, res) => {
    res.send("<h3>API - lsstecnologias</h3>");
 
});

app.get('/api/mesa/:mesa', (req, res) => {
    
    try{
        let n_mesa = req.params.mesa;
        let data_qrcode ={
            "mesa_n":n_mesa
        }
        res.status(200).json(data_qrcode);
    }catch(err){
        console.error(err)
    }
    res.json(data);
});


app.get('/api/teste', (req, res) => {
    res.send("OK");
});

server.listen(8181, () => {
    console.log("Server on 8181");
})

