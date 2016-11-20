var mongoose = require('mongoose');
var url = 'mongodb://user:password@localhost:port'; // TBC

mongoose.connect(url);

var collection = db.collection('users');

// update history
// schema: age? e-mail?
var User = mongoose.model('User', {user_id: String, friends_id: Array, 
	history: [{timestamp: Date, data: Array}]})

var u_id = document.getElementById('user_id').value;
var query = {user_id: u_id};

var emotion_history = User.findOne(query).select('history')
var time_stamp = Date.now()
var new_emotion_vector = // need to get it from the API
var new_element = {time_stamp: new_emotion_vector}

// not sure if emotion_history is an array
emotion_history.push(new_element)

User.update(query, {history: emotion_history})

// clean history

clean_history = function(User, u_id) {
	var n = 100;
	var existing_history = User.findOne({user_id: u_id}).select('history')
	if (existing_history.length < 100) {
		console.log('Error: too few elements to start cleaning history.')
	} else {
		var cleaned_history = existing_history.slice(existing_history.length - n, existing_history.length)
		User.update({user_id: u_id}, {history: cleaned_history})
	}
};


