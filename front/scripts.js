const getProducts = async() => {

    let respURL = await fetch(`http://localhost:3001/inicio`);
    await respURL.json().then((s) => respURL = s);

    CreateArticle(respURL);

};

const CreateArticle = async(articles) => {
    let j = 0;
    console.log(articles.results);
    for (let i = 0; i < articles.results.length; i++) {
        const divProducts = document.createElement("div");
        divProducts.setAttribute("id", "p" + i);
        divProducts.setAttribute("class", "Card");
        let producto = `
            <div class = "card" style = "width: 18rem; margin-top: 20px">
                <img src = ${articles.results[i].thumbnail}/50px90/" alt = "Card image cap" > 
                    <div class = "card-title form-control" " > 
                        <h5 id = ${articles.results[i].id} class = "card-title"> ${articles.results[i].title}</h5>
                        <h3 id=${j}>$${articles.results[i].price}</h3 > 
                        <a is= "5" name= "${articles.results[i].title}" value = "${articles.results[i].price}" class = "btn btn-primary" id = "Boton ${j}" onclick ="addCart('${articles.results[i].id}','${articles.results[i].title}','1','${articles.results[i].price}');" > Agregar al carrito </a>
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
    execute("Busqueda", articleSearch);
};

const addCart = async(id, nombre, cantidad, precio) => {
    console.log(`Se va a enviar al carrito el artículo ${nombre}`);
    let newPost = {
        id: id,
        nombre: nombre,
        cantidad: cantidad,
        precio: precio,
        clave: 'clave',
    };
    await fetch('http://localhost:3001/cart', {
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