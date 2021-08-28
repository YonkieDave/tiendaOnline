const express = require('express'); //traer la libreriA
const server = express();
server.get('/', (req, res) => {
    //let names=["Leo","David","Juan","Pedro","Alejando","Ale","kevin","Anai","Isac","Daniel"];
    var names = Array("Leo", "David", "Juan", "Pedro", "Alejando", "Ale", "kevin", "Anai", "Isac", "Daniel");
    var item = names[Math.floor(Math.random() * names.length)];

    //let numRandom=Math.random() * (9 - 0) + 0;
    let mynombre = item
    res.send("<h1>Hola soy </h1>" + mynombre)
    console.log("Alqguien visito la pagina");
});

server.listen(2500, () => {
    console.log("El servidor con el puerto 2500");
})