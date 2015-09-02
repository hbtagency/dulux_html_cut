var DULUX = DULUX || {};

DULUX.duramax = (function () {

	"use strict";

	// example private variables
	var events = function () {
		setupHeroCarousel();
		setupTransforms();
		setupVideoPlayer();
		setupFAQAccordion();
		setupRanges();
		setupGallery();
		setupTracking();
	},

	setupHeroCarousel = function () {
		$('.hero .flexslider').flexslider({
			animation: "slide",
			slideshow: false,
			animationLoop: false
		});

		$('.landing .hero .flex-direction-nav a').on('click', function (e) {
			$('.transform-nav .items').toggleClass('active');
		});

		$('.landing .hero .flex-control-nav li').on('click', 'a:not(.flex-active)', function () {
			$('.transform-nav .items').toggleClass('active');
		});
	},

	setupTransforms = function () {
		$('.landing .hero .flexslider .slide-content .triggers').on('click', 'a', function (e) {
			e.preventDefault();
			var id = $(this).attr('href'),
				$target = $(id),
				scrollTopOffset = $($.attr(this, 'href')).offset();

			if (scrollTopOffset) {
				$('html, body').stop().animate({
					'scrollTop': scrollTopOffset.top
				}, 900, 'swing');
			}

			$('.landing .transforms-expanded').addClass('active');
			$('.landing .transforms-expanded .objects.active').removeClass('active');
			$('.landing .transforms-expanded .objects' + id).addClass('active');
		});

		$('.landing .transforms .transform-nav ul.items').on('click', 'li', function () {
			var id = $(this).attr('id');
			$('.landing .transforms-expanded').addClass('active');
			$('.landing .transforms-expanded .objects.active').removeClass('active');
			$('.landing .transforms-expanded .objects#' + id).addClass('active');
		});

		$('.landing .transforms-expanded').on('click', '.close', function () {
			$('.landing .transforms-expanded').removeClass('active');
		});
	},

	createVideoElement = function (videoId) {
		var videoPlayer = $('.video-player');
		videoPlayer.find('.wrap').append('<iframe width="886" height="500" src="//www.youtube.com/embed/' + videoId + '?autoplay=1&controls=0&showinfo=0&rel=0" frameborder="0" allowfullscreen=""></iframe>');
	},

	setupVideoPlayer = function () {
		$('.video-wrap').on('click', function () {
			createVideoElement($(this).data('youtubeid'));
			$('.video-player').show();
			$('.video-player').animate({
				opacity: 1
			}, 300);
		});

		$('.video-player').on('click', '.close, .overlay', function (e) {
			e.preventDefault();
			$('.video-player').animate({
				opacity: 0
			}, 300, function () {
				$('.video-player').hide();
				$('.video-player .wrap').empty();
			});
		});
	},

	setupFAQAccordion = function () {
		$('.landing #grid').on('click', 'p.question', function () {
			if (!$(this).next('p.answer').hasClass('active')) {
				$('.landing #grid p.question.active').toggleClass('active');
				$('.landing #grid p.answer.active').toggleClass('active');
			}
			$(this).toggleClass('active');
			$(this).next('p.answer').toggleClass('active');
			if ($('.landing #grid p.answer.active').length === 0) {
				$('.landing #grid .item.faqs').removeClass('expanded');
			} else {
				$('.landing #grid .item.faqs').addClass('expanded');
			}
		});
	},

	setupRanges = function () {
		$('.landing #grid .content-range').on('click', 'a.button', function (e) {
			e.preventDefault();
			$('.landing #grid .item.range').hide();
			$('.landing #grid .item.range-expanded').addClass('active');
			$('.landing #grid .item.range-expanded .tabs .tab.' + $(this).data('range')).addClass('active');
			$('.landing #grid .item.range-expanded .item-content-range > div.' + $(this).data('range')).addClass('active');
		});

		$('.landing #grid .range-expanded').on('click', '.tab.close', function () {
			$('.landing #grid .item.range-expanded').removeClass('active');
			$('.landing #grid .item.range-expanded .tab.active').removeClass('active');
			$('.landing #grid .item.range-expanded .item-content-range > div.active').removeClass('active');
			$('.landing #grid .item.range').show();
		});

		$('.landing #grid .item.range-expanded .tabs').on('click', '.tab[data-range]:not(.active)', function () {
			$('.landing #grid .item.range-expanded .tab.active').removeClass('active');
			$(this).addClass('active');
			$('.landing #grid .item.range-expanded .item-content-range > div.active').removeClass('active');
			$('.landing #grid .item.range-expanded .item-content-range > div.' + $(this).data('range')).addClass('active');
		});
	},

	setupGallery = function () {
		buildGallery('forecast');

		$('.landing .gallery .tabs').on('click', '.tab', function () {
			var gallery = $(this).data('gallery');
			if (!$(this).hasClass('active')) {
				$('.landing .gallery .tabs .tab.active').removeClass('active');
				$(this).addClass('active');
				$('.landing .gallery .flexslider.active').removeClass('active');
				$('.landing .gallery .flexslider#' + gallery).addClass('active');
				buildGallery(gallery);
			}
		});
	},

	buildGallery = function (id) {
		$('.gallery .flexslider#' + id).flexslider({
			animation: "slide",
			slideshow: false,
			animationLoop: false,
			controlNav: false,
			itemWidth: 178,
			itemMargin: 18,
			move: 1
		});
	},

	setupTracking = function () {
		$('.banner1 .apple').on('click', function () {
			trackEvent('Jelly Beans campaign landing page', 'App store click', 'App store button');
		});

		$('.banner1 .google').on('click', function () {
			trackEvent('Jelly Beans campaign landing page', 'Google Play click', 'Google Play button');
		});

		$('.banner2 .video-block').on('click', function () {
			trackEvent('Jelly Beans campaign landing page', 'Jelly bean video watch', 'Jelly bean video');
		});
	},

	trackEvent = function (category, action, label) {
		_gaq.push(['_trackEvent', category, action, label]);
	};


	// public functions
	return {
		init: function () {
			events();
		}
	};
}());