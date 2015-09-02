HtmlColourAtlasConstants = function () {
    var SERVICEREQUESTBASEURL = "";
    var PROXYSERVICES = false;
    var ATLASXMLCONFIGURL = "../../scripts/colouratlasdata/atlas.au.xml";
    var BLACKMINIMUMLRV = 50.0; // minimum LRV required to use black text on a tile.
    var MAXROWS = 11;
    var ALLCOLOURSNAME = "Hue_Spectrum";
    var NEUTRALSNAME = "Neutrals";
    var SPECIALTIESTABNAME = "Specialties";
    var TRADITIONALSTABNAME = "Traditionals";
    var COLOURCOOKIENAME = "atlascolours";
    var MAXMYCOLOURS = 10;
    var USELOCALCOLOURCHIP = true; // ensures that colour chip will use the new colourchip downloader.
    //valid tokens for deeplink email, [[name]] = colourname, [[url]] = deep link url
    var DEEPLINKEMAILSUBJECT = "I'd like to share [[name]] with you";
    var DEEPLINKEMAILBODY = "I wanted to share this colour with you [[url]]";
    var DEFAULTSELECTEDTAB = "Hue Spectrum";
    var COLOURCHIPHANDLERURL = "../../services/ColourDownload.jpeg";
    var HIDESPECIALTYSPECIFIERNUMBER = false;

    return {
        SERVICEREQUESTBASEURL: SERVICEREQUESTBASEURL,
        PROXYSERVICES: PROXYSERVICES,
        ATLASXMLCONFIGURL: ATLASXMLCONFIGURL,
        BLACKMINIMUMLRV: BLACKMINIMUMLRV,
        MAXROWS: MAXROWS,
        ALLCOLOURSNAME: ALLCOLOURSNAME,
        NEUTRALSNAME: NEUTRALSNAME,
        SPECIALTIESTABNAME: SPECIALTIESTABNAME,
        TRADITIONALSTABNAME: TRADITIONALSTABNAME,
        COLOURCOOKIENAME: COLOURCOOKIENAME,
        MAXMYCOLOURS: MAXMYCOLOURS,
        USELOCALCOLOURCHIP: USELOCALCOLOURCHIP,
        DEEPLINKEMAILSUBJECT: DEEPLINKEMAILSUBJECT,
        DEEPLINKEMAILBODY: DEEPLINKEMAILBODY,
        DEFAULTSELECTEDTAB: DEFAULTSELECTEDTAB,
        COLOURCHIPHANDLERURL: COLOURCHIPHANDLERURL,
        HIDESPECIALTYSPECIFIERNUMBER: HIDESPECIALTYSPECIFIERNUMBER
    };
} ();
