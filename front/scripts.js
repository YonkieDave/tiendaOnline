//const express = requiere('express');
//require('dotenv').config();
//const server = express();
/*
let customerCart = {};

class ShopingCart {
    constructor() {
        this.articles = {};
        this.total = 0;
        this.pagado = false;
    }
    addCart(articulo) {
        // let articulo = [name, price, id];
        console.log("articulo que queremos agregar ---->" + articulo);
        console.log(`valor del boton pulsado --- > nombre ${articulo[0]} precio ${articulo[1]}  id  ${articulo[2]}`);
        console.log('Se va a agregar un articulo al carrito');

        const carrito = new ShopingCart('Carrito');
        carrito.addArticle(articulo);
    }
    addArticle(article) {
        console.log(`Esto se va a pushear a la variable   ${article}`);

        this.articles = {
            nombre: `${article[0]}`,
            precio: `${article[1]}`,
            id: `${article[2]}`
        };

        customerCart = {
            nombre: `${article[0]}`,
            precio: `${article[1]}`,
            id: `${article[2]}`
        };
        console.log(`articulos en el carrito ${JSON.stringify(this.articles)} `);

        let divCart = document.createElement("div");
        let viewCartFront = `
        <li class="list-group-item d-flex justify-content-between lh-sm">
            <h6 class="my-0" id="nameProduct">${article[0]}</h6>
            <span class="text-muted" id="priceCart">${article[1]}</span>
        </li>`;

        divCart.innerHTML += viewCartFront;
        listCart.appendChild(divCart);
        //console.log(`articulos en el carrito ${JSON.stringify(this.article)} `);

        let objCarrito = new ShopingCart('Total');
        objCarrito.getTotalCart(this.articles);

    }
    getTotalCart(price) {
        console.log(`Este es el total del carrito  ----> ${price[0][1]}`);
        // console.log(`productos en el carrito ${customerCart}`);
        if (this.total == 0) {
            this.total = price[0][1];
        } else {
            this.total += price[0][1];
        }

        totalCart.innerHTML = this.total;


    }
}

class Articulo {
    constructor(data) {
        this.data = data;

    }
    static async getArticle(opc, articleSearch) {
        let url;
        let type;
        switch (opc) {
            case "Inicio":
                url = 'https://api.mercadolibre.com/sites/MLM/search?category=MLM1051';
                type = articleDiv;
                break;
            case "Busqueda":
                url = `https://api.mercadolibre.com/sites/MLM/search?q=${articleSearch}`;
                console.log(`Entramos en la búsqueda ${articleSearch}
                URL de la búsqueda ${url}`);
                type = articleDiv;

                break;
            case "Tendencia":
                url = 'https://api.mercadolibre.com/trends/MLM/MLM1055';
                console.log(`Entramos en las Tendencias`);
                type = articleDivTrend;
                break;
            default:
                break;
        }

        let resp = await fetch(url);
        let data = await resp.json();


        //console.log(`Datos del API ---> ${JSON.stringify(data)}`);
        let datosArticulo = new Articulo(data);

        //console.log(`Datos obtenidos ${JSON.stringify(data)}`);
        await datosArticulo.CreateArticle(type);
    }

    async CreateArticle(type) {
        let j = 0;

        console.log(`Tamaño de la respuesta ${this.data.length}`)
        console.log(`datos de tendencia ${this.data}`)
        if (type == articleDivTrend) {
            for (let i = 0; i < this.data.length; i++) {
                let artTrend = JSON.stringify(this.data[i].keyword);
                console.log(`artTrend sin comillas ---> ${artTrend.replace(/\"/g, "")}`);
                Articulo.getArticle('Busqueda', artTrend.replace(/\"/g, ""));

            }

        } else {
            for (let i = 0; i < this.data.results.length; i++) {
                const divProducts = document.createElement("div");
                divProducts.setAttribute("id", "p" + i);
                divProducts.setAttribute("class", "Card");
                let producto = `
            <div class = "card" style = "width: 18rem; margin-top: 20px">
                <img src = ${this.data.results[i].thumbnail}/50px90/" alt = "Card image cap" > 
                    <div class = "card-title form-control" " > 
                        <h5 id = ${this.data.results[i].id} class = "card-title"> ${this.data.results[i].title}</h5>
                        <h3 id=${j}>$${this.data.results[i].price}</h3 > 
                        <a is= "5" name= "${this.data.results[i].title}" value = "${this.data.results[i].price}" class = "btn btn-primary" id = "Boton ${j}" onclick ="cart.addCart(['${this.data.results[i].title}','${this.data.results[i].price}','${this.data.results[i].id}']);" > Agregar al carrito </a>
                    </div>
            </div>`;
                divProducts.innerHTML += producto;
                type.appendChild(divProducts);

                j += 1;
            }
        }
    }
}*/

