/* Dulux Colour Wall
Author: Sharath Raj
*/

/* BYTE IT Global Variables */
/* Change Accordingly!!!    */

//var cookieDomainString = "duluxcomau.staging.dulux.bytedev.com.au";
var cookieDomainString = "dulux.com.html";



$(document).ready(function () {
	$('body').on('click', '#order', function (e) {
				if (orderedItems) {
                    sapShop();
                }
            });
    colorTabs();
    $("#cw-nav li").click(function () {
        var tab = $(this).attr('id');
        $('.selected').removeClass('selected');
        $('#' + tab).addClass('selected');
        $('#content-' + tab).addClass('selected');
    });

    $("#search").click(function (e) {
        var posX = $(this).offset().left, posY = $(this).offset().top;
        var x = (e.pageX - posX), y = (e.pageY - posY);
        if (x >= 400 && x <= 431 && y >= 9 && y <= 40) {
            $('#search input').trigger('keypress');
        }
    });
	
	$('#search-icon').click(function (e) {

        $('#search input').trigger('keypress');
      
    });

	
	
    $('#search').on("mousemove", function (e) {
        var posX = $(this).offset().left, posY = $(this).offset().top;
        var x = (e.pageX - posX), y = (e.pageY - posY);
        if (x >= 400 && x <= 431 && y >= 9 && y <= 40) {
            $(this).attr('style', 'cursor: pointer');
        } else {
            $(this).attr('style', 'cursor: default');
        }
    });

    $("#all").click(function () {
        createAllColoursPage(allColoursData);
    });

    $("#spl").click(function () {
        createSpecialitiesPage(specialtiesData);
    });

    $('#content-all').on("click", ".content-all-palette", function () {
        var current = $(this).attr('id');
        createHue(current);
    });

    $('#content-all').on("click", ".canvas-colors", function () {
        var current = $(this).attr('id');
        createHue(current);
    });

    $('#content-all').on("click", ".valid", function (e) {
        $('#content-all-hue').append('<div id="canvas"></div>');
        createCanvas($(this), "#content-all-hue");
    });

    $('#content-all-hue').on("scroll", function (e) {
        if ($(this)[0].scrollLeft == 0) $('#content-all-hue #scrollLeft').attr('class', 'scrollInVisible');
        if ($(this)[0].scrollLeft > 0) $('#content-all-hue #scrollLeft').attr('class', 'scrollVisible');
        if ($(this)[0].scrollLeft == ($(this)[0].scrollWidth - $(this).width())) $('#content-all-hue #scrollRight').attr('class', 'scrollInVisible');
        if ($(this)[0].scrollLeft < ($(this)[0].scrollWidth - $(this).width())) $('#content-all-hue #scrollRight').attr('class', 'scrollVisible');
        // IE7 or lower specific
        if (ie == 7) {
            $('#content-all-hue #scrollLeft').attr('style', 'left: ' + $(this)[0].scrollLeft + 'px');
            $('#content-all-hue #scrollRight').attr('style', 'left: ' + (parseInt($(this)[0].scrollLeft) + 888) + 'px');
        }
    });

    $('#content-spc-hue').on("scroll", function (e) {
        if ($(this)[0].scrollLeft == 0) $('#content-spc-hue #scrollLeft').attr('class', 'scrollInVisible');
        if ($(this)[0].scrollLeft > 0) $('#content-spc-hue #scrollLeft').attr('class', 'scrollVisible');
        if ($(this)[0].scrollLeft == ($(this)[0].scrollWidth - $(this).width())) $('#content-spc-hue #scrollRight').attr('class', 'scrollInVisible');
        if ($(this)[0].scrollLeft < ($(this)[0].scrollWidth - $(this).width())) $('#content-spc-hue #scrollRight').attr('class', 'scrollVisible');
        // IE7 or lower specific
        if (ie == 7) {
            $('#content-spc-hue #scrollLeft').attr('style', 'left: ' + $(this)[0].scrollLeft + 'px');
            $('#content-spc-hue #scrollRight').attr('style', 'left: ' + (parseInt($(this)[0].scrollLeft) + 888) + 'px');
        }
    });

    $('#content-tra-hue').on("scroll", function (e) {
        if ($(this)[0].scrollLeft == 0) $('#content-tra-hue #scrollLeft').attr('class', 'scrollInVisible');
        if ($(this)[0].scrollLeft > 0) $('#content-tra-hue #scrollLeft').attr('class', 'scrollVisible');
        if ($(this)[0].scrollLeft == ($(this)[0].scrollWidth - $(this).width())) $('#content-tra-hue #scrollRight').attr('class', 'scrollInVisible');
        if ($(this)[0].scrollLeft < ($(this)[0].scrollWidth - $(this).width())) $('#content-tra-hue #scrollRight').attr('class', 'scrollVisible');
        // IE7 or lower specific
        if (ie == 7) {
            $('#content-tra-hue #scrollLeft').attr('style', 'left: ' + $(this)[0].scrollLeft + 'px');
            $('#content-tra-hue #scrollRight').attr('style', 'left: ' + (parseInt($(this)[0].scrollLeft) + 888) + 'px');
        }

    });

    $('#content-cbd-hue').on("scroll", function (e) {
        if ($(this)[0].scrollLeft == 0) $('#content-cbd-hue #scrollLeft').attr('class', 'scrollInVisible');
        if ($(this)[0].scrollLeft > 0) $('#content-cbd-hue #scrollLeft').attr('class', 'scrollVisible');
        if ($(this)[0].scrollLeft == ($(this)[0].scrollWidth - $(this).width())) $('#content-cbd-hue #scrollRight').attr('class', 'scrollInVisible');
        if ($(this)[0].scrollLeft < ($(this)[0].scrollWidth - $(this).width())) $('#content-cbd-hue #scrollRight').attr('class', 'scrollVisible');
        // IE7 or lower specific
        if (ie == 7) {
            $('#content-cbd-hue #scrollLeft').attr('style', 'left: ' + $(this)[0].scrollLeft + 'px');
            $('#content-cbd-hue #scrollRight').attr('style', 'left: ' + (parseInt($(this)[0].scrollLeft) + 888) + 'px');
        }

    });

    $('#content-srh-hue').on("scroll", function (e) {
        if ($(this)[0].scrollLeft == 0) $('#content-srh-hue #scrollLeft').attr('class', 'scrollInVisible');
        if ($(this)[0].scrollLeft > 0) $('#content-srh-hue #scrollLeft').attr('class', 'scrollVisible');
        if ($(this)[0].scrollLeft == ($(this)[0].scrollWidth - $(this).width())) $('#content-srh-hue #scrollRight').attr('class', 'scrollInVisible');
        if ($(this)[0].scrollLeft < ($(this)[0].scrollWidth - $(this).width())) $('#content-srh-hue #scrollRight').attr('class', 'scrollVisible');
        // IE7 or lower specific
        if (ie == 7) {
            $('#content-srh-hue #scrollLeft').attr('style', 'left: ' + $(this)[0].scrollLeft + 'px');
            $('#content-srh-hue #scrollRight').attr('style', 'left: ' + (parseInt($(this)[0].scrollLeft) + 888) + 'px');
        }

    });

    $('#cw-nav-content').on("click", "#scrollLeft", function () {
        var parent = $(this).parent()[0];
        parent.scrollLeft -= 285;
    });
    $('#cw-nav-content').on("click", "#scrollRight", function () {
        var parent = $(this).parent()[0];
        parent.scrollLeft += 285;
    });

    $('#cw-nav-content').on("click", ".ordered-close", function (e) {
        orderedItems.splice(parseInt($(this)[0].id), 1);
        $('#canvas #list').empty();
        createUpdateOrders(orderedItems);
    });

    $('#spc').click(function () {
        CreateSamplePotCanvas();
    });

	function CreateSamplePotCanvas()
	{
		$.ajax({

            //type: 'GET',
            //url: '/services/colour-wall/selectSamplepots.txt', //selectSpeciality 
            //dataType: 'json',
            //data: { SpecialityName: "SamplePots" },

            type: 'POST',
            url: '/servicesb/ColourWallServices.asmx/selectsamplepots', // selectSpeciality 
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: "{}",

            success: function (data) {
                $('#content-spc-hue').empty();
                var rows, cols, autoGrid;
                rowMax = rows = parseInt(data.d.Response.Data.HueGroup.RowMax);
                colMax = cols = parseInt(data.d.Response.Data.HueGroup.ColumnMax);
                
				rowMax = rows = (rowMax * colMax) / 10
				colMax = cols = 10;
				
				if (cols < 10) cols = 10;
                if (rows < 10) rows = 10;
				
				
				
				//cols = 10;
                for (var index = 1; index <= rows; index++) {
                    $('#content-spc-hue').append('\
						<div id="row' + index + '" style="height: 52px; width: ' + (cols * 95) + 'px" class="colorRow"></div>\
					')
                    for (var i = 1; i <= cols; i++) {
                        $('#content-spc-hue #row' + index).append('\
							<div id="grid' + index + '-' + i + '">\
								<span class="ChipNumber"></span>\
								<span class="pot-flag"></span>\
								<span class="Name"></span>\
							</div>\
						');
                    }
                }
                $('#content-spc-hue').append('\
					<div id="scrollLeft" class="scrollInVisible"></div>\
					<div id="scrollRight" class="scrollInVisible"></div>\
				');
                if ($('#content-spc-hue')[0].scrollWidth > 950) $('#content-spc-hue #scrollRight').addClass('scrollVisible');
                var rowIndex, element, index = 0;
                $.each(data.d.Response.Data.HueGroup.Row, function (i, val) {
                    rowIndex = val.Index;
                    $.each(val.Chip, function (j, obj) {
                        element = $('#content-spc-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index);
                        //element = $('#content-spc-hue div div:eq(' + index + ')');
                        element.data("ItemID", obj.Colour.ItemID);
                        element.data("SpecifierNumber", obj.Colour.SpecifierNumber);
                        element.data("ChipNumber", obj.Colour.ChipNumber);
                        element.data("Name", obj.Colour.Name);
                        element.data("R", obj.Colour.R);
                        element.data("G", obj.Colour.G);
                        element.data("B", obj.Colour.B);
                        element.data("SamplePot", obj.Colour.SamplePot);
                        element.data("row", rowIndex);
                        element.data("col", obj.Index);
                        element.addClass('valid');
                        element.attr('style', 'background-color: rgb(' + obj.Colour.R + ',' + obj.Colour.G + ',' + obj.Colour.B + '); color: ' + (luminance(obj.Colour.R, obj.Colour.G, obj.Colour.B)) + ';');
                        
						$('#content-spc-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .ChipNumber')[0].innerHTML = FormatChipNumber(obj.Colour.ChipNumber);
                        //$('#content-spc-hue div div:eq(' + index + ') .ChipNumber')[0].innerHTML = obj.Colour.ChipNumber;
                        
						$('#content-spc-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .Name')[0].innerHTML = obj.Colour.Name;
                        //$('#content-spc-hue div div:eq(' + index + ') .Name')[0].innerHTML = obj.Colour.Name;
                        
						if (obj.Colour.SamplePot == "True") $('#content-spc-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .pot-flag').attr('style', 'background: url(/images/colour-wall/pot.png) no-repeat');
                        //if (obj.Colour.SamplePot == "True") $('#content-spc-hue div div:eq(' + index + ') .pot-flag').attr('style', 'background: url(/images/colour-wall/pot.png) no-repeat');
                        
						if (!visited && getUrlVars()["ItemID"] && getUrlVars()["ItemID"] == obj.Colour.ItemID) {
                            autoGrid = "#grid" + rowIndex + '-' + obj.Index + "";
                        }
                        index++;
                    })
                });

                if (!visited && autoGrid) {
                    $(autoGrid).trigger('click');
                    visited = 1;
                }
            }
        });
	}
	
    $('#content-spl').on("click", ".content-spl-types", function () {
        var current = $(this).attr('id');
        $("#content-spl-canvas").attr('style', 'display: none');
        $("#content-spl-hue").attr('class', 'select');

        createSpecialitiesGrid(current);
    });

    $('#content-spl-hue').on("change", "#splSelect", function () {
        createSpecialitiesGrid(this.value);
    });

    $('#tra').click(function () {
        $.ajax({

            //type: 'GET',
            //url: '/services/colour-wall/selectTraditionals.txt',
            //contentType: 'application/json',
            //dataType: 'json',
            //data: { SpecialityName: 'Traditionals'},


            type: 'POST',
            url: '/servicesb/ColourWallServices.asmx/selectspeciality', // selectSpeciality 
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: "{ 'SpecialityName': 'Traditionals'}",

            success: function (data) {
                $('#content-tra-hue').empty();
                var rows, cols, autoGrid;

                var responseObj = data.d.Response.Data;

                rowMax = rows = parseInt(responseObj.HueGroup.RowMax);
                colMax = cols = parseInt(responseObj.HueGroup.ColumnMax);

                if (cols < 10) cols = 10;
                if (rows < 10) rows = 10;
                for (var index = 1; index <= rows; index++) {
                    $('#content-tra-hue').append('\
						<div id="row' + index + '" style="height: 52px; width: ' + (cols * 95) + 'px" class="colorRow"></div>\
					')
                    for (var i = 1; i <= cols; i++) {
                        $('#content-tra-hue #row' + index).append('\
							<div id="grid' + index + '-' + i + '">\
								<span class="ChipNumber"></span>\
								<span class="pot-flag"></span>\
								<span class="Name"></span>\
							</div>\
						');
                    }
                }

                $('#content-tra-hue').append('\
					<div id="scrollLeft" class="scrollInVisible"></div>\
					<div id="scrollRight" class="scrollInVisible"></div>\
				');
                if ($('#content-tra-hue')[0].scrollWidth > 950) $('#content-tra-hue #scrollRight').addClass('scrollVisible');

                var rowIndex, rowNum, element;
                $.each(responseObj.HueGroup.Row, function (i, val) {
                    rowIndex = val.Index;

                    $.each(val.Chip, function (j, obj) {

                        element = $('#content-tra-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index);
                        element.data("ItemID", obj.Colour.ItemID);
                        element.data("SpecifierNumber", obj.Colour.SpecifierNumber);
                        element.data("ChipNumber", obj.Colour.ChipNumber);
                        element.data("Name", obj.Colour.Name);
                        element.data("R", obj.Colour.R);
                        element.data("G", obj.Colour.G);
                        element.data("B", obj.Colour.B);
                        element.data("SamplePot", obj.Colour.SamplePot);
                        element.data("row", rowIndex);
                        element.data("col", obj.Index);
                        element.addClass('valid');
                        element.attr('style', 'background-color: rgb(' + obj.Colour.R + ',' + obj.Colour.G + ',' + obj.Colour.B + '); color: ' + (luminance(obj.Colour.R, obj.Colour.G, obj.Colour.B)) + ';');

                        var selector = '#content-tra-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .ChipNumber';

                        $(selector)[0].innerHTML = FormatChipNumber(obj.Colour.ChipNumber);

                        $('#content-tra-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .Name')[0].innerHTML = obj.Colour.Name;
                        if (obj.Colour.SamplePot == "True") $('#content-tra-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .pot-flag').attr('style', 'background: url(/images/colour-wall/pot.png) no-repeat');
                        if (!visited && getUrlVars()["ItemID"] && getUrlVars()["ItemID"] == obj.Colour.ItemID) {
                            autoGrid = "#grid" + rowIndex + '-' + obj.Index + "";
                        }
                    })
                });

                if (!visited && autoGrid) {
                    $(autoGrid).trigger('click');
                    visited = 1;
                }
            }
        });
    });

    $('#cbd').click(function () {

        $.ajax({
            type: 'POST',
            url: '/servicesb/ColourWallServices.asmx/selectspeciality', // selectSpeciality 
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: "{ 'SpecialityName': 'Colorbond'}",

            success: function (data) {
                $('#content-cbd-hue').empty();
                var rows, cols, autoGrid;

                var responseObj = data.d.Response.Data;

                rowMax = rows = parseInt(responseObj.HueGroup.RowMax);
                colMax = cols = parseInt(responseObj.HueGroup.ColumnMax);

                if (cols < 10) cols = 10;
                if (rows < 10) rows = 10;
                for (var index = 1; index <= rows; index++) {
                    $('#content-cbd-hue').append('\
						<div id="row' + index + '" style="height: 52px; width: ' + (cols * 95) + 'px" class="colorRow"></div>\
					');
                    for (var i = 1; i <= cols; i++) {
                        $('#content-cbd-hue #row' + index).append('\
							<div id="grid' + index + '-' + i + '">\
								<span class="ChipNumber"></span>\
								<span class="pot-flag"></span>\
								<span class="Name"></span>\
							</div>\
						');
                    }
                }

                $('#content-cbd-hue').append('\
					<div id="scrollLeft" class="scrollInVisible"></div>\
					<div id="scrollRight" class="scrollInVisible"></div>\
				');
                if ($('#content-cbd-hue')[0].scrollWidth > 950) $('#content-cbd-hue #scrollRight').addClass('scrollVisible');

                var rowIndex, rowNum, element;
                $.each(responseObj.HueGroup.Row, function (i, val) {
                    rowIndex = val.Index;

                    $.each(val.Chip, function (j, obj) {

                        element = $('#content-cbd-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index);
                        element.data("ItemID", obj.Colour.ItemID);
                        element.data("SpecifierNumber", obj.Colour.SpecifierNumber);
                        element.data("ChipNumber", obj.Colour.ChipNumber);
                        element.data("Name", obj.Colour.Name);
                        element.data("R", obj.Colour.R);
                        element.data("G", obj.Colour.G);
                        element.data("B", obj.Colour.B);
                        element.data("SamplePot", obj.Colour.SamplePot);
                        element.data("row", rowIndex);
                        element.data("col", obj.Index);
                        element.addClass('valid');
                        element.attr('style', 'background-color: rgb(' + obj.Colour.R + ',' + obj.Colour.G + ',' + obj.Colour.B + '); color: ' + (luminance(obj.Colour.R, obj.Colour.G, obj.Colour.B)) + ';');

                        var selector = '#content-cbd-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .ChipNumber';

                        $(selector)[0].innerHTML = FormatChipNumber(obj.Colour.ChipNumber);

                        $('#content-cbd-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .Name')[0].innerHTML = obj.Colour.Name;
                        if (obj.Colour.SamplePot == "True") $('#content-cbd-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .pot-flag').attr('style', 'background: url(/images/colour-wall/pot.png) no-repeat');
                        if (!visited && getUrlVars()["ItemID"] && getUrlVars()["ItemID"] == obj.Colour.ItemID) {
                            autoGrid = "#grid" + rowIndex + '-' + obj.Index + "";
                        }
                    });
                });

                if (!visited && autoGrid) {
                    $(autoGrid).trigger('click');
                    visited = 1;
                }
            }
        });
    });

    $('#search input').keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);

        if (((code == 13 || (e && (e.keyCode == undefined))) && ($('#search input').val() != ""))) {
            var searchString = $('#search input').val();
            e.preventDefault();
            $('.selected').removeClass('selected');
            $('#search').addClass('selected');
            $('#content-search').addClass('selected');
			ga('send', 'event', 'Colour Wall', 'Colour Wall Search', searchString);
			//_gaq.push(['_trackEvent', 'Colour Wall', 'Colour Wall Search', searchString]);
			
            $.ajax({
                type: 'POST', //type: 'GET',
                url: '/servicesb/colourwallservices.asmx/search', // search.txt   '/services/colour-wall/search'
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: "{ 'searchTerm': '" + searchString + "' }",
                success: function (resp) {
                    var data = resp.d;
                    $('#content-srh-canvas').empty();
                    $('#content-srh-hue').empty();
                    var rows, cols, autoGrid;
                    var totalColours = 0;
					try {
						totalColours = parseInt(data.Data.SearchResults.Specifier.Colours.length);
						//totalColours = parseInt(data.Data.SearchResults.Consumer.Colours.length);
					}
					catch(err) {
					}
					
                    $('#content-srh-canvas').append('You searched for "' + searchString + '".<br/><br/>' + ((data.StatusCode == 1) ? "" + totalColours + " results have been found." : "No results were found for your search. Please search again or click on a tab to explore the Colour Wall"));
                    rowMax = rows = 10;
                    colMax = cols = Math.ceil(totalColours / 10);
                    if (cols < 10) cols = 10;
                    if (rows < 10) rows = 10;
                    for (var index = 1; index <= rows; index++) {
                        $('#content-srh-hue').append('\
							<div id="row' + index + '" style="height: 52px; width: ' + (cols * 95) + 'px" class="colorRow"></div>\
						')
                        for (var i = 1; i <= cols; i++) {
                            $('#content-srh-hue #row' + index).append('\
								<div id="grid' + index + '-' + i + '">\
									<span class="ChipNumber"></span>\
									<span class="pot-flag"></span>\
									<span class="Name"></span>\
								</div>\
							');
                        }
                    }

                    $('#content-srh-hue').append('\
						<div id="scrollLeft" class="scrollInVisible"></div>\
						<div id="scrollRight" class="scrollInVisible"></div>\
					');
                    if ($('#content-srh-hue')[0].scrollWidth > 950) $('#content-srh-hue #scrollRight').addClass('scrollVisible');

                    var rowIndex, rowNum, element, index = 0;
					var autoGrid;

                    // $.each(data.Data.SearchResults.Consumer.Colours, function (i, val) {
                        // element = $('#content-srh-hue div div:eq(' + index + ')');
                        // element.data("ItemID", val.ItemID);
                        // element.data("SpecifierNumber", val.SpecifierNumber);
                        // element.data("ChipNumber", val.ChipNumber);
                        // element.data("Name", val.Name);
                        // element.data("R", val.R);
                        // element.data("G", val.G);
                        // element.data("B", val.B);
						// element.data("Finish", val.Finish);
                        // element.data("SamplePot", val.SamplePot);
                        // element.addClass('valid');
                        // element.attr('data-isspecifiercolour', 'false');
                        // element.attr('style', 'background-color: rgb(' + val.R + ',' + val.G + ',' + val.B + '); color: ' + (luminance(val.R, val.G, val.B)) + ';');
                        // $('#content-srh-hue div div:eq(' + index + ') .ChipNumber')[0].innerHTML = FormatChipNumber(val.ChipNumber);
                        // $('#content-srh-hue div div:eq(' + index + ') .Name')[0].innerHTML = val.Name;
                        // if (val.SamplePot == "True") $('#content-srh-hue div div:eq(' + index + ') .pot-flag').attr('style', 'background: url(/images/colour-wall/pot.png) no-repeat');
                        // index++;
                    // });
					// BYTE IT - Nov 2013 - Specifier colours available
                    $.each(data.Data.SearchResults.Specifier.Colours, function (i, val) {
                        element = $('#content-srh-hue div div:eq(' + index + ')');
                        element.data("ItemID", val.ItemID);
                        element.data("SpecifierNumber", val.SpecifierNumber);
                        element.data("ChipNumber", val.ChipNumber);	// SAME AS SPECIFIERNUMBER FOR SPECIFIER COLOURS
                        if(!val.ChipNumber || val.ChipNumber == "")
                        {
                          element.data("ChipNumber", val.SpecifierNumber);	// SAME AS SPECIFIERNUMBER FOR SPECIFIER COLOURS
                          
                        }
                        
                        element.attr('data-isspecifiercolour', val.IsPotentialSpecifier);
						element.attr('data-canpowdercoating', val.CanPowderCoat);                        
						
                        element.data("Name", val.Name);
                        element.data("R", val.R);
                        element.data("G", val.G);
                        element.data("B", val.B);
                        element.data("Finish", val.Finish);
                        element.data("CanPowderCoat", val.CanPowderCoat);
                        element.data("SamplePot", val.SamplePot);
                        
                        element.addClass('valid');
                        element.attr('style', 'background-color: rgb(' + val.R + ',' + val.G + ',' + val.B + '); color: ' + (luminance(val.R, val.G, val.B)) + ';');
                        $('#content-srh-hue div div:eq(' + index + ') .ChipNumber')[0].innerHTML = FormatChipNumber(val.ChipNumber);
                        $('#content-srh-hue div div:eq(' + index + ') .Name')[0].innerHTML = val.Name;
                        if (val.SamplePot == "True") $('#content-srh-hue div div:eq(' + index + ') .pot-flag').attr('style', 'background: url(/images/colour-wall/pot.png) no-repeat');
						if (!visited && getUrlVars()["ItemID"] && getUrlVars()["ItemID"] == val.ItemID) {
                            autoGrid = element.attr('id');
                        }
                        index++;
                    });
					
					if (!visited && autoGrid) {
                        $("#" + autoGrid).trigger('click');
                        visited = 1;
                    }
                }
            });
        }
    });

    $('#content-spc').on("click", ".valid", function (e) {
        $('#content-spc-hue').append('<div id="canvas"></div>');
        createCanvas($(this), "#content-spc-hue");
    });

    $('#content-spl').on("click", ".valid", function (e) {
        $('#splBottom').append('<div id="canvas"></div>');
        createCanvas($(this), "#content-spl-hue");
    });

    $('#content-cbd').on("click", ".valid", function (e) {
        $('#content-cbd-hue').append('<div id="canvas"></div>');
        createCanvas($(this), "#content-cbd-hue");
    });

    $('#content-tra').on("click", ".valid", function (e) {
        $('#content-tra-hue').append('<div id="canvas"></div>');
        createCanvas($(this), "#content-tra-hue");
    });

    $('#content-search').on("click", ".valid", function (e) {
        $('#content-srh-hue').append('<div id="canvas"></div>');
        createCanvas($(this), "#content-srh-hue");
    });

    checkOrderButton();
	
	// If tab = sp
		// show SamplePots tab
		var tab = getParameterByName("tab");
		 if(tab && tab == 'sp')
		 {
			CreateSamplePotCanvas();
			var tab = 'spc';
			$('.selected').removeClass('selected');
			$('#' + tab).addClass('selected');
			$('#content-' + tab).addClass('selected');
		 }
		

});

