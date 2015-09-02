var MYPROJECT = MYPROJECT || {};

MYPROJECT.onlineShop = (function () {
		
	var

	trackingMessages = {
		campaignName: 'Online Shop Landing Page',
		eventButton: 'CTA click',
		eventGallery: 'Gallery click'
	},

	events = function () {

		//Purchase now buttons event tracking
		$(document).on('click', '.os-btn', function () {
			var eventLabel = $(this).attr('title');
			_gaq.push([
				'_trackEvent',
				trackingMessages.campaignName,
				trackingMessages.eventButton,
				eventLabel
			]);
		});

		//carousel prev/next event tracking
		$('.os-carousel-nav').on('click', function () {
			var whichGallery = $(this).parent().data('gallerytracking');
			console.log(whichGallery);
			_gaq.push([
				'_trackEvent',
				trackingMessages.campaignName,
				trackingMessages.eventGallery,
				whichGallery
			]);
		});
	},

	carousel = function () {

		//bind carouse 1
		$('#os-carousel-one').cycle({ 
			fx:     'scrollHorz', 
			speed:  1000, 
			timeout:1500, 
			next:   '#os-carousel-one-prev', 
			prev:   '#os-carousel-one-next',
			pause:  1,
			pauseOnPagerHover: true,
			rev:    1,
		});
		//bind pause/resume on carousel's 1 prev/next buttons
		$('#os-carousel-one-prev, #os-carousel-one-next').on({
			mouseenter: function () {
				$('#os-carousel-one').cycle('pause');
			},
			mouseleave: function () {
				$('#os-carousel-one').cycle('resume');
			}
		});

		//bind carouse 2
		$('#os-carousel-two').cycle({ 
			fx:     'scrollHorz', 
			speed:  1000, 
			timeout:1500, 
			next:   '#os-carousel-two-prev', 
			prev:   '#os-carousel-two-next',
			pause:  1,
			pauseOnPagerHover: true,
			rev:    1,
		});
		//bind pause/resume on carousel's 2 prev/next buttons
		$('#os-carousel-two-prev, #os-carousel-two-next').on({
			mouseenter: function () {
				$('#os-carousel-two').cycle('pause');
			},
			mouseleave: function () {
				$('#os-carousel-two').cycle('resume');
			}
		});
	}

	// public functions
	return {
		init: function () {

			if ($('#online-shop').length === 0) return;

			carousel();
			events();

		}
	};

}());