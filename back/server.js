const express = require("express");
const dotenv = require('dotenv');
const db = require('./db/db');
const midd = require('./middlewares/midd');
const cors = require('cors')

const app = express();

dotenv.config();

//Middlelware
app.use(express.json());
app.use(cors());
app.use(midd.log);

app.listen(process.env.PORT, function () {
    console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`)
});

app.get('/', function (req, res) {
    db.respuesta.mensaje = "Inicio";
    res.send(db.respuesta);
})

//Endpoint para obtener paises de la DB
app.get('/paises', function (req, res) {
    res.send(db.Paises)
})

app.post('/paises',midd.Autenticar, function (req, res) {
    if (!req.body.nombre || !req.body.codigo) {
        db.respuesta = {
            codigo: 502,
            error: true,
            mensaje: 'Es indispensable enviar nombre y código del país'
        }
    } else {
        if (db.buscaPais(req.body.nombre)) {
            db.respuesta = {
                codigo: 503,
                error: true,
                mensaje: 'País ya registrado'
            }
        } else {
            db.nuevoPais(req.body.nombre, req.body.codigo)

            db.respuesta = {
                codigo: 200,
                error: false,
                mensaje: '¨País creado'
            }
        }
    }
    res.send(db.respuesta)
})

app.delete('/paises/:pais', function (req, res) {

    if (!db.buscaPais(req.params.pais)) {
        db.respuesta = {
            codigo: 500,
            error: true,
            mensaje: req.params.pais
        }
    } else {
        db.borraPais(req.params.pais)
        db.respuesta = {
            codigo: 200,
            error: false,
            mensaje: '¨País eliminado'
        }
    }
    res.send(db.respuesta);
})