function getParameterByName(name) {
    			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		        	results = regex.exec(location.search);
		    	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		
function checkOrderButton() {
    if (orderedItems.length == 0) {
        $('#order').addClass('disabled');
        $('#order').removeClass('enabled');
    }
    else {
        $('#order').removeClass('disabled');
        $('#order').addClass('enabled');
    }
}

var allColoursData, specialtiesData;

colorTabs = function () {
    $.ajax({
        type: 'GET',
        url: '/services/colour-wall/colorWallData.txt',
        dataType: 'json',
        success: function (data) {
            allColoursData = data.siteData.siteMap.allColours;
            //specialtiesData = data.siteData.siteMap.specialties;
            createAllColoursPage(allColoursData);
            //createSpecialitiesPage(specialtiesData);
        }
    });

    // Get specialties from server - 06 May 2013
    $.ajax({
        type: 'POST',
        url: '/servicesb/colourwallservices.asmx/getcolourwalldata',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: "{ }",
        success: function (msg) {
            var data = msg.d;
            specialtiesData = data.SiteData.siteMap.specialties;
            createSpecialitiesPage(specialtiesData);


            // Set page banner
            $('#placeHolder').css("background-image", "url(" + encodeURI(data.SiteData.siteMap.pageBanner) + ")");
            // Set page header
            $('#colorChartHeader').html(data.SiteData.siteMap.pageHeader);
            // Set page introduction
            $('#colorChartText').html(htmlForTextWithEmbeddedNewlines(data.SiteData.siteMap.pageIntroduction));
            // Set SamplePot header
            $('#content-spc-canvas').html(htmlForTextWithEmbeddedNewlines(data.SiteData.siteMap.pageSamplePotHeader));
            // Set Traditional header
            $('#content-tra-canvas').html(htmlForTextWithEmbeddedNewlines(data.SiteData.siteMap.pageTraditionalHeader));
            // Set Colorbond header
            $('#content-cbd-canvas').html(htmlForTextWithEmbeddedNewlines(data.SiteData.siteMap.pageColorbondHeader));
        }
    });


};

function htmlForTextWithEmbeddedNewlines(text) {
    var htmls = [];
    var lines = text.split(/\n/);
    // The temporary <div/> is to perform HTML entity encoding reliably.
    //
    // document.createElement() is *much* faster than jQuery('<div/>')
    // http://stackoverflow.com/questions/268490/
    //
    // You don't need jQuery but then you need to struggle with browser
    // differences in innerText/textContent yourself
    var tmpDiv = jQuery(document.createElement('div'));
    for (var i = 0; i < lines.length; i++) {
        htmls.push(tmpDiv.text(lines[i]).html());
    }
    return htmls.join("<br/>");
}

createAllColoursPage = function (data) {
    if ($('#content-all-tab').hasClass('clicked')) $('#content-all-tab').removeClass('clicked');
    $('#content-all-tab').empty();
    $('#content-all-hue').empty();
    $('#content-all-canvas').empty();
    $("#content-all-canvas").attr('style', 'display: block');
    var bgcolor = ['"#c8bea6"', '#747472', '#847870', '#4c3267', '#065a7e', '#8e8b42', '#f4be47', '#D48036', '#97332C'];
    var startColor = ['#c8bea6', '#949493', '#847870', '#6d518a', '#485289', '#a9a566', '#f5cb3f', '#ec9b54', '#8E433D'];
    var endColor = ['#c0b18c', '#5a5a58', '#645750', '#522259', '#14195d', '#716b29', '#e5ad15', '#d48036', '#712824'];

    $.each(data.hueBoard.hueBoardItem, function (i, val) {
		var title = val.text;
		if(title == 'Whites')
		{
			title = 'Whites & Neutrals';
		}
        $('#content-all-tab').append('\
			<div id="' + val.text + '" class="content-all-palette" onclick="ga(\'send\', \'event\', \'Dulux Website 2015 Refresh\', \'Colour Wall Palette Click\', \'' + val.text  + '\');"\
																style="background-color: ' + (val.color || bgcolor[i]) + ';\
		 														background: ' + (val.color || bgcolor[i]) + ';\
		 														background-image: linear-gradient(top, ' + startColor[i] + ' 35%, ' + endColor[i] + ' 65%);\
		 														background-image: -o-linear-gradient(top, ' + startColor[i] + ' 35%, ' + endColor[i] + ' 65%);\
		 														background-image: -moz-linear-gradient(top, ' + startColor[i] + ' 35%, ' + endColor[i] + ' 65%);\
		 														background-image: -webkit-linear-gradient(top, ' + startColor[i] + ' 35%, ' + endColor[i] + ' 65%);\
		 														background-image: -ms-linear-gradient(top, ' + startColor[i] + ' 35%, ' + endColor[i] + ' 65%);\
		 														background-image: -webkit-gradient(linear, right top, right bottom,	color-stop(0.35, ' + startColor[i] + '), color-stop(0.65, ' + endColor[i] + '));">\
				<div class="palette-text">\
					' + title + '\
				</div>\
				<div class="overlay"></div>\
			</div>\
		')

        $('#content-all-canvas').append('\
			<div id="' + val.text + '" class="canvas-colors" style="background: url(/images/colour-wall/' + val.text + '_canvas.png) no-repeat">\
				<img class="canvas-hover" src="/images/colour-wall/canvas_hover.png"></img>\
			</div>\
		');
    });

    $('#content-all-canvas').append('\
		<div id="selectColor">Select a colour palette to start</div>\
	');

    if (!visited && getUrlVars()["HueName"]) {
        $('#' + getUrlVars()["HueName"]).trigger('click');
    }
    if (!visited && getUrlVars()["SpecialityName"]) {
        $('#' + ((getUrlVars()["SpecialityName"] == "Traditionals") ? "tra" : ((getUrlVars()["SpecialityName"] == "SamplePots") ? "spc" : "spl"))).trigger('click');
    }
	
	if (!visited && getUrlVars()["SearchColour"]) {
        $('#search-field').val(decodeURIComponent(getUrlVars()["SearchColour"]));
        $('#search input').trigger('keypress');
    }
};

var visited = 0;

// BYTE IT
// Do not show if it starts with 'W' or 'G' but show if is 'GR'
function FormatChipNumber(cn)
{
	if(typeof cn == 'undefined')
		return cn;
		
	var ret = cn;
	
	if(cn.substring(0,1) == 'W')
	{
		return '';
	}
	
	if(cn.substring(0,1) == 'G' && cn.substring(0,2) != 'GR')
	{
		return '';
	}
	
	if(cn.substring(0,2) == 'LW')
	{
		return '';
	}
	
	if(cn.substring(0,1) == 'R')
	{
		return '';
	}
	
	return ret;
}

createHue = function (current) {
    var selected = $('.selectedColor');
    if (selected[0]) {
        selected.removeClass('selectedColor');
    }
    $('#' + current).addClass('selectedColor');
    $("#content-all-canvas").attr('style', 'display: none');
    $("#content-all-hue").addClass('select');

    $("#content-all-tab").addClass('clicked');

    var rowIndex, rowNum, element;
    $.ajax({
        //type: 'GET',
        //url: '/services/colour-wall/selectHue.txt',
        //data: { HueName: current },
        type: 'POST',
        url: '/servicesb/ColourWallServices.asmx/selecthue',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: "{ 'huename': '" + current + "'}",
        dataType: 'json',
        success: function (msg) {
            var data = msg.d;
            rowMax = parseInt(data.ChipData.RowMax) / 3 * 7;
            colMax = parseInt(data.ChipData.HueGroup.ColumnMax);
            var autoGrid;
            createAllColorGrid(rowMax, colMax);
            $.each(data.ChipData.HueGroup.Row, function (i, val) {
                rowIndex = val.Index;
                if (rowIndex == 3) rowIndex = 5;
                else if (rowIndex == 4) rowIndex = 8;
                else if (rowIndex == 5) rowIndex = 9;
                else if (rowIndex == 6) rowIndex = 12;
                $.each(val.Chip, function (j, obj) {
                    if (obj.Colours && obj.Colours.length > 0) {
                        $.each(obj.Colours, function (k, col) {
                            rowNum = parseInt(rowIndex) + k;
                            element = $('#content-all-hue #row' + rowNum + ' #grid' + rowNum + '-' + obj.Index);
                            element.data("ItemID", col.ItemID);
                            element.data("SpecifierNumber", col.SpecifierNumber);
                            element.data("ChipNumber", col.ChipNumber);
                            element.data("Name", col.Name);
                            element.data("R", col.R);
                            element.data("G", col.G);
                            element.data("B", col.B);
                            element.data("SamplePot", col.SamplePot);
                            element.data("row", rowNum);
                            element.data("col", obj.Index);
                            element.addClass('valid');
                            element.attr('style', 'background-color: rgb(' + col.R + ',' + col.G + ',' + col.B + '); color: ' + (luminance(col.R, col.G, col.B)) + ';');
                            $('#row' + rowNum + ' #grid' + rowNum + '-' + obj.Index + ' .ChipNumber')[0].innerHTML = FormatChipNumber(col.ChipNumber);
                            $('#row' + rowNum + ' #grid' + rowNum + '-' + obj.Index + ' .Name')[0].innerHTML = col.Name;
                            if (col.SamplePot == "True") $('#row' + rowNum + ' #grid' + rowNum + '-' + obj.Index + ' .pot-flag').attr('style', 'background: url(/images/colour-wall/pot.png) no-repeat');
                            if (!visited && getUrlVars()["ItemID"] && getUrlVars()["ItemID"] == col.ItemID) {
                                autoGrid = "#grid" + rowNum + '-' + obj.Index + "";
                            }
                        });
                    } else {
                        element = $('#content-all-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index);
                        element.data("ItemID", obj.Colour.ItemID);
                        element.data("SpecifierNumber", obj.Colour.SpecifierNumber);
                        element.data("ChipNumber", obj.Colour.ChipNumber);
                        element.data("Name", obj.Colour.Name);
                        element.data("R", obj.Colour.R);
                        element.data("G", obj.Colour.G);
                        element.data("B", obj.Colour.B);
                        element.data("SamplePot", obj.Colour.SamplePot);
                        element.data("row", rowIndex);
                        element.data("col", obj.Index);
                        element.addClass('valid');
                        element.attr('style', 'background-color: rgb(' + obj.Colour.R + ',' + obj.Colour.G + ',' + obj.Colour.B + '); color: ' + (luminance(obj.Colour.R, obj.Colour.G, obj.Colour.B)) + ';');
                        $('#content-all-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .ChipNumber')[0].innerHTML = FormatChipNumber(obj.Colour.ChipNumber);
                        $('#content-all-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .Name')[0].innerHTML = obj.Colour.Name;
                        if (obj.Colour.SamplePot == "True") $('#content-all-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .pot-flag').attr('style', 'background: url(/images/colour-wall/pot.png) no-repeat');
                        if (!visited && getUrlVars()["ItemID"] && getUrlVars()["ItemID"] == obj.Colour.ItemID) {
                            autoGrid = "#grid" + rowIndex + '-' + obj.Index + "";
                        }
                    }
                })

            });

            if (!visited && autoGrid) {
                $(autoGrid).trigger('click');
                visited = 1;
            }
        }
    });
}

var select;

createSpecialitiesPage = function (data) {

    $('#content-spl-canvas').empty();
    select = document.createElement('select');
    select.id = "splSelect";
    $.each(data.specialtiesBoard, function (i, val) {

        var option = document.createElement('option');
        option.innerHTML = val.title;
        option.value = val.name;
        select.appendChild(option);
		
		if(val.src!='') {
        $('#content-spl-canvas').append('\
			<div id="' + val.name + '" class="content-spl-types">\
				<img src="' + val.src + '" width="138" height="130" alt="" />\
				<div class="spl-title">\
					' + val.title + '\
				</div>\
				<div class="spl-text">\
					' + val.text + '\
				</div>\
			</div>\
			'
		)
		}
    });
    $('#content-spl-hue').empty();
    $("#content-spl-canvas").attr('style', 'display: block');
    if (!visited && getUrlVars()["SpecialityName"]) {
        $('#' + getUrlVars()["SpecialityName"]).trigger('click');
    }
};

var rowMax = 0, colMax = 0;

createAllColorGrid = function (rows, cols) {
    $('#content-all-hue').empty();
    if (cols < 10) cols = 10;
    if (rows < 10) rows = 10;
    for (var index = 1; index <= rows; index++) {

        $('#content-all-hue').append('\
			<div id="row' + index + '" style="height: 52px; width: ' + (cols * 95) + 'px" class="colorRow"></div>')
        for (var i = 1; i <= cols; i++) {
            $('#content-all-hue #row' + index).append('\
				<div id="grid' + index + '-' + i + '">\
					<span class="ChipNumber"></span>\
					<span class="pot-flag"></span>\
					<span class="Name"></span>\
				</div>\
			');
        }
        if (index == 1 || index == 4 || index == 7 || index == 8 || index == 11) {
            $('#content-all-hue').append('\
				<div style="height: 10px; width: ' + (cols * 95) + 'px" />\
			');
        }
    }
    $('#content-all-hue').append('\
		<div id="scrollLeft" class="scrollInVisible"></div>\
		<div id="scrollRight" class="scrollInVisible"></div>\
	');
    if ($('#content-all-hue')[0].scrollWidth > 950) $('#content-all-hue #scrollRight').attr('class', 'scrollVisible');

}

var orderedItems = [];


function colourObject(ItemID, R, G, B, Name, SamplePot, ChipNumber, SpecifierNumber, Schema, Finish, Quantity) {
    this.ItemID = ItemID;
    this.R = R;
    this.G = G;
    this.B = B;
    this.Name = Name;
    this.SamplePot = SamplePot;
    this.ChipNumber = ChipNumber;
    this.SpecifierNumber = SpecifierNumber;
    this.Schema = Schema;
    this.Finish = Finish;
    this.Quantity = Quantity;
}
function coloursObject() {
    this.Colours = new Array();
}
function chipObject() {
    this.Colours = new Array();
}

function schemaObject() {
    this.Chip = new Array();
}

function chipgroupObject() {
    this.Selection = new schemaObject();
    this.Interior = new schemaObject();
    this.Exterior = new schemaObject();
}

function IsSpecifierNZColour(specifierName)
{
	if(typeof specifierName == undefined || specifierName.length <2)
		return false;
		
	if(specifierName.substring(0,2).toUpperCase() == 'NZ')
		return true;
	else
		return false;
}

function IsSpecifierRedHeartBlueShore(specifierName)
{
	if(typeof specifierName == undefined || specifierName.length <3)
		return false;
		
	if(specifierName.substring(0,2).toUpperCase() == 'RB')
		return true;
	//if(specifierName.substring(0,2).toUpperCase() == 'PB')
	//	return true;

	return false;
}


function IsSpecifierDesignSilk(specifierName)
{
	if(typeof specifierName == undefined || specifierName.length <3)
		return false;
		
	if(specifierName.substring(0,3).toUpperCase() == '891')
		return true;

	return false;
}
createCanvas = function (gridElement, parentPage) {
    
	var noOrder = false;
	
	var colourName = gridElement.data("Name");
	if (colourName.indexOf('Colorbond') >= 0)
	{
		noOrder = true;
	}
		
	// BYTE IT - Clickable Schemes - Nov 2013 - START
	// BYTE IT - Nov 2013 - Specifier Colours
	var IsSpecifierColour = false;
	try{
		var current = gridElement.attr('id');
		if( gridElement.attr('data-isspecifiercolour') == 'true') {
			IsSpecifierColour = true;
		}

	}catch(err){
		
	}
	// BYTE IT - Clickable Schemes - Nov 2013 - END
	
	// BYTE IT - PowderCoating - Jun 2014 - START
    var CanPowderCoating = false;
    try {
		if (gridElement.attr('data-canpowdercoating') == 'true') {
			var chippie = gridElement.data("ChipNumber") || "_";
			if(chippie.length > 0 && chippie.substring(0,1) != 'P' && gridElement.attr('data-isspecifiercolour') == 'true')
			{
				// Only SpecifierColours that CanPowderCoat and ChipNumber do not start with "P" (the hue colours)
				// will not be able to be ordered - these are the PowderCoating colours
	            CanPowderCoating = true;
				noOrder = true;
			}
        }
    } catch (err) {

    }
    // BYTE IT - PowderCoating - Jun 2014 - END
	
	var	ItemID = gridElement.data("ItemID"),
		Name = gridElement.data("Name"),
		R = gridElement.data("R"),
		G = gridElement.data("G"),
		B = gridElement.data("B"),
		SamplePot = gridElement.data("SamplePot"),
		
		//ChipNumber = (gridElement.data("ChipNumber") || gridElement.data("SpecifierNumber")),
		SpecifierNumber = gridElement.data("SpecifierNumber"),
		Finish = gridElement.data("Finish"),
		CanPowderCoat = gridElement.data("CanPowderCoat"),
		row = parseInt(gridElement.data("row")),
		col = parseInt(gridElement.data("col"));
	
		// BYTE 20082013 - Start - no orders for Speciality, Colorbond, Traditional


		if(parentPage == '#content-spl-hue' || parentPage == '#content-cbd-hue' || parentPage == '#content-tra-hue')
		{
			noOrder = true;
		}
		// BYTE 20082013 - End

		// BYTE 28082013 - Start
		if(typeof Finish != 'undefined' && Finish!='' && Finish != 'RenderMed' && Finish != 'Whites')
		{		
			noOrder = true;
		}
		// BYTE 28082013 - End
		
		
		
    
    var upElement, prevElement, downElement, nextElement;
    if (row > 1) upElement = $('' + parentPage + ' #grid' + (row - 1) + '-' + col);
    if (col > 1) prevElement = $('' + parentPage + ' #grid' + row + '-' + (col - 1));
    if (row < rowMax) downElement = $('' + parentPage + ' #grid' + (row + 1) + '-' + col);
    if (col < colMax) nextElement = $('' + parentPage + ' #grid' + row + '-' + (col + 1));
    
    var selectColourData = '';
    
    selectColourData = "{ 'isspecialty': 'n', 'itemID': '" + ItemID + "' , 'specialtyname' : '' }";
	
	ga('send', 'event', 'Colour Wall', 'Colour Wall Select Colour', Name);    
	//_gaq.push(['_trackEvent', 'Colour Wall', 'Colour Wall Select Colour', Name]);
	
    $.ajax({
        //type: 'GET',
        //url: '/services/colour-wall/selectColour2.txt',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: '/servicesb/colourwallservices.asmx/selectcolour',
        data: selectColourData,
        dataType: 'json',
        success: function (resp) {
            var data = resp.d;
            
            
            var ChipGroup = data.ChipData.ChipGroup;
            if (ChipGroup == null) {
                ChipGroup = new chipgroupObject();
            }
            
            var firstChip  = [];
            
            if(ChipGroup.Selection.Chip)
                firstChip = ChipGroup.Selection.Chip[0];
            else if(firstChip == undefined)
                firstChip = ChipGroup.Selection.SingleChip;

            var Selection = firstChip;
            var Interior = [];
            if(ChipGroup.Interior.Chip)
              Interior = ChipGroup.Interior.Chip[0];
            var Exterior = [];
            if(ChipGroup.Exterior.Chip)
            var Exterior = ChipGroup.Exterior.Chip[0];
            
            
            var potStyle = "background: url(/images/colour-wall/pot.png) no-repeat";
            var url = "";
            if (parentPage == "#content-all-hue") url = "?" + "HueName=" + getElementsByClassName('selectedColor')[0].id + "&ItemID=" + ItemID;
            else if (parentPage == "#content-spc-hue") url = "?" + "SpecialityName=SamplePots" + "&ItemID=" + ItemID;
            else if (parentPage == "#content-tra-hue") url = "?" + "SpecialityName=Traditionals" + "&ItemID=" + ItemID;
            else if (parentPage == "#content-spl-hue") url = "?" + "SpecialityName=" + select.value + "&ItemID=" + ItemID;

			var nomaster = false;
			var nointerior = false;
			var noexterior = false;
			if (typeof Selection == 'undefined') {
				nomaster = true;
			}
			if (typeof Interior == 'undefined') {
				nointerior = true;
			}
			if (typeof Exterior == 'undefined') {
				noexterior = true;
			}
			
			// BYTE IT - Nov 2013 - Specifier Colours
			if( IsSpecifierColour ) {
				nomaster = true;
				nointerior = true;
				noexterior = true;
				try {
				
						// BYTE IT Change 5th March 2014
						var finishSpecifier = Finish;
						
						if(typeof finishSpecifier != 'undefined') // && finishSpecifier!='') 
						{
							if(	finishSpecifier.toLowerCase().indexOf('pearl') != -1 ||
								finishSpecifier.toLowerCase().indexOf('suede') != -1 ||
								finishSpecifier.toLowerCase().indexOf('stone') != -1 ||
								finishSpecifier.toLowerCase().indexOf('tuscan') != -1 ||
								finishSpecifier.toLowerCase().indexOf('traditional') != -1 ||
								finishSpecifier.toLowerCase().indexOf('river rock') != -1 ||
								finishSpecifier.toLowerCase().indexOf('metallics') != -1 ||
								finishSpecifier.toLowerCase().indexOf('designer') != -1 ||
								finishSpecifier.toLowerCase().indexOf('garden shades') != -1 ||
								finishSpecifier.toLowerCase().indexOf('colorbond') != -1 ||
								finishSpecifier.toLowerCase().indexOf('metallicandpearl') != -1 ||
								finishSpecifier.toLowerCase().indexOf('limewash') != -1 ||
								finishSpecifier.toLowerCase().indexOf('rust') != -1 ){

								 noOrder = true;
							}
							
							if(finishSpecifier.toLowerCase().indexOf('specifier') != -1 )
							{
								noOrder = true;
							}
						}
						
						// if((typeof finishSpecifier != 'undefined' && finishSpecifier == '') && (!IsSpecifierNZColour(SpecifierNumber)) && (!IsSpecifierRedHeartBlueShore(SpecifierNumber)))
						// {
							// noOrder = true;
						// }
					
						// For Design Silk
						if(IsSpecifierDesignSilk(SpecifierNumber)) {
							noOrder = true;
						}
						           
					}catch(err){
					}
					
				var coloursObj = new coloursObject();
                var colourObj = new colourObject("", 210, 210, 210, "", "False", "", "", "", "");

                coloursObj.Colours.push(colourObj);
                coloursObj.Colours.push(colourObj);
                coloursObj.Colours.push(colourObj);
                Selection = coloursObj;
			}
			
			var ChipNumber;

			try {
				ChipNumber = (gridElement.data("ChipNumber") || Selection.Colours[0].ChipNumber);	// BYTE IT - Clickable Schemes - Nov 2013
			}
			catch(err) {
			}
			
            

            if (Selection == null) {
				
                var coloursObj = new coloursObject();
                var colourObj = new colourObject("", 210, 210, 210, "", "False", "", "", "", "");

                coloursObj.Colours.push(colourObj);
                coloursObj.Colours.push(colourObj);
                coloursObj.Colours.push(colourObj);
                Selection = coloursObj;
				$('' + parentPage + ' .master').attr('style', 'cursor: none;');
            } else {
                $('' + parentPage + ' .master').attr('style', 'cursor: pointer;');
                if (parentPage != '#content-spc-hue') {
                    if (row == 2 || row == 3 || row == 4) {
                        master1obj = $('' + parentPage + ' #grid2' + '-' + col);
                        master2obj = $('' + parentPage + ' #grid3' + '-' + col);
                        master3obj = $('' + parentPage + ' #grid4' + '-' + col);
                    } else if (row == 5 || row == 6 || row == 7) {
                        master1obj = $('' + parentPage + ' #grid5' + '-' + col);
                        master2obj = $('' + parentPage + ' #grid6' + '-' + col);
                        master3obj = $('' + parentPage + ' #grid7' + '-' + col);
                    } else if (row == 9 || row == 10 || row == 11) {
                        master1obj = $('' + parentPage + ' #grid9' + '-' + col);
                        master2obj = $('' + parentPage + ' #grid10' + '-' + col);
                        master3obj = $('' + parentPage + ' #grid11' + '-' + col);
                    } else if (row == 12 || row == 13 || row == 14) {
                        master1obj = $('' + parentPage + ' #grid12' + '-' + col);
                        master2obj = $('' + parentPage + ' #grid13' + '-' + col);
                        master3obj = $('' + parentPage + ' #grid14' + '-' + col);
                    }
                }

            }
            if (Interior == null) {
                var coloursObj = new coloursObject();
                var colourObj = new colourObject("", 210, 210, 210, "", "", "", "", "", "");

                coloursObj.Colours.push(colourObj);
                coloursObj.Colours.push(colourObj);
                coloursObj.Colours.push(colourObj);
                Interior = coloursObj;
            }
            if (Exterior == null) {
                var coloursObj = new coloursObject();
                var colourObj = new colourObject("", 210, 210, 210, "", "", "", "", "", "");

                coloursObj.Colours.push(colourObj);
                coloursObj.Colours.push(colourObj);
                coloursObj.Colours.push(colourObj);
                Exterior = coloursObj;
            }

			
				
			
			
            if (Selection.Colours.length == 1) {
                //                Selection.Colours.push(Selection.Colours[0]);
                //                Selection.Colours.push(Selection.Colours[0]);
                //                Selection.Colours[0].R = Selection.Colours[0].G = Selection.Colours[0].B = Selection.Colours[1].R = Selection.Colours[1].G = Selection.Colours[1].B = Selection.Colours[2].R = Selection.Colours[2].G = Selection.Colours[2].B = 210;
                //                Selection.Colours[0].Name = Selection.Colours[1].Name = Selection.Colours[2].Name = "";
                //                Selection.Colours[0].ChipNumber = "";
                //                Selection.Colours[0].SamplePot = "False";
                nomaster = true;
                var colourObj = new colourObject("", 210, 210, 210, "", "False", "", "", "", "");
                Selection.Colours.push(colourObj);
                Selection.Colours.push(colourObj);
                
            }
            if (Selection.Colours.length == 2) {
                var colourObj = new colourObject("", 210, 210, 210, "", "False", "", "", "", "");
                Selection.Colours.push(colourObj);
            }
			
			
			
            $('' + parentPage + ' #canvas').empty();
            $('' + parentPage + ' #canvas').append('\
				<div id="colorOrderPage">\
					<div id="left">\
						<div id="title">' + Name + '</div>\
						<div id="ChipNumber">' + FormatChipNumber( ChipNumber )+ '</div>\
						<div id="PrevOrdShare">\
							<div id="preview" style="background-color: rgb(' + R + ',' + G + ',' + B + ')">\
								<div class="expand"></div>\
								<div class="previewPot" style="' + ((SamplePot == "True") ? potStyle : "") + '"></div>\
							</div>\
							<div class="' + ((SamplePot == "True") ? "" : "potUnAvailable") + '" id="orderSample"><div id="sampleWrapper">Order Sample Pot</div></div>\
							<div id="orderSwatch" class="' + (noOrder == false ? "" : "swatchUnAvailable") + '"><div id="swatchWrapper">Order Colour Swatch</div></div>\
							<div id="share">\
								<div class="fb-like" data-href="http://www.dulux.com.au/colour/colour-wall' + url + '" data-layout="button_count" data-send="false" data-width="230" data-show-faces="true" data-font="arial"></div>\
								<a target="_blank" data-pin-config="beside" href="//pinterest.com/pin/create/button/?url=http://www.dulux.com.au/colour/colour-wall' + url +
									'&description=' + Name +
									'&media=http://www.dulux.com.au/imgs/redesign/logo_main.png' + url + '" data-pin-do="buttonBookmark" ><img src="//assets.pinterest.com/images/pidgets/pin_it_button.png" /></a>\
								<div class="addthis_toolbox addthis_default_style"><a class="addthis_counter addthis_pill_style" href="http://www.dulux.com.au/colour/colour-wall' + url + '"></a></div>\
							</div>\
						</div>\
						<div id="MasIntExt">\
							<div id="MasterScheme">\
								<div id="up"></div>\
								<div class="master"  id="master1" data-itemid="' + Selection.Colours[0].ItemID + '" style="' + ((nomaster) ? "" : "cursor:pointer;") + 'background-color: rgb(' + Selection.Colours[0].R + ',' + Selection.Colours[0].G + ',' + Selection.Colours[0].B + '); color: ' + luminance(Selection.Colours[0].R, Selection.Colours[0].G, Selection.Colours[0].B) + ';">\
									<span class="ChipNumber">' + FormatChipNumber(Selection.Colours[0].ChipNumber) + '</span>\
									<span class="pot-flag" style="' + ((Selection.Colours[0].SamplePot == "True") ? potStyle : "") + '"></span>\
									<span class="Name">' + Selection.Colours[0].Name + '</span>\
								</div>\
								<div id="prev"></div>\
								<div id="next"></div>\
								<div class="master" id="master2" style="' + ((nomaster) ? "" : "cursor:pointer;") + 'background-color: rgb(' + Selection.Colours[1].R + ',' + Selection.Colours[1].G + ',' + Selection.Colours[1].B + '); color: ' + luminance(Selection.Colours[1].R, Selection.Colours[1].G, Selection.Colours[1].B) + ';">\
									<span class="ChipNumber"></span>\
									<span class="pot-flag" style="' + ((Selection.Colours[1].SamplePot == "True") ? potStyle : "") + '"></span>\
									<span class="Name">' + Selection.Colours[1].Name + '</span>\
								</div>\
								<div class="master" id="master3" style="' + ((nomaster) ? "" : "cursor:pointer;") + 'background-color: rgb(' + Selection.Colours[2].R + ',' + Selection.Colours[2].G + ',' + Selection.Colours[2].B + '); color: ' + luminance(Selection.Colours[2].R, Selection.Colours[2].G, Selection.Colours[2].B) + ';">\
									<span class="ChipNumber"></span>\
									<span class="pot-flag" style="' + ((Selection.Colours[2].SamplePot == "True") ? potStyle : "") + '"></span>\
									<span class="Name">' + Selection.Colours[2].Name + '</span>\
								</div>\
								<div id="down"></div>\
							</div>\
							<div id="Related">Related Schemes</div>\
							<div id="Interior">\
							</div>\
							<div id="Exterior">\
							</div>\
						</div>\
					</div>\
					<div id="right">\
						<div id="close"></div>\
						<div id="sample">My Sample List</div>\
						<div id="list"></div>\
						<div id="order" class="enabled">Order Samples</div>\
					</div>\
				</div>\
				<div id="colorSelectCanvas" style="height: ' + ((ie == 7) ? (parseInt($(parentPage).height() - 500) - 20) : ($(parentPage).height() - 500)) + 'px;">\
				</div>\
			');
			
			
			
            FB.XFBML.parse();
            if (Interior && Interior.Colours) {
                for (var i = 0; i < Interior.Colours.length; i++) {
                    var color = Interior.Colours[i];
                    $(parentPage + ' #canvas #Interior').append('\
						<div id="interior' + (i+1) + '" data-ItemID="' + color.ItemID + '" class="interior" style="' + (nointerior ? "" : "cursor:pointer;" ) + ' background-color: rgb(' + color.R + ',' + color.G + ',' + color.B + '); color: ' + luminance(color.R, color.G, color.B) + ';">\
							<span class="ChipNumber"></span>\
							<span class="pot-flag" style="' + ((Interior.Colours[i].SamplePot == "True") ? potStyle : "") + '"></span>\
							<span class="Name">' + color.Name + '</span>\
						</div>\
					')
					if(i==2)
						break;
                }
            }
            if (Exterior && Exterior.Colours) {
                for (var i = 0; i < Exterior.Colours.length; i++) {
                    var color = Exterior.Colours[i];
                    $(parentPage + ' #canvas #Exterior').append('\
						<div id="exterior' + (i+1) + '" data-ItemID="' + color.ItemID + '" class="exterior" style="' + (noexterior ? "" : "cursor:pointer;" ) + ' background-color: rgb(' + color.R + ',' + color.G + ',' + color.B + '); color: ' + luminance(color.R, color.G, color.B) + ';">\
							<span class="ChipNumber"></span>\
							<span class="pot-flag" style="' + ((Exterior.Colours[i].SamplePot == "True") ? potStyle : "") + '"></span>\
							<span class="Name">' + color.Name + '</span>\
						</div>\
					')
					if(i==2)
						break;
                }
            }


            if (upElement && upElement.hasClass('valid') && parentPage != '#content-spc-hue') {
                $('' + parentPage + ' #up')[0].onclick = function () { createCanvas(upElement, parentPage); };
            } else $('' + parentPage + ' #up').attr('style', 'opacity: 0.1; cursor: default;');
            if (prevElement && prevElement.hasClass('valid') && parentPage != '#content-spc-hue') {
                $('' + parentPage + ' #prev')[0].onclick = function () { createCanvas(prevElement, parentPage); };
            } else $('' + parentPage + ' #prev').attr('style', 'opacity: 0.1; cursor: default;');
            if (nextElement && nextElement.hasClass('valid') && parentPage != '#content-spc-hue') {
                $('' + parentPage + ' #next')[0].onclick = function () { createCanvas(nextElement, parentPage); };
            } else $('' + parentPage + ' #next').attr('style', 'opacity: 0.1; cursor: default;');
            if (downElement && downElement.hasClass('valid') && parentPage != '#content-spc-hue') {
                $('' + parentPage + ' #down')[0].onclick = function () { createCanvas(downElement, parentPage); };
            } else $('' + parentPage + ' #down').attr('style', 'opacity: 0.1; cursor: default;');

            $('' + parentPage + ' #close')[0].onclick = function () { $('' + parentPage + ' #canvas').remove(); };

            $('' + parentPage + ' .expand')[0].onclick = function () {
                $('' + parentPage + ' #colorOrderPage').append('\
					<div id="expandedColor" style="background-color: rgb(' + R + ',' + G + ',' + B + '); color: ' + luminance(R, G, B) + ';">\
						<div id="expandClose"></div>\
						<div id="expandTitle">' + Name + '</div>\
						<div id="expandChipNumber">' + FormatChipNumber(ChipNumber) + '</div>\
						<div id="expandPot" style="' + ((SamplePot == "True") ? potStyle : "") + '"></div>\
						<div id="expandShare">\
							<div class="fb-like" data-href="http://www.dulux.com.au/colour/colour-wall" data-layout="button_count" data-send="false" data-width="230" data-show-faces="true" data-font="arial"></div>\
							<a data-pin-config="beside" href="http://www.dulux.com.au/colour/colour-wall" data-pin-do="buttonBookmark" ><img src="//assets.pinterest.com/images/pidgets/pin_it_button.png" /></a>\
							<div class="addthis_toolbox addthis_default_style"><a class="addthis_counter addthis_pill_style" href="http://www.dulux.com.au/colour/colour-wall"></a></div>\
						</div>\
					</div>\
				');
                $('' + parentPage + ' #expandClose')[0].onclick = function () { $('' + parentPage + ' #expandedColor').remove(); };
                FB.XFBML.parse();
            }

            if (orderedItems) createUpdateOrders(orderedItems);
			// SHOP
			checkOrderButton();
            //$('body').on('click', '#order', function (e) {
			//	if (orderedItems) {
             //       sapShop();
            //    }
            //});
			
            $('' + parentPage + ' #orderSample')[0].onclick = function () {
                var currentColor = {
                    "ItemID": ItemID,
                    "R": R,
                    "G": G,
                    "B": B,
                    "Name": Name,
                    "ChipNumber": ChipNumber,
                    "SpecifierNumber": SpecifierNumber,
                    "Type": "Sample Pot",
                    "Quantity": 1
                }, arr = [];
                if (SamplePot == "True") {
                    //orderedItems.push(currentColor);
                    //arr.push(currentColor);
					removeDuplicates(currentColor,orderedItems,arr); 
                    createUpdateOrders(orderedItems);
                }

                checkOrderButton();
				//$('#order').on('click', function (e) {
				//if (orderedItems) {
				//		sapShop();
				//	}
				//});
            };

            $('' + parentPage + ' #orderSwatch')[0].onclick = function () {
                if(!$(this).hasClass('swatchUnAvailable'))
				{
					var currentColor = {
						"ItemID": ItemID,
						"R": R,
						"G": G,
						"B": B,
						"Name": Name,
						"ChipNumber": ChipNumber,
						"SpecifierNumber": SpecifierNumber,
						"Type": "Colour Swatch",
						"Quantity": 1
					}, arr = [];
					//orderedItems.push(currentColor);
					//arr.push(currentColor);
					removeDuplicates(currentColor,orderedItems,arr); 
					createUpdateOrders(orderedItems);

					
				}
				
				checkOrderButton();
				//$('#order').on('click', function (e) {
				//if (orderedItems) {
				//		sapShop();
				//	}
				//});
            }

            //if ((parentPage != "#content-all-hue") && (Selection.Colours.length > 1)) {
			if (Selection.Colours.length > 1) {
                for (i = 1; i <= Selection.Colours.length; i++) {
                    var element = $(parentPage + ' #master' + i);
                    element.data("ItemID", Selection.Colours[i - 1].ItemID);
                    element.data("SpecifierNumber", Selection.Colours[i - 1].SpecifierNumber);
                    element.data("ChipNumber", Selection.Colours[i - 1].ChipNumber);
                    element.data("Name", Selection.Colours[i - 1].Name);
                    element.data("R", Selection.Colours[i - 1].R);
                    element.data("G", Selection.Colours[i - 1].G);
                    element.data("B", Selection.Colours[i - 1].B);
                    element.data("SamplePot", Selection.Colours[i - 1].SamplePot);
                }
            }
			
			// BYTE IT - Clickable Schemes - Nov 2013 - START
			if( isNaN(row) && isNaN(col) ) {
				// row and col are NaN if coming from Interior or Exterior Scheme
				master1obj = $('#master1');
                master2obj = $('#master2');
                master3obj = $('#master3');
			}
						
			if (Interior.Colours && Interior.Colours.length > 1) {
                for (i = 1; i <= Interior.Colours.length; i++) {
                    var element = $(parentPage + ' #interior' + i);
                    element.data("ItemID", Interior.Colours[i - 1].ItemID);
                    element.data("SpecifierNumber", Interior.Colours[i - 1].SpecifierNumber);
                    element.data("ChipNumber", Interior.Colours[i - 1].ChipNumber);
                    element.data("Name", Interior.Colours[i - 1].Name);
                    element.data("R", Interior.Colours[i - 1].R);
                    element.data("G", Interior.Colours[i - 1].G);
                    element.data("B", Interior.Colours[i - 1].B);
                    element.data("SamplePot", Interior.Colours[i - 1].SamplePot);
                }
            }
			
			if (Exterior.Colours && Exterior.Colours.length > 1) {
                for (i = 1; i <= Exterior.Colours.length; i++) {
                    var element = $(parentPage + ' #exterior' + i);
                    element.data("ItemID", Exterior.Colours[i - 1].ItemID);
                    element.data("SpecifierNumber", Exterior.Colours[i - 1].SpecifierNumber);
                    element.data("ChipNumber", Exterior.Colours[i - 1].ChipNumber);
                    element.data("Name", Exterior.Colours[i - 1].Name);
                    element.data("R", Exterior.Colours[i - 1].R);
                    element.data("G", Exterior.Colours[i - 1].G);
                    element.data("B", Exterior.Colours[i - 1].B);
                    element.data("SamplePot", Exterior.Colours[i - 1].SamplePot);
                }
            }
			
			if(!nointerior) {
				$('.interior').on('click', function (e) {
					if (consultant.indexOf($(this)[0]) == -1) {
								consultant.push($(this)[0]);
							}
					if (consultant.length === 3 && !noConsultant) {
						$('' + parentPage + ' #canvas #colorOrderPage').append('\
							<div id="colourConsultant" style="background-color: rgba(0,0,0,0.8);">\
								<div id="consultantBox">\
									Would you like some help selecting your paint colours:<br/>if so why not try using a Dulux Colour Consultant?<br/><br/><br/><br/>\
									<input type="checkbox" name="noConsultant" value="noConsultant"><div id="checkText">Don\'t show me this again</div>\
									<div id="yes">Yes</div><div id="no">No</div>\
								</div>\
							</div>\
						');
						consultant = [];
					}
					$('#colourConsultant input').on('click', function (e) {
						noConsultant = $(this)[0].checked;
					});
					$('#colourConsultant #yes').on('click', function (e) {
						window.open('../services/dulux-colour-designers.html', '_blank');
						$(parentPage + ' #colourConsultant').remove();
					});
					$('#colourConsultant #no').on('click', function (e) {
							$(parentPage + ' #colourConsultant').remove();
							var currentInteriorElement = $(this);					
							var ItemID = currentInteriorElement.data("itemid");
							//createCanvas(currentInteriorElement, parentPage);
						});
					if (Interior.Colours && Interior.Colours.length != 1 && consultant.length != 0) {
						var currentInteriorElement = $(this);					
						var ItemID = currentInteriorElement.data("itemid");
						createCanvas(currentInteriorElement, parentPage);
					}
				});
			}
			
			if(!noexterior) {
				$('.exterior').on('click', function (e) {
					if (consultant.indexOf($(this)[0]) == -1) {
								consultant.push($(this)[0]);
							}
					if (consultant.length === 3 && !noConsultant) {
						$('' + parentPage + ' #canvas #colorOrderPage').append('\
							<div id="colourConsultant" style="background-color: rgba(0,0,0,0.8);">\
								<div id="consultantBox">\
									Would you like some help selecting your paint colours:<br/>if so why not try using a Dulux Colour Consultant?<br/><br/><br/><br/>\
									<input type="checkbox" name="noConsultant" value="noConsultant"><div id="checkText">Don\'t show me this again</div>\
									<div id="yes">Yes</div><div id="no">No</div>\
								</div>\
							</div>\
						');
						consultant = [];
					}
					$('#colourConsultant input').on('click', function (e) {
						noConsultant = $(this)[0].checked;
					});
					$('#colourConsultant #yes').on('click', function (e) {
						window.open('../services/dulux-colour-designers.html', '_blank');
						$(parentPage + ' #colourConsultant').remove();
					});
					$('#colourConsultant #no').on('click', function (e) {
							$(parentPage + ' #colourConsultant').remove();
							var currentExteriorElement = $(this);					
							var ItemID = currentExteriorElement.data("itemid");
							//createCanvas(currentExteriorElement, parentPage);
						});
					if (Interior.Colours && Interior.Colours.length != 1 && consultant.length != 0) {
						var currentExteriorElement = $(this);					
						var ItemID = currentExteriorElement.data("itemid");
						createCanvas(currentExteriorElement, parentPage);
					}
				});
			}
			// BYTE IT - Clickable Schemes - Nov 2013 - END
			
            // Colour Consultant
            if (nomaster == false) {
                $('.master').on('click', function (e) {
                    var id = $(this)[0].id;
                    if (consultant.indexOf($(this)[0]) == -1) {
                        consultant.push($(this)[0]);
                    }
                    if (consultant.length === 3 && !noConsultant) {
                        $('' + parentPage + ' #canvas #colorOrderPage').append('\
							<div id="colourConsultant" style="background-color: rgba(0,0,0,0.8);">\
								<div id="consultantBox">\
									Would you like some help selecting your paint colours:<br/>if so why not try using a Dulux Colour Consultant?<br/><br/><br/><br/>\
									<input type="checkbox" name="noConsultant" value="noConsultant"><div id="checkText">Don\'t show me this again</div>\
									<div id="yes">Yes</div><div id="no">No</div>\
								</div>\
							</div>\
						');
                        consultant = [];
                    }
                    $('#colourConsultant input').on('click', function (e) {
                        noConsultant = $(this)[0].checked;
                    });
                    $('#colourConsultant #yes').on('click', function (e) {
                        window.open('../services/dulux-colour-designers.html', '_blank');
                        $(parentPage + ' #colourConsultant').remove();
                    });

                    var currentMasterElement = $(this);

                    $('#colourConsultant #no').on('click', function (e) {
                        $(parentPage + ' #colourConsultant').remove();
                        // if (parentPage == "#content-all-hue") {
                            // if (id == "master1") {
								// createCanvas(master1, parentPage);
                            // } else if (id == "master2") {
								// createCanvas(master2, parentPage);
                            // } else if (id == "master3") {
                                // createCanvas(master3, parentPage);
                            // }
                        // } else {
                            // createCanvas(currentMasterElement, parentPage);
                        // }
                    });
                    if (Selection.Colours.length != 1 && consultant.length != 0) {

                        if (parentPage == "#content-all-hue") {
                            if (id == "master1") {
                                createCanvas(master1obj, parentPage);
                            } else if (id == "master2") {
                                createCanvas(master2obj, parentPage);
                            } else if (id == "master3") {
                                createCanvas(master3obj, parentPage);
                            }
                        } else {
                            createCanvas(currentMasterElement, parentPage);
                        }
                    }
                });
            }
            

            if (ie == 7) {
                $('#canvas').attr('style', 'left: ' + $(parentPage)[0].scrollLeft + 'px');
            }
        }
    });
	
	
}

var consultant = [], noConsultant = false;

createUpdateOrders = function (items) {
    var lightBG = '#FFFFFF', darkBG = '#F3F4F6';
    $('#canvas #list').empty();
	for (var i = 0; i < (items.length); i++) {
        var clr = items[i];
        var qty = 1; // Byte
        // if (typeof clr.qty != 'undefined' && clr.qty > 1) {	// Byte
            // qty = clr.qty;
        // }
		qty = clr.Quantity;
		
        $('#canvas #list').append('\
			<div class="list-item" style="background-color: ' + ((parseInt(orderedItems.indexOf(clr)) % 2 == 1) ? darkBG : lightBG) + '">\
				<div class="ordered-color" style="background: rgb(' + clr.R + ',' + clr.G + ',' + clr.B + ')"></div>\
				<div class="ordered-chipNumber">' + FormatChipNumber(clr.ChipNumber) + '</div>\
				<div id="' + orderedItems.indexOf(clr) + '" class="ordered-close"></div>\
				<div class="ordered-type" style="background: url(/images/colour-wall/' + ((clr.Type === "Sample Pot") ? "bluepot" : "swatch") + '.png) no-repeat;">' + qty + ' ' + clr.Type + '</div>\
				<div class="ordered-name">' + clr.Name + '</div>\
			</div>\
		');
    }

    // BYTE 17062013
    // SHOP
	checkOrderButton();
	//$('#order').on('click', function (e) {
	//	if (orderedItems) {
	//		sapShop();
	//	}
	//});
}

// BYTE: aggregate similar order items
function removeDuplicates(currentColor,orderedItems,arr) {
	var found = false;
	for(var i=0;i<orderedItems.length;i++)
	{
		if(orderedItems[i].ItemID == currentColor.ItemID && orderedItems[i].Type == currentColor.Type)
		{
			found = true;
			orderedItems[i].Quantity = parseInt(orderedItems[i].Quantity) + 1;
			break;
		}
	}
	if(found == false) {
	orderedItems.push(currentColor);
	}
    
	
	
	found=false;
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i].ItemID == currentColor.ItemID && arr[i].SamplePot == arr.SamplePot)
		{
			found = true;
			arr[i].Quantity = parseInt(arr[i].Quantity) + 1;
			break;
		}
	}
	if(found == false) {
		arr.push(currentColor);
	}
	
}

