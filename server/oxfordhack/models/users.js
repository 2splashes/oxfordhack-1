var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:oxfordnotox@localhost');

var User = mongoose.model('User', { name: String,
    id: {type: Number, index: {unique: true}},
    history: [{
    date: {type: Date, default: Date.now},
    anger: Number,
    contempt: Number,
    disgust: Number,
    fear: Number,
    happiness: Number,
    neutral: Number,
    sadness: Number,
    surprise: Number }] });

var addUser = function (id) {
    var n = new User({name: id, history: []});
    n.save();
};

var addResult = function (id, result) {
    User.findByIdAndUpdate(
        id,
        {$push: {history: result}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
    );
};

module.exports = {
    addUser: addUser,
    addResult: addResult
};