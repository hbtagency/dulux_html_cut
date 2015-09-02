var DULUX = DULUX || {};

DULUX.weatherShield = (function () {

	"use strict";

	// example private variables
	var events = function () {
		setupVideoPlayer();
		setupTracking();
	},

	createVideoElement = function (videoId) {
		var videoPlayer = $('.video-player');
		videoPlayer.find('.wrap').append('<iframe width="700" height="394" src="//www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen=""></iframe>');
	},

	setupVideoPlayer = function () {
		$('.video-block').on('click', function () {
			createVideoElement($(this).data('youtubeid'));
			$('.video-player').show();
			$('.video-player').animate({
				opacity: 1
			}, 300);
		});

		$('.video-player').on('click', '.close, .overlay', function () {
			$('.video-player').animate({
				opacity: 0
			}, 300, function () {
				$('.video-player').hide();
				$('.video-player .wrap').empty();
			});
		});
	},

	setupTracking = function () {
		$('.hero .video-block').on('click', function () {
			trackEvent('Dulux Weathershield', 'Watch Video Click', 'Weathershield video button');
		});

		$('.banner1 .button').on('click', function () {
			trackEvent('Dulux Weathershield', 'Find Out More Click', 'Find Out More button');
		});

		$('.banner3 .button').on('click', function () {
			trackEvent('Dulux Weathershield Renders Refresh', 'Find Out More Click', 'Find Out More button');
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