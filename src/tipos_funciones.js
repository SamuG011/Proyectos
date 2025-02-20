function bienvenido(){
    console.log("Bienvenido al sistema");
}

let preguntar = function(nombre){
    console.log("¿Como estas "+nombre+"?");
}

let numero = function mayor_menor(num){
    if (num % 2 == 0){
        console.log("Numero Par");
    }else{
        console.log("Numero Impar");
    }
}

let edad = (num) => {
    if (num > 0 && num < 18){
        console.log("Eres menor de edad");
    } else if (num < 51){
        console.log("Eres mayor de edad");
    } else if (num < 101){
        console.log("Eres una leyenda");
    } else {
        console.log("Edad no existenete");
    }
}

edad(10);

