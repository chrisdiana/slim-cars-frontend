Zepto(function($){

	// Setup the root url for the RESTful services
	var rootURL = 'http://localhost/slim-cars/api/';
	var currentCar;

	$(document).on('ajaxBeforeSend', function(e, xhr, options){
		// This gets fired for every Ajax request performed on the page.
		// The xhr object and $.ajax() options are available for editing.
		// Return false to cancel this request.
	});

	// Retrieve car list when application starts
	findAll();

	// Retrive car details when list item is clicked
	$('#car-list a').live('click', function() {
		findById($(this).data('identity'));
	});

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

	// Get car by id
	function findById(id) {
		console.log('findById:' + id);
		$.ajax({
			type: 'GET',
			url: rootURL + 'cars/' + id,
			dataType: 'json',
			success: function(data){
				$('#btnDelete').show();
				console.log('findById success: ' + data);
				currentCar = data;
				renderDetails(currentCar);
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

	// Render detail view
	function renderDetails(car) {
		if($.isEmptyObject(car)){
			$('#id').val('');
			$('#year').val('');
			$('#make').val('');
			$('#model').val('');
		}else{
			$('#id').val(car.id);
			$('#year').val(car.year);
			$('#make').val(car.make);
			$('#model').val(car.model);
		}
	}

});