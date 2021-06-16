var express = require('express');
var app = express();

const userController = require('../Controller/UserListController');

app.set("view engine","vash")

app.get('/users', function (req, res) {
    //Cấp quyền Access to XMLHttpRequest cho angular
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    userController(res);
});



var server = app.listen(5000, function () {
    console.log('Node server in locall: 5000 is running..');
});
