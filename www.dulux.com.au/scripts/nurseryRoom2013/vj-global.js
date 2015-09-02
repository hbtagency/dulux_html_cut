var MYPROJECT = MYPROJECT || {};

MYPROJECT.expectingmums = (function () {
                
                var   isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone"),
                          isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");                
                
                expectingMums = {
                        init: function (){
                                this.colorRoom();
                                this.idealNursery();
                                this.sickyNursery();
                                this.styleCredit();
                                this.scrollToContent();
                                this.gaTracking();
                        },
                        colorRoom : function(){
                                var        scrollbar =  $("#expect-mums-thumbnails"),
                                    numberColors = scrollbar.find("li"),
                                        room = $("#expect-mums-banner"),
                                        currentScrollBar = 0,
                                        loopInterval = null;
                                        
                                //Get the current width for list of colors
                                currentScrollBar = numberColors.length * 79 - 4;
                                numberColors.parent("ul").css({"width": currentScrollBar});
                                
                                //Color the thumbnail items
                                 $(numberColors).each(function(){
                                        $(this).css({"background" : $(this).find("a").attr("data-color")});
                                        $(this).find("a").attr("href", $(this).find("a").attr("data-color"));
                                })        
                                
                                
                                //Looping color
                                loopColor = function(){
                                        var nextActiveIndex  = scrollbar.find("li.active").length ? scrollbar.find("li").index(scrollbar.find("li.active")) + 1 : 0;
                                        room.animate({'backgroundColor' : scrollbar.find("li").eq(nextActiveIndex).find("a").attr("data-color")});
                                        $(numberColors).removeClass("active");
                                        scrollbar.find("li").eq(nextActiveIndex).addClass("active");
                                }        
                                
                                $(window).load(function(){
                                        loopColor();
                                        loopInterval = setInterval(function(){
                                                loopColor();
                                        }, 2000);
                                });
                                
                                //Color the thumbnail items
                                $(numberColors).find("a").click(function(e){
                                        room.animate({'backgroundColor' : $(this).attr("data-color")});
                                        $(this).parent("li").addClass("active").siblings("li").removeClass("active");        
                                        clearInterval(loopInterval);
                                        e.preventDefault();
                                })        
                                
                                //Mousewheel function for horizontal scrollbar
                                scrollbar.bind('mousewheel', function(event, delta) {        
                                        val = this.scrollLeft - (delta * 70);
                                        $(this).stop().animate({scrollLeft:val},0);
                                })
                        },
                        idealNursery : function(){
                                var nurseryContent = $("#expect-mums-nursery"),
                                        nurseryItem = nurseryContent.find("li > a");                                        

                                //Hover state for ideal nursery item
                                if(isiPad > -1 ||  isiPhone > -1){
                                        $(nurseryItem).hover(function(){        
                                                (this).stop();
                                        }, function(){
                                                (this).stop();        
                                        })
                                } else {
                                        $(nurseryItem).hover(function(){
                                                $(this).stop().animate({"top": "20px"});        
                                                }, function(){
                                                        if($(this).parents(nurseryContent).hasClass("active-dock")){
                                                                if($(this).hasClass("active")){
                                                                        $(this).stop().animate({"top": "20px"}, "fast");        
                                                                } else {
                                                                        $(this).stop().animate({"top": "-20px"}, "fast");
                                                                }
                                                        } else {
                                                                if($(this).hasClass("active")){
                                                                        $(this).stop().animate({"top": "20px"}, "fast");        
                                                                } else {
                                                                        $(this).stop().animate({"top": "0"}, "fast");
                                                                }
                                                        }
                                        })        
                                } 

                        }, 
                        sickyNursery : function(){

                                var nurseryContent = $("#expect-mums-nursery"),
                                        nurseryPos = $("#dreamy-baby-content").position().top - 100,
                                        nurseryEndPos = $(".expect-mums-intro-product").position().top - 75;
        
                                if(isiPad > -1 ||  isiPhone > -1){
                                        nurseryContent.find("a").click(function(){
                                                $(this).removeClass("active");
                                        })        
                                } else {
                                        //Sticky nursery show/hide when scrolling window         
                                        $(window).scroll(function(){
                                                var scrollPos = $(this).scrollTop();
                                                        if(scrollPos >= nurseryPos){
                                                                nurseryContent.addClass("active-dock").css({"position":"fixed", "left":0, "top":-65, "padding":0});
                                                                nurseryContent.find("h3").hide();
                                                        } else{
                                                                nurseryContent.removeClass("active-dock").css({'position': 'relative', "left":0, "top":0, "padding":"20px 0"});
                                                                nurseryContent.find("h3").show();
                                                                nurseryContent.find("a").removeClass("active").stop().animate({"top": "0"}, "fast");
                                                        }        
                                                        
                                                nurseryContent.find("a").each( function() {
                                                        var $divId = $(this).attr("href"),
                                                                divOffset = $($divId).offset().top - 120;
                                                        if( scrollPos >= divOffset) {
                                                                nurseryContent.find("a").removeClass("active").stop().animate({"top": "-20px"}, "fast");
                                                                $(this).addClass("active").stop().animate({"top": "20px"}, "fast");        
                                                        } if(scrollPos > nurseryEndPos){
                                                                nurseryContent.css({"position":"fixed", "left":0, "top":-200, "padding":0});
                                                                nurseryContent.find("a").removeClass("active").stop().animate({"top": "0"}, "fast");
                                                        }        
                                                });                
                                        })        
                                        
                                        //Hash tag to land the correct content
                                        nurseryContent.find("a").click(function(e){
                                                var currentPos = $(this.hash).offset().top;
                                                nurseryContent.find("a").removeClass("active").stop().animate({"top": "-25px"}, "fast");
                                                $(this).addClass("active").stop().animate({"top": "20px"}, "fast");
                                                $("body, html").animate({scrollTop: currentPos - 120}, "slow");
                                                e.preventDefault();
                                        })        
                                }
                        }, 
                        styleCredit : function(){
                                var currentColumns = $(".expect-mums-credits-content");
                                $(currentColumns).each(function(){
                                        var currentHeight = $(this).parent(".em-credits-main-content").height() - 60;
                                        $(this).height(currentHeight);
                                })        
                        },
                        scrollToContent: function () {
                                $('.js-scroll-to').on('click', function (e) {
                                        var currentPos = $(this.hash).offset().top;
                                        $("body, html").animate({scrollTop: currentPos - 120}, "slow");
                                        e.preventDefault();
                                });
                        },
                        gaTracking: function () {
                                var
                                trackingMessages = {
                                        campaign: 'Nursery Room',
                                        vpDreamy: '/colour/nurseryroom/dreamybaby',
                                        vpVintage: '/colour/nurseryroom/vintagebaby',
                                        vpBright: '/colour/nurseryroom/brightbaby',
                                        vpCreative: '/colour/nurseryroom/creativebabies',
                                        vpSugar: '/colour/nurseryroom/sugarbaby',
                                        vpNature: '/colour/nurseryroom/naturebaby',
                                        actionDreamy: 'Dreamy Baby Click',
                                        actionBright: 'Bright Baby Click',
                                        actionCreative: 'Creative Babies Click',
                                        actionSugar: 'Sugar Baby Click',
                                        actionNature: 'Nature Baby Click',
                                        actionWashWear: 'Wash & Wear Click',
                                        actionPromo: 'Nursery Promo Click',
                                        actionBannerHero: 'Hero Banner Click',
                                        labelDreamy: 'Download Scallop Feature Wall Instructions PDF',
                                        labelBright: 'Download Diamond Feature Stencil PDF',
                                        labelCreative: 'Download Striped Feature Wall Instructions PDF',
                                        labelSugar: 'Download Washing Line Wall Design Instructions PDF',
                                        labelNature: 'Download Owl Tree Feature Instructions PDF',
                                        labelWashWear: 'Find out more CTA',
                                        labelPromo: 'Download Nursery Room Colour Consultant Offer CTA',
                                        labelBannerHero: 'Colour Consultancy Find Out More CTA'
                                }

                                //section navigation virtual pageview tracking
                                $(document).on('click', '#dreamy-baby-item a', function () {
                                        _gaq.push([
                                                '_trackPageview',
                                                trackingMessages.vpDreamy
                                        ]);
                                });
                                $(document).on('click', '#vintage-baby-item a', function () {
                                        _gaq.push([
                                                '_trackPageview',
                                                trackingMessages.vpVintage
                                        ]);
                                });
                                $(document).on('click', '#bright-baby-item a', function () {
                                        _gaq.push([
                                                '_trackPageview',
                                                trackingMessages.vpBright
                                        ]);
                                });
                                $(document).on('click', '#creative-babies-item a', function () {
                                        _gaq.push([
                                                '_trackPageview',
                                                trackingMessages.vpCreative
                                        ]);
                                });
                                $(document).on('click', '#sugar-baby-item a', function () {
                                        _gaq.push([
                                                '_trackPageview',
                                                trackingMessages.vpSugar
                                        ]);
                                });
                                $(document).on('click', '#nature-baby-item a', function () {
                                        _gaq.push([
                                                '_trackPageview',
                                                trackingMessages.vpNature
                                        ]);
                                });

                                //button event tracking
                                $('#dreamy-download').on('click', function () {
                                        _gaq.push([
                                                '_trackEvent',
                                                trackingMessages.campaign,
                                                trackingMessages.actionDreamy,
                                                trackingMessages.labelDreamy
                                        ]);
                                });
                                $('#bright-download').on('click', function () {
                                        _gaq.push([
                                                '_trackEvent',
                                                trackingMessages.campaign,
                                                trackingMessages.actionBright,
                                                trackingMessages.labelBright
                                        ]);
                                });
                                $('#creative-download').on('click', function () {
                                        _gaq.push([
                                                '_trackEvent',
                                                trackingMessages.campaign,
                                                trackingMessages.actionCreative,
                                                trackingMessages.labelCreative
                                        ]);
                                });
                                $('#sugar-download').on('click', function () {
                                        _gaq.push([
                                                '_trackEvent',
                                                trackingMessages.campaign,
                                                trackingMessages.actionSugar,
                                                trackingMessages.labelSugar
                                        ]);
                                });
                                $('#nature-download').on('click', function () {
                                        _gaq.push([
                                                '_trackEvent',
                                                trackingMessages.campaign,
                                                trackingMessages.actionNature,
                                                trackingMessages.labelNature
                                        ]);
                                });
                                $('#washwear-download').on('click', function () {
                                        _gaq.push([
                                                '_trackEvent',
                                                trackingMessages.campaign,
                                                trackingMessages.actionWashWear,
                                                trackingMessages.labelWashWear
                                        ]);
                                });
                                $('#promo-download').on('click', function () {
                                        _gaq.push([
                                                '_trackEvent',
                                                trackingMessages.campaign,
                                                trackingMessages.actionPromo,
                                                trackingMessages.labelPromo
                                        ]);
                                });

                                $('#find-out-more').on('click', function () {
                                    _gaq.push([
                                                '_trackEvent',
                                                trackingMessages.campaign,
                                                trackingMessages.actionBannerHero,
                                                trackingMessages.labelBannerHero
                                    ]);
                                });
                        }
                }

        // public functions
        return {
                init: function () {
                        expectingMums.init();
                }
        };

}());