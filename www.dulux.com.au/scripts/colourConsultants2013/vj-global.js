var DULUX = DULUX || {};

DULUX.ccsp = (function () {

	var
	heroCarousel = function () {
		//bind hero carousel
		$('#ccsp-hero-carousel')
		.before('<div id="ccsp-hc-nav" class="ccsp-carousel-nav">')
		.cycle({
			fx: 'fade',
			speed: 500,
			timeout: 3000,
			cleartypeNoBg: true,
			pager: '#ccsp-hc-nav',
			pauseOnPagerHover: true
		});
	},

	heroModal = function () {
		//YT modal control in page header

		//if IE7, disable functionality as YT javascript API does not support IE7
		if ($('#ccsp-launch-modal').length === 0) return;

		var $videoBtn = $('#ccsp-launch-modal'),
			$modal = $('#ccsp-hero-modal'),
			$closeBtn = $modal.find('a.ccsp-close'),
			$heroCarousel = $('#ccsp-hero-carousel'),
			$videoWrap = $('#ccsp-video'),
			videoId = $videoWrap.data('video');

		$videoBtn.on('click', function (e) {
			$heroCarousel.cycle('pause'); //pause carousel
			$modal.fadeIn();
			e.preventDefault();
		});

		$closeBtn.on('click', function (e) {
			//remove video
			$videoWrap.empty();
			$modal.fadeOut(400, function () {
				//inject video again
				$videoWrap.append('<iframe width="700" height="394" src="//www.youtube.com/embed/' +videoId +'?rel=0" frameborder="0" allowfullscreen></iframe>');
			});
			$heroCarousel.cycle('resume'); //resume carousel
			e.preventDefault();
		});
	},

	consultantClides = function () {
		//initialise consultant carousels
		$('#ccsp-consultant-slides').cycle({
			fx: 'scrollHorz',
			speed: 500,
			timeout: 0,
			next: '#ccsp-cs-prev',
			prev: '#ccsp-cs-next',
			pause: 1,
			pauseOnPagerHover: true,
			rev: 1
		});
	},

	faqToggle = function () {
		//FAQ section answer toggle
		var $question = $('#ccsp-faq-list').find('span.ccsp-question');

		$question.on('click', function () {
			var $this = $(this),
				$answer = $this.next('div');

			$answer.slideToggle(400, function () {
				if ($answer.is(':visible')) {
					$this.parent('li').addClass('ccsp-opened');
				} else {
					$this.parent('li').removeClass('ccsp-opened');
				}
			});
		});
	},

	formToggle = function () {
		//enquire now button opens form, 'X' closes form
		var $enquireBtn = $('#ccsp-info').find('a.ccsp-btn'),
			$form = $('#ccsp-form'),
			$closeBtn = $form.find('a.ccsp-close'),
			$firstNameField = $("[id*='ccspFirstName']");

		$enquireBtn.on('click', function (e) {
			if (!$form.is(':visible')) {
				$form.slideDown(400, function () {
					if ($firstNameField.val().length === 0) {
						$firstNameField.focus();
					}
				});
			}
			e.preventDefault();
		});
		$closeBtn.on('click', function (e) {
			$form.slideUp();
			e.preventDefault();
		});
	},

	TYToggle = function () {
		//enquire now button opens form, 'X' closes form
		var form = $('#ccsp-thanks');

		form.find('.ccsp-close').on('click', function (e) {
			e.preventDefault();
			form.slideUp();
		});
	},

	validation = {
		//call this function on any page that requires some sort of form validation..
		init: function () {
			var form = $('form#aspnetForm');

			form.each(function () {
				var $this = $(this);
				validation.basic($this);
			});

			form.find('.rule').each(function () {
				var $this = $(this),
					type = $this.data('type'),
					param = $this.data('param'),
					obj = {};

				obj[type] = param;

				$this.rules("add", obj);
			});
		},
		basic: function (ele) {
			ele.validate({
				//basic validation, adds an error class to the input in error.
				//TODO add handling for checkboxes..
				//thinking about changin markup to suit...
				showErrors: function (errorMap, errorList) {
					for (var i = 0, max = errorList.length; i < max; i += 1) {
						$(errorList[i].element).addClass('error');
						$('#ccsp-error-msg').show();
					}
				}
			});
		// tracking checking
		ele.find("#sp-submit").on("click", function () {
			var postCode = "",
				d = new Date(),
				year = '' + d.getFullYear(),
				date = d.getDate() + '/' + d.getMonth() + '/' + year.substr(-2) + '-' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
				orderID = "",
				eventLabel = "Submit form",
				action = "Click";


			// cant use submitHandler() from validate.js as its breaking on dev implementation

			// form is valid, send the tracking info without highjacking the form
			if (ele.valid()) {

				// get the valid fields we need
				postCode = $('#ccspPostcode').val();
				orderID = '/services/colour-consultants?postcode=' + postCode + '&orderid=' + date;

				_gaq.push(['_trackPageview', orderID]);
				_gaq.push(['_trackEvent', 'Colour Consultancy Service', action, eventLabel]);
			}
		});

		ele.on('change', '.error', function () {
			if ($(this).valid()) {
				$(this).removeClass('error');
			}
		});
		ele.on('keyup', '.error', function () {
			if ($(this).valid()) {
				$(this).removeClass('error');
			}
		});
	}
		/*OLD IMPLEMENTATION OF TRACKING AND FORM SUBMISSION
		basic: function (ele) {
			ele.validate({
				//basic validation, adds an error class to the input in error.
				//TODO add handling for checkboxes..
				//thinking about changin markup to suit...
				showErrors: function (errorMap, errorList) {
					for (var i = 0, max = errorList.length; i < max; i += 1) {
						$(errorList[i].element).addClass('error');
						$('#ccsp-error-msg').show();
					}
				},
				// submitHandler: function () {
					//_trackPageview
					// var postCode = $('#ccspPostcode').val(),
						// d = new Date(),
						// year = '' + d.getFullYear(),
						// date = d.getDate() + '/' + d.getMonth() + '/' + year.substr(-2) + '-' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
						// orderID = '/services/colour-consultants?postcode=' + postCode + '&orderid=' + date;

					// _gaq.push(['_trackPageview', orderID]);

					//_trackEvent
					// var eventLabel = 'Submit form',
						// action = 'Click';

					// _gaq.push(['_trackEvent', 'Colour Consultancy Service', action, eventLabel]);
				// }
			});
			ele.on('change', '.error', function () {
				if ($(this).valid()) {
					$(this).removeClass('error');
				}
			});
			ele.on('keyup', '.error', function () {
				if ($(this).valid()) {
					$(this).removeClass('error');
				}
			});
		}*/
	},

	events = function () {
		var $page = $('#ccsp'),
			$basicTracking = $page.find('a.track-click'),
			$carouselNavLink = $page.find('div.ccsp-carousel-nav a'),
			$faqQuestion = $('#ccsp-faq-list').children('li'),
			$thankYouSection = $('#ccsp-thanks'),
			$outboundTrack = $page.find('a.outboundTracking'),
			tracking = {
				page: 'Colour Consultancy Service'
			};


		//carousel navigation tracking
		$carouselNavLink.on('click', function () {
			var $this = $(this),
				eventLabel = $this.parent().parent().attr('data-tracking') + ' ' + $this.index();
			_gaq.push([
				'_trackEvent',
				tracking.page,
				'Toggle',
				eventLabel
			]);
		});

		//FAQ questions tracking
		$faqQuestion.on('click', function () {
			var $this = $(this),
				action = ($this.hasClass('ccsp-opened') ? 'Collapse' : 'Expand'),
				eventLabel = "FAQ_" + $this.children('span').text();
			_gaq.push([
				'_trackEvent',
				tracking.page,
				action,
				eventLabel
			]);
		});

		//Outbound tracking
		$outboundTrack.on('click', function (e) {

			var $this = $(this),
				eventLabel = $(this).data('tracking'),
				action = 'Click',
				Link = $this.attr("href");

			_gaq.push([
				'_trackEvent',
				tracking.page,
				action,
				eventLabel
			]);

		});
	};

	//public functions
	return {
		init: function () {
			if ($('#ccsp').length === 0) return;
			heroCarousel();
			heroModal();
			formToggle();
			validation.init();
			consultantClides();
			faqToggle();
			TYToggle();
			events();
		}
	};

}());