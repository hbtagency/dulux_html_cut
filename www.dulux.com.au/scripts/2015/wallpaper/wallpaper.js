var DULUX = DULUX || {};

DULUX.wallpaper = (function () {

  "use strict";

  // example private variables
  var events = function () {
    setupVideoPlayer();
    setupTracking();
  },

  createVideoElement = function (videoId) {
    var videoPlayer = $('.video-player');
    videoPlayer.find('.wrap').append('<iframe width="700" height="394" src="//www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen=""></iframe>');
  },

  setupVideoPlayer = function () {
    // Section to be uncommented after getting the Video ID
    $('.media__player').on('click', function () {
      createVideoElement($(this).data('youtubeid'));
      $('.video-player').show();
      $('.video-player').animate({
        opacity: 1
      }, 300);
    });

    $('.video-player').on('click', '.close, .overlay', function (e) {
      e.preventDefault();
      $('.video-player').animate({
        opacity: 0
      }, 300, function () {
        $('.video-player').hide();
        $('.video-player .wrap').empty();
      });
    });
  },


  setupTracking = function () {

    $('.media__player .media__player__play').on('click', function () {
      trackEvent('Paintable wallpaper landing page', 'Video play button click', 'Paintable wallpaper video');
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