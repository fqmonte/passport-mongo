var express = require('express');
var router = express.Router();
var model = require('./../models/empresa');

/* lista de empresas */
router.get('/', function (req, res, next) {
    model.find(null, function (err, empresa) {
        if (err) {
            throw err;
        }
        res.render('responsavel/list', { empresas: empresa });
    });
});

module.exports = router;