createSpecialitiesGrid = function (current) {

    var maskSrc = "";
	var opacity = "";
	var selectval = current;
	if(current=='Designer')
		current = 'Pearl';
	
    switch (current) {
        case "Suede":
            maskSrc = 'suedeTuscan_wht_tile2.html';
			break;
        case "Pearl":
            maskSrc = '';
			opacity = ' opacity:0.9; filter:alpha(opacity=90); ';
            break;
		case "Metallic":
            maskSrc = 'metallic_base_scratchy_tile_white2.html';
            break;
		case "RiverRock":
			maskSrc = 'riverRock_blk_tile.html';
			break;
		case "Tuscan":
			maskSrc = 'suedeTuscan_wht_tile2.html';
            break;
		case "ColorBond":
			maskSrc = '';
            break; 
		 
		case "WeathershieldGardenShades":
			maskSrc = '';
            break; 
		case "WeathershieldRoofAndTrim":
			maskSrc = '';
            break;  
		
		case "SprayFast":
			maskSrc = '';
            break;  
		 
		case "GarageFloors":
			maskSrc = '';
            break;  
			
		case "Limewash":
			maskSrc = 'limewash_wht_tile.html';
            break;  
			
		case "Rust":
			maskSrc = 'rustMask.html';
            break;  
				
		default:
    }

    if (maskSrc != '') {
        maskSrc = 'background: url("/images/colour-wall/' + maskSrc + '") no-repeat;' + opacity;
    }

    $.ajax({
        //type: 'GET',
        //url: '/services/colour-wall/selectSpeciality.txt',
        //data: { SpecialityName: current },
        //dataType: 'json',

        type: 'POST',
        url: '/servicesb/ColourWallServices.asmx/selectspeciality', // selectSpeciality 
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: "{ 'SpecialityName': '" + current + "'}",

        success: function (data) {
            $('#content-spl-hue').empty();
            var rows, cols, autoGrid;
            rowMax = rows = parseInt(data.d.Response.Data.HueGroup.RowMax);
            colMax = cols = parseInt(data.d.Response.Data.HueGroup.ColumnMax);
            $('#content-spl-hue').append('\
				<div id="splTop">\
					<div id="splText">Speciality Finish</div>\
				</div>\
			');
            select.value = selectval;
            $('#splTop')[0].appendChild(select);
            $('#content-spl-hue').append('\
				<div id="splBottom"></div>\
			');
            if (cols < 10) cols = 10;
            if (rows < 10) rows = 10;
            for (var index = 1; index <= rows; index++) {
                $('#content-spl-hue #splBottom').append('\
					<div id="row' + index + '" style="height: 52px; width: ' + (cols * 95) + 'px" class="colorRow"></div>\
				')
                for (var i = 1; i <= cols; i++) {
                    $('#content-spl-hue #row' + index).append('\
						<div id="grid' + index + '-' + i + '">\
							<span class="ChipNumber"></span>\
							<span class="pot-flag"></span>\
							<span class="Name"></span>\
						</div>\
					');
                }
            }
            var rowIndex, element;
            $.each(data.d.Response.Data.HueGroup.Row, function (i, val) {
                rowIndex = val.Index;
                $.each(val.Chip, function (j, obj) {
                    element = $('#content-spl-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index);
                    element.data("ItemID", obj.Colour.ItemID);
                    element.data("SpecifierNumber", obj.Colour.SpecifierNumber);
                    element.data("ChipNumber", obj.Colour.ChipNumber);
                    element.data("Name", obj.Colour.Name);
                    element.data("R", obj.Colour.R);
                    element.data("G", obj.Colour.G);
                    element.data("B", obj.Colour.B);
                    element.data("SamplePot", obj.Colour.SamplePot);
                    element.data("row", rowIndex);
                    element.data("col", obj.Index);
                    element.addClass('valid');
                    element.attr('style', 'background-size: 100%; ' + maskSrc + ' background-color: rgb(' + obj.Colour.R + ',' + obj.Colour.G + ',' + obj.Colour.B + '); color: ' + luminance(obj.Colour.R, obj.Colour.G, obj.Colour.B) + ';');
                    $('#content-spl-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .ChipNumber')[0].innerHTML = FormatChipNumber(obj.Colour.ChipNumber);
                    $('#content-spl-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .Name')[0].innerHTML = obj.Colour.Name;
                    if (obj.Colour.SamplePot == "True") $('#content-spl-hue #row' + rowIndex + ' #grid' + rowIndex + '-' + obj.Index + ' .pot-flag').attr('style', 'background: url(/images/colour-wall/pot.png) no-repeat');
                    if (!visited && getUrlVars()["ItemID"] && getUrlVars()["ItemID"] == obj.Colour.ItemID) {
                        autoGrid = "#grid" + rowIndex + '-' + obj.Index + "";
                    }
                })
            });

            if (!visited && autoGrid) {
                $(autoGrid).trigger('click');
                visited = 1;
            }
        }
    });
}

luminance = function (r, g, b) {
    return ((r * 0.299 + g * 0.587 + b * 0.114) / 256) > 0.5 ? 'black' : 'white';
}

getUrlVars = function () {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

// For IE <= 8

var getElementsByClassName = function (className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function (className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
				nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this &&
          this[from] === elt)
                return from;
        }
        return -1;
    };
}

