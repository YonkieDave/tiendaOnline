const getProducts = async() => {

    let respURL = await fetch(`http://localhost:3001/inicio`);
    //await respURL.json().then((s) => respURL = s);

   //console.log("Respuesta en el front " + respURL);

    //CreateArticle(respURL);

};
const createUser = async () =>{
    let newUser={};
    $('input').each(function() {
        newUser[this.name] = this.value;
    });
    console.log(newUser);
    try {
        await fetch('http://localhost:3001/register', {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(function(res) { 
            return (Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario registrado con exito',
                showConfirmButton: false,
                timer: 2500
              }),res.json()); 
        });
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No es posible agregar al usuario!',
            
          })
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

const addCart = async(article) => {
    //console.log(`Se va a enviar al carrito el artículo ${JSON.stringify(id), JSON.stringify(precio), JSON.stringify(nombre)}`);
    console.log(`Se va a enviar al carrito el artículo ${article}`);
    
    let newPost = {
        id: article[0],
        nombre: article[2],
        cantidad: article[3],
        precio: article[1],
        clave: 'clave',
    };
   try{
    await fetch('http://localhost:3001/cart', {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(function(res) { return res.json(); })
        .then(function(idProd) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado !!',
                showConfirmButton: false,
                timer: 3500
              });
        });
    }catch(err){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No es posibe agregar este producto !',
          })
    }



};

