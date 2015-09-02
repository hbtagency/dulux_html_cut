var DULUX = DULUX || {};

DULUX.jellyBean = (function () {

	"use strict";

	// example private variables
	var events = function () {
		setupVideoPlayer();
		setupTracking();
	},

	createVideoElement = function (videoId) {
		var videoPlayer = $('.video-player');
		videoPlayer.find('.wrap').append('<iframe width="886" height="500" src="//www.youtube.com/embed/' + videoId + '?autoplay=1" frameborder="0" allowfullscreen=""></iframe>');
	},

	setupVideoPlayer = function () {
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