// END


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WCEM - Byte IT


var orderedCollaterals = [];


function sapShop() {
    var listOfPots = new Array();
    var listOfSwatches = new Array();
    var listOfCollaterals = new Array();

    $.each(orderedItems, function (i, val) {
        if (val.Type == 'Sample Pot') {
            var colourObj = new colourObject(val.ItemID, val.R, val.G, val.B, val.Name, val.SamplePot, val.ChipNumber, val.SpecifierNumber, val.Schema, val.Finish, val.Quantity);
            var item = new SAPItem(val.SKU, "", "", "", "", val.Quantity, "Sample Pot", colourObj);
            listOfPots.push(item);
        }
        else {
            var colourObj = new colourObject(val.ItemID, val.R, val.G, val.B, val.Name, val.SamplePot, val.ChipNumber, val.SpecifierNumber, val.Schema, val.Finish, val.Quantity);
            var item = new SAPItem(val.SKU, "", "", "", "", val.Quantity, "Colour Swatch", colourObj);
            listOfSwatches.push(item);
        }
    });

    $.each(orderedCollaterals, function (i, val) {
        var item = new SAPItem(val.SKU, "", "", "", "", val.Quantity, "Collateral", null);
        listOfCollaterals.push(item);
    });

    var basketid = $('#basketid').val();
	if(basketid == undefined)
		basketid = "";
    var data = JSON.stringify({ basketid: basketid, pots: listOfPots, swatches: listOfSwatches, collaterals: listOfCollaterals });

    //data = "{ 'colour' : '" + data + "'}";
    // var data = JSON.stringify(listOfColours);
	if(listOfPots.length + listOfSwatches.length + listOfCollaterals.length > 0)
	{
		$.ajax({
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			url: '/servicesb/SAPshop.asmx/sapshopservice',
			data: data,
			dataType: 'json',
			success: function (resp) {
				var data = resp.d;
				var basketStr = "&basketid=";
				var newLocaltion = data.substring(0, data.lastIndexOf(basketStr));
				var ck = data.substring(data.lastIndexOf(basketStr) + basketStr.length);

				if (resp.d.substring(0, 4) == "http") {
					//document.cookie = "recoverCart2" + "=" + "1234";
					$('#basketid').val(ck);
					
					//SetCookie("recoverCart", escape(ck), 1, "/", "duluxcomau.staging.dulux.bytedev.com.au");
					//SetCookie("cwBasketId", escape(ck), 1, "/", "duluxcomau.staging.dulux.bytedev.com.au");
					
					SetCookie("recoverCart", escape(ck), 1, "../index.html", cookieDomainString);
					SetCookie("cwBasketId", escape(ck), 1, "../index.html", cookieDomainString);
					
					
					//SetCookie("recoverCart", escape(ck), 1, "/", "duluxcomau.staging.dulux.bytedev.com.au");
					//SetCookie("cwBasketId", escape(ck), 1, "/", "duluxcomau.staging.dulux.bytedev.com.au");
					//SetCookie("recoverCart", escape(ck), 1, "/", "dulux.com.au");
					//SetCookie("cwBasketId", escape(ck), 1, "/", "dulux.com.au");
					window.location.href = newLocaltion;
				} else {
					alert("Unfortunately, ordering colour samples is not possible at the moment. Our IT Support team has been notified and is working to get this feature back online");
				}
			}
		});
	}
	else
	{
		//alert('Your list is empty!');
	}
}

