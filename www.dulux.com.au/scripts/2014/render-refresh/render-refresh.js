var DULUX = DULUX || {};

DULUX.renderRefresh = (function () {

	"use strict";

	// example private variables
	var events = function () {
		createVideoElement();
		setupVideoPlayer();
		setupTracking();
		setupAdIterations();
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
			trackEvent('Expand see how it works video');
		});

		$('.banner1 .button').on('click', function () {
			trackEvent('CTA Colour wall');
		});
	},

	trackEvent = function (label) {
		_gaq.push(['_trackEvent', 'Renders Refresh', 'Click', label]);
	},

	setupAdIterations = function() {
		var totalCount = 0,
			totalLimit = 10,

			individualCount,
			individualLimit = totalLimit / 2,
			individualGain = parseInt($('.wall-back').css('height'), 10) / individualLimit;

		var incrementTotal = function () {
			totalCount++;

        	if (totalCount % 2 === 0 && totalCount > 0) {
        		$('.wall-front-bottom').css('top', ((totalLimit - totalCount) / 2 + 1) * individualGain + 'px');
        	}

        	if (totalCount === totalLimit + 2) {
        		$('.wall-front-bottom').css('top', '0px');
        		$('.wall-front-top').hide();
        		$('.wall-roller').hide();
        	}
		};

		$('.roller-animation').on('animationiteration mozanimationiteration webkitAnimationIteration oAnimationIteration msanimationiteration', function(event) {
			incrementTotal();

			individualCount = parseInt($(this).attr('data-anim-iterations'));

            if (individualCount < individualLimit) {
				individualCount++;

            	$(this).css('top', (individualLimit - individualCount) * individualGain + 'px');
            	$(this).attr('data-anim-iterations', individualCount);

            } else {
            	$(this).removeClass('roller-animation');
            }
		});

        $('.paint-right-animation, .paint-left-animation').on('animationiteration mozanimationiteration webkitAnimationIteration oAnimationIteration msanimationiteration', function(event) {
        	incrementTotal();

            individualCount = parseInt($(this).attr('data-anim-iterations'));

            if (individualCount < individualLimit) {
				individualCount++;

            	$(this).css('top', (individualLimit - individualCount) * individualGain + 'px');
            	$(this).attr('data-anim-iterations', individualCount);

            	$(this).toggleClass('paint-left-animation');
            	$(this).toggleClass('paint-right-animation');

            } else {
            	$(this).removeClass('paint-left-animation');
            	$(this).removeClass('paint-right-animation');
            }
        });

    };
    

	// public functions
	return {
		init: function () {
			events();
		}
	};
}());