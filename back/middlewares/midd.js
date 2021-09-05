const rateLimit = require('express-rate-limit');


const corsOption = {
    origin: function(origin, callback) {
        callback(null, true);
        /*
        if (process.env.listaBlanca.indexOf(origin) !== -1){
            callback(null, true)
        }else {
            callback(new Error('No autorizado por Cors'))
        }
        */

    }
};




log = function(req, res, next) {
    const { method, path, query, body } = req;
    //console.log(`${method} - ${path} - ${JSON.stringify(query)} - ${JSON.stringify(body)}`);
    next();
};

Autenticar = function(req, res, next) {
    const { nombre, codigo, clave } = req.body;
    if (clave == "Una clave para protegernos a todos") {
        return next();
    } else {
        return res.status(400).json("No dijiste la palabra mágica")
    }
};

const limitador = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de peticiones
    message: 'Limite de solicitudes exedido'
});

const errorManager = ((err, req, res, next) => {
    if (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).send("Error en el servidor" + err.message);
        } else {
            next();
        }
    }
});


module.exports = { limitador, Autenticar, log, corsOption, errorManager };