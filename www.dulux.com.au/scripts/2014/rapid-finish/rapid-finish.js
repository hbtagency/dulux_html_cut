var DULUX = DULUX || {};

DULUX.rapidFinish = (function () {

	"use strict";

	// example private variables
	var events = function () {
		setupVideoPlayer();
		setupTracking();
		setupGallery();
	},

	createVideoElement = function (videoId) {
		var videoPlayer = $('.video-player');
		videoPlayer.find('.wrap').append('<iframe width="700" height="394" src="//www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen=""></iframe>');
	},

	setupVideoPlayer = function () {
		// Section to be uncommented after getting the Video ID
		$('.video-block').on('click', function () {
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

	setupGallery = function () {
		$('.flexslider').flexslider({
			animation: "slide",
			slideshow: false,
			controlNav: false,
			animationLoop: false,
			itemWidth: 187,
			itemMargin: 15,
			move: 1
		});
	},

	setupTracking = function () {
		$('.hero').on('click', function () {
			trackEvent('Dulux Rapid Finish Landing Page', 'Hero banner click', 'Hero banner');
		});

		$('.video-gallery .video-block').on('click', function () {
			trackEvent('Dulux Rapid Finish Landing Page', 'Gallery video watch', 'Painting with Liam');
		});

		$('.video-gallery .flexslider .slides').on('click', 'li', function () {
			trackEvent('Dulux Rapid Finish Landing Page', 'Gallery carousel video watch', 'Video No. ' + ($(this).index() + 1));
		});

		$('.banner3 .video-block').on('click', function () {
			trackEvent('Dulux Rapid Finish Landing Page', 'How to video watch', 'How to apply');
		});

		$('.banner4 .button').on('click', function () {
			trackEvent('Dulux Rapid Finish Landing Page', 'Redeem Gift Click', 'Redeem Gift');
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