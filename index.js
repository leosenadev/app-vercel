var cors = require('cors');  
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(logger('dev'));
app.set('view engine','ejs');
app.set('views', './views');
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



app.get('/',(req,res)=>{
    res.render('index',{titulo:'Pagina inicial'});
});
app.get('/api',(req,res)=>{
    res.json({titulo:'Pagina inicial',data:'0k'});
});

app.listen(8181, ()=>
{
    console.log("Server on 8181");
})

