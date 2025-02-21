const express = require('express'); 
const mysql = require('mysql2'); 
const app = express(); 
app.use(express.json()); 

const puerto = 4500

const conexion = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: '82002', 
    database: 'Sist_Reportes',
    timezone: 'Z'  
}); 

conexion.connect(function(err) { 
    if(err){ 
        throw err; 
    }else{ 
        console.log('Conexion exitosa !!!'); 
    } 
});

//SELECT
app.get('/index/rol',(req, res) => { 
    let sql = "Select id_rol, nombre_rol, descripcion_rol from tb_Rol;" 
    conexion.query(sql, (err, resul) => { 
        if(err) { 
            console.log("Error al mostrar los datos de la respectiva tabla"); 
            throw err 
        }else{ 
            //console.log(resul); 
            //res.send(resul) 
            res.json(resul); 
        } 
    }); 
});
//INSERT
app.post('/index/rol',function(req,res) { 

    let sqlId = "SELECT IFNULL(MAX(id_rol), 0) + 1 AS codigo FROM tb_Rol;";
    
    conexion.query(sqlId, (err, resultado) => {
        if (err) {
            console.log("Error al obtener el ID:", err.message);
            return;
        }

        let nuevoId = resultado[0].codigo;

        let data = {
            id_rol: nuevoId,
            nombre_rol:req.body.nombre_rol,
            descripcion_rol:req.body.descripcion_rol
        }


        let sql = "Insert into tb_Rol set ?";

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
//UPDATE
app.put('/index/rol/:cod',function(req,res) { 
    //en el url poner igual que el .params.cod
        let id_rol = req.params.cod; 
        let nombre_rol = req.body.nombre_rol; 
        let descripcion_rol = req.body.descripcion_rol; 

        let sql = 'Update tb_Rol set nombre_rol = ?, descripcion_rol=? where id_rol = ?';
        //Tiene que ser igual al orden que ingresamos en nuestro query 
        conexion.query(sql,[nombre_rol,descripcion_rol,id_rol],function
        (err,resul){ 
        if(err){ 
            throw res.json(err.message) 
        }else{ 
            res.json('Se modifico correctamente'); 
        } 
    }); 
});
//DELETE
app.delete('/index/rol/:codigo',function(req,res) { 
    let id_rol = req.params.codigo; 
    let sql = 'Delete from tb_Rol where id_rol = ?'; 
    console.log("Ingreso"); 
    conexion.query(sql,[id_rol],function(err,resul){ 
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