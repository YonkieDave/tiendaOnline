var express = require('express');
var app = express();
require('dotenv').config();
const sequelize = require('./db/conexion');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const categoriesRoutes = require('./routes/categories');

app.use(express.json())
async function serverStart() {
  try {
    await sequelize.authenticate();
    console.log('Correct conexion');
    app.listen(process.env.PORT,  () => {
      console.log(`Sistem start http://${process.env.HOST}:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('DB conexion error:', error);
  }
}

serverStart();

//Routes
userRoutes(app);
cartRoutes(app);
categoriesRoutes(app);
