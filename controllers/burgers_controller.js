var express = require('express');
var db = require("../models");

var router = express.Router();

router.get('/', function(req, res) {
    db.Burger.findAll().then(function(results) {
        res.render('index', {burgers: results})
    })
})

router.post('/', function(req, res) {
    var newBurger = req.body;
    db.Burger.create({
        burger_name: newBurger.name,
        devoured: parseInt(newBurger.status)
    }).then(function() {
        res.redirect('/');
    })
    });

router.put('/:id/eat', function(req, res) {
    var id = req.params.id;
    db.Burger.update({
        devoured: 1
    }, {
        where: {
            id: id
        }
    }).then(function() {
        res.redirect('/');
    });
})

router.put('/:id/restore', function(req, res) {
    var id = req.params.id;
    db.Burger.update({
        devoured: 0
    }, {
        where: {
            id: id
        }
    }).then(function() {
        res.redirect('/');
    });
})

module.exports = router;
