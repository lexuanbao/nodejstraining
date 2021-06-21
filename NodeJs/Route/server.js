const express = require('express');
const app = express();
// const bodyParser = require('body-parser')

const userController = require('../Controller/UserListController');

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

// app.get("/people", async (request, response) => {});
// app.get("/person/:id", async (request, response) => {});

app.get('/users', function (req, res) {

    userController.findAll(res);
});

app.post('/users', function (req, res){
    userController.insertUser(req, res);
});

app.put('/users', function (req, res) {
    userController.updateById(req, res);
});

app.delete('/users/:id', function (req, res) {
    userController.deleteUser(req, res);
})

app.get('/users/:id', function (req, res) {
    userController.findById(req, res);
})

var server = app.listen(5000, function () {
    console.log('Node server in locall: 5000 is running..');
});
