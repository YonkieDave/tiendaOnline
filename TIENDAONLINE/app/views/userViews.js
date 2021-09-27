const midd = require('../../middlewares/user');
const userService = require('../../services/user');
const Swal = require('sweetalert2');
const usersDB = require('../../app/model/userModel');

module.exports = (app) => {
    app.get('/login', async (req, res) => {
        res.render('login');
    });
    app.post('/login', async (req, res) => {
        res.render('login');
        let user = req.body
        try {
            let result = await userService.userValidate(user)
            if (result) {
                console.log("Se va a generar el token de inicio de sesion ", result);
                let token = await userService.tokenGeneration(user.user);
                console.log("token de inicio de sesion ", token);
                res.json(token)
            }
        } catch (err) {
            res.status(400).send('Unregistered user')
        }
    });
    app.get('/register', async (req, res) => {
        res.render('register');
    })

    app.get('/users', midd.userValidation, async (req, res) => {
        try {
            let result = await userService.userList()
            res.json(result)
        } catch (err) {
            res.status(400).send('An unexpected error occurred')
        }
    })

    app.post('/register', async (req, res) => {
        console.log(`INTENTO DE REGISTRO USUARIO   ${JSON.stringify(req.body)}`)
        try {
            let user = req.body
            let result = await userService.userCreator(user)
            res.json(result);
        } catch (err) {
            res.status(400).send('An unexpected error occurred')
        }
    })
    
app.get('/userAdmin', async (req, res) => {
    try {
        let result = await usersDB.usersTable();
        console.log("RESULTADO CONSULTA ", result);
        res.render('adminUsers',{result});
    } catch (err) {
        res.status(400).send('An unexpected error occurred')
    }
    
})

app.post('/editUser', async (req, res) => {
    console.log(`INTENTO DE actualización USUARIO   ${JSON.stringify(req.body)}`)
    try {
        let user = req.body
        let result = await userService.userCreator(user)
        res.json(result);
    } catch (err) {
        res.status(400).send('An unexpected error occurred')
    }
})


app.post('/deleteUser', async (req, res) => {
    console.log(`INTENTO DE borrar USUARIO   ${JSON.stringify(req.body)}`)
    try {
        let user = req.body
        let result = await usersDB.usersDelete(user)
        res.json(result);
    } catch (err) {
        res.status(400).send('An unexpected error occurred')
    }
})


}

