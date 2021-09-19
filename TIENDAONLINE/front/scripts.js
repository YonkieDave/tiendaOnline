const getProducts = async() => {

    let respURL = await fetch(`http://localhost:3001/inicio`);
    await respURL.json().then((s) => respURL = s);

   //console.log("Respuesta en el front " + respURL);

    CreateArticle(respURL);

};

const CreateArticle = async(articles) => {
    let j = 0;
    //console.log("productos en el front " + JSON.stringify(articles));
    //console.log(articles.results);
    for (let i = 0; i < articles.results.length; i++) {
        const divProducts = document.createElement("div");
        divProducts.setAttribute("id", "p" + i);
        divProducts.setAttribute("class", "Card");
        let producto = `
            <div id="tarjetaArticulo" class = "card">
                <img src = ${articles.results[i].thumbnail}/50px90/" alt = "Card image cap" > 
                    <div class = "card-title form-control" " > 
                        <h5 id = ${articles.results[i].id} class = "card-title"> ${articles.results[i].title}</h5>
                        <h3 id=${j}>$${articles.results[i].price}</h3 > 
                        <a name= "${articles.results[i].title}" value = "${articles.results[i].price}" class = "btn btn-primary" id = "boton_carrito" onclick ="addCart('${articles.results[i].id}');" ><i class="fas fa-cart-plus"></i> </a>
                    </div>
            </div>`;
        divProducts.innerHTML += producto;
        articleDiv.appendChild(divProducts);

        j += 1;
    }
};

const searchArticle = () => {
    let articleSearch = document.getElementById("busqueda").value;
    console.log(`Se obtuvo la búsqueda ${articleSearch}`);
    searchProducts(articleSearch);
};
const searchProducts = async(prod) => {
    let newSearch = {
        prod: prod
    };
    let respURL = await fetch('http://localhost:3001/searchProd', {
            method: "POST",
            body: JSON.stringify(newSearch),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(function(res) { return res.json(); })
        ;
    
        console.log("Articlulos que se van a pintar resultado de la búsqueda ", respURL);
    CreateArticle(respURL);

};

const addCart = async(id) => {
    console.log(`Se va a enviar al carrito el artículo ${id}`);
   /* let newPost = {
        id: id,
        nombre: nombre,
        cantidad: cantidad,
        precio: precio,
        clave: 'clave',
    };*/
   /* await fetch('http://localhost:3001/cart', {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(function(res) { return res.json(); })
        .then(function(idProd) {
            alert(JSON.stringify(idProd));
        });*/

        let newPost = {
            id: id
        };
        await fetch('http://localhost:3001/validateProd', {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(function(res) { return res.json(); })
        .then(function(idProd) {
            alert(JSON.stringify(idProd));
        });

};

getProducts();