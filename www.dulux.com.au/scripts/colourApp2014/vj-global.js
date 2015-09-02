/* Dulux Virgin Australia
   Author: Jetz Alipalo
*/

var DULUX = DULUX || {};

DULUX.colourApp = (function () {
		
    var

    page = {

        init: function () {
            var event = {
                name: 'Colour App',
                type : null,
                label: null
            },

            videoPlayer = $('.video-player'),
            closeVP = $('.close'),
            vidWrap = $('.wrap'),
            videoStr = '<iframe width="700" height="394" src="//www.youtube.com/embed/7FBFyOi5JH0" frameborder="0" allowfullscreen></iframe>'

            $('.watch-vid').on('click', function (e) {
                e.preventDefault();

                _gaq.push([
                    '_trackEvent',
                    event.name,
                    event.type = 'Video Click',
                    event.label = 'Expand Video Intro'
                ]);
                vidWrap.is(':empty') ? vidWrap.append(videoStr) : null;
                videoPlayer.css('display', 'block').animate({ opacity: 1 }, 300);
            })

            $('.dl-app').on('click', function () {
                _gaq.push([
                    '_trackEvent',
                    event.name,
                    event.type = 'CTA Click',
                    event.label = $(this).data('label')
                ]);
            })

            closeVP.on('click', function () {
                videoPlayer.animate({ opacity: 0 }, 300, function () {
                    videoPlayer.css('display', 'none')
                    vidWrap.empty().append(videoStr);
                })
            })
        }
    },

    //Global variables and functions
    o = {
        
    }
    
    return {
        run: function () {
            page.init();
        }
    }

}());