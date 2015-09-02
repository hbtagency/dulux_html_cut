/* Dulux Virgin Australia
   Author: Jetz Alipalo
*/

var DULUX = DULUX || {};
var loadItems = 3;
var itemid = -1;


DULUX.colourGallery = (function () {

    var

		page = {

		    tracking: function () {

		        //Gallery Filters
		        $('.filter a').on('click', function () {
		            _gaq.push([
						'_trackEvent',
						event.name,
						event.type = 'Filter Click',
						event.label = $(this).data('filter')
		            ]);
		        });

		        $('.link-items a').on('click', function () {
		            _gaq.push([
						'_trackEvent',
						event.name,
						event.type = 'CTA Click',
						event.label = $(this).text()
		            ]);
		        });

		        $('._view').on('click', function () {
		            _gaq.push([
						'_trackEvent',
						event.name,
						event.type = 'Click',
						event.label = 'View Colour Booklets'
		            ]);
		        });

		        $('.booklist a').on('click', function () {
		            _gaq.push([
						'_trackEvent',
						event.name,
						event.type = 'Booklet Click',
						event.label = $(this).text()
		            ]);
		        });

		    },

		    clickImage: function () {
		        $('.item > img').on('click', function () {

		            $('.item > i').remove();
		            $('#image-panel').remove();

		            var img = $(this),
						id = img.parent().data('id'),
						imagePanelstr = "";

		            //alert('clkd = ' + id);

		            $('.item').removeClass('active');
		            img.parent().append('<i>').addClass('active');

		            //Update template
		            $.each(data.panels, function (i, obj) {
		                obj.id == id ? imagePanelstr = page.updatePanel(obj) : undefined;
		            });
		            page.movePanel(img, imagePanelstr);
		            o.showPanel();
		            page.nextPrev(id);

		            // Scoll page to that image panel
		            var margin = 0;
		            if ($('#head-filter').hasClass('collapse')) {
		                margin = -160;
		            }
		            $('body, html').stop().animate({
		                'scrollTop': ($('#image-panel').offset().top + margin)
		            }, 900);

		            //Set Deeplink
		            window.history.pushState("", "", '?itemid=' + id);

		            o.trackSwatch();
		            o.trackGallery(img, img.parent().data('id'));
		            o.nthItem();
		        });
		    },

		    nextPrev: function (index) {

		        var items = o.imgGallery.find('.item'),
					totalDomItems = items.length;

		        $('.img-figure > a').on('click', function (e) {
		            e.preventDefault();
		            $('.item > i').remove();

		            //get index number of Active item
		            var img = $(this),
						iorder;

		            //scan dom items and search for active item
		            $.each(items, function (i, obj) {
		                $(this).hasClass('active') ? iorder = i : null;
		            });

		            //Previous or Next button and for initial load
		            $('.item._links').length ?
						img.hasClass('prev') ?
						$('.item.active').prev('.item._links').length ? iorder = iorder - 2 : iorder = iorder - 1 : $('.item.active').next('.item._links').length ? iorder = iorder + 2 : iorder = iorder + 1 : img.hasClass('prev') ? iorder = iorder - 1 : iorder = iorder + 1;

		            var newItemID;
		            $.each(items, function (e) {
		                if (e == iorder) {
		                    if ($(this).find('img'.length)) {
		                        newItemID = $(this).data('id');
		                        items.removeClass('active');
		                        $(this).addClass('active');
		                        o.trackGallery($(this), $(this).data('id'));
		                        o.nthItem();
		                        return false;
		                    }
		                }
		            });

		            //updatePanel
		            $.each(data.panels, function (i, obj) {
		                if (obj.id == newItemID) {

		                    $('#image-panel').find('.panel-overly').css({
		                        'display': 'block',
		                        'opacity': '1'
		                    });

		                    var $new = {
		                        imagePanel: $('#image-panel'),
		                        swatches: $('.swatches'),
		                        image: $('.img-figure img')
		                    };

		                    //header
		                    $new.imagePanel.find('h1').text(obj.title).attr('data', obj.id);

		                    //swatches
		                    $new.swatches.html('');
		                    for (var i = 0; i < obj.swatches.length; i++) {

		                        var swatch = '<li style="background: #' + obj.swatches[i].hexcolour + '"><span style="color: ' + luminance(obj.swatches[i].hexcolour) + '">' +
									obj.swatches[i].name + '</span><a href="' + obj.swatches[i].link +
									'" target="blank">Order swatch</a></li>';

		                        $(swatch).appendTo($new.swatches);
		                    }

		                    //image
		                    $new.image.remove();
		                    $new.imagePanel.find('.img-figure').append('<img src="' + obj.img + '" />');

		                    //booklet
		                    $new.imagePanel.find('.share-this li:first-child').html('');
		                    $new.imagePanel.find('.share-this li:first-child').append('<a href="' + obj.linkBooklet +
								'"target="blank" class="icon booklet"><i></i>Download Booklet</a>');

		                    // BYTE IT
		                    // Facebook
		                    //console.log($new.imagePanel.find('#fbLink').attr('href'));
		                    $new.imagePanel.find('#fbLink').attr('href', fbFunctionString(obj));

		                    // Tweeter
		                    //console.log($new.imagePanel.find('#twtLink').attr('href'));
		                    $new.imagePanel.find('#twtLink').attr('href', tweetFunctionString(obj));

							// Pinterest
							//console.log($new.imagePanel.find('#pinLink').attr('href'));
		                    $new.imagePanel.find('#pinLink').attr('href', pinterestFunctionString(obj));

		                    
		                    // BYTE IT

		                    o.showPanel();
		                }

		                //Set Deeplink
		                window.history.pushState("", "", '?itemid=' + newItemID);
		            });
		        });
		    },

		    movePanel: function (obj, html) {
		        if (obj.parent().hasClass('last-row')) {
		            $('#img-gallery .item:last-child').after(html);
		        } else if (obj.parent().hasClass('first-item')) {
		            obj.parent().nextAll().each(function () {
		                if ($(this).hasClass('first-item') || $(this).hasClass('last-row')) {
		                    $(this).before(html);
		                    return false;
		                }
		            });
		        } else if (obj.parent().is(':last-child')) {
		            $('#img-gallery .item:last-child').after(html);
		        } else {
		            obj.parent().nextAll().each(function () {
		                if ($(this).hasClass('last-row') || $(this).hasClass('first-item')) {
		                    $(this).before(html);
		                    return false;
		                } else {
		                    $('#img-gallery .item:last-child').after(html);
		                }
		            });
		        }
		    },

		    updatePanel: function (dataIndex) {
		        var li_swatch = "";
		        for (var i = 0; i < dataIndex.swatches.length; i++) {
		            var swatch = '<li style="background: #' + dataIndex.swatches[i].hexcolour + '"><span style="color: ' + luminance(dataIndex.swatches[i].hexcolour) + '">' +
						dataIndex.swatches[i].name + '</span><a href="' + dataIndex.swatches[i].link +
						'" target="blank">Order swatch</a></li>';

		            li_swatch = li_swatch + swatch;
		        }

				var header = '<h1 style="height:38px;" data="' + dataIndex.id + '">' + dataIndex.title + '</h1>';
		        var ul_swatch = '<ul class="swatches clearfix">' + li_swatch + '</ul>';
		        var img_figure = '<div class="img-figure"><a href="#" class="next"></a><a href="#" class="prev"></a><img src="' + dataIndex.img + '" /></div>';

		        // BYTE IT

		        // BYTE IT

		        var share_this = '<ul class="share-this"><li><a href="' + dataIndex.linkBooklet + '" target="blank" class="icon booklet"><i></i>Download Booklet</a></li>' +
					//'<li><a href="https://www.facebook.com/sharer/sharer.php?u=example.org" class="icon fb">Facebook</a></li>' +
                    '<li><a href="' + fbFunctionString(dataIndex) + '" class="icon fb" id="fbLink">Facebook</a></li>' +
					'<li><a href="' + tweetFunctionString(dataIndex) + '" class="icon twit" target="_blank" id="twtLink">Twitter</a></li>' +
					'<li><a href="' + pinterestFunctionString(dataIndex) + '" class="icon pint" target="_blank" id="pinLink" data-pin-do="skipLink">Instagram</a></li></ul>';

		        

		        htmlTemplate = '<div id="image-panel" class="secs clearfix"><div class="panel-overly"></div><a href="#" class="close-panel"></a>' +
					header + ul_swatch + img_figure + share_this + '</div>';
		        return htmlTemplate;
		    },

		    viewAll: function () {
		        o.loading();
		        o.imgGallery.html('');
		        $.each(data.images.items, function (i) {
		            page.appendStr(i);
		        });
		        o.linkItems();
		        o.rowGrid();
		        o.loadDone();
		    },

		    filterColours: function () {

		        o.imgGallery.html('');
		        o.filter.addClass('collapse');
		        o.loading();

		        //Get Filters
		        var colour = $('#patches li.active a').data('filter');

		        //IDs to render
		        var ids = [];
		        $.each(data.images.items, function (i, obj) {
		            colour == obj.colour ? ids.push(i) : null;
		        });

		        //number of items found
		        var countFoundItems = ids.length;

		        //current number of items
		        var itemCount = o.imgGallery.find('.item').length;

		        //Number of each to run
		        var itemsToLoad = data.images.loadItems + itemCount;

		        //Check found items
		        if (!countFoundItems == 0) {
		            $.each(ids, function (i, value) {
		                page.appendStr(value);
		                data.images.items[value];
		            });
		            o.linkItems();
		            o.rowGrid();
		        } else {
		            o.imgGallery.append('No colour Design found');
		        }

		        o.loadDone();
		    },

		    filterSpaces: function () {

		        o.imgGallery.html('');
		        o.filter.addClass('collapse');
		        o.loading();

		        //Get Filters
		        var space = $('#space li.active a').data('filter');

		        //IDs to render
		        var ids = [];
		        $.each(data.images.items, function (i, obj) {
		            space == obj.space ? ids.push(i) : null;
		        });

		        //number of items found
		        var countFoundItems = ids.length;

		        //current number of items
		        var itemCount = o.imgGallery.find('.item').length;

		        //Number of each to run
		        var itemsToLoad = data.images.loadItems + itemCount;

		        //Check found items
		        if (!countFoundItems == 0) {
		            $.each(ids, function (i, value) {
		                page.appendStr(value);
		                data.images.items[value];
		            });
		            o.linkItems();
		            o.rowGrid();
		        } else {
		            o.imgGallery.append('No colour Design found');
		        }

		        o.loadDone();
		    },

		    iniLoader: function (index, loadItem) {
		        o.loading();
		        for (var i = index; i < loadItem; i++) {
		            page.appendStr(i);
		        }
		        o.rowGrid();
		        o.loadDone();
		    },

		    appendStr: function (itemValue) {
		        // data.images.items[itemValue];

		        var item = data.images.items[itemValue];
		        var imgId = item.id,
					url = item.imgThumb,
					width = item.imgWidth,
					title = item.title;
		        var imageStr = '<img src="' + url + '" width="' + width + '" title="' + title + '" height="322" />';

		        //Append images
		        o.imgGallery.append('<div data-id="' + imgId + '" class="item">' + imageStr + '</div>');
		    },

		    global: function () {
		        //initial load
		        page.iniLoader(0, loadItems);

		        $('.filter#patches li a').on('click', function (e) {
		            e.preventDefault();
		            $('.filter').find('li').removeClass('active');
		            $(this).parent().addClass('active');
		            page.filterColours();
		        });

		        $('.filter#space li a').on('click', function (e) {
		            e.preventDefault();
		            $('.filter').find('li').removeClass('active');
		            $(this).parent().addClass('active');
		            page.filterSpaces();
		        });

		        $('.viewall a').add('.loadmore').on('click', function (e) {
		            e.preventDefault();
		            page.viewAll();
		            o.filter.addClass('collapse');
		            $('.filter li').removeClass('active');
		            $('.loadmore').css('display', 'none');
		        });

		        $(window).scroll(function () {
		            var scrollTop = $(window).scrollTop();
		            if (scrollTop >= 280) {
		                $('#head-filter.collapse').addClass('fixed');
		            } else {
		                $('#head-filter.collapse').removeClass('fixed');
		            }
		        });
		    },

		    json: function () {
		        var nocache = new Date().getTime();

		        $.when(
					//$.getJSON("/scripts/ColourGallery2014-scripts/json/loadimages.json.txt", function (response) {
					//	$.each(response, function (i, obj) {
					//		data.images = obj; 
					//	});
                    //}),
                    $.ajax({
                        type: 'POST',
                        url: '/servicesb/colourgallery2014.asmx/getgallery?cache=' + nocache,
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        data: "{}",
                        cache: false,
                        success: function (ret) {

                            $.each(ret, function (i, obj) {
                                data.images = obj;
                            });
                            // BYTE IT
                            // set loadItems variable
                            loadItems = ret.d.loadItems;

                        }
                    }),
                    //$.getJSON("/scripts/ColourGallery2014-scripts/json/panels.json.txt", function (response) {
					//	data.panels = response;
                    //})
                    $.ajax({
                        type: 'POST',
                        url: '/servicesb/colourgallery2014.asmx/getpanels?cache=' + nocache,
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        data: "{}",
                        cache: false,
                        success: function (ret) {
                            data.panels = ret.d.items;
                        }
                    })
				).done(function () {
				    page.global();
				    if (itemid != -1) {
				        page.viewAll();
				        $(".item[data-id='" + itemid + "'] > img").trigger("click");
				    }
				});
		    }
		},

		//Global variables and functions
		o = {
		    imgGallery: $('#img-gallery'),
		    overlay: $('.overlay'),
		    filter: $('#head-filter'),
		    loadmore: $('.loadMore'),
		    tpl: $('.panel-tpl'),
		    loading: function () {
		        o.overlay.css({
		            'display': 'block',
		            'opacity': '1'
		        });
		    },
		    loadDone: function () {
		        o.overlay.animate({
		            opacity: 0
		        }, 300, function () {
		            o.overlay.css('display', 'none');
		        });
		    },
		    linkItems: function () {
		        //**********************************************************
		        //Insert link items

		        var linkhtml = "";

		        for (var i = 0; i < data.images.linkItems.length; i++) {
		            var html = '<li><a href="' + data.images.linkItems[i].link + '" target="blank"><span>' +
						data.images.linkItems[i].title + '</span><i/></a></li>';

		            linkhtml = linkhtml + html;
		        }

		        o.imgGallery.find('.item:nth-child(5)')
					.after('<div class="item _links"><ul class="link-items">' + linkhtml + '</ul></div>');
		    },
		    rowGrid: function () {
		        var options = {
		            itemSelector: ".item",
		            minMargin: 20,
		            maxMargin: 20,
		            firstItemClass: "first-item"
		        };
		        o.imgGallery.rowGrid(options);
		        $('.item:last-child').addClass('last-item');
		        page.clickImage();
		        page.tracking();
		    },
		    showPanel: function () {
		        $('#image-panel').css('display', 'block');

		        //if image complete load
		        $('.img-figure img').load(function () {
		            $('.panel-overly').animate({
		                opacity: 0
		            }, 300, function () {
		                $('.panel-overly').css('display', 'none');
		            });

		            $('.panel-overly').css({
		                'display': 'block',
		                'opacity': '1'
		            });

		            $('.close-panel', $('#image-panel')).on('click', function (e) {
		                e.preventDefault();
		                $('.item > i').remove();
		                $('#image-panel').slideUp('fast', function () {
		                    $(' #image-panel').remove();
		                });
		            });
		        });


		    },
		    nthItem: function () {
		        var item = $('.item.active');
		        if (item.hasClass('last-item')) {
		            $('#image-panel').find('.next').css('display', 'none');
		        } else if (item.is(':first-child')) {
		            $('#image-panel').find('.prev').css('display', 'none');
		        } else {
		            $('#image-panel').find('.next').css('display', 'block');
		            $('#image-panel').find('.prev').css('display', 'block');
		        }
		    },

		    //Recalled for tracking
		    trackSwatch: function () {
		        $('.swatches a').on('click', function () {
		            var text = $(this).parent('li').find('span').text();

		            _gaq.push([
						'_trackEvent',
						event.name,
						event.type = 'CTA Click',
						event.label = 'Order Swatch ' + text
		            ]);
		        });
		    },
		    trackGallery: function (elem, label) {
		        _gaq.push([
					'_trackEvent',
					event.name,
					event.type = 'Expand Image Click',
					event.label = label
		        ]);
		    }
		},

		event = {
		    name: 'Gallery Pages',
		    type: null,
		    label: null
		};

    data = {
        images: [],
        panels: []
    };

    return {
        run: function () {
            page.json();
        }
    };

}());



