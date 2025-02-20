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

app.get('/', function(req, res) { 
    res.send('Ruta de servicios'); 
}); 

app.get('/servicios',(req, res) => { 
    let sql = "Select idservicio, nombre, descripcion, nivel_com, precio from tbServicios;" 
    conexion.query(sql, (err, resul) => { 
        if(err) { 
            console.log("Auuuuh"); 
            throw err 
        }else{ 
            //console.log(resul); 
            //res.send(resul) 
            res.json(resul); 
        } 
    }); 
}); 

app.listen(puerto, function() { 
    console.log('Servidor OK en puerto: '+puerto); 
}); 