var MYPROJECT = MYPROJECT || {};

MYPROJECT.wplus2 = (function () {

    var 
	events = function () {
	    var $page = $('#wplus2'),
			$termsToggle = $('#wp2-terms'),
			$hiddenTerms = $termsToggle.parent().next();

	    //CTA buttons event tracking
	    $page.on('click', 'a.wp2-btn', function () {
	        var eventLabel = $(this).attr('title');
	        _gaq.push([
				'_trackEvent',
				'Wash & Wear Plus',
				'CTA click',
				eventLabel
			]);
	    });

	    $termsToggle.on('click', function (e) {
	        $hiddenTerms.slideToggle();
	        e.preventDefault();
	    });

	}

    // public functions
    return {
        init: function () {

            if ($('#wplus2').length === 0) return;

            events();
        }
    };

} ());