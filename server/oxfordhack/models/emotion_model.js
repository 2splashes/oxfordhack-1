var emotions_array = ["anger", "contempt", "disgust", "fear", "happiness",
				"neutral", "sadness", "surprise"]

var apiKey = "1521013cecd149fca7543bac79c8784d";
        
var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";

var emotion_dict = {};
var averaged_emotions = {};

// var fileUrl = ''
    
$('#btn').click(function () {
    CallAPI(fileUrl, apiUrl, apiKey);
});
        
function CallAPI(fileUrl, apiUrl, apiKey) {
    $.ajax({
        url: apiUrl,
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
            },
        type: "POST",
        data: '{"url": "' +fileUrl +'"}'
        })
        .done(function (response) {
            ProcessResult(response);
        })
        .fail(function (error) {
        	$("#response").text(error.getAllResponseHeaders());
        });
}
        
function ProcessResult(response) {
    var data = JSON.stringify(response);
    $("#response").text(data);
}

function AverageStates(history, n) { // default: n = 100
	var n = 100
	if (history.length > 100) {
		history = history.slice(history.length - n, history.length)
	}

	for (i = 0; i < emotions_array.length, i++) {
		emotion = emotions_array[i]
		emotion_dict[emotion] = []
		for (j = 0; j < history.length, j++) {
			item = history[j]
			scores_dict = history['data'][0] // MS API returns a list
			state_probability = scores_dict[emotion]
			emotion_dict[emotion].push(state_probability)
		averaged_emotions[emotion] = math.mean(emotion_dict[emotion])
		}
	}
}