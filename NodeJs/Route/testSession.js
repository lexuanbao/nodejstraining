var express = require('express');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);


app.set("view engine","vash")
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({ secret: 'keyboard cat',
    resave: false,
    store: new FileStore,
    saveUninitialized: false ,
    cookie: { maxAge: 3600000,secure: false, httpOnly: true }
  })
);

app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
})

app.get('/', function (req, res) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.end();
  } else {
    req.session.views = 1;
    res.end('Welcome to the file session demo. Refresh page!');
  }
});

app.get('/user', function (req, res) {
    if (req.session.views) {
      req.session.views++;
      res.setHeader('Content-Type', 'text/html');
      res.write('<p>views: ' + req.session.views + '</p>');
      res.end();
    } else {
      req.session.views = 1;
      res.end('Welcome to the file session demo. Refresh page!');
    }
  });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});