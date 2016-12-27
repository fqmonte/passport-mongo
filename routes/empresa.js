var express = require('express');
var router = express.Router();
var model = require('./../models/empresa');
var bCrypt = require('bcrypt-nodejs');


/* lista de empresas */
router.get('/', function (req, res, next) {
    model.find(null, function (err, empresa) {
        if (err) {
            throw err;
        }
        res.render('empresa/list', { empresas: empresa });
    });
});

/* nova empresa */
router.get('/new', function (req, res, netx) {
    res.render('empresa/new')
});

/* save empresa no mongodb */
router.post('/add', function (req, res, next) {
    var senhaCodificada = createHash(req.body.senha);
    var body = JSON.stringify(req.body).replace(req.body.senha, senhaCodificada);
    body.status = false;
    objBody = JSON.parse(body);
    console.log(objBody);
    // console.log(senhaEncodeEmpresa);

    model.create(objBody, function (err, empresa) {
        if (err) {
            throw err;
        }
        res.redirect('/empresa');
    });

});

/* informacoes de uma empresa por id */
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

/* informacoes de uma empresa por id */
router.get('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    model.findById(id, function (err, empresa) {
        if (err) {
            throw err;
        }
        res.render('empresa/edit', { empresa: empresa });
    });
});

router.post('/update/:id', function (req, res, next) {
    var id = req.params.id;
    var body = req.body;
    model.findByIdAndUpdate(id, body, function (err, empresa) {
        if (err) {
            throw err;
        }
        res.redirect('/empresa');
    });
});

// Generates hash using bCrypt
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = router;