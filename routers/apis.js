var express = require('express');
var router = express.Router();
var request = require('request');
var Inspiration = require('../models/inspiration');


router.get('/favorites', function (req, res) {
    Inspiration.find({}, function(err, dbIns){
        res.json({favorites: dbIns});
    });
});

router.post('/favorites', function(req, res){
    Inspiration.create(req.body.favorite, function(err, dbIns) {
        res.json(dbIns);
    });
});


// Third Party APIs---------------------------------------

router.get('/dribbble', function(req,res){
    var baseUrl, access;
    baseUrl = "https://api.dribbble.com/v1/";
    access = "&access_token=" + process.env.DRIBBBLEKEY;
    request(baseUrl + "shots?sort=recent&page=" + req.query.page + access, function(err, reponse, body){
        res.send(body);
    });
});

router.get('/behance', function(req,res){
    var baseUrl = "http://behance.net/v2/";
    access = "&api_key=" +  process.env.BEHANCEKEY;
    request(baseUrl + "projects?time=today&sort=published_date&page=" + req.query.page + access,
     function(err, reponse, body){
        res.send(body);
    });
});

router.get('/500px', function(req,res){
    var baseUrl = "https://api.500px.com/v1/photos";
    access = "&consumer_key=" +  process.env.PXKEY;
    request(baseUrl + "?feature=popular&image_size=3&page=" + req.query.page + access, function(err, reponse, body){
        res.send(body);
    });
});

module.exports = router;
