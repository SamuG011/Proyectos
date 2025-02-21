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

function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


//SELECT
app.get('/index/usuarios',(req, res) => { 
    let sql = "Select u.id_usuario, u.nombre_usuario, u.apellido_pat_usuario, u.apellido_mat_usuario, u.correo_usuario, u.contrasenia_usuario, u.celular_usuario, u.celular_usuario, u.fecha_nac_usuario, r.nombre_rol, u.fecha_registro_usuario from tb_Usuarios u inner join tb_Rol r ON u.id_rol= r.id_rol;" 
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
app.post('/index/usuarios',function(req,res) { 

    let sqlId = "SELECT IFNULL(MAX(id_usuario), 0) + 1 AS codigo FROM tb_Usuarios;";
    
    conexion.query(sqlId, (err, resultado) => {
        if (err) {
            console.log("Error al obtener el ID:", err.message);
            return;
        }

        let nuevoId = resultado[0].codigo;

        let data = {
            id_usuario: nuevoId,
            nombre_usuario:req.body.nombre_usuario,
            apellido_pat_usuario:req.body.apellido_pat_usuario,
            apellido_mat_usuario:req.body.apellido_mat_usuario,
            correo_usuario:req.body.correo_usuario,
            contrasenia_usuario:req.body.contrasenia_usuario,
            celular_usuario:req.body.celular_usuario,
            fecha_nac_usuario:req.body.fecha_nac_usuario,
            id_rol:req.body.id_rol,
            fecha_registro_usuario:getDate()
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
//UPDATE
app.put('/index/usuarios/:cod',function(req,res) { 
    //en el url poner igual que el .params.cod
        let id_usuario = req.params.cod; 
        let nombre_usuario = req.body.nombre_usuario; 
        let apellido_pat_usuario = req.body.apellido_pat_usuario;
        let apellido_mat_usuario = req.body.apellido_mat_usuario;
        let correo_usuario = req.body.correo_usuario;
        let contrasenia_usuario = req.body.contrasenia_usuario;
        let celular_usuario = req.body.celular_usuario;
        let fecha_nac_usuario = req.body.fecha_nac_usuario;
        let id_rol = req.body.id_rol;

        let sql = 'Update tb_Usuarios set nombre_usuario = ?, apellido_pat_usuario = ?, apellido_mat_usuario = ?, correo_usuario = ?, contrasenia_usuario = ?, celular_usuario = ?, fecha_nac_usuario = ?, id_rol = ? where id_usuario = ?';
        //Tiene que ser igual al orden que ingresamos en nuestro query 
        conexion.query(sql,[nombre_usuario,apellido_pat_usuario,apellido_mat_usuario,correo_usuario,contrasenia_usuario,celular_usuario,fecha_nac_usuario,id_rol,id_usuario],function
        (err,resul){ 
        if(err){ 
            throw res.json(err.message) 
        }else{ 
            res.json('Se modifico correctamente'); 
        } 
    }); 
});
//DELETE
app.delete('/index/usuarios/:codigo',function(req,res) { 
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