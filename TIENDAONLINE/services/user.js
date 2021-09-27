const userDB = require('../app/model/userModel');
const jwt = require('jsonwebtoken');
const Swal = require('sweetalert2');

module.exports.tokenGeneration = async (data) => {
    console.log("generación del token ", data);
    const result = jwt.sign({ data }, process.env.SECRET_KEY);
    console.log("Token generado", result);
    return result
}

module.exports.userVerify = async (token) => {
    const result = jwt.verify(token, process.env.SECRET_KEY)
    if (result) {
        return result
    } else {
        throw new Error('Invalid Token')
    }
}

module.exports.userList = async () => {
    try {
        let result = await userDB.users()
        return result
    } catch (err) {
        throw new Error('DB Error')
    }
}

module.exports.userCreator = async (user) => {
    let newUser = {
        name: user.name,
        lastname1: user.lastname1,
        lastname2: user.lastname2,
        email: user.email,
        address: user.address,
        phone: user.phone,
        password: user.password,
        rol: user.rol,
    }
    try {
        console.log(newUser)
        let result = await userDB.newUser(newUser)

        if (result) {
            
            return 'succes';
        } else {

            throw new Error('User already exists')
        }

    } catch (err) {
        throw new Error('User creation error')
    }
}

module.exports.userValidate = async (usr) => {
    try {
        let result = await userDB.userExist(usr)
        if (result) {
            return result
        } else {
            throw new Error('User does not exist')
        }
    } catch (err) {
        throw new Error(err)
    }
}