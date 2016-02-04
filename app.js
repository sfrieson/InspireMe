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
var apis = require('./routers/apis');

app.get('/', function(req,res){
    res.sendFile(__dirname + "/views/index.html");
});

app.use('/api', apis);



// ========= Listening =========
var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log("Listening on", port);
});
