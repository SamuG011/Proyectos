const express = require('express'); 
const mysql = require('mysql2'); 
const app = express(); 
app.use(express.json()); 

const puerto = 4500

const conexion = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: '82002', 
    database: 'Sist_Reportes' 
}); 

conexion.connect(function(err) { 
    if(err){ 
        throw err; 
    }else{ 
        console.log('Conexion exitosa !!!'); 
    } 
});

//SELECT
app.get('/index/controles',(req, res) => { 
    let sql = "Select c.id_control, c.accion_control, c.fecha_accion_control, u.nombre_usuario, u.apellido_pat_usuario, u.apellido_mat_usuario, r.titulo_reporte, r.descripcion_reporte from tb_Control c inner join tb_Usuarios u on c.id_usuario = u.id_usuario inner join tb_Reportes r ON c.id_reporte= r.id_reporte; " 
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
app.post('/index/controles',function(req,res) { 

    let sqlId = "SELECT IFNULL(MAX(id_control), 0) + 1 AS codigo FROM tb_Control;";
    
    conexion.query(sqlId, (err, resultado) => {
        if (err) {
            console.log("Error al obtener el ID:", err.message);
            return;
        }

        let nuevoId = resultado[0].codigo;

        let data = {
            id_control: nuevoId,
            id_usuario:req.body.nombre_usuario,
            id_reporte:req.body.apellido_pat_usuario,
            accion_control:req.body.apellido_mat_usuario
        }


        let sql = "Insert into tb_Usuarios set ?";

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

app.put('/index/controles/:cod',function(req,res) { 
    //en el url poner igual que el .params.cod
        let id_usuario = req.params.cod; 
        let nombre_usuario = req.body.nombre_usuario; 
        let apellido_pat_usuario = req.body.apellido_pat_usuario;
        let apellido_mat_usuario = req.body.apellido_mat_usuario;
        let correo_usuario = req.body.correo_usuario;
        let contrasenia_usuario = req.body.contrasenia_usuario;
        let celular_usuario = req.body.celular_usuario;
        let id_rol = req.body.id_rol;

        let sql = 'Update tb_Usuarios set nombre_usuario = ?, apellido_pat_usuario = ?, apellido_mat_usuario = ?, correo_usuario = ?, contrasenia_usuario = ?, celular_usuario = ?, id_rol = ? where id_usuario = ?';
        //Tiene que ser igual al orden que ingresamos en nuestro query 
        conexion.query(sql,[nombre_usuario,apellido_pat_usuario,apellido_mat_usuario,correo_usuario,contrasenia_usuario,celular_usuario,id_rol,id_usuario],function
        (err,resul){ 
        if(err){ 
            throw res.json(err.message) 
        }else{ 
            res.json('Se modifico correctamente'); 
        } 
    }); 
});

//DELETE
app.delete('/index/controles/:codigo',function(req,res) { 
    let id_usuario = req.params.codigo; 
    let sql = 'Delete from tb_Usuarios where id_usuario = ?'; 
    console.log("Ingreso"); 
    conexion.query(sql,[id_usuario],function(err,resul){ 
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