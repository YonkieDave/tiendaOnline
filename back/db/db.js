let Cart = {};
let Id = {
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
        this.Id = Id.cont;
    }

}


const getProductsML = (opc) => {

    let url;
    let type;
    switch (opc) {
        case "Inicio":
            url = process.env.ML_URL_START;
            type = 'articleDiv';
            break;
        case "Busqueda":
            url = `${process.env.ML_URL_SEARCH}${articleSearch}`;
            console.log(`Entramos en la búsqueda ${articleSearch}
            URL de la búsqueda ${url}`);
            type = 'articleDiv';

            break;
        case "Tendencia":
            url = ML_URL_TRENDS;
            console.log(`Entramos en las Tendencias`);
            type = 'articleDivTrend';
            break;
        default:
            break;
    }

    console.log(`URL para obtener productos   ${url}`);

    return url;
};



const nuevoProducto = (id, nombre, cantidad, precio) => {
    try {
        Cart[id] = new Producto(id, nombre, cantidad, precio);
        Id.cont++;
    } catch (error) {
        throw new Error({ "message": "MATRIX..... System handler" });
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

const borraProducto = function(id) {
    if (Cart.hasOwnProperty(id)) {
        console.log(Cart[id]);

        if (Cart[id].cantidad > 1) {
            Cart[id].cantidad = Cart[id].cantidad - 1;
            return true;
        } else {
            delete Cart[id]
            return true;
        }
    } else {
        return false;
    }
};

module.exports = { Cart, respuesta, nuevoProducto, buscaProducto, borraProducto, getProductsML };