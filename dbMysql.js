    const mysql = require('mysql');

    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 

    const connection =  mysql.createConnection("mysql://if0_39323019:leo143113@192.168.0.6:46934:3306/if0_39323019_db_lsstecnologias");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;

 function selectData(){
    const conn = connect();
    const [rows] =  conn.query('SELECT * FROM contatos');
    return rows;
}
 
module.exports = {selectData}