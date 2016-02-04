var mongoose = require('mongoose');

var InspirationSchema = mongoose.Schema({
    id: {type: String},
    title: {type: String},
    user: {type: String, required: true},
    user_url: {type: String},
    desc: {type: String},
    img: {type: String},
    time: {type: Number},
    url: {type: String, required: true},
    src: {type: String, required: true},
    favs: {type: Number, default: 1}
});

module.exports = mongoose.model('Inspiration', InspirationSchema);
