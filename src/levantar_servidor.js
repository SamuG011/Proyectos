// Importa modulo de http

const http = require('http');

let puerto = 358;

// Creacion de servidor

const server = http.createServer((req, res) => {

res.statusCode = puerto;

res.setHeader('Content-Type', 'text/plain');

res.end('Buenos dias a NODEJS, como estas tu?');

});

// El puerto de escucha es 3000 antes

server.listen(puerto, () => {

console.log('El servidor esta corriendo en http://localhost:'+puerto);

});