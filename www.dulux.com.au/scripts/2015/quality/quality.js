var DULUX = DULUX || {};

DULUX.quality = (function () {

	"use strict";

	// example private variables
	var events = function () {
		setupTracking();
	},

	setupTracking = function () {
		$('.banner1 .button').on('click', function () {
			trackEvent('Dulux quality campaign landing page', 'Find out more click', 'Find out more - fresh and clean walls');
		});

		$('.banner2 .first .button').on('click', function () {
			trackEvent('Dulux quality campaign landing page', 'Find out more click', 'Find out more - weather conditions');
		});

		$('.banner2 .second .button').on('click', function () {
			trackEvent('Dulux quality campaign landing page', 'Find out more click', 'Find out more - colour you want');
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