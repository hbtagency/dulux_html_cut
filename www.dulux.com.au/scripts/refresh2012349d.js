$(document).ready(function () {
    refresh2012.initialize();
});

var videoToPlay = "";

function onYouTubePlayerReady(videoId) {
    var player = document.getElementById(videoId);

    player.addEventListener("onStateChange", "refresh2012.carouselYouTubeStateChange");

    if (videoToPlay === videoId) {
        player.playVideo();
        videoToPlay = "";
    }
}

var refresh2012 = function () {

    var carouselContent;
    var $container;
    var duluxDog;

    var dogAway = "-14px";
    var dogClose;
    var videoPlaying = false;

    var initialize = function () {

        carouselContent = $('#carouselContent');
        duluxDog = $("#duluxDog");
        dogClose = duluxDog.css("left");

        //If Main Carousel is Present

        if ($("#content #carousel").length > 0) {
            hpConsumerCarouselInit();
        }

        //If Latest News
        if ($("#content.consumer #latestNews").length > 0) {
            hpLastestNewsInt();
        }

        fixNavDropdownPositions();

    };


    var hpConsumerCarouselInit = function () {

        var $bc = $('#carousel .carouselNav');

        $container = carouselContent.cycle({
            fx: 'scrollHorz',
            speed: '500',
            timeout: '5000',
            pause: false,
            before: function (zeroBasedSlideIndex, slideElement) {
                carouselPaging();
            },
            after: function (curr, next, opts) {
                $bc.find('a').removeClass('active');
                $num = opts.currSlide;
                $bc.find('a').eq($num).addClass('active');
            }
        });

        $container.children().each(function (i) {
            $('<li><a href="javascript:;" data-id="' + (i + 1) + '">' + i + 1 + '</a></li>')
                .appendTo($bc).click(function () {
                    // pass fx name as 2nd arg for a one-time override 
                    $bc.find('a.active').removeClass('active');
                    $container.cycle(i);
                    $(this).find('a').addClass('active');
                    return false;
                });
            $bc.find('a:first').addClass('active');
        });

        carouselContent.find(".slide").bind("mouseover", carouselHover).bind("mouseout", carouselMouseout);

        setupYouTube();

    };

    var setupYouTube = function () {
        //Youtube in carousel

        carouselContent.find(".slide").each(function () {

            if ($(this).find("div.ytid").size() > 0) {
                $(this).find('a.youTube').bind("click", carouselPlayYouTube);
            }

        });
    };

    var carouselPlayYouTube = function (e) {
        e.preventDefault();

        dogShoo();
        pauseCarousel(true);
        $(this).hide();

        var videoDiv = $(this).parents("div.slide:eq(0)").find("div.ytid");

        if (videoDiv != null) {
            var videoDivId = videoDiv.attr("id");

            var youtubeUrl = "http://www.youtube.com/v/{0}?version=3&amp;enablejsapi=1&amp;playerapiid={1}";

            var videoId = videoDivId.replace("ytjs_", "");

            var params = { allowScriptAccess: "always" };
            //var targetDivId = "ytjs_" + videoId;
            var atts = { id: videoDivId };

            swfobject.embedSWF(youtubeUrl.replace("{0}", videoId).replace("{1}", videoDivId), videoDivId, "710", "327", "8", null, null, params, atts);


            videoToPlay = videoDivId;
        } else {
            var embeddedObject = $(this).parents("div.slide:eq(0)").find("object");
            videoToPlay = embeddedObject.attr("id");
            onYouTubePlayerReady(videoToPlay);
        }
    };

    var carouselYouTubeStateChange = function (newState) {
        if (newState === 0) {
            //video finished.

            //find the video that just played.
            var objectToReplace = carouselContent.find(".slide object:eq(0)");
            var dummyDiv = $("<div class='ytid'></div>").attr("id", objectToReplace.attr("id")).html(objectToReplace.attr("id").replace("ytjs_", ""));

            //replace the video that just played.
            objectToReplace.replaceWith(dummyDiv);
            carouselContent.find("a.youTube").show();

            //restart the carousel.
            resumeCarousel(true);
            dogHeel();

        }
    };

    var carouselHover = function (e) {
        pauseCarousel();
    };

    var carouselMouseout = function (e) {
        resumeCarousel();
    };

    var pauseCarousel = function (isVideo) {
        if (isVideo) {
            videoPlaying = true;
        }

        carouselContent.cycle('pause');
    };

    var resumeCarousel = function (isVideo) {
        if (isVideo) {
            videoPlaying = false;
        }

        if (!videoPlaying) {
            carouselContent.cycle('resume');
        }
    };

    var carouselPaging = function () {
        if (videoPlaying) {
            //just pretend the video has finished. Go back to start screen.
            carouselYouTubeStateChange(0);
        }
    };

    var dogShoo = function () {
        duluxDog.animate({ left: dogAway });
    };

    var dogHeel = function () {
        duluxDog.animate({ left: dogClose });
    };

    var hpFeatureCarouselInit = function (slideContainerId, nextButtonId, prevButtonId) {
        
        var $btn = $(slideContainerId).parents("div:eq(0)").find("a.carouselNav");
        var $container = $(slideContainerId);

        $btn.hide();
        $container.hover(
          function () {
              $btn.show();
          },
          function () {
              $btn.hide();
          }
        );

          $btn.hover(
          function () {
              $btn.show();
          },
          function () {
              $btn.hide();
          }
        );

        $(slideContainerId).cycle({
            fx: "scrollHorz",
            speed: "500",
            next: nextButtonId,
            prev: prevButtonId,
            timeout: 0
        });

    };

    var hpLastestNewsInit = function () {

        $("#latestNews div.news").cycle({
            fx: "fade",
            speed: "500",
            next: "#newsNext",
            prev: "#newsPrev",
            timeout: 0

        });

    };

    var fixNavDropdownPositions = function () {
        var navItems = $("#nav-main > li");
        var navOffsetLeft = $("#nav-main").offset().left;

        navItems.each(function () {
            var newWidth = $(this).find("a").outerWidth();

            $(this).find("div.dropDown .menuPoint").css("left", $(this).offset().left - navOffsetLeft - 2).css("width", newWidth);
        });

    };

    return {
        initialize: initialize,
        hpConsumerCarouselInit: hpConsumerCarouselInit,
        hpFeatureCarouselInit: hpFeatureCarouselInit,
        hpLastestNewsInit: hpLastestNewsInit,
        fixNavDropdownPositions: fixNavDropdownPositions,
        carouselYouTubeStateChange: carouselYouTubeStateChange
    };
} ();


/*
Additional JS Functionality for Dulux.com.au
*/

$(document).ready(function () {

    function pinIt() {
        var e = document.createElement('script');
        e.setAttribute('type', 'text/javascript');
        e.setAttribute('charset', 'UTF-8');
        e.setAttribute('src', '../../assets.pinterest.com/js/pinmarklet2a3b.js?r=' + Math.random() * 99999999);
        document.body.appendChild(e);
    }


});

