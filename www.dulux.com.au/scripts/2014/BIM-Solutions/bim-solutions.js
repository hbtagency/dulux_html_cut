var DULUX = DULUX || {};

DULUX.bimSolutions = (function () {

    "use strict";

    // example private variables
    var events = function () {
        setupVideoPlayer();
        setupColourGroupLinks();
        setupFAQ();
        setupTracking();
        setupAtlasLogin();
        setupRevitPluginDownload();
    },



	createVideoElement = function (videoId) {
	    var videoPlayer = $('.video-player');
	    videoPlayer.find('.wrap').append('<iframe width="700" height="394" src="//www.youtube.com/embed/' + videoId + '?autoplay=1" frameborder="0" allowfullscreen=""></iframe>');
	},

	setupVideoPlayer = function () {
	    $('.video-block').on('click', function () {
	        createVideoElement($(this).data('youtubeid'));
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
	        });
	    });
	},

	setupColourGroupLinks = function () {
	    $('.banner1 .right').on('click', 'a.revitDownload', function (e) {
	        e.preventDefault();
	        var buttonValue = "right";
	        var colourGroup = $("#ddlRevitGroup option:selected").text();
	        DULUX.RevitFileDownloadAndLogin(buttonValue, colourGroup, true);
	        /* 
	        window.location.href = 'http://www.dulux.com.au/products/dulux-online-shop?saploc=login&ColourGroups=' + $('.banner1 .right select').val();
	        */
	    });

	    $('.banner1 .right').on('click', 'a.archicadDownload', function (e) {
	        e.preventDefault();
	        var buttonValue = "right";
	        var colourGroup = $("#ddlArchicadGroup option:selected").text();
	        DULUX.RevitFileDownloadAndLogin(buttonValue, colourGroup, false);
	        /* 
	        window.location.href = 'http://www.dulux.com.au/products/dulux-online-shop?saploc=login&ColourGroups=' + $('.banner1 .right select').val();
	        */
	    });
	},

    //Added for login functionality on Individual colour download (Link to Colour Atlas)
	setupAtlasLogin = function () {
	    $('.banner1 .left').on('click', 'a', function (e) {
	        e.preventDefault();
	        var buttonValue = "left";
	        DULUX.RevitFileDownloadAndLogin(buttonValue);

	    });
	},

    //Added for login and download functionality on Revit Plugins
	setupRevitPluginDownload = function () {
	    $('.banner2 .button').on('click', function (e) {
	        e.preventDefault();
	        var buttonValue = "32Bit";
	        DULUX.RevitFileDownloadAndLogin(buttonValue);

	    });

	    $('.banner2 .button2').on('click', function (e) {
	        e.preventDefault();
	        var buttonValue = "64Bit";
	        DULUX.RevitFileDownloadAndLogin(buttonValue);

	    });

	    DULUX.CheckLoginDownload();
	},

	setupFAQ = function () {
	    $('.faq .question').on('click', function () {
	        $(this).toggleClass('open');
	        $(this).next('.answer').slideToggle();
	    });
	},

	setupTracking = function () {
	    $('.hero .video-block').on('click', function () {
	        trackEvent('Expand Video | Colour Atlas');
	        DULUX.RevitLogVideoClicks('Colour Atlas');
	    });

	    $('.banner1 .left .button').on('click', function () {
	        trackEvent('CTA Download options Search Colours');
	    });

	    $('.banner1 .right .button').on('click', function () {
	        trackEvent('CTA Download options Colour Groups Go | ' + $('.banner1 .right select').val());
	    });

	    $('.banner2 .button').on('click', function () {
	        trackEvent('CTA Colour Atlas Revit Plugin | Download 32bit version');
	    });

	    $('.banner2 .button2').on('click', function () {
	        trackEvent('CTA Colour Atlas Revit Plugin | Download 64bit version');
	    });

	    $('.video-guides .left .video-block').on('click', function () {
	        trackEvent('Expand Video Guide | How to Install');
	        DULUX.RevitLogVideoClicks('How to Install');
	    });

	    $('.video-guides .right .video-block').on('click', function () {
	        trackEvent('Expand Video Guide | Getting Started');
	        DULUX.RevitLogVideoClicks('Getting Started');
	    });

	    $('.faq .question:not(.open)').on('click', function () {
	        trackEvent('FAQ | ' + $(this).text());
	    });
	},

	trackEvent = function (label) {
	    //_gaq.push(['_trackEvent', 'Trade BIM', 'Click', label]);
	};

    // public functions
    return {
        init: function () {
            events();
        }
    };
} ());

