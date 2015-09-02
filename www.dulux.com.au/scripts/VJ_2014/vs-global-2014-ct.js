var DULUX = DULUX || {};

DULUX.ct14 = (function () {
		
	var

	heroModal = function () {
		//YT modal control in page header

		//if IE7, disable functionality as YT javascript API does not support IE7
		if ($('#ct-launch-modal').length === 0) return;

		var $videoBtn = $('#ct-launch-modal'),
			$modal = $('#ct-hero-modal'),
			$closeBtn = $modal.find('a.ct-close'),
			$videoWrap = $('#ct-video'),
			$iframe = $videoWrap.find('iframe');
			videoId = $videoWrap.data('video');

		$videoBtn.on('click', function (e) {
			$modal.fadeIn();
			e.preventDefault();
		});

		$closeBtn.on('click', function (e) {
			//remove video
			//must hide container to avoid black screen on IE8 :x
			$videoWrap.hide().empty();
			$modal.fadeOut(400, function () {
				//inject video again
				$videoWrap.show().append('<iframe width="800" height="450" src="//www.youtube.com/embed/' +videoId +'?rel=0" frameborder="0" allowfullscreen></iframe>');
			});
			e.preventDefault();
		});
	},

	registerHotspotEventListeners = function() {
		// setup hotspot functionality + hotspot tracking
		var $currentHotspot,
			campaign = 'Colour Forecast and Trends 2014',
			action = 'Image Hover';

		// close all opened tooltip overlays
		hideHotspots(null);

		$('.hotspot').each(function() {
			$currentHotspot = $(this);

			$currentHotspot.mouseenter(function(e) {
				e.preventDefault();
				e.stopPropagation();
				var $this = $(this),
					$hotspotContent = $this.find('.hotspot-content'),
					hsHeight = Math.floor($hotspotContent.height()/2) - 9,
					label = $this.find('div.content').text();

				hideHotspots($hotspotContent);

				if($hotspotContent.css('display') === 'none') {
					$hotspotContent.css('margin-top', -hsHeight).fadeIn('fast', function () {
						_gaq.push(['_trackEvent', campaign, action, label]);
					});
				}
			});

			$currentHotspot.mouseleave(function(e) {
				e.preventDefault();
				e.stopPropagation();
				var $hotspotContent = $(this).find('.hotspot-content');

				hideHotspots($hotspotContent);

				if($hotspotContent.css('display') === 'block') {
					$hotspotContent.fadeOut('fast');
				}
			});
			$currentHotspot.find('.close').click(function() {
				$(this).parents('.hotspot-content').fadeOut('fast');
			});
		});
	},

	/**
	 * Hides all except $currentHotspot
	 * @param $visibleHotspotContent { jQuery } the hotspot that needs to stay visible.
	 */
	hideHotspots = function($visibleHotspotContent) {
		var $currentHotspotContent,
			$parentId,
			$visibleParentId;

		$('.hotspot-content').each(function() {
			$currentHotspotContent = $(this);
			$parentId = $currentHotspotContent.parents('div.hotspot').attr('id');

			if($visibleHotspotContent) {
				$visibleParentId = $visibleHotspotContent.parents('div.hotspot').attr('id');
				if($visibleParentId != $parentId) {
					$currentHotspotContent.hide();
				}
			} else {
				$currentHotspotContent.hide();
			}
		});
	},
	
	outboundTracking = function() {
		// track links that lead to other parts of dulux website (delay required to ensure tracking fired)
		var $page = $('#ctf'),
			$outTrack = $page.find('.outbound-tracking');


		function trackOutboundLink(linkURL, category, action, label) {
			try { 
				_gaq.push(['_trackEvent', category, action, label]); 
			} catch(err){}

			setTimeout(function() {
				document.location.href = linkURL;
			}, 100);
		}

		$outTrack.on('click', function (e) {
			e.preventDefault();
			var $this = $(this),
				linkURL = $this.attr('href'),
				category = $this.attr('category-tracking'),
				action = $this.attr('action-tracking'),
				label = $this.attr('label-tracking');

			trackOutboundLink(linkURL, category, action, label);
		});
	},

	eventTracking = function () {
		// standard GA event tracking
		var $page = $('#ctf'),
			$eventTrack = $page.find('a.event-tracking');

		if ($eventTrack.length === 0) return;

		var campaign = 'Colour Forecast and Trends 2014';

		$eventTrack.on('click', function () {
			var $this = $(this),
				action = $this.attr('action-tracking'),
				label = $this.attr('label-tracking');
			_gaq.push(['_trackEvent', campaign, action, label]);
		});
	}

	//public functions
	return {
		init: function () {

			heroModal();
			outboundTracking();
			eventTracking();
			
			if ($('#ct-hotspots').length) {
				registerHotspotEventListeners();
				hideHotspots();
			}
		}
	};

}());