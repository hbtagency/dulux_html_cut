(function($, window, document) {
    'use strict';

    $(function() {

        function verticalCenter() {
            $('[data-v-center]').each( function () {
                var $this = $(this);
                var parentHeight = $this.closest('.media').height();

                $this.parent().css({
                    "padding-top" :
                    "0px","padding-bottom" : "0px"
                });
                $this.css({
                    "display" : "table-cell",
                    "vertical-align" : "middle",
                    "height" : parentHeight + "px"
                });
            });
        }

        function colourSwatches() {
            $('[data-swatch-flex-height]').each( function () {
                var $this = $(this);
                var swatchItem = $this.find('li');
                var swatchNumber = swatchItem.length;

                swatchItem.css({'padding-top' : 219 / swatchNumber + '%'});
            });

            $('[data-swatch-background]').each( function () {
                var $this = $(this);
                var swatchBackground = $this.data('swatchBackground');
                $this.find('a').css({'background-color': swatchBackground});
            });

            $('[data-swatch-color]').each( function () {
                var $this = $(this);
                var swatchColor = $this.data('swatchColor');
                $this.find('a span').css({'color': swatchColor});
            });
        }

        $.getJSON("../scripts/2015/vamff/hotspots.js", function (data) {
            $.each( data, function (key, section) {
                var html = '<div class="hotspot"></div>';
                var sectionTitle = section.title;

                $.each( section.content, function (key, item) {
                    var $target = $('[data-hotspot=' + sectionTitle +'] > li:eq(' + key +')');

                    $target.prepend(html);
                    // console.log(item);


                    $.each( item.hotspot, function (key, hotspots) {
                        var hotspotItem = key;
                        var $hotspot = $target.find('.hotspot');
                        // console.log(hotspots);
                        $hotspot.append('<div class="hotspot__item" style="top: ' + hotspots.top + '; left: ' + hotspots.left + ';"><i class="hotspot__icon"></i><div class="hotspot__content"><div class="hotspot__inner-content"></div></div></div>');

                        $.each( hotspots.content, function (key, val) {
                            // console.log(val);
                            var $hotspotItem = $hotspot.find('.hotspot__item:eq(' + hotspotItem + ') .hotspot__inner-content');
                            $hotspotItem.append('<div class="hotspot__title">' + val.title + '</div><ul class="hotspot__list"></ul>');
                            var $hotspotItem = $hotspot.find('.hotspot__item:eq(' + hotspotItem + ') .hotspot__list:eq(' + key + ')');

                            $.each( val.contentList, function (key, list) {


                                $hotspotItem.append('<li class="hotspot__list__item">' + list + '</li>');
                            });
                        });

                    });
                });
            });
        });

        $('[data-hotspot] .hotspot__item').live('mouseenter', function () {
            var $this = $(this);
            var hotspotTop = parseInt($this.css('top'));
            var hotspotLeft = parseInt($this.css('left'));
            var contentHeight = $this.find('.hotspot__content').height();
            var contentWidth = $this.find('.hotspot__content').width();
            var containerHeight = ($('.hotspot').height() / 2) + contentHeight - 150;
            var containerWidth = ($('.hotspot').width() / 2) + contentWidth - 150;

            // console.log(hotspotLeft + ' > ' + containerWidth);
            if (hotspotTop > containerHeight) {
                $this.find('.hotspot__content').css({'top': '-' + (contentHeight + 10) + 'px'});
            }
            if (hotspotLeft > containerWidth) {
                // console.log('test');
                $this.find('.hotspot__content').css({'left': '-' + (contentWidth + 10) + 'px'});
            }
        });

        $('[data-slider]').each( function() {
            var _this = $(this);
            var val = _this.data('slider');

            if (val == "" || val == " ") {
                _this.flexslider();
            } else if (val == "gallery") {
                _this.flexslider({
                    slideshow: false,
                    pauseOnHover: true
                });
            }
        });

        $(window).resize( function () {
            verticalCenter();
        });

        colourSwatches();
        verticalCenter();
    });

}(jQuery, window, document));