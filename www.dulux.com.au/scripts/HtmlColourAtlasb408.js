/* working */
HtmlColourAtlas = function () {

    $(function () {
        InitializeAtlas();
    });
    /* constants */



    /* common variables */
    var XmlConfig;

    /* methods */

    ///performs the initialization of the atlas for the first load.
    function InitializeAtlas() {

        //load tabs.
        InitializeTabs();

        //Bind buttons.
        SetButtonActions();

        //Bind mycolours
        BindMyColourLists();

        //DEV only Fix stupid SIFR disappearing H1s
        $(".sIFR-active h1").css("visibility", "visible");

        //apply hide specifier number classes
        if (HtmlColourAtlasConstants.HIDESPECIALTYSPECIFIERNUMBER) {
            $("#colouratlas").addClass("hidespecialtyspecifiernumber");
        }

        //fix ie7 h1 size
        if (IsIE7OrLess()) {
            $("#colouratlas .detailspanel h1").css("font-size", "22px");
        }

        //load specified colour from querystring params
        var tab = GetQSParameterByName("tab");
        var specialty = GetQSParameterByName("specialty");
        var itemId = GetQSParameterByName("itemid");
        var hue = GetQSParameterByName("hue");

        if (tab != "") {
            LoadColourFromUrl(itemId, hue, tab, specialty);
        } else {
            //load all colours (default)
            LoadAllColours();
        }

        var isUserLoggedIn = getUserLoggedIn();
        try {
            var downloadURL = downloadURL();
        } catch (e) {} 
    }

    function LoadColourFromUrl(itemId, hue, tab, specialty) {
        var tabsContainer = $(".tablist");
        var selectedChip;
        if (specialty != "") {
            //load a specialty
            var specialtiesTab = tabsContainer.find(".tab:contains('Specialties')");
            var specialtyOption = $("#colouratlas .specialtylist select option[value='" + specialty + "']");
            if (specialtiesTab != null && specialtyOption != null) {
                specialtiesTab.trigger("click");
                specialtyOption.attr("selected", "selected");
                $("#colouratlas .specialtylist select").trigger("change");

                if (itemId != "") {
                    selectedChip = $("#colouratlas .colours div.itemid:contains('" + itemId + "')").parent().parent();
                    if (selectedChip != null) selectedChip.trigger("click");
                }
            }
        } else {
            LoadAllColours();
            //load any other tab and colour.
            var selectedTab = tabsContainer.find(".tab:contains('" + tab + "')");

            if (selectedTab != null) {
                selectedTab.trigger("click");
                var selectedHue = $("#colouratlas .hues ul.tiles li div:contains('" + hue + "')").parent();

                if (selectedHue != null) {
                    selectedHue.trigger("click");

                    if (itemId != "") {
                        selectedChip = $("#colouratlas .colours div.itemid:contains('" + itemId + "')").parent().parent();
                        if (selectedChip != null) selectedChip.trigger("click");
                    }
                } //if (selectedHue != null)
            } //if (selectedTab != null && selectedHue != null)
        } //if (specialty != null)
    }

    ///Get a query string parameter.
    function GetQSParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    ///Get a boolean indicating whether the browser is IE and v7 or less.
    function IsIE7OrLess() {
        return ($.browser.msie && $.browser.version.substr(0, 1) < 8);
    }
	
	function IsIE10() {
        return ($.browser.msie && $.browser.version.substr(0,2) == 10);
    }

    ///Sets up actions that various main buttons around the atlas perform.
    function SetButtonActions() {
        //set detail close button
        $("#colourdetail .detailsclose").bind("click", DetailsClose_Click);
        $("#colouratlas .paging a.nextpage").bind("click", PagerNext_Click);
        $("#colouratlas .paging a.prevpage").bind("click", PagerPrevious_Click);
        $("#addcolourtolist").bind("click", AddColourToList_Click);
        $("#ordercolour").bind("click", OrderThisColour_Click);

        //bind the powders only checkbox.
        $("#chkPowders").bind("click", chkPowders_CheckChanged);

        //bind my colours open and close
        $("#colouratlas .filters .mycolours a").bind("click", MyColourListOpen_Click);
        $("#mycolours .detailsclose").bind("click", MyColoursListClose_Click);
        
        
        // Download Revit Zip Button
        $("#downloadRevitZipBtn").bind("click", RevitDownloadButton_Click);
        $("#downloadArchicadZipBtn").bind("click", ArchicadDownloadButton_Click);

        BindSearchFunctions();
        
        ShowHideDownloadZipBtn();
        
        //$("#colouratlas .specialtylist select").bind("change", SpecialtyList_Change);
    }

    ///Loads the tabs across the top of the page from config data.
    function InitializeTabs() {
        var tabs = GetConfigValue("data navigation sections section");
        var tabContainer = $("#colouratlas .tablist");

        tabContainer.empty();
        tabContainer.append(NewJQ("div").addClass("spacer"));

        tabs.each(function () {
            var newTab = NewJQ("div").addClass("tab");
            newTab.text($(this).text());
            tabContainer.append(newTab);
        });

        //make first tab selected by default.
        //selectedTab = tabContainer.find(".tab:eq(0)");
        selectedTab = tabContainer.find(".tab:contains('" + HtmlColourAtlasConstants.DEFAULTSELECTEDTAB + "')");
        SetSelectedTabProperties(selectedTab);

        //fix last appearance
        tabContainer.find(".tab:last").addClass("last");

    }

    ///Binds a set of hues with their title into the hues container.
    function BindHueContainer(hueData, containerClass, titleOverride) {

        var hueContainer = NewJQ("div").addClass(containerClass);
        var hueTitle = NewJQ("div").addClass("huetitle").text(hueData.attr("huetitle"));

        //if (titleOverride != "") hueTitle.text(titleOverride);

        hueContainer.append(hueTitle);

        var tileContainer = NewJQ("ul").addClass("tiles");
        var colours = hueData.find("color");
        BindHueTiles(colours, tileContainer);
        hueContainer.append(tileContainer);

        $("#colouratlas .hues").empty().append(hueContainer);

        $("#colouratlas .hues .tiles li").hover(HueTooltip_Over, HueTooltip_Out).bind("click", HueTile_Click);

    }

    ///Empty all hues from the hues container.
    function EmptyHues() {
        $("#colouratlas .hues").empty();
    }

    ///Shortcut method to do default colour binding.
    function LoadAllColours() {
        var huespectrum = GetConfigValue("data navigation hue_spectrum");
        //var neutrals = GetConfigValue("data navigation neutrals");
        //var allTiles = $("#colouratlas .hues .dynamic .tiles");
        //var neutralTiles = $("#colouratlas .hues .neutrals .tiles");

        EmptyHues();

        //bind neutrals
        //don't bind neutrals any more.
        //BindHueContainer(neutrals, "neutrals", HtmlColourAtlasConstants.NEUTRALSNAME.toLowerCase());

        //bind all colours
        BindHueContainer(huespectrum, "dynamic", HtmlColourAtlasConstants.ALLCOLOURSNAME.toLowerCase());

        //set selected hue
        $("#colouratlas .dynamic .tiles li:first").trigger("click");

        //load default tiles
        SetPagers($(".hues .dynamic"));
    }

    ///Event fired when a tab is clicked.
    function Tab_Click(e) {
        //close overlays
        CloseAllOverlays();

        var clickedTab = $(e.target);
        SetSelectedTabProperties(clickedTab);
        LoadTab(clickedTab.text());

        //clear powders filter
        //$("#chkPowders").attr("checked", false); -- BYTE IT - maintain state
    }

    function Search_Click(e) {
        var searchTerm = $("#colouratlas .search .searchbox").val();

        if (searchTerm === "") return;

        LoadSearchTiles(searchTerm);

        //track event to google
        GoogleTrackEvent("Search", searchTerm);
    }

    function BindSearchFunctions() {
        var searchInput = $("#colouratlas .search .searchbox");
        var searchButton = $("#colouratlas .search .searchbutton");
        searchButton.bind("click", Search_Click);

        //set searchbox to trigger search when enter is hit.
        $("#aspnetForm").bind("keypress", Search_KeyPress);
    }

    function Search_KeyPress(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $("input.searchbutton").trigger("click");
        }
    }

    ///Loads the selected tab, its hues and colours.
    function LoadTab(tabName) {

        //remove ampersands and spaces in tab names
        internalTabName = GetInternalTabName(tabName);

        if (internalTabName.toLowerCase() === HtmlColourAtlasConstants.ALLCOLOURSNAME.toLowerCase()) {
            ShowHues(true, true, false);
            LoadAllColours();
            return;
        }

        if (internalTabName.toLowerCase() === "specialties") {
            //specialty
            ShowHues(false, false, false);

            //remove all colour chips.
            ClearColourTiles();

            //bind the specialties list.
            BindSpecialties();

            //load specialty if one is selected
            var selectedSpecialty = $("#colouratlas .specialtylist select option:selected").val();
            if (selectedSpecialty != "") {
                //a specialty is selected.
                $("#colouratlas .specialtylist select").trigger("change");
            }

            return;
        }

        //else, not all or specialty.
        //powder coatings
        if (internalTabName.toLowerCase() === "powder_coatings") {
            //load specialties list with powder coatings
            ShowHues(false, false, false, true, "Powder Coatings");
            $(".paging .pagenum").text("");
            ClearColourTiles();
            BindPowders();

            return;
        }

        //ShowHues(true, false, false);
		ShowHues(true, true, false); // BYTE IT - show checkbox on every page
		
        //remove all colour chips.
        ClearColourTiles();

        //load hues dynamically from nav data.
        var hues = GetConfigValue("data navigation " + internalTabName.toLowerCase());
        EmptyHues();

        if (hues.size() > 0) {
            BindHueContainer(hues, "dynamic", tabName);

            //default to the first hue in the new hue list.
            $("#colouratlas .hues .tiles li:first").trigger("click");

        }

    }

    ///Sets whether the hue panel is visible, or the specialties panel is visible.
    ///Also controls whether the powders checkbox is shown on the hue panel.
    function ShowHues(isHuesVisible, isPowderCoatVisible, isSpecialtiesVisible, isPageNumVisible, specialtyTitle) {

        $("#colouratlas .specialtylist").toggle(isSpecialtiesVisible);
		$("#colouratlas .filters .powdercoatbanner").addClass("invisiblePowderBanner");//21-01-2015 - used to show/hide powder coatings banner in colour atlas

        var pageNum = $("#colouratlas .paging .pagenum");

		if (specialtyTitle == "Powder Coatings")
		{
			$("#colouratlas .filters .powdercoatbanner").removeClass("invisiblePowderBanner");//21-01-2015 - used to show/hide powder coatings banner in colour atlas
			$("#colouratlas .colours").addClass("invisiblePowderBanner");
		}
		
        if (isHuesVisible) {
            //show hues
            $("#colouratlas .hues").show();

			$("#colouratlas .filters .powdercoatbanner").addClass("invisiblePowderBanner");//21-01-2015 - used to show/hide powder coatings banner in colour atlas
			$("#colouratlas .colours").removeClass("invisiblePowderBanner");
			
            pageNum.removeClass("invisible");
            $("#colouratlas .paging a.pager").removeClass("invisible");

            if (isPowderCoatVisible) {
                $("#colouratlas .filters .powdercoat").removeClass("invisible");
            } else {
                $("#colouratlas .filters .powdercoat").addClass("invisible");
            }
        } else {
            //don't show hues
            $("#colouratlas .hues").hide();
            $("#colouratlas .specialtylist").show();
            pageNum.addClass("invisible");
            $("#colouratlas .paging a.pager").addClass("invisible");
            $("#colouratlas .filters .powdercoat").addClass("invisible");
        }

        if (isPageNumVisible != null) {
            (isPageNumVisible) ? pageNum.removeClass("invisible") : pageNum.addClass("invisible");
        }

        //set the specialty title if specified.
        if (specialtyTitle != null && specialtyTitle !== "") {
            $("#colouratlas .specialtylist .specialtytitle").text(specialtyTitle);
        } else {
            $("#colouratlas .specialtylist .specialtytitle").text("Specialty Range");
        }
    }

    ///Sets the currently selected tab.
    function SetSelectedTabProperties(selectedTab) {
        $("#colouratlas .tablist div.tab").removeClass("selected").unbind("click", Tab_Click);
        $("#colouratlas .tablist div.tab").bind("click", Tab_Click)
        selectedTab.addClass("selected").unbind("click", Tab_Click);
    }

    ///Event handler when a next pager is clicked.
    function PagerNext_Click(e) {
        e.preventDefault();
        PagerGo(true);
    }

    ///Event handler when a previous pager is clicked.
    function PagerPrevious_Click(e) {
        e.preventDefault();
        PagerGo(false);
    }

    ///Paging method goes either to the next or previous page.
    function PagerGo(isNext) {
        var selectedTile = $(".hues li.selected")
        var selectedList = selectedTile.parent();

        //make sure we have a selected item.
        if (selectedList.find(".selected").size() === 0) return;

        var newIndex;

        if (isNext) {
            //make sure we're not at the last one.
            if (selectedList.find("li.selected") === selectedList.find("li:last")) return;
            newIndex = selectedList.find("li").index(selectedTile) + 1;
        } else {
            //make sure we're not at the first one.
            if (selectedList.find("li.selected") === selectedList.find("li:first")) return;
            newIndex = selectedList.find("li").index(selectedTile) - 1;
        }

        var newSelection = selectedList.find("li:eq(" + newIndex + ")");
        newSelection.trigger("click");
    }

    ///Event handler for when a hue tile is clicked.
    function HueTile_Click(e) {
        var clickedTabTarget = $(e.target);
        var clickedTabCurrentTarget = $(e.currentTarget);
        //disappear the details panels.
        CloseAllOverlays(function () {

            //clear the current page title
            $("#colouratlas .paging .pagenum").text("");

            var selection = clickedTabTarget.text();
            var selectionRange = clickedTabCurrentTarget.parents("div:eq(0)");
            var selectedTab = $(".tablist .tab.selected").text().toLowerCase();

            //load selection
            var colourSet = selectedTab;
            if (selectedTab === "specialties") {
                colourSet = $("#colouratlas div.specialtylist select").val();
            }

            LoadColourTiles(colourSet, clickedTabTarget.data("pagecode"), selection);

            //indicate selected hue
            selectionRange.find("ul.tiles li").removeClass("selected");
            clickedTabCurrentTarget.addClass("selected");

            //set next and previous buttons state.
            SetPagers(selectionRange);
        });
    }

    ///Sets the pagers' status depending on the selected hue page.
    function SetPagers(selectionRange) {
        var firstTile = selectionRange.find(".tiles li:first");
        var lastTile = selectionRange.find(".tiles li:last");

        if (firstTile.hasClass("selected")) {
            $(".paging .prevpage").addClass("disabled");
        } else {
            $(".paging .prevpage").removeClass("disabled");
        }

        if (lastTile.hasClass("selected")) {
            $(".paging .nextpage").addClass("disabled");
        } else {
            $(".paging .nextpage").removeClass("disabled");
        }
    }

    function DisablePagers() {
        $(".paging .prevpage").addClass("disabled");
        $(".paging .nextpage").addClass("disabled");
    }

    ///Binds hue data to hue tiles.
    function BindHueTiles(hues, target) {
        target.empty();
        hues.each(function () {
            var tile = NewJQ("li");
            var innerTile = NewJQ("div");
            innerTile.css("background-color", $(this).attr("hex").replace("0x", "#"));
            innerTile.text($(this).attr("pagetitle") != null ? $(this).attr("pagetitle") : $(this).attr("name"));
            tile.data("pagecode", $(this).attr("name"));
            innerTile.data("pagecode", $(this).attr("name"));
            tile.append(innerTile);
            target.append(tile);
        });
    }

    function LoadSearchTiles(searchTerm) {
        ClearColourTiles();
        DisablePagers();
        $("#colouratlas .colours").addClass("loading");

        //do search
        var searchUrl = GetConfigValue("data services Search").text();
        var searchParams = "?SearchString=" + searchTerm;

        $.ajax({
            url: GetServiceUrl(searchUrl + searchParams),
            async: false,
            cache: false,
            success: function (data) {
                colourData = $(data);
            }
        });

        if (colourData != null) {

            //rearrange the search data to be like the usual colour data.
            //            var convertedColourData = ConvertColourData(colourData);
            //            BindColourTiles(convertedColourData);
            BindColourTiles(colourData);

        }

        $("#colouratlas .colours").removeClass("loading");
        $("#colouratlas .pagenum").show();
        $("#colouratlas .pagenum").text("Search results for: " + searchTerm);
    }

    ///Loads a set of colour tiles from ajax data source.
    ///colourSet - the programmatic name for the colour set.
    ///identifier - the specific page of the colour set to get.
    ///colourSetName - the name that will be displayed as the title for the set.
    function LoadColourTiles(colourSet, identifier, colourSetName) {
        ClearColourTiles();
        $("#colouratlas .colours").addClass("loading");
        var colourData, requestUrl, params;
        //if (colourSet.toLowerCase() === HtmlColourAtlasConstants.ALLCOLOURSNAME.toLowerCase() || colourSet.toLowerCase() === HtmlColourAtlasConstants.NEUTRALSNAME.toLowerCase()) {

        var isSpecialty = false;

        var selectedTab = $("#colouratlas .tablist .tab.selected").text().toLowerCase();
        if (selectedTab != HtmlColourAtlasConstants.SPECIALTIESTABNAME.toLowerCase() && selectedTab != HtmlColourAtlasConstants.TRADITIONALSTABNAME.toLowerCase()) {

			$("#colouratlas .filters .powdercoatbanner").addClass("invisiblePowderBanner");//21-01-2015 - used to show/hide powder coatings banner in colour atlas
			$("#colouratlas .colours").removeClass("invisiblePowderBanner");
		
            //log loading all
            GoogleTrackEvent("Page View", identifier);

            requestUrl = GetConfigValue("data services SelectPage").text();
            params = "?PageNumber=" + identifier;
            $.ajax({
                url: GetServiceUrl(requestUrl + params),
                async: false,
                cache: false,
                success: function (data) {
                    colourData = $(data);
                }
            });
        } else {
            //get specialty.
            requestUrl = GetConfigValue("data services SelectSpecialtyPage").text();

            if (colourSet.toLowerCase() === "traditionals") {
                //get traditionals query string params.

                params = "?PageNumber=" + identifier + "&SpecialityName=" + GetConfigValue("data traditionals").attr("src");
            } else {
                //get specialty querystring params.
                //pass through specialty src as colourSet.
                params = "?PageNumber=" + identifier + "&SpecialityName=" + encodeURIComponent(colourSet);
                isSpecialty = true;
            }

            requestUrl = GetConfigValue("data services SelectSpecialtyPage").text();
            $.ajax({
                url: GetServiceUrl(requestUrl + params),
                async: false,
                cache: false,
                success: function (data) {
                    
                    colourData = $(data);
                }
            });
        }

        if (colourData != null) {
            BindColourTiles(colourData);

            if (isSpecialty && HtmlColourAtlasConstants.HIDESPECIALTYSPECIFIERNUMBER) {
                //$("#colouratlas .colours li div.code").css("visibility", "hidden");
                $("#colouratlas").addClass("hidespecialtyspecifiernumberpage");
            } else {
                $("#colouratlas").removeClass("hidespecialtyspecifiernumberpage");
            }
        }
        $("#colouratlas .colours").removeClass("loading");
        $("#colouratlas .pagenum").show();
        $("#colouratlas .pagenum").text(colourSetName);
    };

    ///Clears all of the atlas colour tiles.
    function ClearColourTiles() {
        $("#colouratlas .colours").empty();
    };

    ///Binds colour tile data to the atlas.
    function BindColourTiles(colourData) {
        if (colourData.find("Response StatusCode").text() === "2") return; //colour data didn't load
        
        //bind the colours.
        var colourTarget = $("#colouratlas .colours");
        var rowCount;
        var colourRows;
        
        if ($(colourData).find("SearchResults").length > 0) {
                       
            //process search results
            var allColours = $(colourData).find("SearchResults Colour");
           
            var rowItems = new Array();
            var currentRow = 0;

            rowCount = Math.ceil(allColours.length / 8);

            for (searchItemIndex = 0; searchItemIndex < allColours.length; searchItemIndex++) {

                rowItems.push(allColours[searchItemIndex]);
                if (searchItemIndex % 8 == 7 || searchItemIndex + 1 >= allColours.length) {
                    WriteColourRow(colourTarget, rowItems, true);
                    rowItems = new Array();
                    currentRow++;
                }

                if (currentRow >= HtmlColourAtlasConstants.MAXROWS) break;
            }

        } else {
            colourRows = $(colourData).find("Row");

            rowCount = colourRows.size();

            colourRows.each(function () {
				WriteColourRow(colourTarget, $(this), false);
            });
        }

        if (rowCount < HtmlColourAtlasConstants.MAXROWS) {
            for (addRow = rowCount; addRow <= HtmlColourAtlasConstants.MAXROWS; addRow++) {
                WriteColourRow(colourTarget, NewJQ("div"));
            }
        }

        //bind tile events
		var tiles = $("#colouratlas .colourrow > li:not(\"li.blank\")");
        tiles.addClass("hoverable");
        tiles.bind("click", ColourTile_Click);

        //redo powder settings
        TogglePowdersOnly($("#chkPowders").attr("checked"));

        CheckWrapping(colourTarget);

    };

    //fix any colour names that wrap.
    function CheckWrapping(colourTarget) {
        var stdHeight = colourTarget.find("div.code:eq(0)").height();

        colourTarget.find("li").each(function () {
            var divName = $(this).find("div.name");
            if (divName.size() > 0) {
                if (divName.height() > stdHeight) {
                    divName.height(24);
                    $(this).find("div.code").css("padding-top", "12px");
                }
            }
        });
    };

    ///Writes a row of colours to the atlas.
    function WriteColourRow(colourTarget, colourRow, isSearch) {
        var row = NewJQ("ul").addClass("colourrow");
        var colourColumnIDs = new Array("A", "B", "C", "D", "E", "F", "G", "H");
        var writeBlank = false;

        for (var columnIndex = 0; columnIndex < colourColumnIDs.length; columnIndex++) {
            var currentColour;
            writeBlank = false;
            if (isSearch) {
                currentColour = $(colourRow[columnIndex]);

                //skip duplicate colours (by colour name)
                if (currentColour.attr("Name") != null && row.find("div.name:contains('" + currentColour.attr("Name") + "')").length > 0) {
                    writeBlank = true;
                }
            } else {
                currentColour = colourRow.find("Colour[Index=" + colourColumnIDs[columnIndex] + "]");
            }

            var colourTile = NewJQ("li");
            var colourTileInner = NewJQ("div");
			
            if (currentColour.attr("Name") != null && writeBlank == false) {
                colourTileInner.css("background-color", GetRGBFromColourElement(currentColour));
                var colourCode = NewJQ("div").addClass("code").text(currentColour.attr("SpecifierNumber"));
                
                var colourName = NewJQ("div").addClass("name").text(currentColour.attr("Name"));
                var lrv = NewJQ("div").addClass("lrv").text(currentColour.attr("LRV"));
                var itemId = NewJQ("div").addClass("itemid").text(currentColour.attr("ItemID"));
                
                AttachDownloadBtnAttributes(currentColour, itemId);
                
                colourTileInner.append(colourCode).append(colourName).append(lrv).append(itemId);
                colourTile.append(colourTileInner);
                
                var finish = currentColour.attr("Finish");
                if (finish != null) {
                    if (finish != "") colourTileInner.addClass(finish.replace("../../index.html", "_"));
                }

                if (IsDarkColour(currentColour)) { colourTile.addClass("lighttext"); };

                if (currentColour.attr("PowderCoat") === "false") { colourTile.addClass("notpowder"); };

                if (currentColour.attr("Finish").length > 0) { colourTile.addClass("specialty"); }

            }else {
                //blank tile.
                colourTile.addClass("blank");
            }
            row.append(colourTile);
        }

        colourTarget.append(row);
    };

    ///Handles when a colour tile is clicked on.
    function ColourTile_Click(targetElement) {

        //don't load a clicked tile if powders only and it's not a powder
        if ($("#chkPowders").attr("checked") && $(targetElement.currentTarget).hasClass("notpowder")) return;

        //populate detail data
        var colourDetail = $("#colourdetail");
        var sourceElement = $(targetElement.currentTarget);

        colourDetail.find(".leftcol h1").text(sourceElement.find("div.name").text());
        var colourChip = colourDetail.find(".leftcol div.colourchip");
        //clear out any specialties before applying new ones.
        colourChip.attr("class", "").addClass("colourchip");
        colourChip.css("background-color", sourceElement.find("div:eq(0)").css("background-color")).addClass(sourceElement.find("div:eq(0)").attr("class"));
        colourDetail.find(".leftcol span.code").text(sourceElement.find(".code").text());

        var rgb = sourceElement.find("div:eq(0)").css("background-color").toLowerCase().replace("rgb(", "").replace(")", "").split(',');
        //colourDetail.find(".leftcol h1").text(rgb[2]);
        colourDetail.find(".leftcol span.red").text(rgb[0]);
        colourDetail.find(".leftcol span.green").text(rgb[1]);
        colourDetail.find(".leftcol span.blue").text(rgb[2]);
        colourDetail.find(".leftcol span.lrv").text(sourceElement.find(".lrv").text());
        var itemId = sourceElement.find(".itemid").text();
        colourDetailItemId = colourDetail.find(".leftcol span.itemid");
        colourDetailItemId.text(itemId);

        initialiseDownloadableColourFiles(colourDetail, sourceElement);
        
        //pass specialty info through to details for mycolour lists.
        if (sourceElement.hasClass("specialty")) {
            colourDetailItemId.addClass("specialty");
        } else {
            colourDetailItemId.removeClass("specialty");
        }

        //fix blank attriblabels (result of having to make sure no empty elements are in the xslt for umbraco)
        $("#colourdetail .attriblabel").each(function () {
            $(this).text($(this).text().trim());
        });

        //set deep link
        var linkFormat = "?itemid=[[itemid]]&hue=[[hue]]&tab=[[tab]]";
        var specialtyFormat = "?itemid=[[itemid]]&specialty=[[specialty]]&tab=[[tab]]";

        var selectedTab = encodeURIComponent($("#colouratlas .tablist .tab.selected").text());
        var selectedHue = encodeURIComponent($("#colouratlas .hues li.selected").text());
        var selectedSpecialty = encodeURIComponent($("#colouratlas .specialtylist select option:selected").val());
        var deepLinkQueryString = "";

        if (selectedTab === "Specialties") {
            deepLinkQueryString = specialtyFormat.replace("[[itemid]]", itemId).replace("[[specialty]]", selectedSpecialty).replace("[[tab]]", selectedTab);
        } else {
            deepLinkQueryString = linkFormat.replace("[[itemid]]", itemId).replace("[[hue]]", selectedHue).replace("[[tab]]", selectedTab);
        }

        //display product name if powder coatings
        if (selectedTab === "Powder%20Coatings" && $(".paging .pagenum").text().indexOf("Search results") === -1) {
            colourDetail.find(".productname").show();
            colourDetail.find(".productname .name").text($(".specialtylist select option:selected").text());
        } else {
            colourDetail.find(".productname").hide();
        }

        var pageUrl = $(location).attr('href');
        if (pageUrl.indexOf("?") > 0) pageUrl = $(location).attr('href').split("?")[0];

        var deeplink = colourDetail.find(".deeplink a");
        var deepLinkHrefTemplate = "mailto:?to=&subject=" + HtmlColourAtlasConstants.DEEPLINKEMAILSUBJECT + "&body=" + HtmlColourAtlasConstants.DEEPLINKEMAILBODY;
        var deepLinkHref = deepLinkHrefTemplate.replace("[[name]]", sourceElement.find(".name").text()).replace("[[url]]", encodeURIComponent(pageUrl + deepLinkQueryString));
        if (deeplink.size() > 0) deeplink.attr("href", deepLinkHref);

        ClearColourError();

        //bind the colour chip to download
        var downloadHandler = GetConfigValue("data services CreateColourBlock").text();
        colourChip.unbind("click", ColourChip_Click);
        colourChip.bind("click", ColourChip_Click);

        SetOverlayPosition();

        $("#colourdetailoverlay").fadeIn("fast", function () {
            //open detail panel
            colourDetail.fadeIn("fast", function () {
                FixDetailButtonPosition($("#mycoloursdetaillist"), $("#colourdetail .orderlist"));
				FixDetailButtonPosition($("#mycoloursdetaillist"), $("#colourdetail .revittbutonlist"));
            });
        });

        //track event to google
        //GoogleTrackEvent("Detail View", sourceElement.find(".itemid").text());
		GoogleTrackEvent("Detail View", sourceElement.find(".name").text());

    }

    function initialiseDownloadableColourFiles(colourDetail, sourceElement) {
        var revitButtonId = "#downloadRevitBtn";
        var revitButtonExistsAttr = "data-hasrevitcolour";
        var revitButtonDownloadAttr = "data-revitdownloadurl";
        initialiseDownloadnBtn(colourDetail, sourceElement, revitButtonId, revitButtonExistsAttr, revitButtonDownloadAttr);

        var revitButtonId = "#downloadArchicadBtn";
        var revitButtonExistsAttr = "data-hasarchicadcolour";
        var revitButtonDownloadAttr = "data-archicaddownloadurl";
        initialiseDownloadnBtn(colourDetail, sourceElement, revitButtonId, revitButtonExistsAttr, revitButtonDownloadAttr);
    }

    function initialiseDownloadnBtn(colourDetail, sourceElement, buttonId, btnHasAttr, downloadUrlAttr) {
        var downloadButton = colourDetail.find(buttonId);
        var colourDetailItemId = colourDetail.find(".leftcol span.itemid");
        // Does the Source Element have a Colour Data Download colour ? TTYACK BYTE IT
        colourDetailItemId.attr(btnHasAttr, sourceElement.find("div.itemid").attr(btnHasAttr));
        if (sourceElement.find("div.itemid").attr(btnHasAttr) === "True") {
            colourDetailItemId.attr(downloadUrlAttr, sourceElement.find("div.itemid").attr(downloadUrlAttr));
            downloadButton.show();
            downloadButton.unbind();
            downloadButton.click(function (e) {
                //Login functionality for BIM
                var isUserLoggedIn = false; //getUserLoggedIn();
                $.ajax({
                    type: 'POST',
                    url: '/iisauthenticationhandler.authsrv',
                    data: JSON.stringify({ buttonValue: sourceElement.find("div.code").html(), button: buttonId }),
                    cache: false,
                    success: function (data) {
                        //Login Success
                        //window.location = “index.html”;
                        //console.log('getUserLoggedIn success:'+ data);
                        if (data == '1') {
                            var url = sourceElement.find("div.itemid").attr(downloadUrlAttr);
                            downloadURL(url);
                            e.preventDefault();
                        }
                        else {
                            isUserLoggedIn = false;
                            //alert('user NOT logged in');
                            window.location = "../site-tools/log-in21b3.html?returnurl=/specifier/colour/colour-atlas";
                        }
                    },
                    error: function (msg) {
                        //console.log('getUserLoggedIn error:'+ msg.responsetext);
                        isUserLoggedIn = false;
                    }
                });
            });
        } else {
            downloadButton.hide();
        }
    }

    ///Handles when a colour chip is clicked.
    function ColourChip_Click(e) {
        var colourdetailCol = $("#colourdetail .leftcol");
        var colourChipParams = "?r=" + colourdetailCol.find(".red").text() + "&g=" + colourdetailCol.find(".green").text() + "&b=" + colourdetailCol.find(".blue").text() + "&name=" + colourdetailCol.find("h1").text() + "&specifierid=" + colourdetailCol.find(".code").text()
        window.open(HtmlColourAtlasConstants.COLOURCHIPHANDLERURL + colourChipParams);
    }

    ///Set the panel overlay position relative to the colour wall to ensure it is placed correctly.
    function SetOverlayPosition() {
        var filterOffset = $("#colouratlas .filters").offset();
        var pager2 = $("#colouratlas .paging:last");
        var pager2Offset = pager2.offset();
        var overlay = $("#colourdetailoverlay");
        overlay.css("top", filterOffset.top + "px");
        overlay.css("left", filterOffset.left + "px");
        var newHeight = pager2Offset.top - filterOffset.top + pager2.height() + parseInt(pager2.css("padding-top"), 10) + parseInt(pager2.css("padding-bottom"), 10);
        overlay.height(newHeight);
    }

    ///Fixes a problem with the order list button position in IE.
    function FixDetailButtonPosition(list, button) {
        //if (((button.offset().left - list.offset().left) < 243) && (!IsIE7OrLess()|| IsIE10())) {
        //    //button.css("margin-left", "243px");
        //}
		/* else if(((button.offset().left - list.offset().left) < 243) && IsIE10())
		{
			button.css("margin-left", "243px");
		} */
    }

    ///Handles when the details close button is clicked.
    function DetailsClose_Click(e) {
        CloseAllOverlays();
    }

    function MyColourListOpen_Click(e) {
        e.preventDefault();
        SetOverlayPosition();
        $("#colourdetailoverlay").fadeIn("fast", function () {
            //open my colours panel
            $("#mycolours").fadeIn("fast", function () {
                FixDetailButtonPosition($("#mycolourscolourlist"), $("#mycolours .orderlist"));
            });
        });
        
        
    }

    function MyColoursListClose_Click(e) {
        CloseAllOverlays();
    }

    ///Handles when the powders checkbox is checked or unchecked.
    function chkPowders_CheckChanged(e) {

        TogglePowdersOnly($(e.target).attr("checked"));

        //track event to google
        if ($(e.target).attr("checked")) {
            GoogleTrackEvent("Filter Applied", "Powders Only");
        }
    }

    function CloseAllOverlays(callback) {
        $("#mycolours").fadeOut("fast", function () {
            $("#colourdetail").fadeOut("fast", function () {
                $("#colourdetailoverlay").fadeOut("fast", function () {
                    if ($.isFunction(callback)) {
                        callback.call();
                    }
                });
            });
        });
    }

    ///Toggles whether only powders colours will be shown.
    function TogglePowdersOnly(isPowdersOnly) {

        if (isPowdersOnly) {
            $("#colouratlas .colours").addClass("powdersonly");
            $("#colouratlas .colours li.notpowder").removeClass("hoverable");
        } else {
            $("#colouratlas .colours").removeClass("powdersonly");
            $("#colouratlas .colours li.notpowder").addClass("hoverable");
        }
    }

    ///Gets the rgb(x,x,x) css string from a colour data element.
    function GetRGBFromColourElement(colourElement) {
        var r = colourElement.attr("R");
        var g = colourElement.attr("G");
        var b = colourElement.attr("B");
        return GetRGB(r, g, b);
    }

    ///Reads a colour element's LRV to determine whether it's light or dark.
    function IsDarkColour(colourElement) {
        //if LRV is too low, use white text.
        var lrv = parseFloat(colourElement.attr("LRV"));
        return lrv < HtmlColourAtlasConstants.BLACKMINIMUMLRV;
    }

    ///Turns three parameters into a css rgb(x,x,x) string.
    function GetRGB(r, g, b) {
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    ///Handles when a hue is hovered over (creates a tooltip).
    function HueTooltip_Over(e) {
        huett = $("#huetooltip");
        var target = $(e.target);

        huett.html(target.text());
        var sourceOffset = target.offset();
        var ieTop = ($.browser.msie) ? -12 : 0;
        huett.css("top", (sourceOffset.top - 18) + "px");
        huett.css("left", (sourceOffset.left + 19) + "px");
        huett.show();
    }

    ///Handles when a hue is hovered out (removes a tooltip).
    function HueTooltip_Out(source) {
        var huett = $("#huetooltip");
        huett.hide();
    }

    ///Gets the colour atlas xml config data file.
    function GetConfig() {
        if (XmlConfig == null) {
            //get the version number of the script to make sure we get the latest version of the config.
            qsVars = GetUrlVars();
            var version = "";
            if (qsVars) {
                version = qsVars["v"];
            }

            $.ajax({
                url: GetServiceUrl(HtmlColourAtlasConstants.ATLASXMLCONFIGURL + "?v=" + version),
                dataType: "xml",
                async: false,
                timeout: 20000,
                success: function (data) {
                    XmlConfig = $(data);
                }
            });
        }
        return XmlConfig;
    }

    function GetUrlVars() {
        var vars = [], hash;
        //var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        var hashes = $("script#caconstants").attr("src").slice($("script#caconstants").attr("src").indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    ///Gets a specified value from the atlas xml config data file using jquery traversing.
    function GetConfigValue(selector) {
        return GetConfig().find(selector);
    }

    ///Gets the URL for a web service, including any proxying prefix.
    function GetServiceUrl(serviceUrl) {
        if (!HtmlColourAtlasConstants.PROXYSERVICES) return serviceUrl;

        return HtmlColourAtlasConstants.SERVICEREQUESTBASEURL + encodeURIComponent(serviceUrl);
    }

    function NewJQ(tagName) {
        return $("<" + tagName + "></" + tagName + ">");
    }

    function ShowHideDownloadZipBtn()
    {
        var myColours = MyColours_Get();
        if (myColours.find("span[data-hasrevitcolour='True']").size() > 0) {
            $("#downloadRevitZipBtn").show(); 
        }else
        {
            $("#downloadRevitZipBtn").hide();
        }

        if (myColours.find("span[data-hasarchicadcolour='True']").size() > 0) {
            $("#downloadArchicadZipBtn").show();
        } else {
            $("#downloadArchicadZipBtn").hide();
        }

        if ($.browser.mozilla) {
            $("#downloadArchicadZipBtn").css("margin-left", "11px");
        }
    }

	   
	
    /////////////////////////////////////
    //////// colour list methods ////////
    /////////////////////////////////////
    
    function AddColourToList_Click(e) {
        var myColours = MyColours_Get();

        //make sure the user is not trying to add more than 10 colours.
        if (myColours.find("li").size() >= 10) {
            ShowColourError("You can add up to 10 colours to your colour list.");
            return;
        }
        
        ShowHideDownloadZipBtn();
        
        var colourDetails = $("#colourdetail .leftcol");

        //SGD, 2012-05-22 - don't check if the colour is already added. Allow multiples.
        //make sure the colour isn't already added.
        //        if (myColours.find("div span.itemid:contains('" + colourDetails.find("span.itemid").text() + "')").size() > 0) {
        //            ShowColourError("This colour is already in your list.");
        //            return;
        //        }

        //create new my colour entry for saving.
        var myColour = NewJQ("li");
        var div = NewJQ("div");
        var chip = NewJQ("span").addClass("chip").css("background-color", colourDetails.find(".colourchip:first").css("background-color"));
        var code = NewJQ("span").addClass("code").text(colourDetails.find("span.code").text());
        var name = NewJQ("span").addClass("name").text(colourDetails.find("h1").text());
        var itemid = NewJQ("span").addClass("itemid").text(colourDetails.find("span.itemid").text());

        AttachDownloadBtnToList(colourDetails, itemid);
        
        div.append(chip).append(code).append(name).append(itemid);
        
        if (colourDetails.find("span.itemid").hasClass("specialty")) { div.addClass("specialty"); }

        myColour.append(div);

        //add colour to collection.
        MyColours_Add(myColour);

        //rebind updated data.
        BindMyColourLists();

        //track to google
        GoogleTrackEvent("Added To List", itemid);
    }

    // Change By TTYACK Byte IT - Download Revit and Archicad Colour filesinitialiseDownloadnBtn
    function AttachDownloadBtnAttributes(currentColour, itemId) {
        
        // Change By TTYACK Byte IT - Download Revit Colours
        itemId.attr("data-HasRevitColour", currentColour.attr("HasRevitColour"));
        if (currentColour.attr("HasRevitColour") == "True")
            itemId.attr("data-RevitDownloadUrl", currentColour.attr("RevitDownloadUrl"));

        itemId.attr("data-HasArchicadColour", currentColour.attr("HasArchicadColour"));
        if (currentColour.attr("HasArchicadColour") == "True")
            itemId.attr("data-ArchicadDownloadUrl", currentColour.attr("ArchicadDownloadUrl"));
    }

    function AttachDownloadBtnToList(colourDetails, itemid) {

        var hasRevitColour = colourDetails.find("span.itemid").attr("data-hasrevitcolour");
        itemid.attr("data-HasRevitColour", hasRevitColour);
        if (hasRevitColour == "True")
            itemid.attr("data-RevitDownloadUrl", colourDetails.find("span.itemid").attr("data-revitdownloadurl"));

        var hasArchicadColour = colourDetails.find("span.itemid").attr("data-hasarchicadcolour");
        itemid.attr("data-HasArchicadColour", hasArchicadColour);
        if (hasArchicadColour == "True")
            itemid.attr("data-ArchicadDownloadUrl", colourDetails.find("span.itemid").attr("data-archicaddownloadurl"));
    }

    function DeleteColourFromList_Click(e) {
        var colourCode = $(e.target).parent().find(".code").text();
        if (colourCode === "") return;
        MyColours_Remove(colourCode);

        ClearColourError();

        //rebind updated data.
        BindMyColourLists();
    }

    function ClearMyColours_Click(e) {
        e.preventDefault();
        MyColours_RemoveAll();
        ClearColourError();

        BindMyColourLists();
    }

    function BindMyColourLists() {

        var myColours = MyColours_Get();
        var count = myColours.find(".code").size();

        //list on details panel.
        var detailsList = $("#mycoloursdetaillist");
        BindMyColoursToList(myColours, detailsList);

        //standalone my colours list.
        var mycolourscolourlist = $("#mycolourscolourlist");
        //copy from details list
        mycolourscolourlist.html(detailsList.html());

        //bind delete buttons (since we copied one of them);
        $("#colouratlas .mycolourlist li input.remove").bind("click", DeleteColourFromList_Click);

        //set my colour counts
        $("#colouratlas .detailspanel .rightcol h1 .colourcount").text(count);
        $("#colouratlas .filters .mycolours a span").text(count);

        //set order colour lists button
        if (count > 0) {
		
            $("#colouratlas .rightcol input.orderlist").addClass("active").bind("click", OrderColourList_Click);
            $("#colouratlas .rightcol .clearallcolours").css("visibility", "visible").bind("click", ClearMyColours_Click);
        } else {
            $("#colouratlas .rightcol input.orderlist").removeClass("active").unbind("click", OrderColourList_Click); ;
            $("#colouratlas .rightcol .clearallcolours").css("visibility", "hidden").unbind("click", ClearMyColours_Click);
        }

        //fix crappy IE7 not doing margin -1 on mycolour list items.
        if (IsIE7OrLess()) {
            detailsList.find("li").addClass("iefix");
            mycolourscolourlist.find("li").addClass("iefix");
        }

    }

    function ClearColourError() {
        $("#colourdetail .colourerror").hide().text("");
    }

    function ShowColourError(message) {
        $("#colourdetail .colourerror").show().text(message);
    }

    function BindMyColoursToList(colours, targetElement) {
        targetElement.empty();

        var items = colours.find("li")

        items.each(function () {
            //create remove button manually because JS can't change the type attribute.
            var removeButton = $("<input type='button' />").addClass("remove");
            $(this).prepend(removeButton);
            targetElement.append($(this));
        });

        //add blank rows if < MAX colours.
        if (items.size() >= HtmlColourAtlasConstants.MAXMYCOLOURS) return;

        for (blankRowIndex = items.size(); blankRowIndex < HtmlColourAtlasConstants.MAXMYCOLOURS; blankRowIndex++) {
            var blankColour = NewJQ("li").addClass("blank");
            var blankDiv = NewJQ("div");
            var blankChip = NewJQ("span").addClass("chip");
            var blankCode = NewJQ("span").addClass("blank").text("blank");

            blankDiv.append(blankChip);
            blankDiv.append(blankCode);

            blankColour.append(blankDiv);
            targetElement.append(blankColour);
        }
    }

    function MyColours_Get() {
        var myColours = GetCookieAsjQuery();

        if (myColours != null) return NewJQ("ul").append(myColours);

        //catch if myColours doesn't exist.
        return NewJQ("ul");
    }

    function MyColours_Add(colourListItem) {
        //get cookie value
        var colours = GetCookieAsjQuery();

        if (colours == null) {
            colours = NewJQ("ul");
        }

        //add item
        colours.append(colourListItem);

        //rewrite cookie
        WriteCookieAsjQuery(colours);
        
        ShowHideDownloadZipBtn();
    }

    function MyColours_Remove(colourCode) {
        //get cookie value
        var colours = GetCookieAsjQuery();

        if (colours == null) return;
        if (colourCode === "") return;

        //remove unwanted item by keeping other items.
        var colourContainer = NewJQ("ul").append(colours);
        var coloursToKeep = NewJQ("ul");
        colourContainer.find("li").each(function () {
            if ($(this).find("div span.code:contains('" + colourCode + "')").size() === 0) {
                coloursToKeep.append($(this));
            }
        });

        //rewrite cookie
        WriteCookieAsjQuery(coloursToKeep);
        ShowHideDownloadZipBtn();
    }

    function MyColours_RemoveAll() {
        $.cookie(HtmlColourAtlasConstants.COLOURCOOKIENAME, null);
    }

    ///Writes a string representation of a jquery object.
    function WriteCookieAsjQuery(cookieValuejQueryObject) {
        $.cookie(HtmlColourAtlasConstants.COLOURCOOKIENAME, "<ul>" + cookieValuejQueryObject.html() + "</ul>");
    }

    ///Gets a jquery object from a string representation.
    function GetCookieAsjQuery() {
        var cookie = $.cookie(HtmlColourAtlasConstants.COLOURCOOKIENAME);

        if (cookie == null) return;

        return $(cookie);
    }

    /////////////////////////////////////
    //////// order colour methods ///////
    /////////////////////////////////////

    function OrderColourList_Click(e) {
        //get items to order as string array.
        var itemIDs = $("#mycoloursdetaillist li span.itemid");

        var itemsArray = new Array();
        var itemIndex = 0;

        itemIDs.each(function () {
            itemsArray[itemIndex] = $(this).text();
            itemIndex++;
        });
		
        //do process order
        ProcessOrder(itemsArray);
    }

    function OrderThisColour_Click(e) {
	
        //add item to collection
        AddColourToList_Click(e);
        //do order processing.
        OrderColourList_Click(e);
    }


    function ProcessOrder(itemsArray) {
        //get order service ashx address.
        var orderUrl = GetConfigValue("data services OrderColours").text();
        var params = "?ColourList=" + itemsArray + "&SessionId=" + sessionID;

        //ajax request shop location
        $.ajax({
            url: GetServiceUrl(orderUrl + params),
            async: false,
            cache: false,
            success: function (data) {
                var colourData = $(data);

                if (colourData == null) return;

                //redirect to the shop url
                window.location = "../site-tools/log-inae87.html?zcid=91";
            }
        });

        //
    }
    
    ///////////////////////////////////////////////////
    /////////     Revit Colour Downloads      /////////
    ///////////////////////////////////////////////////
    
    function RevitDownloadButton_Click(e)
    {
        var revitColourArchive = GetConfigValue("data services GetRevitColourArchive").text();
        ZipDownloadButton_Click(e, revitColourArchive);
    }
    
    function ArchicadDownloadButton_Click(e) {
        var archicadColourArchive = GetConfigValue("data services GetArchicadColourArchive").text();
        ZipDownloadButton_Click(e, archicadColourArchive);
    }

    function ZipDownloadButton_Click(e, ZipColourArchive) {
        var isUserLoggedIn = false; //getUserLoggedIn();

        $.ajax({
            type: 'Post',
            url: '/iisauthenticationhandler.authsrv',
            data: "{buttonValue:'" + ZipColourArchive + "'}",
            dataType: 'text',
            success: function (data) {
                //Login Success
                //window.location = “index.html”;
                //console.log('getUserLoggedIn success:'+ data);
                if (data == '1') {
                    
                    var itemIDs = $("#mycoloursdetaillist li span.itemid");
                    var itemsArray = new Array();
                    var itemIndex = 0;

                    itemIDs.each(function () {
                        itemsArray[itemIndex] = $(this).text();
                        itemIndex++;
                    });

                    var params = "?ColourDownloadLocations=" + itemsArray;

                    //ajax request for revit colour to be packaced into zip and downloadable
                    $.ajax({
                        url: GetServiceUrl(ZipColourArchive + params),
                        async: false,
                        cache: false,
                        success: function (xml) {
                            var download = $(xml).find("Results").attr("DownloadUrl");
                            downloadURL(download);
                        }
                    });
                }
                else {
                    isUserLoggedIn = false;
                    //alert('user NOT logged in');
                    window.location = "../site-tools/log-in21b3.html?returnurl=/specifier/colour/colour-atlas";
                }
            },
            error: function (msg) {
                console.log('getUserLoggedIn error:' + msg.responsetext);
                isUserLoggedIn = false;
            }
        });
    }
    

    /////////////////////////////////////
    /////////     tracking      /////////
    /////////////////////////////////////

    ///Tracks a user's clicks around the atlas.
    ///actionType: the type of action they are performing (
    function GoogleTrackEvent(actionType, actionItemId) {
        if (_gaq != null) {
            _gaq.push(['_trackEvent', 'Colour Atlas', actionType, actionItemId]);
        }
    }

    /////////////////////////////////////
    ///////// specialty methods /////////
    /////////////////////////////////////

    function BindSpecialties() {


        var specialtyList = $("#colouratlas .specialtylist select");

        var specialties = GetConfigValue("data specialties specialty");

        specialtyList.unbind("change", SpecialtyList_ChangePowders).unbind("change", SpecialtyList_Change);
        specialtyList.empty();
        specialtyList.append(NewJQ("option").attr("value", "").text("Please Select a Specialty"));

        specialties.each(function () {
            specialtyList.append(NewJQ("option").attr("value", $(this).attr("src")).text($(this).attr("title")));
        });

        specialtyList.bind("change", SpecialtyList_Change);
    }

    function SpecialtyList_Change(e) {
        CloseAllOverlays();
        var specialtyList = $("#colouratlas .specialtylist select");
        var selectedItem = specialtyList.find("option:selected");

        if (selectedItem == null) return;

        if (selectedItem.val() === "") return;

        //set hues visible
        var hues = GetConfigValue("specialties specialty[src='" + selectedItem.val() + "']");
        var hasHues = (hues.find("color").size() > 0);
        
        if (hasHues) {
            //show hues
            ShowHues(true, false, true);

            //load hues
            BindHueContainer(hues, "dynamic", selectedItem.text());
            $(".hues ul li:eq(0)").trigger("click");
        } else {
            ShowHues(false, false, true);
            LoadColourTiles(selectedItem.val(), "P01", selectedItem.text());
        }

        specialtyList.find("option[value='']").remove();
    }

    function BindPowders() {
        var specialtyList = $("#colouratlas .specialtylist select");

        specialtyList.empty();
        specialtyList.unbind("change", SpecialtyList_ChangePowders).unbind("change", SpecialtyList_Change);
        specialtyList.append(NewJQ("option").attr("value", "").text("Please select a powder product"));
        var colours = GetConfigValue("navigation powder_coatings color");

        if (colours.size() === 0) return;

        colours.each(function () {
            specialtyList.append(NewJQ("option").attr("value", $(this).attr("name")).text($(this).attr("title")));
        });

        specialtyList.bind("change", SpecialtyList_ChangePowders);
    }

    function SpecialtyList_ChangePowders(e) {
        var specialtyList = $("#colouratlas .specialtylist select");
        var selectedItem = specialtyList.find("option:selected");

        if (selectedItem == null) return;
        if (selectedItem.val() === "") return;

        LoadColourTiles("powders", selectedItem.val(), selectedItem.text());
        specialtyList.find("option[value='']").remove();
    }

    function GetInternalTabName(tabName) {
        return tabName.replace(new RegExp("&", "g"), "and").replace(new RegExp(" ", "g"), "_");
    }
    
	
	//MOVED TO -------------- js-functions.js --------------
    /* function downloadURL(url) {
         if(!isUserLoggedIn)
		{
			window.location = "/specifier/site-tools/log-in.aspx?returnurl=http://www.dulux.com.au/shop/category.aspx?zcid=91";
		} 
		else
		{
			var hiddenIFrameID = 'hiddenDownloader',
				iframe = document.getElementById(hiddenIFrameID);
			
			if (iframe === null) {
				
				iframe = document.createElement('iframe');
				iframe.id = hiddenIFrameID;
				iframe.style.display = 'none';
				document.body.appendChild(iframe);
			}
			
			iframe.src = url;
		//}
    } */

} ();                                                                                                                                                                                                                                                               //end namespace