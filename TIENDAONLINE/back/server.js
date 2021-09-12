const express = require("express");
const dotenv = require('dotenv');
const db = require('./db/db');
const midd = require('./middlewares/midd');
const apis = require('./apis/apis');
const cors = require('cors');
const { urlencoded } = require("express");
const app = express();
dotenv.config();



//Middlelware
app.use(express.json());
app.use(cors());
app.use(midd.log);
app.use(midd.limitador);


//manejador de errores
app.use(midd.errorManager);


app.listen(process.env.PORT, function() {
    console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`);
});

//manejador de errores

app.use(midd.errorManager);


app.get('/inicio', async(req, res) => {

    let respProd = await apis.getProductsML("Inicio");

    let disponibles = await db.addAvailables(respProd);
    //console.log(disponibles);
    res.send(respProd);

});


//Endpoint para obtener el Carrito
app.get('/cart', cors(midd.corsOption), function(req, res) {
    res.send(db.Cart);
});

app.get('/productsAvailables', cors(midd.corsOption), function(req, res) {
    res.send(db.ProdDisp);
});

app.post('/validateProd', async (req, res) => {
console.log(`Se buscaá artículo en artículos disponibles ${JSON.stringify(req.body)}`);
if (!req.body.id) {
    db.respuesta = {
        codigo: 502,
        error: true,
        mensaje: 'Es indispensable enviar Id del producto'
    };
    }else{
        if(db.ProdDisp.hasOwnProperty(req.body.id)){
            
            console.log(`objeto req.body.id -----> ${req.body.id}
            
            objeto db.ProdDisp --------> ${JSON.stringify(db.prodDisp.id['MLM606240593'])}` );
            
            
            
            //let idProdAdd = JSON.stringify(db.ProdDisp);
            //let validaDispo =  (idProdAdd).find(idProdAdd => req.body.id);
            //console.log("este es el encontrado", validaDispo);

           //console.log("producto disponible", idProdAdd);
            let prodCart = {
                id: db.ProdDisp.id,
                nombre: db.ProdDisp.nombre,
                cantidad: 1,
                precio: db.ProdDisp.precio
            };
            console.log(`Este es el nuevo artículo por agregar -----> ${JSON.stringify(prodCart)}`);
        }
       // console.log('Arreglo de objetos disponibles en el server', db.ProdDisp);
        //let validaDispo =  (db.ProdDisp.id).find(req.body.id);
        //let valida = (db.ProdDisp.hasOwnProperty(req.body.id));
        console.log('AXIOS en el server', process.env.ADD_CART);

        console.log('Se encontro el artíclo  para agregar al carrito ---->', JSON.stringify(validaDispo));
        return (await axios.post(process.env.ADD_CART, {
            id: db.ProdDisp.id,
            nombre: db.ProdDisp.nombre,
            cantidad: db.ProdDisp.cantidad,
            precio: db.ProdDisp.precio,
            clave: process.env.CLAVE_API
        }).then(response => {
           console.log(`producto agregado --->  ${response}`)
        }).catch(e => {
            console.log(e);
        })
        );
        
    }

});


app.post('/cart', midd.Autenticar, function(req, res) {
    console.log(`Recibiendo peticion para agregar el articulo ${req.body}`);
    if (!req.body.id || !req.body.nombre || !req.body.cantidad || !req.body.precio) {
        db.respuesta = {
            codigo: 502,
            error: true,
            mensaje: 'Es indispensable enviar Id, nombre, cantidad y precio del producto'
        };
    } else {
        if (db.buscaProducto(req.body.id)) {
            db.respuesta = {
                codigo: 200,
                error: false,
                mensaje: 'Se ha agregado otro producto igual al carrito'

            };
        } else {
            db.nuevoProducto(req.body.id, req.body.nombre, req.body.cantidad, req.body.precio);
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