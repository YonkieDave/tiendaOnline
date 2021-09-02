// For para añadir los productos
let products = document.getElementById("products");
for (let i = 0; i < 50; i++) {
    var contenedor = document.createElement("div");
    contenedor.setAttribute("id", "p" + i);
    var algunTexto = "Algún texto";
    let producto = `
    <div class="card" style="width: 18rem; margin-top: 20px;">
        <img src="https://image.freepik.com/psd-gratis/instagram-maqueta-telefono-movil-blanco-iconos-3d_106244-1723.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <p class="card-text">$500.00</p>
            <a href="#" class="btn btn-primary"> <i class="fas fa-cart-plus"></i></a>
        </div>
    </div>`;
    contenedor.innerHTML += producto
    products.appendChild(contenedor)
}