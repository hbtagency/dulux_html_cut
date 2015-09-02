$(document).ready(function () {
    ausFavColours.initialize();
});

var ausFavColours = function () {

    var initialize = function () {
        $("div.ausfav div.rightcol h2:first").after($('<div class="video"><iframe width="376" height="259" src="http://www.youtube.com/embed/JQL6Jc9HYEc" frameborder="0" allowfullscreen></iframe></div>'));
        
        loadCarousel('#box_carousel', 1);

        sIFR.replace(futura, {
            selector: '.ausfav h2',
            css: '.sIFR-root { font-weight:bold; color: #2d2d2d;}',
            wmode: 'transparent'
        });

        
    };

    var loadCarousel = function (controlId, numToScroll) {
        jQuery(controlId).find('.jcarousel').jcarousel({
            scroll: numToScroll,
            animation: '5000',
            buttonPrevHTML: null,
            buttonNextHTML: null,
            wrap: 'circular',

            initCallback: function (carousel) {
                jQuery(controlId).find('.jcarousel-next').bind('click', function () {
                    carousel.next();
                    return false;
                });

                jQuery(controlId).find('.jcarousel-prev').bind('click', function () {
                    carousel.prev();
                    return false;
                });

                jQuery(controlId + ' .jcarousel-control IMG').bind('click', function () {
                    var pageIndex = parseInt(jQuery(this).attr('index'));
                    carousel.scroll(jQuery.jcarousel.intval(pageIndex));
                    return false;
                });
            },

            itemFirstInCallback: function (carousel, el, idx, state) {
                var pageIndex = (parseInt(idx) - 1) / carousel.options.scroll;
                jQuery(controlId).find('.jcarousel-control IMG').attr('class', 'off')
				.eq(Math.ceil(pageIndex))
				.attr('class', 'on');
            },

            buttonNextCallback: function (carousel, el, active) {
                var nextButton = jQuery(controlId).find('.jcarousel-next');
                nextButton.attr("disabled", !active);
                if (active) {
                    nextButton.removeClass('jcarousel-next-disabled');
                }
                else {
                    nextButton.addClass('jcarousel-next-disabled');
                }
            },

            buttonPrevCallback: function (carousel, el, active) {
                var prevButton = jQuery(controlId).find('.jcarousel-prev');
                prevButton.attr("disabled", !active);
                if (active) {
                    prevButton.removeClass('jcarousel-prev-disabled');
                }
                else {
                    prevButton.addClass('jcarousel-prev-disabled');
                }
            }
        });
    };

    return { initialize: initialize };

} ();