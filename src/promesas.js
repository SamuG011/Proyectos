const aleatorio = () =>{
    return Math.random() < 0.6;
};

let loteria = new Promise((resolve, reject) => {
    if (aleatorio()) resolve("Ganaste la loteria");
    else reject("Lo lamento perdistes :( ");
});

loteria
.then((mensaje) => console.log(mensaje))
.catch((mensaje) => console.log(mensaje));