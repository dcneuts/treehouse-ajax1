$(document).ready(function(){
	$('button').click(function () {
		$("button").removeClass("selected");
		$(this).addClass("selected");
		var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		var animal = $(this).text();
		var flickrOptions = {
			tags: animal,
			format: "json"
		};
		function displayPhotos(data) {
			var photoHTML = '<ul>';
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

$(document).ready(function () {
	//evt is for event
	$('form').submit(function(evt) {
		evt.preventDefault();//stop normal behavior of browser
		$searchField = $('#search');//text field for search window
		$submitButton = $('#submit');
		//disable search field
		$searchField.prop("disabled", true);
		$submitButton.attr("disabled", true).val("pulling...");
		var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		var animal = $searchField.val();
		var flickrOptions = {
			tags: animal,
			format: "json"
		};
		function displayPhotos(data) {
			var photoHTML = '<ul>';
			$.each(data.items, function (i, photo) {
				photoHTML += '<li class=grid-25 tablet-grid-50>';
				photoHTML += '<a href="' + photo.link + '" class="image">';
				photoHTML += '<img src="' + photo.media.m + '"></a></li>';
			});
			photoHTML += '</ul>';
			$('#photos').html(photoHTML);
			//had to re-activate the search button and name after search was over, must place it here due to
			// callback position
			$searchField.prop("disabled", false);
			$submitButton.attr("disabled", false).val('Search')
		}
		$.getJSON(flickerAPI, flickrOptions, displayPhotos);
	});
});