const sequelize = require('../../db/conection');
const db = require('../../services/cart');
const apis = require('../controller/apisController');

module.exports = (app) => {

    app.get('/inicio', async(req, res) => {

        let respProd = await apis.getProductsML("Inicio");
        let disponibles = await db.addAvailables(respProd);
        res.render('index',respProd);
        //res.send(respProd);

    });
    app.get('/trend', async(req, res) => {
        
        let respProdTrend = await apis.getProductsML("Tendencia");
       // res.send(respProdTrend);
        res.render('trends',respProdTrend);

    });

    app.post('/searchProd', async(req, res) => {
        
        let search = await apis.getProductsML("Busqueda",req.body.prod);
        let disponibles = await db.addAvailables(search);
        res.send(search);

    });

}