
'use strict';


$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

});

(function($) {
	/*------------------
		Navigation
	--------------------*/
	$('.primary-menu').slicknav({
		appendTo:'.header-warp',
		closedSymbol: '<i class="fa fa-angle-down"></i>',
		openedSymbol: '<i class="fa fa-angle-up"></i>'
	});


	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});



	/*------------------
		Hero Slider
	--------------------*/
	$('.hero-slider').owlCarousel({
		loop: true,
		nav: true,
		dots: true,
		navText: ['', '<img src="img/icons/solid-right-arrow.png">'],
		mouseDrag: false,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		items: 1,
		//autoplay: true,
		autoplayTimeout: 10000,
	});

	var dot = $('.hero-slider .owl-dot');
	dot.each(function() {
		var index = $(this).index() + 1;
		if(index < 10){
			$(this).html('0').append(index + '.');
		}else{
			$(this).html(index + '.');
		}
	});



	/*------------------
		Video Popup
	--------------------*/
	$('.video-popup').magnificPopup({
  		type: 'iframe'
	});

	$('#stickySidebar').stickySidebar({
	    topSpacing: 60,
	    bottomSpacing: 60
	});
	$('#orderForm').submit(async (e) => {
		e.preventDefault();

		const orderData = {
			name: $('#name').val().trim(),
			service: $('#service').val(),
			price: $('#price').val(),
			paymentMethod: $('#payment').val(),
			email: $('#email').val(),
			code: $('#code').val(),
			description: $('#description').val().trim(), // ✅ Include description
			status: 'Pending'
		};

		try {
			const response = await fetch('https://reiner.azurewebsites.net/api/src?', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(orderData)
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Server Error: ${response.status} - ${errorText}`);
			}

			const result = await response.json();
			alert('Order submitted successfully! Order ID: ' + result.orderId);
		} catch (error) {
			console.error('Fetch Error:', error);
			alert('Error submitting order: ' + error.message);
		}
	});


})(jQuery);
