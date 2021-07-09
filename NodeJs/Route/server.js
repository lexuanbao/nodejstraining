const express = require('express');
const session = require('express-session');
const app = express();
const userController = require('../Controller/UserController');
const validator = require('../common/validator')
const { validationResult } = require('express-validator');

app.set("view engine","vash")

//Không dùng nữa
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'sooper_secret',
    resave: false,
    saveUninitialized: false
  }));

app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
})

var sess; // global session, NOT recommended

app.get('/users', async function (req, res) {
    sess = req.session;
    if(!sess.userName) {
        return res.redirect('/login');
    }
    result = await userController.findAllUser();
    res.send(result);
});

app.post('/users', validator.validateAddUser(), async function (req, res){

    //Xử lí khi có lỗi validate (gửi statú 400 bad request)
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
            return;
        }
    //Lấy user từ request
    user = req.body

    result = await userController.addNewUser(user);
    res.json(result + ' record(s) inserted');
});

app.put('/users', validator.validateEditUser(), async function (req, res) {

    //Xử lí khi có lỗi validate (gửi status 400 bad request)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json(errors.array());
        return;
    }

    //Lấy user từ request
    const user = req.body;

    result = await userController.updateUser(user);
    res.json(result  + ' record(s) updated');
});

app.delete('/users/:id', async function (req, res) {
    //Lấy userid từ request
    id = parseInt(req.params.id);

    result = await userController.deleteUserById(id);
    res.json(result  + ' record(s) deleted');
})

app.get('/users/:id', async function (req, res) {
    //Lấy id từ request
    id = parseInt(req.params.id);

    result = await userController.findUserById(id);

    res.json(result);
})

app.post('/login', validator.validateLoginUser(), async function(req, res){

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json(errors.array());
        return;
    }

    const userName = req.body.userName; // Lấy username từ request
    const password = req.body.password; // Lấy password từ request

    //Gán session
    sess = req.session;
    sess.userName = userName;

    result = await userController.authenticateUser(userName, password);
    res.json(result);
})

var server = app.listen(5000, function () {
    console.log('Node server in locall: 5000 is running..');
});
