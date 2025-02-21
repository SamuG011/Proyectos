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
app.get('/index/comentarios',(req, res) => { 
    let sql = "Select c.id_comentario, c.comentario, c.fecha_comentario, u.nombre_usuario, u.apellido_pat_usuario, u.apellido_mat_usuario, r.titulo_reporte, r.descripcion_reporte, r.categoria_reporte from tb_Comentarios c inner join tb_Usuarios u ON c.id_usuario = u.id_usuario inner join tb_Reportes r ON c.id_reporte = r.id_reporte;" 
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
app.post('/index/comentarios',function(req,res) { 

    let sqlId = "SELECT IFNULL(MAX(id_comentario), 0) + 1 AS codigo FROM tb_Comentarios;";
    
    conexion.query(sqlId, (err, resultado) => {
        if (err) {
            console.log("Error al obtener el ID:", err.message);
            return;
        }

        let nuevoId = resultado[0].codigo;

        let data = {
            id_comentario: nuevoId,
            id_reporte:req.body.id_reporte,
            id_usuario:req.body.id_usuario,
            comentario:req.body.comentario,
            fecha_comentario:getDate()
        }


        let sql = "Insert into tb_Comentarios set ?";

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
app.put('/index/comentarios/:cod',function(req,res) { 
    //en el url poner igual que el .params.cod
        let id_comentario = req.params.cod; 
        let id_reporte = req.body.id_reporte; 
        let id_usuario = req.body.id_usuario;
        let comentario = req.body.comentario;

        let sql = 'Update tb_Comentarios set id_reporte = ?, id_usuario = ?, comentario = ? where id_comentario = ?';
        //Tiene que ser igual al orden que ingresamos en nuestro query 
        conexion.query(sql,[id_reporte,id_usuario,comentario,id_comentario],function
        (err,resul){ 
        if(err){ 
            throw res.json(err.message) 
        }else{ 
            res.json('Se modifico correctamente'); 
        } 
    }); 
});
//DELETE
app.delete('/index/comentarios/:codigo',function(req,res) { 
    let id_comentario = req.params.codigo; 
    let sql = 'Delete from tb_Comentarios where id_comentario = ?'; 
    console.log("Ingreso"); 
    conexion.query(sql,[id_comentario],function(err,resul){ 
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