const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
dotenv.config();


const corsOption = {
    origin: function(origin, callback) {
        callback(null, true);
        if (process.env.WHITE_LIST.indexOf(origin) !== -1){
            callback(null, true)
        }else {
            callback(new Error('No autorizado por Cors'))
        }

    }
};




log = function(req, res, next) {
    const { method, path, query, body } = req;
    //console.log(`${method} - ${path} - ${JSON.stringify(query)} - ${JSON.stringify(body)}`);
    next();
};

Autenticar = function(req, res, next) {
    console.log(`Esto esta pasando por autenticación del midd ----> ${JSON.stringify(req.body)}`)
    const { id, nombre, cantidad, precio, clave } = req.body;
    if (clave == process.env.CLAVE_API) {
        return next();
    } else {
        return res.status(400).json("Tu clave es erronea, por favor verificala");
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