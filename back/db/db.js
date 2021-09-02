let Paises = {};
let Id = {
    cont: 0
}

let respuesta = {
    codigo: 200,
    error: false,
    mensaje:''
}

class Pais {
    constructor(nombre,codigo_pais){
        this.nombre = nombre
        this.codigo_pais = codigo_pais
        this.Id = Id.cont
    }
}

const nuevoPais = function(nombre, codigo_pais){
    Paises[nombre] = new Pais(nombre,codigo_pais);
    Id.cont++
}

const buscaPais = function (nombre) {
    if(Paises.hasOwnProperty(nombre)){
        return true;
    }else{
        return false;
    } 
}

const borraPais = function (nombre) {
    delete Paises[nombre]
}

module.exports = {Paises,respuesta,nuevoPais,buscaPais,borraPais}