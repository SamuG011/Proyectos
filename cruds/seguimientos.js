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
app.get('/index/autoridad/seguimientos',(req, res) => { 
    let sql = "Select s.id_seguimiento, s.mensaje_seguimiento, s.fecha_actualizacion_seguimiento, u.nombre_usuario, u.apellido_pat_usuario, u.apellido_mat_usuario, r.titulo_reporte, r.descripcion_reporte, r.categoria_reporte from tb_Seguimientos s inner join tb_Usuarios u ON s.id_autoridad = u.id_usuario inner join tb_Reportes r ON S.id_reporte = r.id_reporte;" 
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
app.post('/index/autoridad/seguimientos',function(req,res) { 

    let sqlId = "SELECT IFNULL(MAX(id_seguimiento), 0) + 1 AS codigo FROM tb_Seguimientos;";
    
    conexion.query(sqlId, (err, resultado) => {
        if (err) {
            console.log("Error al obtener el ID:", err.message);
            return;
        }

        let nuevoId = resultado[0].codigo;

        let data = {
            id_seguimiento: nuevoId,
            id_reporte:req.body.id_reporte,
            id_autoridad:req.body.id_autoridad,
            mensaje_seguimiento:req.body.mensaje_seguimiento,
            fecha_actualizacion_seguimiento:getDate()
        }


        let sql = "Insert into tb_Seguimientos set ?";

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
app.put('/index/autoridad/seguimientos/:cod',function(req,res) { 
    //en el url poner igual que el .params.cod
        let id_seguimiento = req.params.cod; 
        let id_reporte = req.body.id_reporte;
        let id_autoridad = req.body.id_autoridad;
        let mensaje_seguimiento = req.body.mensaje_seguimiento;

        let sql = 'Update tb_Seguimientos set id_reporte = ?, id_autoridad = ?, mensaje_seguimiento = ? where id_seguimiento = ?';
        //Tiene que ser igual al orden que ingresamos en nuestro query 
        conexion.query(sql,[id_reporte,id_autoridad,mensaje_seguimiento,id_seguimiento],function
        (err,resul){ 
        if(err){ 
            throw res.json(err.message) 
        }else{ 
            res.json('Se modifico correctamente'); 
        }
    }); 
});
//DELETE
app.delete('/index/autoridad/seguimientos/:codigo',function(req,res) { 
    let id_seguimiento = req.params.codigo; 
    let sql = 'Delete from tb_Seguimientos where id_seguimiento = ?'; 
    console.log("Ingreso"); 
    conexion.query(sql,[id_seguimiento],function(err,resul){ 
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