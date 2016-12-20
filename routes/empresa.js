var express = require('express');
var router = express.Router();
var model = require('./../models/empresa');


/* GET users listing. */
router.get('/', function (req, res, next) {
    model.find(null, function (err, empresa) {
        if (err) {
            throw err;
        }
        res.render('empresa/list', { empresas: empresa });
    });
});

router.get('/new', function (req, res, netx) {
    res.render('empresa/new')
});

router.post('/add', function (req, res, next) {
    var body = req.body;
    body.status = false;
    model.create(body, function (err, empresa) {
        if (err) {
            throw err;
        }
        res.redirect('/empresa');
    });
});

router.get('/info/:id', function (req, res, next) {
    var id = req.params.id;
    model.findById(id, function (err, empresa) {
        if (err) {
            throw err;
        }
        res.render('empresa/info', { empresa: empresa });
    });
});

router.get('/remove/:id', function (req, res, next) {
    var id = req.params.id;
    model.findByIdAndRemove(id, function (err, empresa) {
        if (err) {
            throw err;
        }
        res.redirect('/empresa');
    });
});


module.exports = router;