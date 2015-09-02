$(function() {

    // ----- Calculate height of content area - we want an overflow-y scrollable
    // panel taking up the remainder of the screen height.

    var bindCalculateHeight = function() {

        var calculateHeight = function() {
            var screenHeight = $(window).height(),
                navHeight = $('#nav-container').height(),
                footerHeight = $('#footer-container').height(),
                remainder;

            // content height is the remaining screen area
            remainder = screenHeight - navHeight - footerHeight;

            // subtract content container margins
            remainder -= parseInt($('#content').css('margin-top'), 10);
            remainder -= parseInt($('#content').css('margin-bottom'), 10);

            $('#content').css('height', remainder);
        };

        calculateHeight();

        $(window).resize(function() {
            calculateHeight();
        });
    };

    // apply this logic to all pages except for the homepage
    if (!$('body').hasClass('home')) {
        bindCalculateHeight();
    }

});
