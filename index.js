var cors = require('cors');  
const express = require('express');
//const logger = require('morgan');
const bodyParser = require('body-parser');
var app = express();
//app.use(logger('dev'));
app.set('view engine','ejs');
app.set('views', '/views');
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

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));



app.get('/route',(req,res)=>{
   
    res.render('index');
});
app.get('/api/json',(req,res)=>{
    let data ={ ok: 'ok'}
    res.json(data);
});


app.get('/api/teste',(req,res)=>{
    res.send("OK");
});

app.listen(8181, ()=>
{
    console.log("Server on 8181");
})

