let ProdDisp = {};
let IdPRodDisp = {
    cont: 0
};
let Cart = {};
let IdCart = {
    cont: 0
};

let respuesta = {
    codigo: 200,
    error: false,
    mensaje: ''
};

class Producto {
    constructor(id, nombre, cantidad, precio) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.IdCart = IdCart.cont;
        this.IdPRodDisp = IdPRodDisp.cont;
    }

}
const addAvailables = (prodAvailables) => {

    for (let i = 0; i < prodAvailables.results.length; i++) {

        ProdDisp[prodAvailables.results[i].id] = new Producto(prodAvailables.results[i].id, prodAvailables.results[i].title, '', prodAvailables.results[i].price);
        IdPRodDisp.cont++;
       // console.log(`Productos disponibles ${JSON.stringify(ProdDisp)}`);

    }

    //console.log(`Productos disponibles ${ProdDisp}`);
    return ProdDisp;
};

const nuevoProducto = (id, nombre, cantidad, precio) => {
    try {
        Cart[id] = new Producto(id, nombre, cantidad, precio);
        IdCart.cont++;
    } catch (error) {
        throw new Error({ "message": "Ha ocurrido un error al agregar el producto" });
    }
};



const buscaProducto = function(id) {
    if (Cart.hasOwnProperty(id)) {
        Cart[id].cantidad++;
        return true;
    } else {
        return false;
    }
};

const buscaProductoDisponible = function(id) {
    if (ProdDisp.hasOwnProperty(id)) {
        ProdDisp[id].cantidad++;
        return true;
    } else {
        return false;
    }
};

const borraProducto = function(id) {
    if (Cart.hasOwnProperty(id)) {
        console.log(Cart[id]);

        if (Cart[id].cantidad > 1) {
            Cart[id].cantidad = Cart[id].cantidad - 1;
            return true;
        } else {
            delete Cart[id];
            return true;
        }
    } else {
        return false;
    }
};

module.exports = { Cart, ProdDisp, respuesta, nuevoProducto, buscaProducto, borraProducto, addAvailables, buscaProductoDisponible };



