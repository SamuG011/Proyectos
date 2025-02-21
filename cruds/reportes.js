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
app.get('/index/reportes',(req, res) => { 
    let sql = "Select r.id_reporte, u.nombre_usuario, u.apellido_pat_usuario, u.apellido_mat_usuario, r.titulo_reporte, r.descripcion_reporte, r.categoria_reporte, r.estado_reporte, r.fecha_creacion_reporte, r.ubicacion_reporte from tb_Reportes r inner join tb_Usuarios u ON r.id_usuario= u.id_usuario;" 
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
//INSERT CIUDADANO //Evidencias
app.post('/index/ciudadano/reportes',function(req,res) { 

    let sqlId = "SELECT IFNULL(MAX(id_reporte), 0) + 1 AS codigo FROM tb_Reportes;";
    
    conexion.query(sqlId, (err, resultado) => {
        if (err) {
            console.log("Error al obtener el ID:", err.message);
            return;
        }

        let nuevoId = resultado[0].codigo;
        let estado = "Pendiente";

        let data = {
            id_reporte: nuevoId,
            id_usuario:req.body.id_usuario,
            titulo_reporte:req.body.titulo_reporte,
            descripcion_reporte:req.body.descripcion_reporte,
            categoria_reporte:req.body.categoria_reporte,
            estado_reporte: estado,
            ubicacion_reporte:req.body.ubicacion_reporte,
            fecha_creacion_reporte:getDate()
        }


        let sql = "Insert into tb_Reportes set ?";

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
//UPDATE CIUDADANO
app.put('/index/ciudadano/reportes/:cod',function(req,res) { 
    //en el url poner igual que el .params.cod
        let id_reporte = req.params.cod; 
        let titulo_reporte = req.body.titulo_reporte;
        let descripcion_reporte = req.body.descripcion_reporte;
        let categoria_reporte = req.body.categoria_reporte;
        let ubicacion_reporte = req.body.ubicacion_reporte;

        let sql = 'Update tb_Reportes set titulo_reporte = ?, descripcion_reporte = ?, categoria_reporte = ?, ubicacion_reporte = ? where id_reporte = ?';
        //Tiene que ser igual al orden que ingresamos en nuestro query 
        conexion.query(sql,[titulo_reporte,descripcion_reporte,categoria_reporte,ubicacion_reporte,id_reporte],function
        (err,resul){ 
        if(err){ 
            throw res.json(err.message) 
        }else{ 
            res.json('Se modifico correctamente'); 
        }
    }); 
});

//UPDATE AUTORIDAD
app.put('/index/autoridad/reportes/:cod',function(req,res) { 
    //en el url poner igual que el .params.cod
    let id_reporte = req.params.cod; 
    let estado_reporte = req.body.estado_reporte;

    let sql = 'Update tb_Reportes set estado_reporte = ? where id_reporte = ?';
        //Tiene que ser igual al orden que ingresamos en nuestro query 
    conexion.query(sql,[estado_reporte,id_reporte],function
    (err,resul){ 
        if (err) {
            return res.json({ error: err.message });
        }
        let sqlId = "SELECT IFNULL(MAX(id_control), 0) + 1 AS codigo FROM tb_Control;";

        conexion.query(sqlId, (err, resultado) => {
            if (err) {
                console.log("Error al obtener el ID:", err.message);
                return;
            }
        
            let nuevoId = resultado[0].codigo;
            let accion = 'Actualizado';

            let data = {
                id_control: nuevoId,
                id_autoridad:req.body.id_autoridad,
                id_reporte: id_reporte,
                accion_control: accion,
                fecha_accion_control: getDate()
            }
        
            let sql_control = "Insert into tb_Control set ?";
        
            conexion.query(sql_control,data, function(err,resul){
                if(err){
                    console.log(err.message);
                    res.json({ mensaje:"Error no se adiciono"});
                }
                console.log("Positiva, se adiciono");
                return res.json({ mensaje: "Se modificó correctamente", resultado: resul });
            });
        });
    }); 
});

//DELETE
app.delete('/index/reportes/:codigo',function(req,res) { 
    let id_reporte = req.params.codigo; 
    let sql = 'Delete from tb_Reportes where id_reporte = ?'; 
    console.log("Ingreso"); 
    conexion.query(sql,[id_reporte],function(err,resul){ 
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