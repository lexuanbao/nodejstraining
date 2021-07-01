const express = require('express');
const app = express();
const userController = require('../Controller/UserListController');
const validator = require('../common/validator')

app.set("view engine","vash")

//Không dùng nữa
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
})

app.get('/users', function (req, res) {
    userController.findAllUser(req, res);
});

app.post('/users', function (req, res){
    userController.addNewUser(req, res);
});

app.put('/users', validator.validate(),function (req, res) {
    userController.updateUser(req, res);
});

app.delete('/users/:id', function (req, res) {
    userController.deleteUserById(req, res);
})

app.get('/users/:id', function (req, res) {
    userController.findUserById(req, res);
})

var server = app.listen(5000, function () {
    console.log('Node server in locall: 5000 is running..');
});
