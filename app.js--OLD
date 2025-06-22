const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const logger = require('morgan');

const bodyParser = require('body-parser');
const express = require('express');
const { Server } = require('socket.io');
const fs = require("fs");
const https = require("https");


var app = express();

// Carrega o certificado e a key necessários para a configuração.
const options = {
  key: fs.readFileSync("certificado.key"),
  cert: fs.readFileSync("certificado.cert")
}


const server = https.createServer(options, app);
const io = new Server(server);

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
  //'Cache-Control:no-cache'
  preflightContinue: true,

};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs');
app.set('views', './views');


app.get("/", async(req, res) => {
   let data = [{titulo: 'Home',dir_mesa:req.pathname,n_mesa:id}];
  res.render("index", { data });
});

app.get('/chat', (req, res) => {
  try {
        let data = [{titulo: 'Atendimento',dir_mesa:req.pathname,n_mesa:id}];
    res.render("chat",{data});

  } catch (err) {
    alert(err);
    console.error(err);
  }

});
app.get("/:id",async (req, res) => {
  const id = req.params.id;
     let data = [{titulo: 'Mesa n°'+id,n_mesa:id}];
  res.render("index", {data});
});
app.post("/client",async(req,res)=>{

  try{

    console.log(req.body);
    res.status(200).send(true);

  }catch(err){
    console.error(err);
  }

})


app.post('/chat',async (req, res, next) => {
  try {

   var dadosForm = req.body.nickname;
   console.log(dadosForm);
 res.status(200).redirect('/chat');

  } catch (err) {
    alert(err);
    next(err);
  }

})

app.post('/api/maps', async (req, res, next) => {
  const { lat, long } = req.body;
  let latitude = parseInt(lat);
  let longitude = parseInt(long);

  fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + latitude + '&lon=' + longitude + '%20&addressdetails=1')
    .then((res) => { return res.json() })
    .then((data) => { res.json(data) });

});

var id = uuidv4();


io.on('connection', (socket) => {

  console.log('a user connected ' + id.substring(0, 5));

  socket.on('chat_msg', (msg) => { io.emit('chat_msg', msg); });
  socket.on('disconnect', () => { console.log('user disconnected'); });
});

server.listen(8181, () => {
  console.log('server running at https://10.10.10.6:8181');
});
/*


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

*/