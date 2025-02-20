const express = require("express");
const app = express();
const puerto = 3000;

let nombre = "Samuel"

//get(select), post(insert), put(update) y delete
app.get("/", function(req,res){
    res.send("Ruta de Inicio");
});

app.listen(puerto, function(){
    console.log("Servidor levantado en puerto: " + puerto);
});

app.get('/mundo', function(req, res) { 
    res.send('Hola Mundo'); 
}); 

app.get('/saludo/:nombre', function(req, res) { 

    res.send(`Buenos dias ${req.params.nombre}`); 
});