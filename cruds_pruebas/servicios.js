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

app.get('/servicios/id',(req, res) => { 
    let sql = "Select max(idservicio + 1)codigo from tbServicios;" 
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

app.post('/servicios',function(req,res) { 

    let sqlId = "SELECT IFNULL(MAX(idservicio), 0) + 1 AS codigo FROM tbServicios;";
    
    conexion.query(sqlId, (err, resultado) => {
        if (err) {
            console.log("Error al obtener el ID:", err.message);
            res.status(500).json({ mensaje: "Error en el servidor" });
            return;
        }

        let nuevoId = resultado[0].codigo;

        let data = {
            idservicio: nuevoId,
            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            nivel_com:req.body.nivel_com,
            precio:req.body.precio
        }


        let sql = "Insert into tbServicios set ?";

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
