var cors = require('cors');
const express = require('express');
const logger = require('morgan');
require('dotenv').config();
const bodyParser = require('body-parser');
const { createServer } = require('node:http');
const { join, dirname } = require('node:path');
const { Server } = require('socket.io');

const {MongoClient} = require("mongodb");

const uri = "mongodb+srv://lsstecnologias:"+process.env.PASSWORD_MONGO+"@laencartes.s7ttpj2.mongodb.net/?retryWrites=true&w=majority&appName=laencartes";
const mongoDB = new MongoClient(uri);
const nameDB="laencartes";


const app = express();
const server = createServer(app);
const io = new Server(server,{ cors: {
    origin: "*",
    credentials: true
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



app.get('/api/get', async(req, res) => {
    try{
        const db_open = mongoDB.db(nameDB);
        const data_collection = db_open.collection('clientes');
        var data = await data_collection.find().toArray();
        if(data){
         res.status(200).json(data);
          // mongoDB.close();
        }
    }catch(err){
        console.error(err);
    }finally{
        await mongoDB.close();
    }
 
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

