var DULUX = DULUX || {};

DULUX.ct14 = (function () {

    var

        heroModal = function () {
            //YT modal control in page header

            //if IE7, disable functionality as YT javascript API does not support IE7
            if ($('#ct-launch-modal').length === 0) return;

            var $videoBtn = $('#ct-launch-modal'),
                $modal = $('#ct-hero-modal'),
                $closeBtn = $modal.find('a.ct-modal-close'),
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
                    $videoWrap.show().append('<iframe width="800" height="450" src="//www.youtube.com/embed/' + videoId + '?rel=0" frameborder="0" allowfullscreen></iframe>');
                });
                e.preventDefault();
            });
        },

        registerHotspotEventListeners = function () {
            // setup hotspot functionality + hotspot tracking
            var $currentHotspot,
                campaign = 'Colour Forecast and Trends 2014',
                action = 'Image Hover';

            // close all opened tooltip overlays
            hideHotspots(null);

            $('.hotspot').each(function () {
                $currentHotspot = $(this);

                $currentHotspot.mouseenter(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $this = $(this),
                        $hotspotContent = $this.find('.hotspot-content'),
                        hsHeight = Math.floor($hotspotContent.height() / 2) - 9,
                        label = $this.find('div.content').text();

                    hideHotspots($hotspotContent);

                    if ($hotspotContent.css('display') === 'none') {
                        $hotspotContent.css('margin-top', -hsHeight).fadeIn('fast', function () {
                            _gaq.push(['_trackEvent', campaign, action, label]);
                        });
                    }
                });

                $currentHotspot.mouseleave(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $hotspotContent = $(this).find('.hotspot-content');

                    hideHotspots($hotspotContent);

                    if ($hotspotContent.css('display') === 'block') {
                        $hotspotContent.fadeOut('fast');
                    }
                });
                $currentHotspot.find('.close').click(function () {
                    $(this).parents('.hotspot-content').fadeOut('fast');
                });
            });
        },

        /**
         * Hides all except $currentHotspot
         * @param $visibleHotspotContent { jQuery } the hotspot that needs to stay visible.
         */
        hideHotspots = function ($visibleHotspotContent) {
            var $currentHotspotContent,
                $parentId,
                $visibleParentId;

            $('.hotspot-content').each(function () {
                $currentHotspotContent = $(this);
                $parentId = $currentHotspotContent.parents('div.hotspot').attr('id');

                if ($visibleHotspotContent) {
                    $visibleParentId = $visibleHotspotContent.parents('div.hotspot').attr('id');
                    if ($visibleParentId != $parentId) {
                        $currentHotspotContent.hide();
                    }
                } else {
                    $currentHotspotContent.hide();
                }
            });
        },

        outboundTracking = function () {
            // track links that lead to other parts of dulux website (delay required to ensure tracking fired)
            var $page = $('#ctf'),
                $outTrack = $page.find('.outbound-tracking');


            function trackOutboundLink(linkURL, category, action, label) {
                try {
                    _gaq.push(['_trackEvent', category, action, label]);
                } catch (err) {
                }

                setTimeout(function () {
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
        };

    //public functions
    return {
        init: function () {

//          heroModal();
            outboundTracking();
            eventTracking();

            if ($('#ct-hotspots').length) {
                registerHotspotEventListeners();
                hideHotspots();
            }
        }
    };

}());

$(function () {
    DULUX.ct14.init();
});

(function ($, window, document, app, undefined) {

    // Youtube Registers
    app.Youtube = {
        init: function () {
            this.video.config = {
                width: '800',
                height: '450',
                frameBorder: 0
            };
            this.videoContainer = 'modal__video';
            this.videoTrigger = 'video__trigger';
            this.videoDestroy = 'modal__close';
            this.modalParent = 'hero__content';
            this.animateSpeed = 600;
            this.registerEvents();
            this.modal.build();
        },
        registerEvents: function () {
            var yt = app.Youtube;
            $(document).on('click', '.' + yt.videoTrigger, function (e) {
                e.preventDefault();
                yt.video.config.id = $(this).attr('id');
                yt.modal.showCallback = yt.video.load;
                yt.modal.show();
            });
        },
        video: {
            load: function () {
                var yt = app.Youtube;
                var src = [
                    "https://www.youtube.com/embed/",
                    yt.video.config.id,
                    "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1"
                ].join('');

                yt.video.player = $('<iframe/>', {
                    'src': src,
                    'width': yt.video.config.width,
                    'height': yt.video.config.height,
                    'frameBorder': yt.video.config.frameBorder
                });

                yt.modal.container.html(yt.video.player);

            },
            unload: function () {
                var yt = app.Youtube;
                yt.video.player.remove();
            }
        },
        modal: {
            build: function() {
                var yt = app.Youtube;
                yt.modal.hider  = $('<a/>', {'class': yt.videoDestroy, 'href': '#'})
                    .on('click', function(e){
                        e.preventDefault();
                        yt.modal.hideCallback = yt.video.unload;
                        yt.modal.hide();
                    });

                yt.modal.container = $('<div/>', {'class': yt.videoContainer });

                yt.modal.target = $('<div/>', { 'class': 'modal'})
                    .append(yt.modal.hider)
                    .append(yt.modal.container);

                $('.' + yt.modalParent).append(yt.modal.target);
            },
            show: function() {
                var yt = app.Youtube;
                this.target
                    .addClass('modal--on')
                    .delay(yt.animateSpeed)
                    .queue(yt.modal.showCallback());
            },
            hide: function() {
                var yt = app.Youtube;
                this.target
                    .removeClass('modal--on')
                    .delay(yt.animateSpeed)
                    .queue(yt.modal.hideCallback());
            }
        }
    };

    // Timeline

    app.Timeline = function(dom) {

        var field = dom || '#select__year';

        this.register   = function () {
            $(document).on('change', field, function (e) {
                window.location.href = $(this).val();
                e.preventDefault();
            });
        };

    };

    // Image Maps
    app.Imagemap = function() {

        this.fetch = function(callback) {

            if($('.dcf--home')[0] || $('.dct--home')[0]) return;
            if($('.dcf--earthwerks')[0])    this.page = 'spec-earthwerks';
            if($('.dcf--modhaus')[0])       this.page = 'spec-modhaus';
            if($('.dcf--silentshift')[0])   this.page = 'spec-silentshift';
            if($('.dcf--wildland')[0])      this.page = 'spec-wildland';
            if($('.dct--earthwerks')[0])    this.page = 'cons-earthwerks';
            if($('.dct--modhaus')[0])       this.page = 'cons-modhaus';
            if($('.dct--silentshift')[0])   this.page = 'cons-silentshift';
            if($('.dct--wildland')[0])      this.page = 'cons-wildland';

            $.getJSON('/scripts/colourForecast2015/markers-' + this.page + '.js', function(data){
                callback(data);
            });

        };

        this.build = function () {
            this.fetch(function(data){
                $.each(data, function(i, e){
                    var image = $('.imagemap__image--'+i);
                    var map   = $('<div/>', {
                        "class": "imagemap__map"
                    });

                    $.each(e, function(ii, ee){

                        var marker =
                            $('<a/>', { 'class': 'imagemap__marker' })
                                .css({ 'left': ee.left, 'top': ee.top })
                                .qtip({
                                    content: ee.content,
                                    style: {
                                        classes: 'imagemap__tooltip',
                                        tip: {
                                            width: 20,
                                            height: 10
                                        }
                                    },
                                    events: {
                                        show: function() {
                                            // TODO: attach analytics event
                                        }
                                    },
                                    position: {
                                        my: 'bottom center',
                                        at: 'top center',
                                        adjust: {
                                            method: 'flip'
                                        }
                                    }
                                });

                        map.append(marker);

                    });

                    image.after(map);
                });
            });
        }

    };

    // Onload Functions
    $(function () {
        var timeline = new app.Timeline();
        timeline.register();

        var imagemap = new app.Imagemap();
        imagemap.build();

        app.Youtube.init();
    });


})(jQuery, window, document, window.DUL || (window.DUL = {}));