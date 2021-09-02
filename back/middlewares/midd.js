module.exports.log = function (req,res,next) {
    const {method,path,query,body} = req;
    console.log(`${method} - ${path} - ${JSON.stringify(query)} - ${JSON.stringify(body)}`);
    next()
}
module.exports.Autenticar = function (req,res,next) {
    const {nombre,codigo,clave} = req.body;
    console.log(clave)
    if(clave == "Una clave para protegernos a todos"){
        return next()
    }
    else{
        return res.status(400).json("No dijiste la palabra mágica")
    }
}


