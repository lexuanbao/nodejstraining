const express = require('express');
// const bodyParser = require('body-parser')
const app = express();

const userController = require('../Controller/UserListController');

app.set("view engine","vash")

//Không dùng nữa
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
})

app.get('/users', function (req, res) {

    userController.findAll(res);
});

app.put('/users', function (req, res) {

    // let id = req.params.userId; chưa cần
    userController.updateById(req, res);
});

var server = app.listen(5000, function () {
    console.log('Node server in locall: 5000 is running..');
});