function SetCookie(name, value, expDays, path, domain, secure) {
    // Set cookie with name, value etc provided
    // in function call and date from above
    // Number of days the cookie should persist NB expDays='' or undef. => non-persistent
    if (expDays != null) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (expDays * 24 * 60 * 60 * 1000));
    }
    var curCookie = name + "=" + value +
			((expires) ? "; expires=" + expires.toGMTString() : "") +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			((secure) ? "; secure" : "")
			+ "; raw : false";
    document.cookie = curCookie;

}

function wcem(basketid, colours, collaterals) {
    $('#basketid').val(basketid);


    $.each(colours, function (index, val) {
        var qty = val.Quantity;
        
        var currentColor = {
            "ItemID": val.colour.ItemID,
            "R": val.colour.R,
            "G": val.colour.G,
            "B": val.colour.B,
            "Name": val.ColourName,
            "ChipNumber": val.ChipNumber,
            "SpecifierNumber": val.SpecifierNumber,
            "Type": val.Type,
            //"qty": qty,
			"Quantity" : qty,
            "SKU": val.SAPMaterialNumber
        };
        orderedItems.push(currentColor);
    });

    $.each(collaterals, function (index, val) {
		var qty = val.Quantity;
        var collateral = {
            "SKU": val.SAPMaterialNumber,
            //"qty": qty,
			"Quantity" : qty,
            "SpecifierNumber": ""
        };
        orderedCollaterals.push(collateral);
    });


}

function SAPItem(SAPMaterialNumber, RGB, ColourName, ChipNumber, SpecifierNumber, Quantity, Type, colour) {

    // SAP Specifics
    this.SAPMaterialNumber = SAPMaterialNumber;
    this.RGB = RGB;
    this.ColourName = ColourName;
    this.ChipNumber = ChipNumber;
    this.SpecifierNumber = SpecifierNumber;
    this.Quantity = Quantity;
    this.Type = Type;

    if (colour && colour != null) {
        this.Colour = new colourObject(colour.ItemID, colour.R, colour.G, colour.B, colour.Name, colour.SamplePot, colour.ChipNumber, colour.SpecifierNumber, colour.Schema, colour.Finish);
    }
}