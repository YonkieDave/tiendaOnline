class SearchArticle {
    constructor() {

    }
}

class ShopingCart {
    constructor() {
        this.articles = [];
        this.total = 0;
        this.pagado = false;
    }
    addArticle(article, price) {
        this.articles.push(article, price);
        console.log(`articulos en el carrito ${this.articles}`);
    }
}

class articulo {
    constructor(data) {
        this.data = data;
    }
    static async getArticle() {
        console.log("obteniento url");
        let url = `https://api.mercadolibre.com/sites/MLM/search?q=all`;
        console.log(url);
        const resp = await fetch(url);
        const data = await resp.json();
        let datosArticulo = new articulo(data);
        console.log('Esta es la data del artículo --->', datosArticulo);

        await datosArticulo.CreateArticle();
    }

    async CreateArticle() {


        let datos = JSON.stringify(this.data.results);
        console.log(JSON.parse(datos));
        console.log('Aqui empieza el for');


        for (let i = 0; i < this.data.results.length; i++) {

            let ctn = document.createElement('div');
            ctn.id = "articulo-np";
            let nombre = document.createElement('H2');
            nombre.textContent = `${this.data.results[i].title} #${this.data.results[i].id}`;
            nombre.id = `name`;
            let img = document.createElement('img');
            img.setAttribute('src', this.data.results[i].thumbnail);
            let precio = document.createElement('H3');
            precio.textContent = `$${this.data.results[i].price}`;
            precio.id = `price`;
            let boton = document.createElement("button", "Agregar-al-carrito");
            boton.innerHTML = "Agregar al carrito";
            boton.id = "Agregar-al-carrito";
            boton.addEventListener("click", function addCart() {
                console.log('Se va a agregar un articulo al carrito');
                const nombreCarrito = document.getElementById('name');
                const precioCarrito = document.getElementById('price');
                console.log(nombreCarrito);
                console.log(precioCarrito);
                const carrito = new ShopingCart();
                carrito.addArticle(nombreCarrito, precioCarrito);
            });
            ctn.appendChild(nombre);
            ctn.appendChild(img);
            ctn.appendChild(precio);
            ctn.appendChild(boton);
            articleDiv.appendChild(ctn);

        }

    }
}



articulo.getArticle();


nameArticle = document.getElementById("busqueda").value;
console.log(nameArticle);

async function searchArticle() {
    nameArticle = document.getElementById("busqueda").value;
    console.log(nameArticle);
    const url = `https://api.mercadolibre.com/sites/MLM/search?q=${nameArticle}`;
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
}