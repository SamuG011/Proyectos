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

app.put('/servicios/:cod',function(req,res) { 
    //en el url poner igual que el .params.cod
        let idservicio = req.params.cod; 
        let nombre = req.body.nombre; 
        let descripcion = req.body.descripcion; 
        let nivel_com = req.body.nivel_com; 
        let precio = req.body.precio;    

        let sql = 'Update tbServicios set nombre = ?, descripcion=?, nivel_com=?, precio= ? where idservicio = ?';
        //Tiene que ser igual al orden que ingresamos en nuestro query 
        conexion.query(sql,[nombre,descripcion,nivel_com,precio,idservicio],function
        (err,resul){ 
        if(err){ 
            throw res.json(err.message) 
        }else{ 
            res.json('Se modifico correctamente'); 
        } 
    }); 
 }); 

app.delete('/servicios/:codigo',function(req,res) { 
    let idservicio = req.params.codigo; 
    let sql = 'Delete from tbServicios where idservicio = ?'; 
    console.log("Ingreso"); 
    conexion.query(sql,[idservicio],function(err,resul){ 
        if(err){ 
            console.log(err.message); 
            // throw response.json(error.message); 
        }else{ 
            res.json(resul); 
        } 
    }); 
}); 


app.listen(puerto, function() { 
    console.log('Servidor OK en puerto: '+puerto); 
}); 