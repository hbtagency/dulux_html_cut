var DULUX = DULUX || {};

DULUX.dwt = (function () {

	"use strict";

	// example private variables
	var events = function () {
		createVideoElement();
		setupVideoPlayer();
		setupTracking();
	},

	createVideoElement = function () {
		var videoPlayer = $('.video-player'),
			videoId = videoPlayer.data('youtubeid');
		videoPlayer.find('.wrap').append('<iframe width="700" height="394" src="//www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen=""></iframe>');
	},

	setupVideoPlayer = function () {
		$('.video-block').on('click', function () {
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
				createVideoElement();
			});
		});
	},

	setupTracking = function () {
		$('.hero .video-block').on('click', function () {
			trackEvent('Expand watch how to paint doors windows trim video');
		});

		$('.banner1 .button').on('click', function () {
			trackEvent('CTA Find out more | Dulux Aquanamel');
		});

		$('.banner2 .button').on('click', function () {
			trackEvent('CTA Find out more | Dulux Super Enamel');
		});

		$('.banner3 .button').on('click', function () {
			trackEvent('CTA See colour wall');
		});
	},

	trackEvent = function (label) {
		_gaq.push(['_trackEvent', 'DWT', 'Click', label]);
	};


	// public functions
	return {
		init: function () {
			events();
		}
	};
}());