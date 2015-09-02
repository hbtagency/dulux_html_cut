/* Dulux Find a Printer Page
   Author: Jetz Alipalo
*/

var DULUX = DULUX || {};

DULUX.DC = (function () {
		
    var

    page = {
        init: function () {
            this.html();
            this.popColor();
            this.tracking();
        },

        html: function () {

            //Collections Figure
            var colFigures = $('.collections figure')

            colFigures.length ? colFigureHover() : undefined;
            function colFigureHover () {


                colFigures.each(function () {
                    var figure = $(this)
                    figure.hover(function () {
                        var markup = '<div class="hover"><div class="pallet">VIEW<br />DETAILS<span>' +
                            figure.find('figcaption').text() + '</span></div></div>'

                        figure.stop().animate({
                            boxShadow: '0 0 15px'
                        }, 200)

                        .find('a').append(markup)
                        .find('.hover').stop().animate({
                            opacity: 1
                        }, 300)
                        .find('.pallet').css('transform', 'scale(1)')
                        .find('span').delay(200).animate({ opacity: 1 }, 200)
                    },
                    function () {

                        figure.stop().animate({
                            boxShadow: '0 0 0'
                        }, 200)

                        .find('.hover').stop().animate({
                            opacity: 0
                        }, 300, function () {
                            figure.find('.hover').remove();
                        })
                        .find('.pallet').css('transform', 'scale(0)')
                        .find('span').delay(200).animate({ opacity: 0 }, 200)
                    });

                });
            };
            
            //Hex Color boxes
            var palletBox = '.pallet-box li';

            $(palletBox + ':nth-child(9n)').css('width', '86px');
            $(palletBox).each(function () {
                var $this = $(this);

                $this.css('background-color', '#' + $this.data('hex-color'));

                $this.append('<span>' + $this.data('color-name') + '</span>')
                var spanWidth = "-" + $this.find('span').outerWidth() / 2 + "px"
                $this.find('span').css('margin-left', spanWidth)
            })


            .hover(function () {
                var $this = $(this),
                span = $this.find('span');

                $this.css('z-index', '1').stop().animate({
                    boxShadow: '0 0 10px'
                }, 100)
                span.css('display', 'block').stop().animate({
                    opacity: 1
                }, 500)
            },
            function () {
                var $this = $(this),
                span = $this.find('span');

                $this.css('z-index', 'auto').stop().animate({
                    boxShadow: '0 0 0'
                }, 100)
                span.stop().animate({
                    opacity: 0
                }, 100).css('display', 'none')
            });


            //Other styles
            var activePage = $('.dc-body').attr('class').split(/\s/),
                otherStyles = '.other-styles li';

            $('.other-styles .' + activePage[1]).parents('li').remove()

            $(otherStyles + ':nth-child(3n)').addClass('last')
            $(otherStyles).hover(function () {
                $(this).stop().animate({
                    boxShadow: '0 0 10px'
                }, 100)
            },
            function () {
                $(this).stop().animate({
                    boxShadow: '0 0 0'
                }, 100)
            });


            //back Button
            $('.btn-back').on('click', function () {
                window.location.replace("design-collection.html");
                return false;
            });
        },

        popColor: function () {
            var palletBox = $('.pallet-box')

            palletBox.length ? runOverlay() : undefined;
            function runOverlay() {

                palletBox.find('li').on('click', function () {

                    var overlay = '<div class="overlay" />'

                    $(overlay).appendTo('body').css('display', 'block').stop()
                    .animate({ opacity: 1 }, 100)

                    var box = $(this),
                        color = box.data('hex-color'),
                        colorName = box.data('color-name'),
                        tpl = '<div class="popColor" style="background-color: #' + color + '"><span>CLOSE</span><label>COLOUR: ' + colorName + '</label></div>',
                        $overlay = $('.overlay');

                    $overlay.after(tpl)

                    var $popColor = $('.popColor');

                    $popColor.animate({ opacity: 1 }, 300)
                    $popColor.find('span').add('.overlay').on('click', function () {
                        $overlay.add($popColor).animate({ opacity: 0 }, 100,
                            function () {
                                $overlay.add($popColor).remove()
                            })
                    });
                });
            }
        },

        tracking: function () {
            var

            $collectionFigure = $('.collections figure'),
            $btn = $('.btn'),
            $collectionName = null,

            event = {
                name: 'Design Collection',
                type: null,
                label: null
            }

            //Collection Hover
            $collectionFigure
            .on('mouseenter', function () {
                /*_gaq.push([
                    '_trackEvent',
                    event.name,
                    event.type = 'Hover',
                    event.label = $(this).data('collection-name')
                ]);*/
				ga('send', 'event', event.name, 'Hover', $(this).data('collection-name'));
            })

            //Collection Click
            .on('click', function (e) {
                e.preventDefault();

                link = $(this).find('a').attr('href')

                /*_gaq.push([
                    '_trackEvent',
                    event.name,
                    event.type = 'Click',
                    event.label = $(this).data('collection-name')
                ]);*/
				ga('send', 'event', event.name, 'Click', $(this).data('collection-name'));
                setTimeout(function () { window.location.href = link }, 200);
            })

            //Button
            $btn.on('click', function (e) {
                collectionName = $('[data-collection-name]').data('collection-name')
                message = {
                    youtube: '_YouTube How To Video',
                    readmore: '_Read product details and application instructions'
                }

                $(this).is('.youtube') ?
                event.label = collectionName + message.youtube
                : event.label = collectionName + message.readmore

                /*_gaq.push([
                    '_trackEvent',
                    event.name,
                    event.type = 'CTA Click',
                    event.label
                ]);*/
				ga('send', 'event', event.name, 'CTA Click', event.label);
            });
        }
    }

    return {
        run: function () {
            page.init();
        }
    }

}());


//Temporary image preloader
DULUX.PRELOAD = (function () {

    var

    load = {
        init: function () {

            //Preload Background images
            var bgImages = [
                'pallets.jpg'
            ],

            imgContent = [
                'pallet-chalkboard.png',
                'pallet-colouredChalk.html',
                'pallet-metallic.html',
                'pallet-pearl.html',
                'pallet-rust.html',
                'pallet-stone.html',
                'pallet-suede.html',
                'bg-colouredChalk.html',
                'bg-metallic.html',
                'bg-pearl.html',
                'bg-rust.html',
                'bg-stone.html',
                'bg-suede.html',
                'bg-chalkboard.html'
            ]

            function pushLoad(dir, imgArray) {
                for (var i = 0; i < imgArray.length; i = i + 1) {
                    $('body').append('<img src="' + dir + imgArray[i] + '" style="display:none" />');
                }
            }

            //Background Images
            pushLoad('../imgs/designCollection2014/index.html', bgImages);

            //Pallet images
            pushLoad('../imgs/designCollection2014/content/index.html', imgContent);
        }
    }

    return {
        run: function () {
            load.init();
        }
    }

}());