/////////////////////////////////////////////////////////////
// BYTE IT

function fbShare(url, title, descr, image, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);

    window.open('http://www.facebook.com/sharer.php?s=100&amp;p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}


function fbFunctionString(dataIndex) {

    var facebookURL = document.URL;
    if (facebookURL.indexOf("?itemid=") != -1) {
        facebookURL = facebookURL.substr(0, facebookURL.indexOf("?itemid="));
    }
    facebookURL = facebookURL + '?itemid=' + dataIndex.id;

    var fbImageURL = document.location.hostname + dataIndex.img;

    var functionString = 'javascript:fbShare' +
        '(\'' + facebookURL + '\',\'' +
        'DLX Share' + '\',\'' +
        'Dulux Colour Gallery share popup' +
        '\',\'' + fbImageURL +
        '\',' +
        500 + ',' + 370 +
        ')';

    return functionString;
}


function tweetFunctionString(dataIndex) {
    var twtCopy = $('meta[name=tweeterCopy]').attr("content");
    var twtUrl = document.URL;
    if (twtUrl.indexOf("?itemid=") != -1) {
        twtUrl = twtUrl.substr(0, twtUrl.indexOf("?itemid="));
    }
    twtUrl = twtUrl + '?itemid=' + dataIndex.id;

    var maxLength = 140 - (twtUrl.length + 1);
    if (twtCopy.length > maxLength) {
        twtCopy = twtCopy.substr(0, (maxLength - 3)) + '...';
    }
    var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(twtCopy + ' ' + twtUrl);
    return twtLink;
}

function pinterestFunctionString(dataIndex) {
    var pinCopy = $('meta[name=pinterestCopy]').attr("content");
    var pinUrl = document.URL;
    if (pinUrl.indexOf("?itemid=") != -1) {
        pinUrl = pinUrl.substr(0, pinUrl.indexOf("?itemid="));
    }
    pinUrl = pinUrl + '?itemid=' + dataIndex.id;
    var pinMedia = 'https://' + document.location.hostname + dataIndex.img;
    //var maxLength = 140 - (twtUrl.length + 1);
    //if (twtCopy.length > maxLength) {
    //    twtCopy = twtCopy.substr(0, (maxLength - 3)) + '...';
    //}
    var pinLink = 'http://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(pinUrl) + '&media=' + encodeURIComponent(pinMedia) + '&description=' + encodeURIComponent(pinCopy);
    return pinLink;
}

luminance = function (hexcolour) {
    var r, g, b;

	r = parseInt(hexcolour.substr(0, 2), 16);
    g = parseInt(hexcolour.substr(2, 2), 16);
    b = parseInt(hexcolour.substr(4, 2), 16);
    return ((r * 0.299 + g * 0.587 + b * 0.114) / 256) > 0.5 ? 'black' : 'white';
}