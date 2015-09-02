$(function() {

    var SLIDES = ['paint', 'business-plus'];

    // -------- Carousel
    var carousel = {
        $carousel: $('.spotlight-carousel'),
        $slides: $('.spotlight-carousel .slide'),
        $navigation: $('.spotlight-carousel-navigation'),

        _sliding: false,

        bind: function() {
            var _this = this;

            this.$carousel.on('beforeChange', function() {
                _this._sliding = true;
            });

            this.$carousel.on('afterChange', function() {
                _this._sliding = false;
            });

            this.$carousel.slick({
                prevArrow: this.$navigation.find('.prev'),
                nextArrow: this.$navigation.find('.next'),
                speed: 1000,
                cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)'
            });

            // the prev/next buttons don't simply link to the route as there is custom
            // Slick logic that allows the slider to seamlessly wrap on prev/next
            // at the end of the slides. Using `.slickGoTo()` doesn't seem to
            // trigger this, so we have to use the regular Slick event handlers.
            this.$navigation.on('click', '.prev, .next', function(e) {
                e.preventDefault();

                var slide = _this.$carousel.slick('slickCurrentSlide');

                slide = SLIDES[slide];

                // update URL
                router.setRoute('/' + slide + '/1');

                // update carousel navigation
                carousel.updateNavigationActive(slide);
            });

            // prevent double sliding via clicks - can still happen via history
            this.$navigation.on('click', '.prev, .next, .carousel-slide-link', function(e) {
                if (_this._sliding) return false;
            });
        },

        updateSlide: function(slide) {
            slide = SLIDES.indexOf(slide);
            this.$carousel.slick('slickGoTo', slide);
        },

        updateNavigationActive: function(slide) {
            this.$navigation.find('.carousel-slide-link').removeClass('active');
            this.$navigation.find('.carousel-slide-link[data-slug="' + slide + '"]').addClass('active');
        }
    };

    carousel.bind();


    // -------- Router
    var $screens = $('.main-content');

    // routes!
    var index = function() {
        router.setRoute($screens.first().data('slug') + '/1');
    };

    var slide = function(screen) {
        router.setRoute(screen + '/1');
    };

    var content = function(screen, content) {
        var $screen, $contents, $content;

        $screen = $screens.filter(function() {
            return ($(this).data('slug') === screen);
        });

        // find that screen content blocks, and the one we're trying to load
        $contents = $screen.find('.content');
        $content = $contents.eq(content - 1); // 0-based

        // check we have matching screen + content, otherwise default to first screen
        if (!$screen.length || !$content.length) {
            console.error('Unable to find screen and content:', screen, content);
            return index();
        }

        // Update page content!

        // 1. Update screen
        $screens.hide();
        $screen.show();

        // 2. Update content
        $contents.hide();
        $content.show();

        // 3. Update content navigation active state
        $screen.find('.sidebar .nav li')
            .removeClass('active')
            .eq($content.index() - 1)
            .addClass('active');

        // Update carousel content!

        // 4. Update carousel item
        carousel.updateSlide(screen);

        // 5. Update carousel navigation
        carousel.updateNavigationActive(screen);
    };

    var routes = {
        '/':                 index,
        '/:screen':          slide,
        '/:screen/:content': content
    };

    var router = Router(routes);
    router.init('../../index.html');

    window.SPOTLIGHT_APP = router;

});
