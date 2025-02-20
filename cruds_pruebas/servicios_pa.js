const express = require('express'); 
const mysql = require('mysql2'); 
const app = express(); 
app.use(express.json()); 

const puerto = 4000

const conexion = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: '82002', 
    database: 'bd_consultorio' 
}); 

conexion.connect(function(err) { 
    if(err){ 
        throw err; 
    }else{ 
        console.log('Conexion exitosa !!!'); 
    } 
});  

app.post('/servicios_pa',function(req,res) { 
    
    let nombre = req.body.nombre; 
    let descripcion = req.body.descripcion; 
    let nivel_com = req.body.nivel_com; 
    let precio = req.body.precio; 


    let sql = "call pservicios(?,?,?,?);";

    conexion.query(sql,[nombre,descripcion,nivel_com,precio], function(err,resul){
        if(err){
            console.log(err.message);
            res.json({ mensaje:"Error no se adiciono"});
        }else{
            res.json(resul);
            console.log("Positiva, se adiciono");
        }
    })
});

app.listen(puerto, function() { 
    console.log('Esta prendido hijitaaaa: '+puerto); 
}); 