/*

const execute = (opc, a) => {
    console.log(`Se va a ejecutar el caso ${opc}`);
    switch (opc) {
        case "Inicio":
            Articulo.getArticle("Inicio");
            break;
        case "Tendencia":
            Articulo.getArticle("Tendencia");
            break;
        case "Busqueda":
            console.log(`CASO----> ${opc}`);
            Articulo.getArticle("Busqueda", a);
            break;
        default:
            console.log(`Se va a ejecutar el caso por default`);
            Articulo.getArticle("Inicio");
            break;
    }
};

execute();*/


//const cart = new ShopingCart('Carrito');
/*
let articulo = ["camisa", 203, 10001];
prueba.addArticle(articulo);
prueba.addArticle(articulo);
prueba.addArticle(articulo);
prueba.addArticle(articulo);
prueba.addArticle(articulo);*/


const CreateArticle = async(type) => {
    let j = 0;

    console.log(`Tamaño de la respuesta ${this.data.length}`);
    console.log(`datos de tendencia ${this.data}`);
    if (type == articleDivTrend) {
        for (let i = 0; i < this.data.length; i++) {
            let artTrend = JSON.stringify(this.data[i].keyword);
            console.log(`artTrend sin comillas ---> ${artTrend.replace(/\"/g, "")}`);
            Articulo.getArticle('Busqueda', artTrend.replace(/\"/g, ""));

        }

    } else {
        for (let i = 0; i < this.data.results.length; i++) {
            const divProducts = document.createElement("div");
            divProducts.setAttribute("id", "p" + i);
            divProducts.setAttribute("class", "Card");
            let producto = `
        <div class = "card" style = "width: 18rem; margin-top: 20px">
            <img src = ${this.data.results[i].thumbnail}/50px90/" alt = "Card image cap" > 
                <div class = "card-title form-control" " > 
                    <h5 id = ${this.data.results[i].id} class = "card-title"> ${this.data.results[i].title}</h5>
                    <h3 id=${j}>$${this.data.results[i].price}</h3 > 
                    <a is= "5" name= "${this.data.results[i].title}" value = "${this.data.results[i].price}" class = "btn btn-primary" id = "Boton ${j}" onclick ="cart.addCart(['${this.data.results[i].title}','${this.data.results[i].price}','${this.data.results[i].id}']);" > Agregar al carrito </a>
                </div>
        </div>`;
            divProducts.innerHTML += producto;
            type.appendChild(divProducts);

            j += 1;
        }
    }
};






const searchArticle = () => {
    let articleSearch = document.getElementById("busqueda").value;
    console.log(`Se obtuvo la búsqueda ${articleSearch}`);
    execute("Busqueda", articleSearch);
};

const getProducts2 = () => {

    return new Promise((res, rej) => {
        let result = fetch(`http://localhost:3001/inicio`);
        res(result);
        console.log(JSON.stringify(result));
        console.log(`Respuesta en el front ${JSON.stringify(result)}`);
    });
};
getProducts2()
    .then(result => console.log(`Tu saldo despues del retiro es de ${result}`))
    .catch(console.warn);






async function getProducts() {
    let result = await fetch(`http://localhost:3001/inicio`);
    // .then(resp => resp.json())
    //.then(data => result = data)
    //.catch(e => console.log(e));

    console.log(JSON.stringify(result));

    console.log(`Respuesta en el front ${JSON.stringify(result)}`);

    // let resp = await fetch(result);

    //    let data = await resp.json();

    //console.log(data);

    //const products = await result.json();
    //console.log(products);
}

/*
    //console.log(`Datos del API ---> ${JSON.stringify(data)}`);
    //let datosArticulo = new Producto(data);

    //console.log(`Datos obtenidos ${JSON.stringify(data)}`);
    await datosArticulo.CreateArticle(type);*/



const respApi = async(url) => {
    let resp = await fetch(url).then(res => res.text()).then(text => console.log(text));
    let data = await resp.json();
};
//getProducts2();


//console.log(`productos en el carrito ${customerCart}`);