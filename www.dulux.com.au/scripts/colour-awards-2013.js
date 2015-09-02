var colourAwards = function () {

    var pinFooterToPage = function () {
        $("#footer-container").pinFooter();
    }

    var fixShortPages = function (contentSelector, minHeight) {
        var content = $(contentSelector);

        if (content.size() > 0) {
            var winH = $(window).height();
            var headH = $("#nav-container").outerHeight();
            var footH = $("#footer-container").outerHeight();
            var dividerH = $("#divider-container").outerHeight();
            var newHeight = winH - headH - footH - dividerH;
            if (newHeight > 600) newHeight = 600;
            if (content.height() < minHeight) content.height(newHeight);
        }
    }


    return {
        pinFooterToPage: pinFooterToPage,
        fixShortPages: fixShortPages
    }
} ();

$(function () {
    colourAwards.pinFooterToPage();
    colourAwards.fixShortPages("#content", 600);
    colourAwards.fixShortPages("#awardsswf", 600);
    $(window).resize(function () {
        colourAwards.pinFooterToPage();
        colourAwards.fixShortPages("#content", 600);
        colourAwards.fixShortPages("#awardsswf", 600);
    });
});
