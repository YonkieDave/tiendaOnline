const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const getProductsML = async(opc) => {

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
            url = process.env.ML_URL_TRENDS;
            console.log(`Entramos en las Tendencias`);
            type = 'articleDivTrend';
            break;
        default:
            break;
    }


    console.log('Inicio AXIOS', url);
    return (await axios.get(url)
        .then(response => response = response.data)
        .catch(function(error) {
            // handle error
            console.error(error);
        })
    );
};

module.exports = { getProductsML };