var mongoose = require('mongoose');

var InspirationSchema = mongoose.Schema({
    user: {type: String, required: true},
    url: {type: String, required: true},
    platform: {type: String, required: true},
    favs: {type: Number, default: 0}
});

module.exports = mongoose.model('Inspiration', InspirationSchema);