//LOGIN AND REVIT FILE DOWNLOAD FUNCTIONALITY
DULUX.RevitFileDownloadAndLogin = (function (buttonValue, params, isRevit) {
    // Get whether user is logged in. Called from js-functions.js
    var isUserLoggedIn = false; //getUserLoggedIn();
    var videoId = "1y0mKVS8sdY"; //HOW TO INSTALL VIDEO CODE

    if (buttonValue == "left") {
        //Individual colour download - link to the colour atlas
        window.location = "colour-atlas.html";
    } else {
        $.ajax({
            type: 'Post',
            url: '/iisauthenticationhandler.authsrv',
            //data: { Username: user, Password: pass },
            data: { auth: true, buttonValue: buttonValue, params: params },
            dataType: 'json',
            success: function (data) {
                //Login Success
                //console.log('getUserLoggedIn success:'+ data);
                if (data == '1') {
                    isUserLoggedIn = true;
                    //alert('user logged in');
                    if (buttonValue == "right") {
                        //Download colour group selected in the ddl - call download function in js-functions.js
                        var URL = $("#ddlRevitGroup").val();

                        if (!isRevit)
                            URL = "/services/ForceDownloadHandler.ashx?filename=" + encodeURIComponent($("#ddlArchicadGroup").val());

                        downloadURL(URL);
                        event.preventDefault ? event.preventDefault() : event.returnValue = false; //event.preventDefault();

                        //Auto play the 'How To Install' video once download for colour groups or plugin commences 
                        //var videoPlayer = $('.video-player');
                        //videoPlayer.find('.wrap').append('<iframe width="700" height="394" src="//www.youtube.com/embed/' + videoId + '?autoplay=1" frameborder="0" allowfullscreen=""></iframe>');
                        //$('.video-player').show();
                        //$('.video-player').animate({
                        //    opacity: 1
                        //}, 300);

                    } else if (buttonValue == "32Bit") {
                        //Download 32Bit Revit Plugin
                        downloadURL("/media/bim/DuluxColourAtlas_x86.msi");
                        event.preventDefault ? event.preventDefault() : event.returnValue = false; //event.preventDefault();

                        //Auto play the 'How To Install' video once download for colour groups or plugin commences 
                        var videoPlayer = $('.video-player');
                        videoPlayer.find('.wrap').append('<iframe width="700" height="394" src="//www.youtube.com/embed/' + videoId + '?autoplay=1" frameborder="0" allowfullscreen=""></iframe>');
                        $('.video-player').show();
                        $('.video-player').animate({
                            opacity: 1
                        }, 300);

                    }
                    else if (buttonValue == "64Bit") {
                        //Download 64Bit Revit Plugin
                        downloadURL("/media/bim/DuluxColourAtlas_x64.msi");
                        event.preventDefault ? event.preventDefault() : event.returnValue = false; //event.preventDefault();

                        //Auto play the 'How To Install' video once download for colour groups or plugin commences 
                        var videoPlayer = $('.video-player');
                        videoPlayer.find('.wrap').append('<iframe width="700" height="394" src="//www.youtube.com/embed/' + videoId + '?autoplay=1" frameborder="0" allowfullscreen=""></iframe>');
                        $('.video-player').show();
                        $('.video-player').animate({
                            opacity: 1
                        }, 300);
                    }
                }
                else {
                    isUserLoggedIn = false;
                    DULUX.SetLoginDownload(buttonValue, isRevit);
                    window.location = "../site-tools/log-in6b49.html?returnurl=/specifier/colour/bim";
                }
            },
            error: function (msg) {
                console.log('getUserLoggedIn error:' + msg.responsetext);
                isUserLoggedIn = false;
            }
        });
    }



});

// If the user is redirected to the login page store the Download URL that will fire off when coming back to this page
DULUX.SetLoginDownload = (function (buttonValue, isRevit) {
    var downnloadItem = '';
    if (buttonValue == "right") {
        if (!isRevit)
            downnloadItem = "/services/ForceDownloadHandler.ashx?filename=" + encodeURIComponent($("#ddlArchicadGroup").val());
        else {
            downnloadItem = $("#ddlRevitGroup").val();
        }
    } else if (buttonValue == "32Bit") {
        downnloadItem = "/media/bim/DuluxColourAtlas_x86.msi";
    } else if (buttonValue == "64Bit") {
        downnloadItem = "/media/bim/DuluxColourAtlas_x64.msi";
    }
    document.cookie = "bimdownloadlogin=" + encodeURIComponent(downnloadItem);
}
);

DULUX.CheckLoginDownload = (function () {
    var url = DULUX.ReadCookie("bimdownloadlogin");
    if (url != "") {
        
        var delay = 4000; //1 seconds

        setTimeout(function () {

            $.ajax({
                type: 'Post',
                url: '/iisauthenticationhandler.authsrv',
                //data: { Username: user, Password: pass },
                data: { auth: true },
                dataType: 'json',
                success: function (data) {
                    //Login Success
                    //window.location = �index.html�;
                    //console.log('getUserLoggedIn success:'+ data);
                    if (data == '1') {
                        downloadURL(decodeURIComponent(url));
                    }
                    
                },
                error: function (msg) {
                   
                }
            });
            document.cookie = "bimdownloadlogin=''";

        }, delay);
    }
}
);

DULUX.ReadCookie = (function (name) {
    var allcookies = document.cookie;

    // Get all the cookies pairs in an array
    var cookiearray = allcookies.split(';');

    // Now take key value pair out of this array
    for (var i = 0; i < cookiearray.length; i++) {
        var thisName = cookiearray[i].split('=')[0];
        if (thisName === name)
            return cookiearray[i].split('=')[1];
        
    }
    return '';
}
);

//LOGIN AND REVIT FILE DOWNLOAD FUNCTIONALITY
DULUX.RevitLogVideoClicks = (function (videoId) {
        $.ajax({
            type: 'Post',
            url: '/iisauthenticationhandler.authsrv',
            data: { auth: false, buttonValue: "video", params: videoId },
            dataType: 'json',
            success: function (data) {
                
            },
            error: function (msg) {
               
            }
        });
    }
);