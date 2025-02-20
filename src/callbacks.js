let nom = "Samuel";

function saludo(nombre, callback){
    console.log(`Buenos dias ${nombre}`);
    callback(nombre);
}

/*function pregunta(callback){
    console.log("Cuanto es 1 + 1?")
    let dato = prompt();
    if (dato = 2){
        console.log("Correcto");
    } else {
        console.log("Incorrecto");
    }
    callback(Adios);
}*/

function Adios(nombre){
    console.log(`Adios ${nombre}`);
}

saludo(nom, Adios);