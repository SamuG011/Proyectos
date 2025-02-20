console.log("Buenos dias");

let estudiantes=[
    {
    nombre: "Gladys",
    primer_Ap: "Flores",
    segundo_Ap: "Duran",
    edad: "31",
    genero: "F"
    },
    {
    nombre: "Fernando",
    primer_Ap: "Herrera",
    segundo_Ap: "Lopez",
    edad: "22",
    genero: "M"
    }    
];


console.log("INFORMACION DEL ESTUDIANTE");
console.log("--------------------------");
estudiantes.forEach(estudiante => {
    console.log("Nombre: " + estudiante.nombre);
    console.log(`Primer Apellido: ${estudiante.primer_Ap}`);
    console.log(`Segundo Apellido: ${estudiante.segundo_Ap}`);
    console.log(`Edad: ${estudiante.edad}`);
    console.log(`Genero (M/F): ${estudiante.genero}`);
    console.log("--------------------------");
});
