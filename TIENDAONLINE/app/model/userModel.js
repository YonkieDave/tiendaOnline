const sequelize = require('../../db/conection');

module.exports.newUser = async (usr) => {
    try {
        let result = await sequelize.query(`SELECT * FROM usuarios WHERE correo = '${usr.email}'`);
        console.log("REsultado consulta de validación", (result[0]));
        console.log("REsultado consulta de validación TYAMAÑAO", (result[0].length));
        if (result[0].length > 0 ) {
            return false;
        } else {
            await sequelize.query(`INSERT INTO usuarios (nombre,apellido_paterno,apellido_materno,correo,direccion,telefono,contraseña,rol,fecha_registro,fecha_actualizacion) VALUES ('${usr.name}','${usr.lastname1}','${usr.lastname2}','${usr.email}','${usr.address}','${usr.phone}','${usr.password}','${usr.rol}',GETDATE(),GETDATE())`);
            return true;
        }
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.userExist = async (usr) => {
    let user = [usr.user, usr.password]
    console.log(user);
    try {
        let result = await sequelize.query(`SELECT * FROM usuarios WHERE correo = '${user[0]}'`);
        if (result) {
            let verify = await sequelize.query(`SELECT * FROM usuarios WHERE contraseña = '${user[1]}'`);
            if (verify) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.users = async () => {
    try {
        let result = await sequelize.query('SELECT * FROM usuarios')
        return result
    } catch (err) {
        throw new Error(err)
    }
}
module.exports.usersTable = async () => {
    try {
        let result = await sequelize.query('SELECT id_cliente, correo, contraseña, rol FROM usuarios')
        return result
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.usersUpdate = async () => {
    try {
        let result = await sequelize.query('UPDATE id_cliente, correo, contraseña, rol FROM usuarios WHERE')
        return result
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.usersDelete = async (usr) => {
    try {
        let result = await sequelize.query(`DELETE FROM usuarios WHERE correo = '${usr.correo}' `)
        return result
    } catch (err) {
        throw new Error(err)
    }
}