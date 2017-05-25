var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./models');

var port = process.env.PORT || 3000;
var app = express();

db.sequelize.sync({ force: true }).then(function() {
    app.listen(port, function() {
        console.log('Listening on port ' + port);
    })
})

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(process.cwd() + "/public"));

app.use(methodOverride("_method"));

var router = require('./controllers/burgers_controller.js');

app.use('/', router);

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
