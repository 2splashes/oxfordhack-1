api_call = function () {
	var q = document.getElementById('mySearch').value;
	// q = "animal"; // search query
	
	request = new XMLHttpRequest;
	request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true);
	
	request.onload = function() {
		if (request.status >= 200 && request.status < 400){
			data = JSON.parse(request.responseText).data.image_url;
			console.log(data);
			document.getElementById("giphyme").innerHTML = '<center><img src = "'+data+'"  title="GIF via Giphy"></center>';
		} else {
			console.log('reached giphy, but API returned an error');
		 }
	};

	request.onerror = function() {
		console.log('connection error');
	};

	request.send();
	
};
document.addEventListener('DOMContentLoaded', api_call);

// setInterval(api_call, 60000);

$(document).on("pagecreate","#pageone",function(){
  $("giphyme").on("swiperight", api_call
  	);
});