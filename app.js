// ========= Modules =========
var express     =   require('express'),
    bodyParser  =   require('body-parser'),
    morgan      =   require('morgan'),
    mongoose    =   require('mongoose'),
    request     =   require('request'),
    app         =   express();


// ========= Connections =========
require('dotenv').config();

var mongoPath = process.env.MONGOLAB_URI || "mongodb://localhost/InspireMe-01";
mongoose.connect(mongoPath);


// ========= Middleware =========
app.use(morgan('dev'));
app.use(express.static('./public/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



// ========= Routing =========
var favorites = require('./routers/favorites');
app.get('/', function(req,res){
    res.sendFile(__dirname + "/views/index.html");
});

app.use('/api/favorites', favorites);

app.get('/api/helper', function(req,res){
    var baseUrl, access;
    if(req.query.api === "Dribbble"){
        baseUrl = "https://api.dribbble.com/v1/";
        access = "?access_token=" + process.env.DRIBBBLEKEY;
        request(baseUrl + "shots" + access, function(err, reponse, body){
            res.send(body);
        });
    }
    if(req.query.api === "Behance"){
        baseUrl = "http://behance.net/v2/";
        access = "?api_key=" +  process.env.BEHANCEKEY;
        request(baseUrl + "projects" + access, function(err, reponse, body){
            res.send(body);
        });
    }
});



// ========= Listening =========
var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log("Listening on", port);
});
