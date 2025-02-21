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
app.get('/index/evidencias',(req, res) => { 
    let sql = "Select e.id_evidencia, r.titulo_reporte, r.descripcion_reporte, r.categoria_reporte, e.ruta_archivo_evidencia, e.tipo_archivo_evidencia from tb_Evidencias e inner join tb_Reportes r ON e.id_reporte = r.id_reporte;" 
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
app.post('/index/evidencias',function(req,res) { 

    let sqlId = "SELECT IFNULL(MAX(id_evidencia), 0) + 1 AS codigo FROM tb_Evidencias;";
    
    conexion.query(sqlId, (err, resultado) => {
        if (err) {
            console.log("Error al obtener el ID:", err.message);
            return;
        }

        let nuevoId = resultado[0].codigo;

        let data = {
            id_evidencia: nuevoId,
            id_reporte:req.body.id_reporte,
            ruta_archivo_evidencia:req.body.ruta_archivo_evidencia,
            tipo_archivo_evidencia:req.body.tipo_archivo_evidencia
        }


        let sql = "Insert into tb_Evidencias set ?";

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
app.put('/index/evidencias/:cod',function(req,res) { 
    //en el url poner igual que el .params.cod
        let id_evidencia = req.params.cod; 
        let id_reporte = req.body.id_reporte; 
        let ruta_archivo_evidencia = req.body.ruta_archivo_evidencia;
        let tipo_archivo_evidencia = req.body.tipo_archivo_evidencia;

        let sql = 'Update tb_Evidencias set id_reporte = ?, ruta_archivo_evidencia = ?, tipo_archivo_evidencia = ? where id_evidencia = ?';
        //Tiene que ser igual al orden que ingresamos en nuestro query 
        conexion.query(sql,[id_reporte,ruta_archivo_evidencia,tipo_archivo_evidencia,id_evidencia],function
        (err,resul){ 
        if(err){ 
            throw res.json(err.message) 
        }else{ 
            res.json('Se modifico correctamente'); 
        } 
    }); 
});
//DELETE
app.delete('/index/evidencias/:codigo',function(req,res) { 
    let id_evidencia = req.params.codigo; 
    let sql = 'Delete from tb_Evidencias where id_evidencia = ?'; 
    console.log("Ingreso"); 
    conexion.query(sql,[id_evidencia],function(err,resul){ 
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