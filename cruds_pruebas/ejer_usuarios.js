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

app.get('/pacientes',(req, res) => { 
    let sql = "Select idpaciente, nombre, p_apellido, s_apellido, fecha_nac, genero, ci, correo, celular, alergia, resistencia, contacto from tbPacientes;" 
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

app.post('/pacientes',function(req,res) { 
    
    let data = {
        idpaciente:req.body.idpaciente,
        nombre:req.body.nombre,
        p_apellido:req.body.p_apellido,
        s_apellido:req.body.s_apellido,
        fecha_nac:req.body.fecha_nac,
        genero:req.body.genero,
        ci:req.body.ci,
        correo:req.body.correo,
        celular:req.body.celular,
        alergia:req.body.alergia,
        resistencia:req.body.resistencia,
        contacto:req.body.contacto
    }

    let sql = "Insert into tbPacientes set ?";

    conexion.query(sql,data, function(err,resul){
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
    console.log('Servidor OK en puerto: '+puerto); 
}); 