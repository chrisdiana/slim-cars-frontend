Zepto(function($){

	// Setup the root url for the RESTful services
	var rootURL = 'http://localhost/slim-cars/api/';

	$(document).on('ajaxBeforeSend', function(e, xhr, options){
		// This gets fired for every Ajax request performed on the page.
		// The xhr object and $.ajax() options are available for editing.
		// Return false to cancel this request.
	});

	// Retrieve car list when application starts
	findAll();

	// Get all cars
	function findAll() {
		$.ajax({
			type: 'GET',
			url: rootURL + 'cars',
			dataType: 'json',
			success: function(response){
				console.log('Success: ', response);
				renderList(response);
			},
			error: function(xhr, type){
			   console.log(xhr, type);
			}
		});
	}

	// Render list of all cars
	function renderList(data) {
		$('#car-list li').remove();
		$.each(data, function(index, car) {
			$('#car-list').append('<li><a href="#" data-identity="' + car.id + '">' + car.model + '</a></li>');
		});
	}

});