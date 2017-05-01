$(document).ready(function(){
	$('button').click(function () {
		//callback for click event
		//to remove highlighting from button selection
		$("button").removeClass("selected");
		//this is the element responding to the click event
		$(this).addClass("selected");
		//getJSON (URL, data with URL, callback function that runs after response)
		var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		//the ?jasoncallback above is a key request to allows API to access through this query string
		var animal = $(this).text();//$this allows for current button to pull info, text() gets all text info from click
		var flickrOptions = {
			tags: animal,
			format: "json"
		};
		//options on variable above correspond with API guidelines set by Flickr to retrieve images by tag and format, as default is XML and this exercise needs JSON
		//data argument holds JSON data parsed by Flickr
		function displayPhotos(data) {
			var photoHTML = '<ul>';
			// loop and array in jQuery using index variable and callback function
			$.each(data.items, function (i, photo) {
				photoHTML += '<li class=grid-25 tablet-grid-50>';
				photoHTML += '<a href="' + photo.link + '" class="image">';
				photoHTML += '<img src="' + photo.media.m + '"></a></li>';
			});
			photoHTML += '</ul>';
			$('#photos').html(photoHTML);
		}
		$.getJSON(flickerAPI, flickrOptions, displayPhotos);
	});
});