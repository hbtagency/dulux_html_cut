var DULUX = DULUX || {};

DULUX.SurfClub = (function () {

    var 
    introVideoId = null,
    url = null,
    clubVideoId = null,
    beforeImage = null,
    afterImage = null,
    Services = {
        getclubsbystate: '/services/promo/surf-club-2013/getsurfclubs.ashx'
    },
    trackingMessages = {
        campaignName: 'Surf Club Campaign',
        browseClubsByState: 'View All Repaints State Click',
        toggleVideo: 'Specific Club Toggle Video Click',
        toggleBeforeImage: 'Specific Club Toggle Before Click',
        toggleAfterImage: 'Specific Club Toggle After Click',
        mainNavClick: 'Top CTA Click',
        share: 'Share',
        tweet: 'Tweet',
        email: 'Specific Club Email Click',
        projectName: 'Surf Club Project',
        productStrap: 'Weathershield Product Find Out More',
        carouselScroll: 'Latest Repaint Videos Scroll Click',
        carouselFindOutMore: 'Latest Repaint Videos Find Out More About This Club Click',
        clubNameClick: 'View All Repaints Club Click',
        nextPrev: 'Specific Club Scroll Click',
        paintsUsedFindOutMore: 'Specific Club What We Used Find Out More Click',
        formFocus: 'Register A Club Clubname Field Select',
        facebookPage: 'Dulux Facebook Page Click',
        youtubePage: 'Dulux Youtube Page Click'
    },

	init = function () {

	    events();
	    // Only initiate the introduction video if the introduction section exists on the page
	    if ($('#introduction').length) {
	        loadIntroductionVideo();
	        setupSharingLanding();
	    };
	    // Only initiate the featured club carousel if the featured club section exists on the page
	    if ($('#latestRepaints').length) {
	        featuredClubCarousel();
	    };
	    // Only initiate the club video if the club details section exists on the page
	    if ($('#clubDetails').length) {
	        loadClubVideo();
	        loadBeforeAfterImagery();
	        setupSharingClubPage();
	    };
	    progressBar();
	},
    events = function () {
        // Activate registration form on link click

        // Tab System - Browse All Clubs Section
        $(document).on('click', '.state-tabs-navigation li a', function (e) {
            var $obj = $(this),
                loadState = $obj.data('state');
            if (!$obj.hasClass('active')) {
                toggleTabActiveState($obj);
                loadClubsByState(loadState);
                _gaq.push([
                    '_trackEvent',
                    trackingMessages.campaignName,
                    trackingMessages.browseClubsByState,
                    loadState.toUpperCase()
                ]);
            };
            e.preventDefault();
        });
        // Register Button - Register A Club Section
        $(document).on('click', "a.register-your-club, [href='#registerYourClub']", function (e) {
            $('.inner-toggle, .toggle-open').show();
            $('.toggle-closed').hide();
            e.preventDefault();
        });
        $(document).on("click", "#registerBtn", function (e) {
            if ($("#surfClub").hasClass("ie8")) {
                submitRegistration(event);
            }
        });
        // Switch between media tabs
        $(document).on('click', '.project-navigation ul li .nav-wrap a', function (e) {
            var $obj = $(this),
                eventLabel = null,
                clubName = $('.project-details .content-left h3').text(),
                container = $obj.parent().parent();
            if (container.hasClass('sc-video')) {
                eventLabel = trackingMessages.toggleVideo;
            } else if (container.hasClass('sc-before-image')) {
                eventLabel = trackingMessages.toggleBeforeImage;
            } else if (container.hasClass('sc-after-image')) {
                eventLabel = trackingMessages.toggleAfterImage;
            };
            switchMediaTabs($obj);
            _gaq.push([
                '_trackEvent',
                trackingMessages.campaignName,
                eventLabel,
                clubName
            ]);
            e.preventDefault();
        });
        // Main Navigation
        $(document).on('click', '.sc-navigation a', function () {
            var eventLabel = $(this).text();
            url = $(this).attr('href');
            $.scrollTo($(url).offset().top, 500);
            _gaq.push([
                '_trackEvent',
                trackingMessages.campaignName,
                trackingMessages.mainNavClick,
                eventLabel
            ]);
        });
        // Page 1 Social link tracking
        $(document).on('click', '#introduction .social-links a', function () {
            var network = $(this).attr('class'),
                networkCap = network.charAt(0).toUpperCase() + network.slice(1),
                shareType = null;
            if (network === 'facebook') {
                shareType = trackingMessages.share;
            } else if (network === 'twitter') {
                shareType = trackingMessages.tweet;
            };
            _gaq.push([
                '_trackSocial',
                networkCap,
                shareType,
                trackingMessages.projectName
            ]);
        });
        // Page 1 Find out more - product link
        $(document).on('click', '#introduction .product-placement a', function () {
            _gaq.push([
                '_trackEvent',
                trackingMessages.campaignName,
                trackingMessages.mainNavClick,
                trackingMessages.productStrap
            ]);
        });
        // Featured Club Carousel click
        $('.sc-carousel-wrap a.controls').on('click', function () {
            _gaq.push([
                '_trackEvent',
                trackingMessages.campaignName,
                trackingMessages.carouselScroll
            ]);
        });
        // Featured Club Carousel 'Find out more' click
        $('#sc-carousel-slides li a.find-out-more').on('click', function () {
            var trackClubName = $(this).parent().data('club-name');
            _gaq.push([
                '_trackEvent',
                trackingMessages.campaignName,
                trackingMessages.carouselFindOutMore,
                trackClubName
            ]);
        });
        // Specific club click
        $(document).on('click', '.state-information ul li a', function () {
            var trackClubName = $(this).text();
            _gaq.push([
                '_trackEvent',
                trackingMessages.campaignName,
                trackingMessages.clubNameClick,
                trackClubName
            ]);
        });
        // Club page social links
        $(document).on('click', '.project-details .content-left .social-links a', function () {
            var network = $(this).attr('class'),
                networkCap = network.charAt(0).toUpperCase() + network.slice(1),
                shareType = null,
                trackClubName = $('.project-details .content-left h3').text();
            if (network === 'facebook') {
                shareType = trackingMessages.share;
            } else if (network === 'twitter') {
                shareType = trackingMessages.tweet;
            };
            _gaq.push([
                '_trackSocial',
                networkCap,
                shareType,
                trackingMessages.projectName + ' ' + trackClubName
            ]);
        });
        // Club page email link
        $(document).on('click', 'a.email', function () {
            var clubName = $('.project-details .content-left h3').text();
            _gaq.push([
                '_trackEvent',
                trackingMessages.campaignName,
                trackingMessages.email,
                clubName
            ]);
        });
        // Club page next/prev click
        $(document).on('click', '.club-navigation a', function () {
            _gaq.push([
                '_trackEvent',
                trackingMessages.campaignName,
                trackingMessages.nextPrev
            ]);
        });
        // Club page - Paints used - Find out more click
        $(document).on('click', '.project-details .content-right .content-right-inner a', function () {
            var clubName = $('.project-details .content-left h3').text();
            _gaq.push([
                '_trackEvent',
                trackingMessages.campaignName,
                trackingMessages.paintsUsedFindOutMore,
                clubName
            ]);
        });
        // First form input on focus
        $('input#clubNameVal').focus(function () {
            _gaq.push([
                '_trackEvent',
                trackingMessages.campaignName,
                trackingMessages.formFocus
            ]);
        });
        // Footer social oage links
        $(document).on('click', '#scFooter .social-links a', function () {
            var socialPage = null;
            if ($(this).hasClass('facebook')) {
                socialPage = trackingMessages.facebookPage;
            } else if ($(this).hasClass('youtube')) {
                socialPage = trackingMessages.youtubePage;
            };
            _gaq.push([
                '_trackEvent',
                trackingMessages.campaignName,
                socialPage
            ]);
        });

        // Custom validation methods
        $.validator.addMethod('abnVal', abnValCalc, 'This ABN is not valid');
        $.validator.addMethod("phoneAus", function (value, element) {
            return this.optional(element) || /^(\+?61|0)\d{9}$/.test(value.replace(/\s+/g, ""));
        }, "Please specify a valid phone number");
        // Form Validation - Register A Club Section
        $("#aspnetForm").validate({
            onkeyup: false,
            rules: {
                clubNameVal: {
                    required: true
                },
                abnVal: {
                    required: true,
                    digits: true,
                    abnVal: true
                },
                streetAddVal: {
                    required: true
                },
                suburbVal: {
                    required: true
                },
                stateVal: {
                    required: true
                },
                postCodeVal: {
                    required: true,
                    minlength: 4,
                    maxlength: 4,
                    digits: true
                },
                contactNameVal: {
                    required: true
                },
                phoneAus: {
                    required: true,
                    phoneAus: true
                },
                emailAddVal: {
                    required: true,
                    email: true
                }
            },
            messages: {
                clubNameVal: "Please enter your club name",
                streetAddVal: "Please enter your street address",
                suburbVal: "Please enter your suburb",
                stateVal: "Please select your state",
                postCodeVal: "Please enter a valid postcode",
                contactNameVal: "Please enter your contact name",
                emailAddVal: "Please enter a valid email address"
            },
            submitHandler: function () {

                submitRegistration(null);
            }
        });
    },
    // Submit Registration
    submitRegistration = function (event) {

        cleanErrors();

        var postData = {
            abn_val: $("#abnVal").val(),
            club_name: $("#clubNameVal").val(),
            contact_name: $("#contactNameVal").val(),
            email: $("#emailAddVal").val(),
            mobile_no: $("#phoneAus").val(),
            street_address: $("#streetAddVal").val(),
            suburb: $("#suburbVal").val(),
            state: $("#stateVal :selected").val(),
            postcode: $("#postCodeVal").val(),
            comments: $("#commentsVal").val()
        };

        if ($("#surfClub").hasClass("ie8")) {
            if (postData.abn_val == ""
                || postData.abn_val == ""
                || postData.club_name == ""
                || postData.contact_name == ""
                || postData.email == ""
                || postData.mobile_no == ""
                || postData.street_address == ""
                || postData.suburb == ""
                || postData.postcode == "") {
                alert("One or more validation fields are required.");
                return false;
            }
        } else {
            if(event != null)
                event.preventDefault();
        }

        var preText = postData.GroupName;

        $.ajax({
            url: "/services/promo/surf-club-2013/register.ashx",
            type: "POST",
            dataType: "json",
            cache: false,
            data: postData,
            beforeSend: function () {
                showLoadingPanel();
            },
            success: function (data) {

                if (data.success == true) {

                    showResultPanel(data.message);
                    hideLoadingPanel();
                }
                else {

                    hideLoadingPanel();
                    if (data.message == "ABN_ALREADY_REGISTERED") {
                        showABNError();
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                showResultPanel(thrownError);
                hideLoadingPanel();
            }
        });
    }
    // ABN Validation
    abnValCalc = function (value, element) {
        if (!value.length && this.optional(element))
            return true;
        if (value.length != 11 || isNaN(parseInt(value)))
            return false;
        var weighting = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
        var tally = (parseInt(value.charAt(0)) - 1) * weighting[0];
        for (var i = 1; i < value.length; i++) {
            tally += (parseInt(value.charAt(i)) * weighting[i]);
        };
        return (tally % 89) == 0;
    },
    // Video/Before/After Tabs
    switchMediaTabs = function ($obj) {
        var selectedTab = $obj.data('tab-content');
        $obj.parent().parent().addClass('active');
        $obj.parent().parent().siblings().removeClass('active');
        $('.media-panel .' + selectedTab).show();
        $('.media-panel .' + selectedTab).siblings().hide();
    },
    // View All Repaints tabs
    loadClubsByState = function (state) {
        var panelHeight = $('.state-tabs .state-information').height(),
            container = $('.state-tabs .state-information ul');
        container.css({ height: panelHeight + 'px' }).html('');
        container.addClass('loading');
        $.getJSON(getClubs(state), function (data) {
            var clubsList = data.Clubs;
            for (var i = 0; i < clubsList.length; i++) {
                $('<a/>').attr('href', clubsList[i].ClubUrl).html(clubsList[i].ClubName).appendTo('.state-tabs .state-information ul').wrap('<li></li>');
            };
            container.css({ height: 'auto' });
            container.removeClass('loading');
        });
    },
    // Set up sharing on the Landing page
    setupSharingLanding = function () {
        var facebookAnchor = $('#introduction .social-links a.facebook'),
            twitterAnchor = $('#introduction .social-links a.twitter'),
            fbAppID = facebookAnchor.data('fbid'),
            link = facebookAnchor.data('link'),
            image = facebookAnchor.data('image'),
            shareTitle = facebookAnchor.data('title'),
            redirectLink = escape(document.URL),
            desc = facebookAnchor.data('desc'),
            facebookLink = "https://www.facebook.com/dialog/feed?app_id=" + fbAppID + "&link=" + link + "&picture=" + image + "&name=" + shareTitle + "&description=" + desc + "&redirect_uri=" + redirectLink,
            twitterLink = "http://twitter.com/intent/tweet?original_referer=" + link + "&text=" + shareTitle + "&url=" + link;
        facebookAnchor.attr("href", facebookLink).attr("target", "_blank");
        twitterAnchor.attr("href", twitterLink).attr("target", "_blank");
    },
    // Set up sharing on Club page
    setupSharingClubPage = function () {
        var facebookAnchor = $('.project-details .content-left .social-links a.facebook'),
            twitterAnchor = $('.project-details .content-left .social-links a.twitter'),
            emailAnchor = $('.project-details .content-left .social-links a.email'),
            clubName = $('.project-details .content-left h3').text(),
            clubNameURL = clubName.replace(/\s/g, '').toLowerCase();
        fbAppID = facebookAnchor.data('fbid'),
            link = facebookAnchor.data('link') + '/' + clubNameURL,
            image = facebookAnchor.data('image'),
            shareTitle = 'Dulux is helping to paint ' + clubName + ' Australia',
            redirectLink = escape(document.URL),
            facebookLink = "https://www.facebook.com/dialog/feed?app_id=" + fbAppID + "&link=" + link + "&picture=" + image + "&name=" + shareTitle + "&redirect_uri=" + redirectLink,
            twitterLink = "http://twitter.com/intent/tweet?original_referer=" + link + "&text=" + shareTitle + "&url=" + link,
            emailLink = 'mailto:?Subject=' + shareTitle + '&body=' + link;
        facebookAnchor.attr("href", facebookLink).attr("target", "_blank");
        twitterAnchor.attr("href", twitterLink).attr("target", "_blank");
        emailAnchor.attr("href", emailLink);
    },
    // Toggle the active state of the Tab System
    toggleTabActiveState = function ($obj) {
        $obj.addClass('active');
        $obj.parent().siblings().children().removeClass('active');
    },
    // Load the main video on page load
    loadIntroductionVideo = function () {
        introVideoId = $('.introduction-video').data('ytid');
        $('.introduction-video').append('<iframe width="740" height="415" src="https://www.youtube.com/embed/' + introVideoId + '?rel=0" frameborder="0" allowfullscreen></iframe>');
    },
    // Load the club video on page load
    loadClubVideo = function () {
        clubVideoId = $('.video-content').data('ytid');
        if (clubVideoId != '') {
            $('.video-content').append('<iframe width="556" height="336" src="https://www.youtube.com/embed/' + clubVideoId + '?wmode=opaque&rel=0&controls=0&showinfo=0" frameborder="0" allowfullscreen></iframe>');
        } else {
            $('.video-content').hide();
            $('li.sc-video').hide();
            if ($('.before-content').data('before-image') != '') {
                $('.before-content').show();
                $('li.sc-before-image').addClass('active');
            } else if ($('.after-content').data('before-image') != '') {
                $('.after-content').show();
                $('li.sc-after-image').addClass('active');
            };
        };
    },
    // Load the before and after imagery on page load
    loadBeforeAfterImagery = function () {
        beforeImage = $('.before-content').data('before-image');
        afterImage = $('.after-content').data('after-image');
        if (beforeImage != '') {
            $('.before-content').append('<img src="' + beforeImage + '" width="556" height="336" alt="Before" />');
        } else {
            $('.before-content').hide();
            $('li.sc-before-image').hide();
        };
        if (afterImage != '') {
            $('.after-content').append('<img src="' + afterImage + '" width="556" height="336" alt="After" />');
        } else {
            $('.after-content').hide();
            $('li.sc-after-image').hide();
        };
        if (beforeImage === '' && afterImage === '' && $('.video-content').data('ytid') === '') {
            var noMedia = $('.media-panel').data('no-media');
            $('.project-media .dulux-palette').css({ margin: '0' });
            $('.media-panel').append('<img src="' + noMedia + '" width="556" height="336" />');
        };
        $('.sc-gallery-prev, .sc-gallery-next').click(function () {
            $('.before-content').fadeToggle();
            $('.after-content').fadeToggle();
        });
    },
    // Featured Club Carousel
    featuredClubCarousel = function () {
        var firstTime = true;
        $('#sc-carousel-slides').cycle({
            fx: 'scrollHorz',
            speed: 500,
            timeout: 0,
            pagerEvent: 'click',
            pauseOnPagerHover: true,
            next: '#sc-carousel-next',
            prev: '#sc-carousel-prev',
            cleartypeNoBg: true,
            after: function (currSlideElement, nextSlideElement, options, forwardFlag) {
                var ytid = $(nextSlideElement).find('.sc-carousel-slide-video').data('ytid');
                if (firstTime === true) {
                    // On page load populate the club name in the 'Featured Club' heading
                    var initClubName = $(nextSlideElement).data('club-name');
                    $(nextSlideElement).find('.sc-carousel-slide-video').append('<iframe width="740" height="414" class="sc-video" src="https://www.youtube.com/embed/' + ytid + '?rel=0" frameborder="0" allowfullscreen></iframe>');
                    $(nextSlideElement).find('.sc-video-placeholder').fadeOut('slow');
                    firstTime = false;
                } else {
                    // On clicking next/prev populate the rlevant club name in the 'Featured Club' heading
                    var clubName = $(nextSlideElement).data('club-name');
                    $(nextSlideElement).find('.sc-carousel-slide-video').append('<iframe width="740" height="414" class="sc-video" src="https://www.youtube.com/embed/' + ytid + '?rel=0" frameborder="0" allowfullscreen></iframe>');
                    // This Timeout fixes an issue in IE with loading iFrames (White Flash). There is a faux video placeholder/loader in the HTML which needs to be hidden each time the carousel stops animating.
                    // The speed/length of this Timeout is the same as the speed/length of the carousel animation.
                    setTimeout(function () {
                        $(nextSlideElement).find('.sc-video-placeholder').fadeOut('slow');
                    }, 500);
                    $(currSlideElement).find('.sc-video-placeholder').fadeIn('fast');
                    $(currSlideElement).find('.sc-carousel-slide-video').html('');
                };
            }
        });
    },
    showLoadingPanel = function () {
        $(".inner-toggle").before("<div id=\"loading-screen\" class=\"loading-screen\"></div>");
        $("#loading-screen").fadeIn(500);
    },
    hideLoadingPanel = function () {
        $("#loading-screen").fadeOut(500);
    },
    showResultPanel = function (message) {
        $("#registerYourClub .inner-toggle .inner p").remove();
        $("#registerYourClub .inner-toggle .inner").addClass("confirmation-text-container");
        $("#registerYourClub .inner-toggle .inner .register-form").before("<p id=\"confirmation-text\" class=\"confirmation-text\">" + message + "</p>");
        $("#registerYourClub .inner-toggle .inner .register-form").fadeOut(500);
        $("#confirmation-text").fadeIn(500);
        $("#registerYourClub .inner-toggle").animate({
            height: 170
        }, 1000);
        $("html, body").animate({
            scrollTop: ($("#confirmation-text").offset().top - ($(window).height() / 3))
        }, 2000);
    },
    showABNError = function () {
        alert("Sorry, this Surf Club is already registered.");
        var errorHtml = "<label id=\"already-registered-error\" for=\"clubNameVal\" generated=\"true\" class=\"error\" style=\"\">Sorry, this Surf Club is already registered.</label>";
        $("#clubNameVal").after(errorHtml);
    },
    cleanErrors = function () {
        $("#already-registered-error").remove();
    },
    // Our Progress bar
    progressBar = function () {
        var clubsLeft = parseInt($('.progress-bar .current-progress span.goal').html()),
            clubsPainted = parseInt($('.progress-bar .current-progress span.current').html()),
            totalClubs = clubsLeft + clubsPainted,
            multiplier = 517 / 100,
            calculation = Math.round((100 / totalClubs) * clubsPainted),
            handlePosition = calculation * multiplier;
        // If handlePosition is >= the the width of the actual progress bar, update the text to 'Complete', Fill the progress bar with relevant color, change text to white as the background color is dark.
        if (handlePosition >= 517) {
            $('.progress-bar .progress-handle').css({ left: '0px', backgroundColor: '#182b3c' });
            $('.progress-bar .current-progress').html('Complete');
        } else {
            $('.progress-bar .progress-handle').css({ left: -(517 - handlePosition) + 'px' });
        };
    },
    getClubs = function (state) {
        return Services.getclubsbystate + '?state=' + state;
    }
    // public functions
    return {
        init: init
    };

} ());