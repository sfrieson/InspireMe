var express     =   require('express'),
    router      =   express.Router(),
    Inspiration =   require('../models/inspiration.js');


router.get('/', function (req, res) {
    Inspiration.find({}, function(err, dbIns){
        res.json({favorites: dbIns});
    });
});

router.post('/', function(req, res){
    Inspiration.create(req.body.favorite, function(err, dbIns) {
        res.json(dbIns);
    });
});

module.exports = router;
