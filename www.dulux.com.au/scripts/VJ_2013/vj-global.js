var DULUX = DULUX || {};

DULUX.mshield = (function () {
                
        var

        campaign = 'Product',
        
        heroModal = function () {
                //YT modal control in page header

                //if IE7, disable functionality as YT javascript API does not support IE7
                if ($('#ms-launch-modal').length === 0) return;

                var $videoBtn = $('#ms-launch-modal'),
                        $modal = $('#ms-hero-modal'),
                        $closeBtn = $modal.find('a.ms-close'),
                        $videoWrap = $('#ms-video'),
                        videoId = $videoWrap.data('video');

                $videoBtn.on('click', function (e) {
                        $modal.fadeIn();
                        e.preventDefault();
                });

                $closeBtn.on('click', function (e) {
                        //remove video
                        $videoWrap.empty();
                        $modal.fadeOut(400, function () {
                                //inject video again
                                $videoWrap.append('<iframe width="700" height="394" src="//www.youtube.com/embed/' +videoId +'?rel=0" frameborder="0" allowfullscreen></iframe>');
                        });
                        e.preventDefault();
                });
        },

        outboundTracking = function() {
                // track links that lead to other parts of dulux website (delay required to ensure tracking fired)
                var $page = $('#mshield'),
                        $outTrack = $page.find('a.track-outbound');

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
                                category = campaign,
                                action = $this.attr('tracking-action'),
                                label = $this.attr('tracking-label');

                        trackOutboundLink(linkURL, category, action, label);
                });
        },

        eventTracking = function () {
                // standard GA event tracking
                var $page = $('#mshield'),
                        $eventTrack = $page.find('a.track-click');

                $eventTrack.on('click', function () {
                        var $this = $(this),
                                action = $this.attr('tracking-action'),
                                label = $this.attr('tracking-label');
                        _gaq.push(['_trackEvent', campaign, action, label]);
                });
        }

        //public functions
        return {
                init: function () {
                        if ($('#mshield').length === 0) return;
                        heroModal();
                        outboundTracking();
                        eventTracking();
                }
        };

}());