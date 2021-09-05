const express = require("express");
const dotenv = require('dotenv');
const db = require('./db/db');
const midd = require('./middlewares/midd');
const cors = require('cors');
const { urlencoded } = require("express");
const app = express();
dotenv.config();


//Middlelware
app.use(express.json());
app.use(cors());
app.use(midd.log);
app.use(midd.limitador);
//app.use(db.getProducts);


//manejador de errores
app.use(midd.errorManager);


app.listen(process.env.PORT, function() {
    console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`);
});

//manejador de errores

app.use(midd.errorManager);

/*
app.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).send("Error en el servidor" + err.message);
        } else {
            next();
        }
    }
});*/


app.get('/inicio', (opc) => {
    //console.log(`Esta es la respuesta ---> ${db.getProductsML("Inicio")}`);
    let respProd = db.getProductsML("Inicio");


    console.log(`Esta es la respuesta ---> ${JSON.stringify(respProd)}`);
    return respProd;
});

//Endpoint para obtener el Carrito
app.get('/cart', cors(midd.corsOption), function(req, res) {
    res.send(db.Cart);
});


app.post('/cart', midd.Autenticar, function(req, res) {
    if (!req.body.id || !req.body.nombre || !req.body.cantidad || !req.body.precio) {
        db.respuesta = {
            codigo: 502,
            error: true,
            mensaje: 'Es indispensable enviar nombre y código del país'
        };
    } else {
        if (db.buscaProducto(req.body.id)) {
            db.respuesta = {
                codigo: 200,
                error: false,
                mensaje: 'Producto añadido'

            };
        } else {
            db.nuevoProducto(req.body.id, req.body.nombre, req.body.cantidad, req.body.precio)
            db.respuesta = {
                codigo: 200,
                error: false,
                mensaje: '¨Producto Agregado'
            };
        }
    }
    res.send(db.respuesta);
});



app.delete('/cart/:id', function(req, res) {
    if (db.borraProducto(req.params.id)) {
        db.respuesta = {
            codigo: 200,
            error: false,
            mensaje: 'Producto eliminado'
        };
    } else {
        db.respuesta = {
            codigo: 421,
            error: true,
            mensaje: 'Producto no existe'
        };
    }
    res.send(db.respuesta);
});