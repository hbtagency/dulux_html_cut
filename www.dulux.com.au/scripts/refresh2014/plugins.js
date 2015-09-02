/*****************************************************************************
scalable Inman Flash Replacement (sIFR) version 3, revision 436.

Copyright 2006 – 2008 Mark Wubben, <http://novemberborn.net/>

Older versions:
* IFR by Shaun Inman
* sIFR 1.0 by Mike Davidson, Shaun Inman and Tomas Jogin
* sIFR 2.0 by Mike Davidson, Shaun Inman, Tomas Jogin and Mark Wubben

See also <http://novemberborn.net/sifr3> and <http://wiki.novemberborn.net/sifr3>.

This software is licensed and provided under the CC-GNU LGPL.
See <http://creativecommons.org/licenses/LGPL/2.1/>
*****************************************************************************/

var sIFR=new function(){var O=this;var E={ACTIVE:"sIFR-active",REPLACED:"sIFR-replaced",IGNORE:"sIFR-ignore",ALTERNATE:"sIFR-alternate",CLASS:"sIFR-class",LAYOUT:"sIFR-layout",FLASH:"sIFR-flash",FIX_FOCUS:"sIFR-fixfocus",DUMMY:"sIFR-dummy"};E.IGNORE_CLASSES=[E.REPLACED,E.IGNORE,E.ALTERNATE];this.MIN_FONT_SIZE=6;this.MAX_FONT_SIZE=126;this.FLASH_PADDING_BOTTOM=5;this.VERSION="436";this.isActive=false;this.isEnabled=true;this.fixHover=true;this.autoInitialize=true;this.setPrefetchCookie=true;this.cookiePath="index.html";this.domains=[];this.forceWidth=true;this.fitExactly=false;this.forceTextTransform=true;this.useDomLoaded=true;this.useStyleCheck=false;this.hasFlashClassSet=false;this.repaintOnResize=true;this.replacements=[];var L=0;var R=false;function Y(){}function D(c){function d(e){return e.toLocaleUpperCase()}this.normalize=function(e){return e.replace(/\n|\r|\xA0/g,D.SINGLE_WHITESPACE).replace(/\s+/g,D.SINGLE_WHITESPACE)};this.textTransform=function(e,f){switch(e){case"uppercase":return f.toLocaleUpperCase();case"lowercase":return f.toLocaleLowerCase();case"capitalize":return f.replace(/^\w|\s\w/g,d)}return f};this.toHexString=function(e){if(e.charAt(0)!="#"||e.length!=4&&e.length!=7){return e}e=e.substring(1);return"0x"+(e.length==3?e.replace(/(.)(.)(.)/,"$1$1$2$2$3$3"):e)};this.toJson=function(g,f){var e="";switch(typeof(g)){case"string":e='"'+f(g)+'"';break;case"number":case"boolean":e=g.toString();break;case"object":e=[];for(var h in g){if(g[h]==Object.prototype[h]){continue}e.push('"'+h+'":'+this.toJson(g[h]))}e="{"+e.join(",")+"}";break}return e};this.convertCssArg=function(e){if(!e){return{}}if(typeof(e)=="object"){if(e.constructor==Array){e=e.join("")}else{return e}}var l={};var m=e.split("}");for(var h=0;h<m.length;h++){var k=m[h].match(/([^\s{]+)\s*\{(.+)\s*;?\s*/);if(!k||k.length!=3){continue}if(!l[k[1]]){l[k[1]]={}}var g=k[2].split(";");for(var f=0;f<g.length;f++){var n=g[f].match(/\s*([^:\s]+)\s*\:\s*([^;]+)/);if(!n||n.length!=3){continue}l[k[1]][n[1]]=n[2].replace(/\s+$/,"")}}return l};this.extractFromCss=function(g,f,i,e){var h=null;if(g&&g[f]&&g[f][i]){h=g[f][i];if(e){delete g[f][i]}}return h};this.cssToString=function(f){var g=[];for(var e in f){var j=f[e];if(j==Object.prototype[e]){continue}g.push(e,"{");for(var i in j){if(j[i]==Object.prototype[i]){continue}var h=j[i];if(D.UNIT_REMOVAL_PROPERTIES[i]){h=parseInt(h,10)}g.push(i,":",h,";")}g.push("}")}return g.join("")};this.escape=function(e){return escape(e).replace(/\+/g,"%2B")};this.encodeVars=function(e){return e.join("&").replace(/%/g,"%25")};this.copyProperties=function(g,f){for(var e in g){if(f[e]===undefined){f[e]=g[e]}}return f};this.domain=function(){var f="";try{f=document.domain}catch(g){}return f};this.domainMatches=function(h,g){if(g=="*"||g==h){return true}var f=g.lastIndexOf("*");if(f>-1){g=g.substr(f+1);var e=h.lastIndexOf(g);if(e>-1&&(e+g.length)==h.length){return true}}return false};this.uriEncode=function(e){return encodeURI(decodeURIComponent(e))};this.delay=function(f,h,g){var e=Array.prototype.slice.call(arguments,3);setTimeout(function(){h.apply(g,e)},f)}}D.UNIT_REMOVAL_PROPERTIES={leading:true,"margin-left":true,"margin-right":true,"text-indent":true};D.SINGLE_WHITESPACE=" ";function U(e){var d=this;function c(g,j,h){var k=d.getStyleAsInt(g,j,e.ua.ie);if(k==0){k=g[h];for(var f=3;f<arguments.length;f++){k-=d.getStyleAsInt(g,arguments[f],true)}}return k}this.getBody=function(){return document.getElementsByTagName("body")[0]||null};this.querySelectorAll=function(f){return window.parseSelector(f)};this.addClass=function(f,g){if(g){g.className=((g.className||"")==""?"":g.className+" ")+f}};this.removeClass=function(f,g){if(g){g.className=g.className.replace(new RegExp("(^|\\s)"+f+"(\\s|$)"),"").replace(/^\s+|(\s)\s+/g,"$1")}};this.hasClass=function(f,g){return new RegExp("(^|\\s)"+f+"(\\s|$)").test(g.className)};this.hasOneOfClassses=function(h,g){for(var f=0;f<h.length;f++){if(this.hasClass(h[f],g)){return true}}return false};this.ancestorHasClass=function(g,f){g=g.parentNode;while(g&&g.nodeType==1){if(this.hasClass(f,g)){return true}g=g.parentNode}return false};this.create=function(f,g){var h=document.createElementNS?document.createElementNS(U.XHTML_NS,f):document.createElement(f);if(g){h.className=g}return h};this.getComputedStyle=function(h,i){var f;if(document.defaultView&&document.defaultView.getComputedStyle){var g=document.defaultView.getComputedStyle(h,null);f=g?g[i]:null}else{if(h.currentStyle){f=h.currentStyle[i]}}return f||""};this.getStyleAsInt=function(g,i,f){var h=this.getComputedStyle(g,i);if(f&&!/px$/.test(h)){return 0}return parseInt(h)||0};this.getWidthFromStyle=function(f){return c(f,"width","offsetWidth","paddingRight","paddingLeft","borderRightWidth","borderLeftWidth")};this.getHeightFromStyle=function(f){return c(f,"height","offsetHeight","paddingTop","paddingBottom","borderTopWidth","borderBottomWidth")};this.getDimensions=function(j){var h=j.offsetWidth;var f=j.offsetHeight;if(h==0||f==0){for(var g=0;g<j.childNodes.length;g++){var k=j.childNodes[g];if(k.nodeType!=1){continue}h=Math.max(h,k.offsetWidth);f=Math.max(f,k.offsetHeight)}}return{width:h,height:f}};this.getViewport=function(){return{width:window.innerWidth||document.documentElement.clientWidth||this.getBody().clientWidth,height:window.innerHeight||document.documentElement.clientHeight||this.getBody().clientHeight}};this.blurElement=function(g){try{g.blur();return}catch(h){}var f=this.create("input");f.style.width="0px";f.style.height="0px";g.parentNode.appendChild(f);f.focus();f.blur();f.parentNode.removeChild(f)}}U.XHTML_NS="http://www.w3.org/1999/xhtml";function H(r){var g=navigator.userAgent.toLowerCase();var q=(navigator.product||"").toLowerCase();var h=navigator.platform.toLowerCase();this.parseVersion=H.parseVersion;this.macintosh=/^mac/.test(h);this.windows=/^win/.test(h);this.linux=/^linux/.test(h);this.quicktime=false;this.opera=/opera/.test(g);this.konqueror=/konqueror/.test(g);this.ie=false/*@cc_on||true@*/;this.ieSupported=this.ie&&!/ppc|smartphone|iemobile|msie\s5\.5/.test(g)/*@cc_on&&@_jscript_version>=5.5@*/;this.ieWin=this.ie&&this.windows/*@cc_on&&@_jscript_version>=5.1@*/;this.windows=this.windows&&(!this.ie||this.ieWin);this.ieMac=this.ie&&this.macintosh/*@cc_on&&@_jscript_version<5.1@*/;this.macintosh=this.macintosh&&(!this.ie||this.ieMac);this.safari=/safari/.test(g);this.webkit=!this.konqueror&&/applewebkit/.test(g);this.khtml=this.webkit||this.konqueror;this.gecko=!this.khtml&&q=="gecko";this.ieVersion=this.ie&&/.*msie\s(\d\.\d)/.exec(g)?this.parseVersion(RegExp.$1):"0";this.operaVersion=this.opera&&/.*opera(\s|\/)(\d+\.\d+)/.exec(g)?this.parseVersion(RegExp.$2):"0";this.webkitVersion=this.webkit&&/.*applewebkit\/(\d+).*/.exec(g)?this.parseVersion(RegExp.$1):"0";this.geckoVersion=this.gecko&&/.*rv:\s*([^\)]+)\)\s+gecko/.exec(g)?this.parseVersion(RegExp.$1):"0";this.konquerorVersion=this.konqueror&&/.*konqueror\/([\d\.]+).*/.exec(g)?this.parseVersion(RegExp.$1):"0";this.flashVersion=0;if(this.ieWin){var l;var o=false;try{l=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(m){try{l=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");this.flashVersion=this.parseVersion("6");l.AllowScriptAccess="always"}catch(m){o=this.flashVersion==this.parseVersion("6")}if(!o){try{l=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(m){}}}if(!o&&l){this.flashVersion=this.parseVersion((l.GetVariable("$version")||"").replace(/^\D+(\d+)\D+(\d+)\D+(\d+).*/g,"$1.$2.$3"))}}else{if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){var n=navigator.plugins["Shockwave Flash"].description.replace(/^.*\s+(\S+\s+\S+$)/,"$1");var p=n.replace(/^\D*(\d+\.\d+).*$/,"$1");if(/r/.test(n)){p+=n.replace(/^.*r(\d*).*$/,".$1")}else{if(/d/.test(n)){p+=".0"}}this.flashVersion=this.parseVersion(p);var j=false;for(var k=0,c=this.flashVersion>=H.MIN_FLASH_VERSION;c&&k<navigator.mimeTypes.length;k++){var f=navigator.mimeTypes[k];if(f.type!="application/x-shockwave-flash"){continue}if(f.enabledPlugin){j=true;if(f.enabledPlugin.description.toLowerCase().indexOf("quicktime")>-1){c=false;this.quicktime=true}}}if(this.quicktime||!j){this.flashVersion=this.parseVersion("0")}}}this.flash=this.flashVersion>=H.MIN_FLASH_VERSION;this.transparencySupport=this.macintosh||this.windows||this.linux&&(this.flashVersion>=this.parseVersion("10")&&(this.gecko&&this.geckoVersion>=this.parseVersion("1.9")||this.opera));this.computedStyleSupport=this.ie||!!document.defaultView.getComputedStyle;this.fixFocus=this.gecko&&this.windows;this.nativeDomLoaded=this.gecko||this.webkit&&this.webkitVersion>=this.parseVersion("525")||this.konqueror&&this.konquerorMajor>this.parseVersion("03")||this.opera;this.mustCheckStyle=this.khtml||this.opera;this.forcePageLoad=this.webkit&&this.webkitVersion<this.parseVersion("523");this.properDocument=typeof(document.location)=="object";this.supported=this.flash&&this.properDocument&&(!this.ie||this.ieSupported)&&this.computedStyleSupport&&(!this.opera||this.operaVersion>=this.parseVersion("9.61"))&&(!this.webkit||this.webkitVersion>=this.parseVersion("412"))&&(!this.gecko||this.geckoVersion>=this.parseVersion("1.8.0.12"))&&(!this.konqueror)}H.parseVersion=function(c){return c.replace(/(^|\D)(\d+)(?=\D|$)/g,function(f,e,g){f=e;for(var d=4-g.length;d>=0;d--){f+="0"}return f+g})};H.MIN_FLASH_VERSION=H.parseVersion("8");function F(c){this.fix=c.ua.ieWin&&window.location.hash!="";var d;this.cache=function(){d=document.title};function e(){document.title=d}this.restore=function(){if(this.fix){setTimeout(e,0)}}}function S(l){var e=null;function c(){try{if(l.ua.ie||document.readyState!="loaded"&&document.readyState!="complete"){document.documentElement.doScroll("left")}}catch(n){return setTimeout(c,10)}i()}function i(){if(l.useStyleCheck){h()}else{if(!l.ua.mustCheckStyle){d(null,true)}}}function h(){e=l.dom.create("div",E.DUMMY);l.dom.getBody().appendChild(e);m()}function m(){if(l.dom.getComputedStyle(e,"marginLeft")=="42px"){g()}else{setTimeout(m,10)}}function g(){if(e&&e.parentNode){e.parentNode.removeChild(e)}e=null;d(null,true)}function d(n,o){l.initialize(o);if(n&&n.type=="load"){if(document.removeEventListener){document.removeEventListener("DOMContentLoaded",d,false)}if(window.removeEventListener){window.removeEventListener("load",d,false)}}}function j(){l.prepareClearReferences();if(document.readyState=="interactive"){document.attachEvent("onstop",f);setTimeout(function(){document.detachEvent("onstop",f)},0)}}function f(){document.detachEvent("onstop",f);k()}function k(){l.clearReferences()}this.attach=function(){if(window.addEventListener){window.addEventListener("load",d,false)}else{window.attachEvent("onload",d)}if(!l.useDomLoaded||l.ua.forcePageLoad||l.ua.ie&&window.top!=window){return}if(l.ua.nativeDomLoaded){document.addEventListener("DOMContentLoaded",i,false)}else{if(l.ua.ie||l.ua.khtml){c()}}};this.attachUnload=function(){if(!l.ua.ie){return}window.attachEvent("onbeforeunload",j);window.attachEvent("onunload",k)}}var Q="sifrFetch";function N(c){var e=false;this.fetchMovies=function(f){if(c.setPrefetchCookie&&new RegExp(";?"+Q+"=true;?").test(document.cookie)){return}try{e=true;d(f)}catch(g){}if(c.setPrefetchCookie){document.cookie=Q+"=true;path="+c.cookiePath}};this.clear=function(){if(!e){return}try{var f=document.getElementsByTagName("script");for(var g=f.length-1;g>=0;g--){var h=f[g];if(h.type=="sifr/prefetch"){h.parentNode.removeChild(h)}}}catch(j){}};function d(f){for(var g=0;g<f.length;g++){document.write('<script defer type="sifr/prefetch" src="'+f[g].src+'"><\/script>')}}}function b(e){var g=e.ua.ie;var f=g&&e.ua.flashVersion<e.ua.parseVersion("9.0.115");var d={};var c={};this.fixFlash=f;this.register=function(h){if(!g){return}var i=h.getAttribute("id");this.cleanup(i,false);c[i]=h;delete d[i];if(f){window[i]=h}};this.reset=function(){if(!g){return false}for(var j=0;j<e.replacements.length;j++){var h=e.replacements[j];var k=c[h.id];if(!d[h.id]&&(!k.parentNode||k.parentNode.nodeType==11)){h.resetMovie();d[h.id]=true}}return true};this.cleanup=function(l,h){var i=c[l];if(!i){return}for(var k in i){if(typeof(i[k])=="function"){i[k]=null}}c[l]=null;if(f){window[l]=null}if(i.parentNode){if(h&&i.parentNode.nodeType==1){var j=document.createElement("div");j.style.width=i.offsetWidth+"px";j.style.height=i.offsetHeight+"px";i.parentNode.replaceChild(j,i)}else{i.parentNode.removeChild(i)}}};this.prepareClearReferences=function(){if(!f){return}__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}};this.clearReferences=function(){if(f){var j=document.getElementsByTagName("object");for(var h=j.length-1;h>=0;h--){c[j[h].getAttribute("id")]=j[h]}}for(var k in c){if(Object.prototype[k]!=c[k]){this.cleanup(k,true)}}}}function K(d,g,f,c,e){this.sIFR=d;this.id=g;this.vars=f;this.movie=null;this.__forceWidth=c;this.__events=e;this.__resizing=0}K.prototype={getFlashElement:function(){return document.getElementById(this.id)},getAlternate:function(){return document.getElementById(this.id+"_alternate")},getAncestor:function(){var c=this.getFlashElement().parentNode;return !this.sIFR.dom.hasClass(E.FIX_FOCUS,c)?c:c.parentNode},available:function(){var c=this.getFlashElement();return c&&c.parentNode},call:function(c){var d=this.getFlashElement();if(!d[c]){return false}return Function.prototype.apply.call(d[c],d,Array.prototype.slice.call(arguments,1))},attempt:function(){if(!this.available()){return false}try{this.call.apply(this,arguments)}catch(c){if(this.sIFR.debug){throw c}return false}return true},updateVars:function(c,e){for(var d=0;d<this.vars.length;d++){if(this.vars[d].split("=")[0]==c){this.vars[d]=c+"="+e;break}}var f=this.sIFR.util.encodeVars(this.vars);this.movie.injectVars(this.getFlashElement(),f);this.movie.injectVars(this.movie.html,f)},storeSize:function(c,d){this.movie.setSize(c,d);this.updateVars(c,d)},fireEvent:function(c){if(this.available()&&this.__events[c]){this.sIFR.util.delay(0,this.__events[c],this,this)}},resizeFlashElement:function(c,d,e){if(!this.available()){return}this.__resizing++;var f=this.getFlashElement();f.setAttribute("height",c);this.getAncestor().style.minHeight="";this.updateVars("renderheight",c);this.storeSize("height",c);if(d!==null){f.setAttribute("width",d);this.movie.setSize("width",d)}if(this.__events.onReplacement){this.sIFR.util.delay(0,this.__events.onReplacement,this,this);delete this.__events.onReplacement}if(e){this.sIFR.util.delay(0,function(){this.attempt("scaleMovie");this.__resizing--},this)}else{this.__resizing--}},blurFlashElement:function(){if(this.available()){this.sIFR.dom.blurElement(this.getFlashElement())}},resetMovie:function(){this.sIFR.util.delay(0,this.movie.reset,this.movie,this.getFlashElement(),this.getAlternate())},resizeAfterScale:function(){if(this.available()&&this.__resizing==0){this.sIFR.util.delay(0,this.resize,this)}},resize:function(){if(!this.available()){return}this.__resizing++;var g=this.getFlashElement();var f=g.offsetWidth;if(f==0){return}var e=g.getAttribute("width");var l=g.getAttribute("height");var m=this.getAncestor();var o=this.sIFR.dom.getHeightFromStyle(m);g.style.width="1px";g.style.height="1px";m.style.minHeight=o+"px";var c=this.getAlternate().childNodes;var n=[];for(var k=0;k<c.length;k++){var h=c[k].cloneNode(true);n.push(h);m.appendChild(h)}var d=this.sIFR.dom.getWidthFromStyle(m);for(var k=0;k<n.length;k++){m.removeChild(n[k])}g.style.width=g.style.height=m.style.minHeight="";g.setAttribute("width",this.__forceWidth?d:e);g.setAttribute("height",l);if(sIFR.ua.ie){g.style.display="none";var j=g.offsetHeight;g.style.display=""}if(d!=f){if(this.__forceWidth){this.storeSize("width",d)}this.attempt("resize",d)}this.__resizing--},replaceText:function(g,j){var d=this.sIFR.util.escape(g);if(!this.attempt("replaceText",d)){return false}this.updateVars("content",d);var f=this.getAlternate();if(j){while(f.firstChild){f.removeChild(f.firstChild)}for(var c=0;c<j.length;c++){f.appendChild(j[c])}}else{try{f.innerHTML=g}catch(h){}}return true},changeCSS:function(c){c=this.sIFR.util.escape(this.sIFR.util.cssToString(this.sIFR.util.convertCssArg(c)));this.updateVars("css",c);return this.attempt("changeCSS",c)},remove:function(){if(this.movie&&this.available()){this.movie.remove(this.getFlashElement(),this.id)}}};var X=new function(){this.create=function(p,n,j,i,f,e,g,o,l,h,m){var k=p.ua.ie?d:c;return new k(p,n,j,i,f,e,g,o,["flashvars",l,"wmode",h,"bgcolor",m,"allowScriptAccess","always","quality","best"])};function c(s,q,l,h,f,e,g,r,n){var m=s.dom.create("object",E.FLASH);var p=["type","application/x-shockwave-flash","id",f,"name",f,"data",e,"width",g,"height",r];for(var o=0;o<p.length;o+=2){m.setAttribute(p[o],p[o+1])}var j=m;if(h){j=W.create("div",E.FIX_FOCUS);j.appendChild(m)}for(var o=0;o<n.length;o+=2){if(n[o]=="name"){continue}var k=W.create("param");k.setAttribute("name",n[o]);k.setAttribute("value",n[o+1]);m.appendChild(k)}l.style.minHeight=r+"px";while(l.firstChild){l.removeChild(l.firstChild)}l.appendChild(j);this.html=j.cloneNode(true)}c.prototype={reset:function(e,f){e.parentNode.replaceChild(this.html.cloneNode(true),e)},remove:function(e,f){e.parentNode.removeChild(e)},setSize:function(e,f){this.html.setAttribute(e,f)},injectVars:function(e,g){var h=e.getElementsByTagName("param");for(var f=0;f<h.length;f++){if(h[f].getAttribute("name")=="flashvars"){h[f].setAttribute("value",g);break}}}};function d(p,n,j,h,f,e,g,o,k){this.dom=p.dom;this.broken=n;this.html='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="'+f+'" width="'+g+'" height="'+o+'" class="'+E.FLASH+'"><param name="movie" value="'+e+'"></param></object>';var m="";for(var l=0;l<k.length;l+=2){m+='<param name="'+k[l]+'" value="'+k[l+1]+'"></param>'}this.html=this.html.replace(/(<\/object>)/,m+"$1");j.style.minHeight=o+"px";j.innerHTML=this.html;this.broken.register(j.firstChild)}d.prototype={reset:function(f,g){g=g.cloneNode(true);var e=f.parentNode;e.innerHTML=this.html;this.broken.register(e.firstChild);e.appendChild(g)},remove:function(e,f){this.broken.cleanup(f)},setSize:function(e,f){this.html=this.html.replace(e=="height"?/(height)="\d+"/:/(width)="\d+"/,'$1="'+f+'"')},injectVars:function(e,f){if(e!=this.html){return}this.html=this.html.replace(/(flashvars(=|\"\svalue=)\")[^\"]+/,"$1"+f)}}};this.errors=new Y(O);var A=this.util=new D(O);var W=this.dom=new U(O);var T=this.ua=new H(O);var G={fragmentIdentifier:new F(O),pageLoad:new S(O),prefetch:new N(O),brokenFlashIE:new b(O)};this.__resetBrokenMovies=G.brokenFlashIE.reset;var J={kwargs:[],replaceAll:function(d){for(var c=0;c<this.kwargs.length;c++){O.replace(this.kwargs[c])}if(!d){this.kwargs=[]}}};this.activate=function(){if(!T.supported||!this.isEnabled||this.isActive||!C()||a()){return}G.prefetch.fetchMovies(arguments);this.isActive=true;this.setFlashClass();G.fragmentIdentifier.cache();G.pageLoad.attachUnload();if(!this.autoInitialize){return}G.pageLoad.attach()};this.setFlashClass=function(){if(this.hasFlashClassSet){return}W.addClass(E.ACTIVE,W.getBody()||document.documentElement);this.hasFlashClassSet=true};this.removeFlashClass=function(){if(!this.hasFlashClassSet){return}W.removeClass(E.ACTIVE,W.getBody());W.removeClass(E.ACTIVE,document.documentElement);this.hasFlashClassSet=false};this.initialize=function(c){if(!this.isActive||!this.isEnabled){return}if(R){if(!c){J.replaceAll(false)}return}R=true;J.replaceAll(c);if(O.repaintOnResize){if(window.addEventListener){window.addEventListener("resize",Z,false)}else{window.attachEvent("onresize",Z)}}G.prefetch.clear()};this.replace=function(x,u){if(!T.supported){return}if(u){x=A.copyProperties(x,u)}if(!R){return J.kwargs.push(x)}if(this.onReplacementStart){this.onReplacementStart(x)}var AM=x.elements||W.querySelectorAll(x.selector);if(AM.length==0){return}var w=M(x.src);var AR=A.convertCssArg(x.css);var v=B(x.filters);var AN=x.forceSingleLine===true;var AS=x.preventWrap===true&&!AN;var q=AN||(x.fitExactly==null?this.fitExactly:x.fitExactly)===true;var AD=q||(x.forceWidth==null?this.forceWidth:x.forceWidth)===true;var s=x.ratios||[];var AE=x.pixelFont===true;var r=parseInt(x.tuneHeight)||0;var z=!!x.onRelease||!!x.onRollOver||!!x.onRollOut;if(q){A.extractFromCss(AR,".sIFR-root","text-align",true)}var t=A.extractFromCss(AR,".sIFR-root","font-size",true)||"0";var e=A.extractFromCss(AR,".sIFR-root","background-color",true)||"#FFFFFF";var o=A.extractFromCss(AR,".sIFR-root","kerning",true)||"";var AW=A.extractFromCss(AR,".sIFR-root","opacity",true)||"100";var k=A.extractFromCss(AR,".sIFR-root","cursor",true)||"default";var AP=parseInt(A.extractFromCss(AR,".sIFR-root","leading"))||0;var AJ=x.gridFitType||(A.extractFromCss(AR,".sIFR-root","text-align")=="right")?"subpixel":"pixel";var h=this.forceTextTransform===false?"none":A.extractFromCss(AR,".sIFR-root","text-transform",true)||"none";t=/^\d+(px)?$/.test(t)?parseInt(t):0;AW=parseFloat(AW)<1?100*parseFloat(AW):AW;var AC=x.modifyCss?"":A.cssToString(AR);var AG=x.wmode||"";if(!AG){if(x.transparent){AG="transparent"}else{if(x.opaque){AG="opaque"}}}if(AG=="transparent"){if(!T.transparencySupport){AG="opaque"}else{e="transparent"}}else{if(e=="transparent"){e="#FFFFFF"}}for(var AV=0;AV<AM.length;AV++){var AF=AM[AV];if(W.hasOneOfClassses(E.IGNORE_CLASSES,AF)||W.ancestorHasClass(AF,E.ALTERNATE)){continue}var AO=W.getDimensions(AF);var f=AO.height;var c=AO.width;var AA=W.getComputedStyle(AF,"display");if(!f||!c||!AA||AA=="none"){continue}c=W.getWidthFromStyle(AF);var n,AH;if(!t){var AL=I(AF);n=Math.min(this.MAX_FONT_SIZE,Math.max(this.MIN_FONT_SIZE,AL.fontSize));if(AE){n=Math.max(8,8*Math.round(n/8))}AH=AL.lines}else{n=t;AH=1}var d=W.create("span",E.ALTERNATE);var AX=AF.cloneNode(true);AF.parentNode.appendChild(AX);for(var AU=0,AT=AX.childNodes.length;AU<AT;AU++){var m=AX.childNodes[AU];if(!/^(style|script)$/i.test(m.nodeName)){d.appendChild(m.cloneNode(true))}}if(x.modifyContent){x.modifyContent(AX,x.selector)}if(x.modifyCss){AC=x.modifyCss(AR,AX,x.selector)}var p=P(AX,h,x.uriEncode);AX.parentNode.removeChild(AX);if(x.modifyContentString){p.text=x.modifyContentString(p.text,x.selector)}if(p.text==""){continue}var AK=Math.round(AH*V(n,s)*n)+this.FLASH_PADDING_BOTTOM+r;if(AH>1&&AP){AK+=Math.round((AH-1)*AP)}var AB=AD?c:"100%";var AI="sIFR_replacement_"+L++;var AQ=["id="+AI,"content="+A.escape(p.text),"width="+c,"renderheight="+AK,"link="+A.escape(p.primaryLink.href||""),"target="+A.escape(p.primaryLink.target||""),"size="+n,"css="+A.escape(AC),"cursor="+k,"tunewidth="+(x.tuneWidth||0),"tuneheight="+r,"offsetleft="+(x.offsetLeft||""),"offsettop="+(x.offsetTop||""),"fitexactly="+q,"preventwrap="+AS,"forcesingleline="+AN,"antialiastype="+(x.antiAliasType||""),"thickness="+(x.thickness||""),"sharpness="+(x.sharpness||""),"kerning="+o,"gridfittype="+AJ,"flashfilters="+v,"opacity="+AW,"blendmode="+(x.blendMode||""),"selectable="+(x.selectable==null||AG!=""&&!sIFR.ua.macintosh&&sIFR.ua.gecko&&sIFR.ua.geckoVersion>=sIFR.ua.parseVersion("1.9")?"true":x.selectable===true),"fixhover="+(this.fixHover===true),"events="+z,"delayrun="+G.brokenFlashIE.fixFlash,"version="+this.VERSION];var y=A.encodeVars(AQ);var g=new K(O,AI,AQ,AD,{onReplacement:x.onReplacement,onRollOver:x.onRollOver,onRollOut:x.onRollOut,onRelease:x.onRelease});g.movie=X.create(sIFR,G.brokenFlashIE,AF,T.fixFocus&&x.fixFocus,AI,w,AB,AK,y,AG,e);this.replacements.push(g);this.replacements[AI]=g;if(x.selector){if(!this.replacements[x.selector]){this.replacements[x.selector]=[g]}else{this.replacements[x.selector].push(g)}}d.setAttribute("id",AI+"_alternate");AF.appendChild(d);W.addClass(E.REPLACED,AF)}G.fragmentIdentifier.restore()};this.getReplacementByFlashElement=function(d){for(var c=0;c<O.replacements.length;c++){if(O.replacements[c].id==d.getAttribute("id")){return O.replacements[c]}}};this.redraw=function(){for(var c=0;c<O.replacements.length;c++){O.replacements[c].resetMovie()}};this.prepareClearReferences=function(){G.brokenFlashIE.prepareClearReferences()};this.clearReferences=function(){G.brokenFlashIE.clearReferences();G=null;J=null;delete O.replacements};function C(){if(O.domains.length==0){return true}var d=A.domain();for(var c=0;c<O.domains.length;c++){if(A.domainMatches(d,O.domains[c])){return true}}return false}function a(){if(document.location.protocol=="file:"){if(O.debug){O.errors.fire("isFile")}return true}return false}function M(c){if(T.ie&&c.charAt(0)=="index.html"){c=window.location.toString().replace(/([^:]+)(:\/?\/?)([^\/]+).*/,"$1$2$3")+c}return c}function V(d,e){for(var c=0;c<e.length;c+=2){if(d<=e[c]){return e[c+1]}}return e[e.length-1]||1}function B(g){var e=[];for(var d in g){if(g[d]==Object.prototype[d]){continue}var c=g[d];d=[d.replace(/filter/i,"")+"Filter"];for(var f in c){if(c[f]==Object.prototype[f]){continue}d.push(f+":"+A.escape(A.toJson(c[f],A.toHexString)))}e.push(d.join(","))}return A.escape(e.join(";"))}function Z(d){var e=Z.viewport;var c=W.getViewport();if(e&&c.width==e.width&&c.height==e.height){return}Z.viewport=c;if(O.replacements.length==0){return}if(Z.timer){clearTimeout(Z.timer)}Z.timer=setTimeout(function(){delete Z.timer;for(var f=0;f<O.replacements.length;f++){O.replacements[f].resize()}},200)}function I(f){var g=W.getComputedStyle(f,"fontSize");var d=g.indexOf("px")==-1;var e=f.innerHTML;if(d){f.innerHTML="X"}f.style.paddingTop=f.style.paddingBottom=f.style.borderTopWidth=f.style.borderBottomWidth="0px";f.style.lineHeight="2em";f.style.display="block";g=d?f.offsetHeight/2:parseInt(g,10);if(d){f.innerHTML=e}var c=Math.round(f.offsetHeight/(2*g));f.style.paddingTop=f.style.paddingBottom=f.style.borderTopWidth=f.style.borderBottomWidth=f.style.lineHeight=f.style.display="";if(isNaN(c)||!isFinite(c)||c==0){c=1}return{fontSize:g,lines:c}}function P(c,g,s){s=s||A.uriEncode;var q=[],m=[];var k=null;var e=c.childNodes;var o=false,p=false;var j=0;while(j<e.length){var f=e[j];if(f.nodeType==3){var t=A.textTransform(g,A.normalize(f.nodeValue)).replace(/</g,"&lt;");if(o&&p){t=t.replace(/^\s+/,"")}m.push(t);o=/\s$/.test(t);p=false}if(f.nodeType==1&&!/^(style|script)$/i.test(f.nodeName)){var h=[];var r=f.nodeName.toLowerCase();var n=f.className||"";if(/\s+/.test(n)){if(n.indexOf(E.CLASS)>-1){n=n.match("(\\s|^)"+E.CLASS+"-([^\\s$]*)(\\s|$)")[2]}else{n=n.match(/^([^\s]+)/)[1]}}if(n!=""){h.push('class="'+n+'"')}if(r=="a"){var d=s(f.getAttribute("href")||"");var l=f.getAttribute("target")||"";h.push('href="'+d+'"','target="'+l+'"');if(!k){k={href:d,target:l}}}m.push("<"+r+(h.length>0?" ":"")+h.join(" ")+">");p=true;if(f.hasChildNodes()){q.push(j);j=0;e=f.childNodes;continue}else{if(!/^(br|img)$/i.test(f.nodeName)){m.push("</",f.nodeName.toLowerCase(),">")}}}if(q.length>0&&!f.nextSibling){do{j=q.pop();e=f.parentNode.parentNode.childNodes;f=e[j];if(f){m.push("</",f.nodeName.toLowerCase(),">")}}while(j==e.length-1&&q.length>0)}j++}return{text:m.join("").replace(/^\s+|\s+$|\s*(<br>)\s*/g,"$1"),primaryLink:k||{}}}};
var parseSelector=(function(){var B=/\s*,\s*/;var A=/\s*([\s>+~(),]|^|$)\s*/g;var L=/([\s>+~,]|[^(]\+|^)([#.:@])/g;var F=/(^|\))[^\s>+~]/g;var M=/(\)|^)/;var K=/[\s#.:>+~()@]|[^\s#.:>+~()@]+/g;function H(R,P){P=P||document.documentElement;var S=R.split(B),X=[];for(var U=0;U<S.length;U++){var N=[P],W=G(S[U]);for(var T=0;T<W.length;){var Q=W[T++],O=W[T++],V="";if(W[T]=="("){while(W[T++]!=")"&&T<W.length){V+=W[T]}V=V.slice(0,-1)}N=I(N,Q,O,V)}X=X.concat(N)}return X}function G(N){var O=N.replace(A,"$1").replace(L,"$1*$2").replace(F,D);return O.match(K)||[]}function D(N){return N.replace(M,"$1 ")}function I(N,P,Q,O){return(H.selectors[P])?H.selectors[P](N,Q,O):[]}var E={toArray:function(O){var N=[];for(var P=0;P<O.length;P++){N.push(O[P])}return N}};var C={isTag:function(O,N){return(N=="*")||(N.toLowerCase()==O.nodeName.toLowerCase())},previousSiblingElement:function(N){do{N=N.previousSibling}while(N&&N.nodeType!=1);return N},nextSiblingElement:function(N){do{N=N.nextSibling}while(N&&N.nodeType!=1);return N},hasClass:function(N,O){return(O.className||"").match("(^|\\s)"+N+"(\\s|$)")},getByTag:function(N,O){return O.getElementsByTagName(N)}};var J={"#":function(N,P){for(var O=0;O<N.length;O++){if(N[O].getAttribute("id")==P){return[N[O]]}}return[]}," ":function(O,Q){var N=[];for(var P=0;P<O.length;P++){N=N.concat(E.toArray(C.getByTag(Q,O[P])))}return N},">":function(O,R){var N=[];for(var Q=0,S;Q<O.length;Q++){S=O[Q];for(var P=0,T;P<S.childNodes.length;P++){T=S.childNodes[P];if(T.nodeType==1&&C.isTag(T,R)){N.push(T)}}}return N},".":function(O,Q){var N=[];for(var P=0,R;P<O.length;P++){R=O[P];if(C.hasClass([Q],R)){N.push(R)}}return N},":":function(N,P,O){return(H.pseudoClasses[P])?H.pseudoClasses[P](N,O):[]}};H.selectors=J;H.pseudoClasses={};H.util=E;H.dom=C;return H})();
/*****************************************************************************
It is adviced to place the sIFR JavaScript calls in this file, keeping it
separate from the `sifr.js` file. That way, you can easily swap the `sifr.js`
file for a new version, while keeping the configuration.

You must load this file *after* loading `sifr.js`.

That said, you're of course free to merge the JavaScript files. Just make sure
the copyright statement in `sifr.js` is kept intact.
*****************************************************************************/

// Make an object pointing to the location of the Flash movie on your web server.
// Try using the font name as the variable name, makes it easy to remember which
// object you're using. As an example in this file, we'll use Futura.
var futura = { src: 'http://www.dulux.com.au/swf/sifr/futura-bk.swf' };
var steel = { src: 'http://www.dulux.com.au/swf/sifr/steel-wolf.swf' };
var pump = { src: 'http://www.dulux.com.au/swf/sifr/pump-light.swf' };

// Now you can set some configuration settings.
// See also <http://wiki.novemberborn.net/sifr3/JavaScript+Configuration>.
// One setting you probably want to use is `sIFR.useStyleCheck`. Before you do that,
// read <http://wiki.novemberborn.net/sifr3/DetectingCSSLoad>.

sIFR.useStyleCheck = true;

// Next, activate sIFR:

sIFR.activate(futura, steel, pump);

// If you want, you can use multiple movies, like so:
//
//    var futura = { src: '/path/to/futura.swf' };
//    var garamond = { src '/path/to/garamond.swf' };
//    var rockwell = { src: '/path/to/rockwell.swf' };
//    
//    sIFR.activate(futura, garamond, rockwell);
//
// Remember, there must be *only one* `sIFR.activate()`!

// Now we can do the replacements. You can do as many as you like, but just
// as an example, we'll replace all `<h1>` elements with the Futura movie.
// 
// The first argument to `sIFR.replace` is the `futura` object we created earlier.
// The second argument is another object, on which you can specify a number of
// parameters or "keyword arguemnts". For the full list, see "Keyword arguments"
// under `replace(kwargs, mergeKwargs)` at 
// <http://wiki.novemberborn.net/sifr3/JavaScript+Methods>.
// 
// The first argument you see here is `selector`, which is a normal CSS selector.
// That means you can also do things like '#content h1' or 'h1.title'.
//
// The second argument determines what the Flash text looks like. The main text
// is styled via the `.sIFR-root` class. Here we've specified `background-color`
// of the entire Flash movie to be a light grey, and the `color` of the text to
// be red. Read more about styling at <http://wiki.novemberborn.net/sifr3/Styling>.
sIFR.replace(futura, {
  selector: '#content-main h1',
  css: '.sIFR-root { font-weight:bold; color: #2d2d2d;}',
  wmode: 'transparent'
});

sIFR.replace(futura, {
  selector: '#sidebar h2',
  css: '.sIFR-root { font-weight:bold; color:#003366;}',
  wmode: 'transparent'
});

sIFR.replace(futura, {
  selector: '#sub-content h4',
  css: '.sIFR-root { font-weight:bold; color:#000000;}',
  wmode: 'transparent'
});

sIFR.replace(futura, {
  selector: '.homebox h3',
  css: '.sIFR-root { font-weight:bold; color:#001344;}',
  wmode: 'transparent'
});

sIFR.replace(futura, {
  selector: '.homebox h2',
  css: '.sIFR-root { font-weight:bold; color:#001344;}',
  wmode: 'transparent'
});

sIFR.replace(futura, {
  selector: '#sub-content p.facts',
  css: '.sIFR-root { font-weight:bold; color:#0066CC;}',
  wmode: 'transparent'
});

sIFR.replace(steel, {
  selector: '#sub-content h1.color-forecast',
  css: '.sIFR-root { font-weight:normal; color:#2d2d2d; text-transform:uppercase;}',
  wmode: 'transparent'
});

sIFR.replace(futura, {
  selector: '#overlay-container h1',
  css: '.sIFR-root { font-weight:normal; color:#2d2d2d; font-weight: bold;}',
  wmode: 'transparent'
});

sIFR.replace(futura, {
  selector: '#content.lp h1',
  css: '.sIFR-root { font-weight:bold; color: #00235e;}',
  wmode: 'transparent'
});

sIFR.replace(futura, {
  selector: '#content.lp h2',
  css: '.sIFR-root { font-weight:bold; color: #670f4b;}',
  wmode: 'transparent'
});

sIFR.replace(futura, {
  selector: '#content.lp .facts-lp h3',
  css: '.sIFR-root { font-weight:bold; color: #670f4b;}',
  wmode: 'transparent'
});

sIFR.replace(futura, {
  selector: '#content.lp .facts-lp h4',
  css: '.sIFR-root { font-weight:bold; color: #670f4b;}',
  wmode: 'transparent'
});

sIFR.replace(pump, {
  selector: '#sub-content h1.year-2010',
  css: '.sIFR-root { font-weight:normal; color:#2d2d2d; text-transform:uppercase;}',
  wmode: 'transparent'
});
/*
 * jQuery FlexSlider v2.2.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // depricating this idea, as devices are being released with both of these events
        //eventType = (touch) ? "touchend" : "click",
        eventType = "click touchend MSPointerUp",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {},
        focused = true;

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) slider.currentSlide = 0;
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") slider.vars.animation = "swing";
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) methods.controlNav.setup();

        // DIRECTIONNAV:
        if (slider.vars.directionNav) methods.directionNav.setup();

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) methods.pausePlay.setup();

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) methods.pauseInvisible.init();

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) slider.pause();
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) slider.play();
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) methods.asNav.setup();

        // TOUCH
        if (touch && slider.vars.touch) methods.touch();

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) $(window).bind("resize orientationchange focus", methods.resize);

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.on(eventType, function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture)
                          e.currentTarget._gesture.addPointer(e.pointerId);
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"/>' : '<a>' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' != captn && undefined != captn ) item += '<span class="' + namespace + 'caption">' + captn + '</span>';
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            el.addEventListener('touchstart', onTouchStart, false);

            function onTouchStart(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;

                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            }

            function onTouchMove(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : startX - localX;
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            }

            function onTouchEnd(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            }
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) slider.doMath();

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) methods.smoothHeight();
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        $clone.find( '[id]' ).each(function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var prefixes = ['webkit','moz','ms','o'];

          if ('hidden' in document) return 'hidden';
          for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Hidden') in document)
            methods.pauseInvisible.visProp = prefixes[i] + 'Hidden';
          }
          if (methods.pauseInvisible.visProp) {
            var evtname = methods.pauseInvisible.visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                else slider.pause(); //Or just pause
              }
              else {
                if(slider.started) slider.play(); //Initiated before, just play
                else (slider.vars.initDelay > 0) ? setTimeout(slider.play, slider.vars.initDelay) : slider.play(); //Didn't init before: simply init or wait for it
              }
            });
          }
        },
        isHidden: function() {
          return document[methods.pauseInvisible.visProp] || false;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) slider.pause();

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) methods.sync("animate");

        // CONTROLNAV
        if (slider.vars.controlNav) methods.controlNav.active();

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) methods.directionNav.update();

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) slider.pause();
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            //margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }
            
            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
            //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) methods.smoothHeight(slider.vars.animationSpeed);
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) slider.flexAnimate(slider.getTarget("next"));
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) methods.pausePlay.update("play");
      // SYNC:
      if (slider.syncExists) methods.sync("pause");
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) clearInterval(slider.animatedSlides);
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) methods.pausePlay.update("pause");
      // SYNC:
      if (slider.syncExists) methods.sync("play");
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
         slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) slider.container.css(slider.args);

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") slider.container.find('.clone').remove();
          // slider.container.append(slider.slides.first().clone().addClass('clone').attr('aria-hidden', 'true')).prepend(slider.slides.last().clone().addClass('clone').attr('aria-hidden', 'true'));
		      methods.uniqueID( slider.slides.first().clone().addClass('clone').attr('aria-hidden', 'true') ).appendTo( slider.container );
		      methods.uniqueID( slider.slides.last().clone().addClass('clone').attr('aria-hidden', 'true') ).prependTo( slider.container );
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) methods.smoothHeight();
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) methods.smoothHeight();
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) methods.directionNav.update();

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) options = {};

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === true ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) options.start($this);
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") $slider.flexAnimate(options, true);
      }
    }
  };
})(jQuery);

/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9999.4 (29-MAR-2012)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
;(function($, undefined) {
"use strict";

var ver = '2.9999.4';

// if $.support is not defined (pre jQuery 1.3) add what I need
if ($.support === undefined) {
	$.support = {
		opacity: !($.browser.msie)
	};
}

function debug(s) {
	if ($.fn.cycle.debug)
		log(s);
}		
function log() {
	if (window.console && console.log)
		console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
}
$.expr[':'].paused = function(el) {
	return el.cyclePause;
};


// the options arg can be...
//   a number  - indicates an immediate transition should occur to the given slide index
//   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
//   an object - properties to control the slideshow
//
// the arg2 arg can be...
//   the name of an fx (only used in conjunction with a numeric value for 'options')
//   the value true (only used in first arg == 'resume') and indicates
//	 that the resume should occur immediately (not wait for next timeout)

$.fn.cycle = function(options, arg2) {
	var o = { s: this.selector, c: this.context };

	// in 1.3+ we can fix mistakes with the ready state
	if (this.length === 0 && options != 'stop') {
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing slideshow');
			$(function() {
				$(o.s,o.c).cycle(options,arg2);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}

	// iterate the matched nodeset
	return this.each(function() {
		var opts = handleArguments(this, options, arg2);
		if (opts === false)
			return;

		opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
		
		// stop existing slideshow for this container (if there is one)
		if (this.cycleTimeout)
			clearTimeout(this.cycleTimeout);
		this.cycleTimeout = this.cyclePause = 0;

		var $cont = $(this);
		var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
		var els = $slides.get();

		if (els.length < 2) {
			log('terminating; too few slides: ' + els.length);
			return;
		}

		var opts2 = buildOptions($cont, $slides, els, opts, o);
		if (opts2 === false)
			return;

		var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);

		// if it's an auto slideshow, kick it off
		if (startTime) {
			startTime += (opts2.delay || 0);
			if (startTime < 10)
				startTime = 10;
			debug('first timeout: ' + startTime);
			this.cycleTimeout = setTimeout(function(){go(els,opts2,0,!opts.backwards);}, startTime);
		}
	});
};

function triggerPause(cont, byHover, onPager) {
	var opts = $(cont).data('cycle.opts');
	var paused = !!cont.cyclePause;
	if (paused && opts.paused)
		opts.paused(cont, opts, byHover, onPager);
	else if (!paused && opts.resumed)
		opts.resumed(cont, opts, byHover, onPager);
}

// process the args that were passed to the plugin fn
function handleArguments(cont, options, arg2) {
	if (cont.cycleStop === undefined)
		cont.cycleStop = 0;
	if (options === undefined || options === null)
		options = {};
	if (options.constructor == String) {
		switch(options) {
		case 'destroy':
		case 'stop':
			var opts = $(cont).data('cycle.opts');
			if (!opts)
				return false;
			cont.cycleStop++; // callbacks look for change
			if (cont.cycleTimeout)
				clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
			if (opts.elements)
				$(opts.elements).stop();
			$(cont).removeData('cycle.opts');
			if (options == 'destroy')
				destroy(cont, opts);
			return false;
		case 'toggle':
			cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
			checkInstantResume(cont.cyclePause, arg2, cont);
			triggerPause(cont);
			return false;
		case 'pause':
			cont.cyclePause = 1;
			triggerPause(cont);
			return false;
		case 'resume':
			cont.cyclePause = 0;
			checkInstantResume(false, arg2, cont);
			triggerPause(cont);
			return false;
		case 'prev':
		case 'next':
			opts = $(cont).data('cycle.opts');
			if (!opts) {
				log('options not found, "prev/next" ignored');
				return false;
			}
			$.fn.cycle[options](opts);
			return false;
		default:
			options = { fx: options };
		}
		return options;
	}
	else if (options.constructor == Number) {
		// go to the requested slide
		var num = options;
		options = $(cont).data('cycle.opts');
		if (!options) {
			log('options not found, can not advance slide');
			return false;
		}
		if (num < 0 || num >= options.elements.length) {
			log('invalid slide index: ' + num);
			return false;
		}
		options.nextSlide = num;
		if (cont.cycleTimeout) {
			clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
		}
		if (typeof arg2 == 'string')
			options.oneTimeFx = arg2;
		go(options.elements, options, 1, num >= options.currSlide);
		return false;
	}
	return options;
	
	function checkInstantResume(isPaused, arg2, cont) {
		if (!isPaused && arg2 === true) { // resume now!
			var options = $(cont).data('cycle.opts');
			if (!options) {
				log('options not found, can not resume');
				return false;
			}
			if (cont.cycleTimeout) {
				clearTimeout(cont.cycleTimeout);
				cont.cycleTimeout = 0;
			}
			go(options.elements, options, 1, !options.backwards);
		}
	}
}

function removeFilter(el, opts) {
	if (!$.support.opacity && opts.cleartype && el.style.filter) {
		try { el.style.removeAttribute('filter'); }
		catch(smother) {} // handle old opera versions
	}
}

// unbind event handlers
function destroy(cont, opts) {
	if (opts.next)
		$(opts.next).unbind(opts.prevNextEvent);
	if (opts.prev)
		$(opts.prev).unbind(opts.prevNextEvent);
	
	if (opts.pager || opts.pagerAnchorBuilder)
		$.each(opts.pagerAnchors || [], function() {
			this.unbind().remove();
		});
	opts.pagerAnchors = null;
	$(cont).unbind('mouseenter.cycle mouseleave.cycle');
	if (opts.destroy) // callback
		opts.destroy(opts);
}

// one-time initialization
function buildOptions($cont, $slides, els, options, o) {
	var startingSlideSpecified;
	// support metadata plugin (v1.0 and v2.0)
	var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
	var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
	if (meta)
		opts = $.extend(opts, meta);
	if (opts.autostop)
		opts.countdown = opts.autostopCount || els.length;

	var cont = $cont[0];
	$cont.data('cycle.opts', opts);
	opts.$cont = $cont;
	opts.stopCount = cont.cycleStop;
	opts.elements = els;
	opts.before = opts.before ? [opts.before] : [];
	opts.after = opts.after ? [opts.after] : [];

	// push some after callbacks
	if (!$.support.opacity && opts.cleartype)
		opts.after.push(function() { removeFilter(this, opts); });
	if (opts.continuous)
		opts.after.push(function() { go(els,opts,0,!opts.backwards); });

	saveOriginalOpts(opts);

	// clearType corrections
	if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
		clearTypeFix($slides);

	// container requires non-static position so that slides can be position within
	if ($cont.css('position') == 'static')
		$cont.css('position', 'relative');
	if (opts.width)
		$cont.width(opts.width);
	if (opts.height && opts.height != 'auto')
		$cont.height(opts.height);

	if (opts.startingSlide !== undefined) {
		opts.startingSlide = parseInt(opts.startingSlide,10);
		if (opts.startingSlide >= els.length || opts.startSlide < 0)
			opts.startingSlide = 0; // catch bogus input
		else 
			startingSlideSpecified = true;
	}
	else if (opts.backwards)
		opts.startingSlide = els.length - 1;
	else
		opts.startingSlide = 0;

	// if random, mix up the slide array
	if (opts.random) {
		opts.randomMap = [];
		for (var i = 0; i < els.length; i++)
			opts.randomMap.push(i);
		opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		if (startingSlideSpecified) {
			// try to find the specified starting slide and if found set start slide index in the map accordingly
			for ( var cnt = 0; cnt < els.length; cnt++ ) {
				if ( opts.startingSlide == opts.randomMap[cnt] ) {
					opts.randomIndex = cnt;
				}
			}
		}
		else {
			opts.randomIndex = 1;
			opts.startingSlide = opts.randomMap[1];
		}
	}
	else if (opts.startingSlide >= els.length)
		opts.startingSlide = 0; // catch bogus input
	opts.currSlide = opts.startingSlide || 0;
	var first = opts.startingSlide;

	// set position and zIndex on all the slides
	$slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
		var z;
		if (opts.backwards)
			z = first ? i <= first ? els.length + (i-first) : first-i : els.length-i;
		else
			z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
		$(this).css('z-index', z);
	});

	// make sure first slide is visible
	$(els[first]).css('opacity',1).show(); // opacity bit needed to handle restart use case
	removeFilter(els[first], opts);

	// stretch slides
	if (opts.fit) {
		if (!opts.aspect) {
	        if (opts.width)
	            $slides.width(opts.width);
	        if (opts.height && opts.height != 'auto')
	            $slides.height(opts.height);
		} else {
			$slides.each(function(){
				var $slide = $(this);
				var ratio = (opts.aspect === true) ? $slide.width()/$slide.height() : opts.aspect;
				if( opts.width && $slide.width() != opts.width ) {
					$slide.width( opts.width );
					$slide.height( opts.width / ratio );
				}

				if( opts.height && $slide.height() < opts.height ) {
					$slide.height( opts.height );
					$slide.width( opts.height * ratio );
				}
			});
		}
	}

	if (opts.center && ((!opts.fit) || opts.aspect)) {
		$slides.each(function(){
			var $slide = $(this);
			$slide.css({
				"margin-left": opts.width ?
					((opts.width - $slide.width()) / 2) + "px" :
					0,
				"margin-top": opts.height ?
					((opts.height - $slide.height()) / 2) + "px" :
					0
			});
		});
	}

	if (opts.center && !opts.fit && !opts.slideResize) {
		$slides.each(function(){
			var $slide = $(this);
			$slide.css({
				"margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
				"margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
			});
		});
	}
		
	// stretch container
	var reshape = opts.containerResize && !$cont.innerHeight();
	if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
		var maxw = 0, maxh = 0;
		for(var j=0; j < els.length; j++) {
			var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
			if (!w) w = e.offsetWidth || e.width || $e.attr('width');
			if (!h) h = e.offsetHeight || e.height || $e.attr('height');
			maxw = w > maxw ? w : maxw;
			maxh = h > maxh ? h : maxh;
		}
		if (maxw > 0 && maxh > 0)
			$cont.css({width:maxw+'px',height:maxh+'px'});
	}

	var pauseFlag = false;  // https://github.com/malsup/cycle/issues/44
	if (opts.pause)
		$cont.bind('mouseenter.cycle', function(){
			pauseFlag = true;
			this.cyclePause++;
			triggerPause(cont, true);
		}).bind('mouseleave.cycle', function(){
				if (pauseFlag)
					this.cyclePause--;
				triggerPause(cont, true);
		});

	if (supportMultiTransitions(opts) === false)
		return false;

	// apparently a lot of people use image slideshows without height/width attributes on the images.
	// Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
	var requeue = false;
	options.requeueAttempts = options.requeueAttempts || 0;
	$slides.each(function() {
		// try to get height/width of each slide
		var $el = $(this);
		this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
		this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

		if ( $el.is('img') ) {
			// sigh..  sniffing, hacking, shrugging...  this crappy hack tries to account for what browsers do when
			// an image is being downloaded and the markup did not include sizing info (height/width attributes);
			// there seems to be some "default" sizes used in this situation
			var loadingIE	= ($.browser.msie  && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
			var loadingFF	= ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
			var loadingOp	= ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
			var loadingOther = (this.cycleH === 0 && this.cycleW === 0 && !this.complete);
			// don't requeue for images that are still loading but have a valid size
			if (loadingIE || loadingFF || loadingOp || loadingOther) {
				if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
					log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
					setTimeout(function() {$(o.s,o.c).cycle(options);}, opts.requeueTimeout);
					requeue = true;
					return false; // break each loop
				}
				else {
					log('could not determine size of image: '+this.src, this.cycleW, this.cycleH);
				}
			}
		}
		return true;
	});

	if (requeue)
		return false;

	opts.cssBefore = opts.cssBefore || {};
	opts.cssAfter = opts.cssAfter || {};
	opts.cssFirst = opts.cssFirst || {};
	opts.animIn = opts.animIn || {};
	opts.animOut = opts.animOut || {};

	$slides.not(':eq('+first+')').css(opts.cssBefore);
	$($slides[first]).css(opts.cssFirst);

	if (opts.timeout) {
		opts.timeout = parseInt(opts.timeout,10);
		// ensure that timeout and speed settings are sane
		if (opts.speed.constructor == String)
			opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed,10);
		if (!opts.sync)
			opts.speed = opts.speed / 2;
		
		var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
		while((opts.timeout - opts.speed) < buffer) // sanitize timeout
			opts.timeout += opts.speed;
	}
	if (opts.easing)
		opts.easeIn = opts.easeOut = opts.easing;
	if (!opts.speedIn)
		opts.speedIn = opts.speed;
	if (!opts.speedOut)
		opts.speedOut = opts.speed;

	opts.slideCount = els.length;
	opts.currSlide = opts.lastSlide = first;
	if (opts.random) {
		if (++opts.randomIndex == els.length)
			opts.randomIndex = 0;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.backwards)
		opts.nextSlide = opts.startingSlide === 0 ? (els.length-1) : opts.startingSlide-1;
	else
		opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

	// run transition init fn
	if (!opts.multiFx) {
		var init = $.fn.cycle.transitions[opts.fx];
		if ($.isFunction(init))
			init($cont, $slides, opts);
		else if (opts.fx != 'custom' && !opts.multiFx) {
			log('unknown transition: ' + opts.fx,'; slideshow terminating');
			return false;
		}
	}

	// fire artificial events
	var e0 = $slides[first];
	if (!opts.skipInitializationCallbacks) {
		if (opts.before.length)
			opts.before[0].apply(e0, [e0, e0, opts, true]);
		if (opts.after.length)
			opts.after[0].apply(e0, [e0, e0, opts, true]);
	}
	if (opts.next)
		$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1);});
	if (opts.prev)
		$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0);});
	if (opts.pager || opts.pagerAnchorBuilder)
		buildPager(els,opts);

	exposeAddSlide(opts, els);

	return opts;
}

// save off original opts so we can restore after clearing state
function saveOriginalOpts(opts) {
	opts.original = { before: [], after: [] };
	opts.original.cssBefore = $.extend({}, opts.cssBefore);
	opts.original.cssAfter  = $.extend({}, opts.cssAfter);
	opts.original.animIn	= $.extend({}, opts.animIn);
	opts.original.animOut   = $.extend({}, opts.animOut);
	$.each(opts.before, function() { opts.original.before.push(this); });
	$.each(opts.after,  function() { opts.original.after.push(this); });
}

function supportMultiTransitions(opts) {
	var i, tx, txs = $.fn.cycle.transitions;
	// look for multiple effects
	if (opts.fx.indexOf(',') > 0) {
		opts.multiFx = true;
		opts.fxs = opts.fx.replace(/\s*/g,'').split(',');
		// discard any bogus effect names
		for (i=0; i < opts.fxs.length; i++) {
			var fx = opts.fxs[i];
			tx = txs[fx];
			if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
				log('discarding unknown transition: ',fx);
				opts.fxs.splice(i,1);
				i--;
			}
		}
		// if we have an empty list then we threw everything away!
		if (!opts.fxs.length) {
			log('No valid transitions named; slideshow terminating.');
			return false;
		}
	}
	else if (opts.fx == 'all') {  // auto-gen the list of transitions
		opts.multiFx = true;
		opts.fxs = [];
		for (var p in txs) {
			if (txs.hasOwnProperty(p)) {
				tx = txs[p];
				if (txs.hasOwnProperty(p) && $.isFunction(tx))
					opts.fxs.push(p);
			}
		}
	}
	if (opts.multiFx && opts.randomizeEffects) {
		// munge the fxs array to make effect selection random
		var r1 = Math.floor(Math.random() * 20) + 30;
		for (i = 0; i < r1; i++) {
			var r2 = Math.floor(Math.random() * opts.fxs.length);
			opts.fxs.push(opts.fxs.splice(r2,1)[0]);
		}
		debug('randomized fx sequence: ',opts.fxs);
	}
	return true;
}

// provide a mechanism for adding slides after the slideshow has started
function exposeAddSlide(opts, els) {
	opts.addSlide = function(newSlide, prepend) {
		var $s = $(newSlide), s = $s[0];
		if (!opts.autostopCount)
			opts.countdown++;
		els[prepend?'unshift':'push'](s);
		if (opts.els)
			opts.els[prepend?'unshift':'push'](s); // shuffle needs this
		opts.slideCount = els.length;

		// add the slide to the random map and resort
		if (opts.random) {
			opts.randomMap.push(opts.slideCount-1);
			opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		}

		$s.css('position','absolute');
		$s[prepend?'prependTo':'appendTo'](opts.$cont);

		if (prepend) {
			opts.currSlide++;
			opts.nextSlide++;
		}

		if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
			clearTypeFix($s);

		if (opts.fit && opts.width)
			$s.width(opts.width);
		if (opts.fit && opts.height && opts.height != 'auto')
			$s.height(opts.height);
		s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
		s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

		$s.css(opts.cssBefore);

		if (opts.pager || opts.pagerAnchorBuilder)
			$.fn.cycle.createPagerAnchor(els.length-1, s, $(opts.pager), els, opts);

		if ($.isFunction(opts.onAddSlide))
			opts.onAddSlide($s);
		else
			$s.hide(); // default behavior
	};
}

// reset internal state; we do this on every pass in order to support multiple effects
$.fn.cycle.resetState = function(opts, fx) {
	fx = fx || opts.fx;
	opts.before = []; opts.after = [];
	opts.cssBefore = $.extend({}, opts.original.cssBefore);
	opts.cssAfter  = $.extend({}, opts.original.cssAfter);
	opts.animIn	= $.extend({}, opts.original.animIn);
	opts.animOut   = $.extend({}, opts.original.animOut);
	opts.fxFn = null;
	$.each(opts.original.before, function() { opts.before.push(this); });
	$.each(opts.original.after,  function() { opts.after.push(this); });

	// re-init
	var init = $.fn.cycle.transitions[fx];
	if ($.isFunction(init))
		init(opts.$cont, $(opts.elements), opts);
};

// this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
function go(els, opts, manual, fwd) {
	var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

	// opts.busy is true if we're in the middle of an animation
	if (manual && opts.busy && opts.manualTrump) {
		// let manual transitions requests trump active ones
		debug('manualTrump in go(), stopping active transition');
		$(els).stop(true,true);
		opts.busy = 0;
		clearTimeout(p.cycleTimeout);
	}

	// don't begin another timeout-based transition if there is one active
	if (opts.busy) {
		debug('transition active, ignoring new tx request');
		return;
	}


	// stop cycling if we have an outstanding stop request
	if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
		return;

	// check to see if we should stop cycling based on autostop options
	if (!manual && !p.cyclePause && !opts.bounce &&
		((opts.autostop && (--opts.countdown <= 0)) ||
		(opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
		if (opts.end)
			opts.end(opts);
		return;
	}

	// if slideshow is paused, only transition on a manual trigger
	var changed = false;
	if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
		changed = true;
		var fx = opts.fx;
		// keep trying to get the slide size if we don't have it yet
		curr.cycleH = curr.cycleH || $(curr).height();
		curr.cycleW = curr.cycleW || $(curr).width();
		next.cycleH = next.cycleH || $(next).height();
		next.cycleW = next.cycleW || $(next).width();

		// support multiple transition types
		if (opts.multiFx) {
			if (fwd && (opts.lastFx === undefined || ++opts.lastFx >= opts.fxs.length))
				opts.lastFx = 0;
			else if (!fwd && (opts.lastFx === undefined || --opts.lastFx < 0))
				opts.lastFx = opts.fxs.length - 1;
			fx = opts.fxs[opts.lastFx];
		}

		// one-time fx overrides apply to:  $('div').cycle(3,'zoom');
		if (opts.oneTimeFx) {
			fx = opts.oneTimeFx;
			opts.oneTimeFx = null;
		}

		$.fn.cycle.resetState(opts, fx);

		// run the before callbacks
		if (opts.before.length)
			$.each(opts.before, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});

		// stage the after callacks
		var after = function() {
			opts.busy = 0;
			$.each(opts.after, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});
			if (!p.cycleStop) {
				// queue next transition
				queueNext();
			}
		};

		debug('tx firing('+fx+'); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);
		
		// get ready to perform the transition
		opts.busy = 1;
		if (opts.fxFn) // fx function provided?
			opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
			$.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else
			$.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
	}
	else {
		queueNext();
	}

	if (changed || opts.nextSlide == opts.currSlide) {
		// calculate the next slide
		var roll;
		opts.lastSlide = opts.currSlide;
		if (opts.random) {
			opts.currSlide = opts.nextSlide;
			if (++opts.randomIndex == els.length) {
				opts.randomIndex = 0;
				opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
			}
			opts.nextSlide = opts.randomMap[opts.randomIndex];
			if (opts.nextSlide == opts.currSlide)
				opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
		}
		else if (opts.backwards) {
			roll = (opts.nextSlide - 1) < 0;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = 1;
				opts.currSlide = 0;
			}
			else {
				opts.nextSlide = roll ? (els.length-1) : opts.nextSlide-1;
				opts.currSlide = roll ? 0 : opts.nextSlide+1;
			}
		}
		else { // sequence
			roll = (opts.nextSlide + 1) == els.length;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = els.length-2;
				opts.currSlide = els.length-1;
			}
			else {
				opts.nextSlide = roll ? 0 : opts.nextSlide+1;
				opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
			}
		}
	}
	if (changed && opts.pager)
		opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
	
	function queueNext() {
		// stage the next transition
		var ms = 0, timeout = opts.timeout;
		if (opts.timeout && !opts.continuous) {
			ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
         if (opts.fx == 'shuffle')
            ms -= opts.speedOut;
      }
		else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
			ms = 10;
		if (ms > 0)
			p.cycleTimeout = setTimeout(function(){ go(els, opts, 0, !opts.backwards); }, ms);
	}
}

// invoked after transition
$.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
   $(pager).each(function() {
       $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
   });
};

// calculate timeout value for current transition
function getTimeout(curr, next, opts, fwd) {
	if (opts.timeoutFn) {
		// call user provided calc fn
		var t = opts.timeoutFn.call(curr,curr,next,opts,fwd);
		while (opts.fx != 'none' && (t - opts.speed) < 250) // sanitize timeout
			t += opts.speed;
		debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
		if (t !== false)
			return t;
	}
	return opts.timeout;
}

// expose next/prev function, caller must pass in state
$.fn.cycle.next = function(opts) { advance(opts,1); };
$.fn.cycle.prev = function(opts) { advance(opts,0);};

// advance slide forward or back
function advance(opts, moveForward) {
	var val = moveForward ? 1 : -1;
	var els = opts.elements;
	var p = opts.$cont[0], timeout = p.cycleTimeout;
	if (timeout) {
		clearTimeout(timeout);
		p.cycleTimeout = 0;
	}
	if (opts.random && val < 0) {
		// move back to the previously display slide
		opts.randomIndex--;
		if (--opts.randomIndex == -2)
			opts.randomIndex = els.length-2;
		else if (opts.randomIndex == -1)
			opts.randomIndex = els.length-1;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.random) {
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else {
		opts.nextSlide = opts.currSlide + val;
		if (opts.nextSlide < 0) {
			if (opts.nowrap) return false;
			opts.nextSlide = els.length - 1;
		}
		else if (opts.nextSlide >= els.length) {
			if (opts.nowrap) return false;
			opts.nextSlide = 0;
		}
	}

	var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
	if ($.isFunction(cb))
		cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
	go(els, opts, 1, moveForward);
	return false;
}

function buildPager(els, opts) {
	var $p = $(opts.pager);
	$.each(els, function(i,o) {
		$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);
	});
	opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
}

$.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
	var a;
	if ($.isFunction(opts.pagerAnchorBuilder)) {
		a = opts.pagerAnchorBuilder(i,el);
		debug('pagerAnchorBuilder('+i+', el) returned: ' + a);
	}
	else
		a = '<a href="#">'+(i+1)+'</a>';
		
	if (!a)
		return;
	var $a = $(a);
	// don't reparent if anchor is in the dom
	if ($a.parents('body').length === 0) {
		var arr = [];
		if ($p.length > 1) {
			$p.each(function() {
				var $clone = $a.clone(true);
				$(this).append($clone);
				arr.push($clone[0]);
			});
			$a = $(arr);
		}
		else {
			$a.appendTo($p);
		}
	}

	opts.pagerAnchors =  opts.pagerAnchors || [];
	opts.pagerAnchors.push($a);
	
	var pagerFn = function(e) {
		e.preventDefault();
		opts.nextSlide = i;
		var p = opts.$cont[0], timeout = p.cycleTimeout;
		if (timeout) {
			clearTimeout(timeout);
			p.cycleTimeout = 0;
		}
		var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
		if ($.isFunction(cb))
			cb(opts.nextSlide, els[opts.nextSlide]);
		go(els,opts,1,opts.currSlide < i); // trigger the trans
//		return false; // <== allow bubble
	};
	
	if ( /mouseenter|mouseover/i.test(opts.pagerEvent) ) {
		$a.hover(pagerFn, function(){/* no-op */} );
	}
	else {
		$a.bind(opts.pagerEvent, pagerFn);
	}
	
	if ( ! /^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
		$a.bind('click.cycle', function(){return false;}); // suppress click
	
	var cont = opts.$cont[0];
	var pauseFlag = false; // https://github.com/malsup/cycle/issues/44
	if (opts.pauseOnPagerHover) {
		$a.hover(
			function() { 
				pauseFlag = true;
				cont.cyclePause++; 
				triggerPause(cont,true,true);
			}, function() { 
				if (pauseFlag)
					cont.cyclePause--; 
				triggerPause(cont,true,true);
			} 
		);
	}
};

// helper fn to calculate the number of slides between the current and the next
$.fn.cycle.hopsFromLast = function(opts, fwd) {
	var hops, l = opts.lastSlide, c = opts.currSlide;
	if (fwd)
		hops = c > l ? c - l : opts.slideCount - l;
	else
		hops = c < l ? l - c : l + opts.slideCount - c;
	return hops;
};

// fix clearType problems in ie6 by setting an explicit bg color
// (otherwise text slides look horrible during a fade transition)
function clearTypeFix($slides) {
	debug('applying clearType background-color hack');
	function hex(s) {
		s = parseInt(s,10).toString(16);
		return s.length < 2 ? '0'+s : s;
	}
	function getBg(e) {
		for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
			var v = $.css(e,'background-color');
			if (v && v.indexOf('rgb') >= 0 ) {
				var rgb = v.match(/\d+/g);
				return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
			}
			if (v && v != 'transparent')
				return v;
		}
		return '#ffffff';
	}
	$slides.each(function() { $(this).css('background-color', getBg(this)); });
}

// reset common props before the next transition
$.fn.cycle.commonReset = function(curr,next,opts,w,h,rev) {
	$(opts.elements).not(curr).hide();
	if (typeof opts.cssBefore.opacity == 'undefined')
		opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	if (opts.slideResize && w !== false && next.cycleW > 0)
		opts.cssBefore.width = next.cycleW;
	if (opts.slideResize && h !== false && next.cycleH > 0)
		opts.cssBefore.height = next.cycleH;
	opts.cssAfter = opts.cssAfter || {};
	opts.cssAfter.display = 'none';
	$(curr).css('zIndex',opts.slideCount + (rev === true ? 1 : 0));
	$(next).css('zIndex',opts.slideCount + (rev === true ? 0 : 1));
};

// the actual fn for effecting a transition
$.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
	var $l = $(curr), $n = $(next);
	var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut;
	$n.css(opts.cssBefore);
	if (speedOverride) {
		if (typeof speedOverride == 'number')
			speedIn = speedOut = speedOverride;
		else
			speedIn = speedOut = 1;
		easeIn = easeOut = null;
	}
	var fn = function() {
		$n.animate(opts.animIn, speedIn, easeIn, function() {
			cb();
		});
	};
	$l.animate(opts.animOut, speedOut, easeOut, function() {
		$l.css(opts.cssAfter);
		if (!opts.sync) 
			fn();
	});
	if (opts.sync) fn();
};

// transition definitions - only fade is defined here, transition pack defines the rest
$.fn.cycle.transitions = {
	fade: function($cont, $slides, opts) {
		$slides.not(':eq('+opts.currSlide+')').css('opacity',0);
		opts.before.push(function(curr,next,opts) {
			$.fn.cycle.commonReset(curr,next,opts);
			opts.cssBefore.opacity = 0;
		});
		opts.animIn	   = { opacity: 1 };
		opts.animOut   = { opacity: 0 };
		opts.cssBefore = { top: 0, left: 0 };
	}
};

$.fn.cycle.ver = function() { return ver; };

// override these globally if you like (they are all optional)
$.fn.cycle.defaults = {
    activePagerClass: 'activeSlide', // class name used for the active pager link
    after:            null,     // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
    allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
    animIn:           null,     // properties that define how the slide animates in
    animOut:          null,     // properties that define how the slide animates out
    aspect:           false,    // preserve aspect ratio during fit resizing, cropping if necessary (must be used with fit option)
    autostop:         0,        // true to end slideshow after X transitions (where X == slide count)
    autostopCount:    0,        // number of transitions (optionally used with autostop to define X)
    backwards:        false,    // true to start slideshow at last slide and move backwards through the stack
    before:           null,     // transition callback (scope set to element to be shown):     function(currSlideElement, nextSlideElement, options, forwardFlag)
    center:           null,     // set to true to have cycle add top/left margin to each slide (use with width and height options)
    cleartype:        !$.support.opacity,  // true if clearType corrections should be applied (for IE)
    cleartypeNoBg:    false,    // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
    containerResize:  1,        // resize container to fit largest slide
    continuous:       0,        // true to start next transition immediately after current one completes
    cssAfter:         null,     // properties that defined the state of the slide after transitioning out
    cssBefore:        null,     // properties that define the initial state of the slide before transitioning in
    delay:            0,        // additional delay (in ms) for first transition (hint: can be negative)
    easeIn:           null,     // easing for "in" transition
    easeOut:          null,     // easing for "out" transition
    easing:           null,     // easing method for both in and out transitions
    end:              null,     // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
    fastOnEvent:      0,        // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
    fit:              0,        // force slides to fit container
    fx:               'fade',   // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
    fxFn:             null,     // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
    height:           'auto',   // container height (if the 'fit' option is true, the slides will be set to this height as well)
    manualTrump:      true,     // causes manual transition to stop an active transition instead of being ignored
    metaAttr:         'cycle',  // data- attribute that holds the option data for the slideshow
    next:             null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for next slide
    nowrap:           0,        // true to prevent slideshow from wrapping
    onPagerEvent:     null,     // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
    onPrevNextEvent:  null,     // callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
    pager:            null,     // element, jQuery object, or jQuery selector string for the element to use as pager container
    pagerAnchorBuilder: null,   // callback fn for building anchor links:  function(index, DOMelement)
    pagerEvent:       'click.cycle', // name of event which drives the pager navigation
    pause:            0,        // true to enable "pause on hover"
    pauseOnPagerHover: 0,       // true to pause when hovering over pager link
    prev:             null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for previous slide
    prevNextEvent:    'click.cycle',// event which drives the manual transition to the previous or next slide
    random:           0,        // true for random, false for sequence (not applicable to shuffle fx)
    randomizeEffects: 1,        // valid when multiple effects are used; true to make the effect sequence random
    requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
    requeueTimeout:   250,      // ms delay for requeue
    rev:              0,        // causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
    shuffle:          null,     // coords for shuffle animation, ex: { top:15, left: 200 }
    skipInitializationCallbacks: false, // set to true to disable the first before/after callback that occurs prior to any transition
    slideExpr:        null,     // expression for selecting slides (if something other than all children is required)
    slideResize:      1,        // force slide width/height to fixed size before every transition
    speed:            1000,     // speed of the transition (any valid fx speed value)
    speedIn:          null,     // speed of the 'in' transition
    speedOut:         null,     // speed of the 'out' transition
    startingSlide:    undefined,// zero-based index of the first slide to be displayed
    sync:             1,        // true if in/out transitions should occur simultaneously
    timeout:          4000,     // milliseconds between slide transitions (0 to disable auto advance)
    timeoutFn:        null,     // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
    updateActivePagerLink: null,// callback fn invoked to update the active pager link (adds/removes activePagerClass style)
    width:            null      // container width (if the 'fit' option is true, the slides will be set to this width as well)
};

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {
"use strict";

//
// These functions define slide initialization and properties for the named
// transitions. To save file size feel free to remove any of these that you
// don't need.
//
$.fn.cycle.transitions.none = function($cont, $slides, opts) {
	opts.fxFn = function(curr,next,opts,after){
		$(next).show();
		$(curr).hide();
		after();
	};
};

// not a cross-fade, fadeout only fades out the top slide
$.fn.cycle.transitions.fadeout = function($cont, $slides, opts) {
	$slides.not(':eq('+opts.currSlide+')').css({ display: 'block', 'opacity': 1 });
	opts.before.push(function(curr,next,opts,w,h,rev) {
		$(curr).css('zIndex',opts.slideCount + (rev !== true ? 1 : 0));
		$(next).css('zIndex',opts.slideCount + (rev !== true ? 0 : 1));
	});
	opts.animIn.opacity = 1;
	opts.animOut.opacity = 0;
	opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	opts.cssAfter.zIndex = 0;
};

// scrollUp/Down/Left/Right
$.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.cssFirst.top = 0;
	opts.animIn.top = 0;
	opts.animOut.top = -h;
};
$.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssFirst.top = 0;
	opts.cssBefore.top = -h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
$.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = 0-w;
};
$.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = -w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
$.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
	$cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
		opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
	});
	opts.cssFirst.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = 0;
};
$.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.top = fwd ? (1-next.cycleH) : (next.cycleH-1);
		opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.left = 0;
};

// slideX/slideY
$.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.width = 'show';
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animIn.height = 'show';
	opts.animOut.height = 0;
};

// shuffle
$.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
	var i, w = $cont.css('overflow', 'visible').width();
	$slides.css({left: 0, top: 0});
	opts.before.push(function(curr,next,opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
	});
	// only adjust speed once!
	if (!opts.speedAdjusted) {
		opts.speed = opts.speed / 2; // shuffle has 2 transitions
		opts.speedAdjusted = true;
	}
	opts.random = 0;
	opts.shuffle = opts.shuffle || {left:-w, top:15};
	opts.els = [];
	for (i=0; i < $slides.length; i++)
		opts.els.push($slides[i]);

	for (i=0; i < opts.currSlide; i++)
		opts.els.push(opts.els.shift());

	// custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
	opts.fxFn = function(curr, next, opts, cb, fwd) {
		if (opts.rev)
			fwd = !fwd;
		var $el = fwd ? $(curr) : $(next);
		$(next).css(opts.cssBefore);
		var count = opts.slideCount;
		$el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
			var hops = $.fn.cycle.hopsFromLast(opts, fwd);
			for (var k=0; k < hops; k++) {
				if (fwd)
					opts.els.push(opts.els.shift());
				else
					opts.els.unshift(opts.els.pop());
			}
			if (fwd) {
				for (var i=0, len=opts.els.length; i < len; i++)
					$(opts.els[i]).css('z-index', len-i+count);
			}
			else {
				var z = $(curr).css('z-index');
				$el.css('z-index', parseInt(z,10)+1+count);
			}
			$el.animate({left:0, top:0}, opts.speedOut, opts.easeOut, function() {
				$(fwd ? this : curr).hide();
				if (cb) cb();
			});
		});
	};
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
};

// turnUp/Down/Left/Right
$.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = next.cycleH;
		opts.animIn.height = next.cycleH;
		opts.animOut.width = next.cycleW;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.height = 0;
	opts.animIn.top = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = next.cycleW;
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
		opts.animOut.left = curr.cycleW;
	});
	$.extend(opts.cssBefore, { top: 0, left: 0, width: 0 });
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};

// zoom
$.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.cssBefore.left = next.cycleW/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
		$.extend(opts.animOut, { width: 0, height: 0, top: curr.cycleH/2, left: curr.cycleW/2 });
	});
	opts.cssFirst.top = 0;
	opts.cssFirst.left = 0;
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
};

// fadeZoom
$.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false);
		opts.cssBefore.left = next.cycleW/2;
		opts.cssBefore.top = next.cycleH/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};

// blindX
$.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.width = next.cycleW;
		opts.animOut.left   = curr.cycleW;
	});
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
// blindY
$.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
// blindZ
$.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	var w = $cont.width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = w;
	opts.animIn.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = h;
	opts.animOut.left = w;
};

// growX - grow horizontally from centered 0 width
$.fn.cycle.transitions.growX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = this.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// growY - grow vertically from centered 0 height
$.fn.cycle.transitions.growY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = this.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = this.cycleH;
		opts.animOut.top = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// curtainX - squeeze in both edges horizontally
$.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true,true);
		opts.cssBefore.left = next.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = curr.cycleW/2;
		opts.animOut.width = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// curtainY - squeeze in both edges vertically
$.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH/2;
		opts.animOut.height = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// cover - curr slide covered by next slide
$.fn.cycle.transitions.cover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		if (d == 'right')
			opts.cssBefore.left = -w;
		else if (d == 'up')
			opts.cssBefore.top = h;
		else if (d == 'down')
			opts.cssBefore.top = -h;
		else
			opts.cssBefore.left = w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// uncover - curr slide moves off next slide
$.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		if (d == 'right')
			opts.animOut.left = w;
		else if (d == 'up')
			opts.animOut.top = -h;
		else if (d == 'down')
			opts.animOut.top = h;
		else
			opts.animOut.left = -w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// toss - move top slide and fade away
$.fn.cycle.transitions.toss = function($cont, $slides, opts) {
	var w = $cont.css('overflow','visible').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		// provide default toss settings if animOut not provided
		if (!opts.animOut.left && !opts.animOut.top)
			$.extend(opts.animOut, { left: w*2, top: -h/2, opacity: 0 });
		else
			opts.animOut.opacity = 0;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
};

// wipe - clip animation
$.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.cssBefore = opts.cssBefore || {};
	var clip;
	if (opts.clip) {
		if (/l2r/.test(opts.clip))
			clip = 'rect(0px 0px '+h+'px 0px)';
		else if (/r2l/.test(opts.clip))
			clip = 'rect(0px '+w+'px '+h+'px '+w+'px)';
		else if (/t2b/.test(opts.clip))
			clip = 'rect(0px '+w+'px 0px 0px)';
		else if (/b2t/.test(opts.clip))
			clip = 'rect('+h+'px '+w+'px '+h+'px 0px)';
		else if (/zoom/.test(opts.clip)) {
			var top = parseInt(h/2,10);
			var left = parseInt(w/2,10);
			clip = 'rect('+top+'px '+left+'px '+top+'px '+left+'px)';
		}
	}

	opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

	var d = opts.cssBefore.clip.match(/(\d+)/g);
	var t = parseInt(d[0],10), r = parseInt(d[1],10), b = parseInt(d[2],10), l = parseInt(d[3],10);

	opts.before.push(function(curr, next, opts) {
		if (curr == next) return;
		var $curr = $(curr), $next = $(next);
		$.fn.cycle.commonReset(curr,next,opts,true,true,false);
		opts.cssAfter.display = 'block';

		var step = 1, count = parseInt((opts.speedIn / 13),10) - 1;
		(function f() {
			var tt = t ? t - parseInt(step * (t/count),10) : 0;
			var ll = l ? l - parseInt(step * (l/count),10) : 0;
			var bb = b < h ? b + parseInt(step * ((h-b)/count || 1),10) : h;
			var rr = r < w ? r + parseInt(step * ((w-r)/count || 1),10) : w;
			$next.css({ clip: 'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)' });
			(step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
		})();
	});
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
	opts.animIn	   = { left: 0 };
	opts.animOut   = { left: 0 };
};

})(jQuery);

/**
 * The Shadowbox class.
 *
 * This file is part of Shadowbox.
 *
 * Shadowbox is an online media viewer application that supports all of the
 * web's most popular media publishing formats. Shadowbox is written entirely
 * in JavaScript and CSS and is highly customizable. Using Shadowbox, website
 * authors can showcase a wide assortment of media in all major browsers without
 * navigating users away from the linking page.
 *
 * You should have received a license with this distribution explaining the terms
 * under which Shadowbox may be used. If you did not, you may obtain a copy of the
 * license at http://shadowbox-js.com/LICENSE
 *
 * @author      Michael J. I. Jackson <michael@mjijackson.com>
 * @copyright   2007-2009 Michael J. I. Jackson
 * @version     SVN: $Id: shadowbox.js 20M 2009-04-29 04:26:23Z (local) $
 */

/**
 * The Shadowbox class. Used to display different media on a web page using a
 * Lightbox-like effect.
 *
 * Known issues:
 *
 * - Location.toString exception in FF3 when loading Flash content into an
 *   iframe (such as a YouTube video). Known Flash bug, will not be fixed.
 *   http://bugs.adobe.com/jira/browse/FP-561
 *
 * Useful resources:
 *
 * - http://www.alistapart.com/articles/byebyeembed
 * - http://www.w3.org/TR/html401/struct/objects.html
 * - http://www.dyn-web.com/dhtml/iframes/
 * - http://www.apple.com/quicktime/player/specs.html
 * - http://www.apple.com/quicktime/tutorials/embed2.html
 * - http://www.howtocreate.co.uk/wrongWithIE/?chapter=navigator.plugins
 * - http://msdn.microsoft.com/en-us/library/ms532969.aspx
 * - http://support.microsoft.com/kb/316992
 * - http://www.alistapart.com/articles/flashembedcagematch
 */
var Shadowbox = function(){

    var ua = navigator.userAgent.toLowerCase(),

    // the Shadowbox object
    S = {

        /**
         * The current version of Shadowbox.
         *
         * @var     String
         * @public
         */
        version: "3.0b",

        /**
         * The name of the adapter currently being used.
         *
         * @var     String
         * @public
         */
        adapter: null,

        /**
         * The array index of the current gallery that is currently being viewed.
         *
         * @var     Number
         * @public
         */
        current: -1,

        /**
         * An array containing the gallery objects currently being viewed. In the
         * case of non-gallery items, this will only hold one object.
         *
         * @var     Array
         * @public
         */
        gallery: [],

        /**
         * A cache of options for links that have been set up for use with
         * Shadowbox.
         *
         * @var     Array
         * @public
         */
        cache: [],

        /**
         * The current content object.
         *
         * @var     Object
         * @public
         */
        content: null,

        /**
         * Holds the current dimensions of Shadowbox as calculated by its skin.
         * Contains the following properties:
         *
         * - height: The total height of #sb-wrapper (including title & info bars)
         * - width: The total width of #sb-wrapper
         * - inner_h: The height of #sb-body
         * - inner_w: The width of #sb-body
         * - top: The top to use for #sb-wrapper
         * - left: The left to use for #sb-wrapper
         * - oversized: True if the content is oversized (too large for the viewport)
         * - resize_h: The height to use for resizable content
         * - resize_w: The width to use for resizable content
         *
         * @var     Object
         * @public
         */
        dimensions: null,

        /**
         * Contains plugin support information. Each property of this object is a
         * boolean indicating whether that plugin is supported.
         *
         * - fla: Flash player
         * - qt: QuickTime player
         * - wmp: Windows Media player
         * - f4m: Flip4Mac plugin
         *
         * @var     Object
         * @public
         */
        plugins: null,

        /**
         * Contains the base path of the Shadowbox script.
         *
         * Note: This property will automatically be populated in Shadowbox.load.
         *
         * @var     String
         * @public
         */
        path: '/scripts/shadowbox/',

        /**
         * Contains the default options for Shadowbox.
         *
         * @var     Object
         * @public
         */
        options: {
            adapter: null,              // the library adapter to use
            animate: true,              // enable all animations, except for fades
            animateFade: true,          // enable fade animations
            autoplayMovies: true,       // automatically play movies
            autoDimensions: false,      // use the dimensions of the first piece as
                                        // the initial dimensions (if they are
                                        // available)
            continuous: false,          // enables continuous galleries. When enabled,
                                        // user will be able to skip to the first
                                        // gallery item from the last using next and
                                        // vice versa
            counterLimit: 10,           // limit to the number of counter links that
                                        // are displayed in a "skip" style counter
            counterType: 'default',     // counter type. May be either "default" or
                                        // "skip". Skip counter displays a link for
                                        // each item in gallery
            displayCounter: true,       // display the gallery counter
            displayNav: true,           // show the navigation controls

            /**
             * Easing function used for animations. Based on a cubic polynomial.
             *
             * @param   Number      x       The state of the animation (% complete)
             * @return  Number              The adjusted easing value
             */
            ease: function(x){
                return 1 + Math.pow(x - 1, 3);
            },

            enableKeys: true,           // enable keyboard navigation

            /**
             * An object containing names of plugins and links to their respective
             * download pages.
             */
            errors: {
                fla: {
                    name:   'Flash',
                    url:    'http://www.adobe.com/products/flashplayer/'
                },
                qt: {
                    name:   'QuickTime',
                    url:    'http://www.apple.com/quicktime/download/'
                },
                wmp: {
                    name:   'Windows Media Player',
                    url:    'http://www.microsoft.com/windows/windowsmedia/'
                },
                f4m: {
                    name:   'Flip4Mac',
                    url:    'http://www.flip4mac.com/wmv_download.htm'
                }
            },

            /**
             * A map of players to the file extensions they support. Each member of
             * this object is the name of a player (with one exception), whose value
             * is an array of file extensions that player will "play". The one
             * exception to this rule is the "qtwmp" member, which contains extensions
             * that may be played using either QuickTime or Windows Media Player.
             *
             * - img: Image file extensions
             * - swf: Flash SWF file extensions
             * - flv: Flash video file extensions (will be played by JW FLV player)
             * - qt: Movie file extensions supported by QuickTime
             * - wmp: Movie file extensions supported by Windows Media Player
             * - qtwmp: Movie file extensions supported by both QuickTime and Windows Media Player
             * - iframe: File extensions that will be display in an iframe
             *
             * IMPORTANT: If this object is to be modified, it must be copied in its
             * entirety and tweaked because it is not merged recursively with the
             * default. Also, any modifications must be passed into Shadowbox.init
             * for speed reasons.
             */
            ext: {
                img:        ['png', 'jpg', 'jpeg', 'gif', 'bmp'],
                swf:        ['swf'],
                flv:        ['flv'],
                qt:         ['dv', 'mov', 'moov', 'movie', 'mp4'],
                wmp:        ['asf', 'wm', 'wmv'],
                qtwmp:      ['avi', 'mpg', 'mpeg'],
                iframe:     ['asp', 'aspx', 'cgi', 'cfm', 'htm', 'html', 'jsp',
                    'pl', 'php', 'php3', 'php4', 'php5', 'phtml', 'rb', 'rhtml',
                    'shtml', 'txt', 'vbs']
            },

            fadeDuration: 0.35,         // duration of the fading animations (seconds)

            /**
             * Parameters to pass to flash <object>'s.
             */
            flashParams: {
                bgcolor:            '#000000',
                allowFullScreen:    true
            },

            flashVars: {},              // flash vars
            flashVersion: '9.0.115',    // minimum required flash version suggested
                                        // by JW FLV player

            /**
             * How to handle content that is too large to display in its entirety
             * (and is resizable). A value of 'resize' will resize the content while
             * preserving aspect ratio and display it at the smaller resolution. If
             * the content is an image, a value of 'drag' will display the image at
             * its original resolution but it will be draggable within Shadowbox. A
             * value of 'none' will display the content at its original resolution
             * but it may be cropped.
             */
            handleOversize: 'resize',

            /**
             * The mode to use when handling unsupported media. May be either
             * 'remove' or 'link'. If it is 'remove', the unsupported gallery item
             * will merely be removed from the gallery. If it is the only item in
             * the gallery, the link will simply be followed. If it is 'link', a
             * link will be provided to the appropriate plugin page in place of the
             * gallery element.
             */
            handleUnsupported: 'link',

            initialHeight: 160,         // initial height (pixels)
            initialWidth: 320,          // initial width (pixels)
            language: 'en',             // the language to use
            modal: false,               // trigger Shadowbox.close() when overlay is
                                        // clicked
            onChange: null,             // hook function to be fired when changing
                                        // from one item to the next. Is passed the
                                        // item that is about to be displayed
            onClose: null,              // hook function to be fired when closing.
                                        // is passed the most recent item
            onFinish: null,             // hook function to be fired when finished
                                        // loading content. Is passed current
                                        // gallery item
            onOpen: null,               // hook function to be fired when opening.
                                        // is passed the current gallery item
            overlayColor: '#000',       // color to use for modal overlay
            overlayOpacity: 0.8,        // opacity to use for modal overlay
            players: ['img'],           // the players to load
            resizeDuration: 0.35,       // duration of resizing animations (seconds)
            showOverlay: true,          // show the overlay
            showMovieControls: true,    // enable movie controls on movie players
            skipSetup: false,           // skip calling Shadowbox.setup() during
                                        // shadowbox.init()
            slideshowDelay: 0,          // delay to use for slideshows (seconds). If
                                        // set to any duration other than 0, is interval
                                        // at which slideshow will advance
            useSizzle: true,            // use sizzle.js to support css selectors
            viewportPadding: 20         // amount of padding to maintain around the
                                        // edge of the viewport at all times (pixels)
        },

        /**
         * Some simple browser detection variables.
         *
         * @var     Object
         * @public
         */
        client: {
            isIE:       ua.indexOf('msie') > -1,
            isIE6:      ua.indexOf('msie 6') > -1,
            isIE7:      ua.indexOf('msie 7') > -1,
            isGecko:    ua.indexOf('gecko') > -1 && ua.indexOf('safari') == -1,
            isWebkit:   ua.indexOf('applewebkit/index.html') > -1,
            isWindows:  ua.indexOf('windows') > -1 || ua.indexOf('win32') > -1,
            isMac:      ua.indexOf('macintosh') > -1 || ua.indexOf('mac os x') > -1,
            isLinux:    ua.indexOf('linux') > -1
        },

        /**
         * An object containing some regular expressions we'll need later. Compiled
         * up front for speed.
         *
         * @var     Object
         * @public
         */
        regex: {
            domain:         /:\/\/(.*?)[:\/]/,              // domain prefix
            inline:         /#(.+)$/,                       // inline element id
            rel:            /^(light|shadow)box/i,          // rel attribute format
            gallery:        /^(light|shadow)box\[(.*?)\]/i, // rel attribute format for gallery link
            unsupported:    /^unsupported-(\w+)/,           // unsupported media type
            param:          /\s*([a-z_]*?)\s*=\s*(.+)\s*/   // rel string parameter
        },

        /**
         * A map of library object names to their corresponding Shadowbox adapter
         * names.
         *
         * @var     Object
         * @public
         */
        libraries: {
            Prototype:  'prototype',
            jQuery:     'jquery',
            MooTools:   'mootools',
            YAHOO:      'yui',
            dojo:       'dojo',
            Ext:        'ext'
        },

        /**
         * Applies the given set of options to those currently in use.
         *
         * Note: Options will be reset on Shadowbox.open() so this function is
         * only useful after it has already been called (while Shadowbox is
         * open).
         *
         * @param   Object      opts        The options to apply
         * @return  void
         * @public
         */
        applyOptions: function(opts){
            if(opts){
                // store defaults, use apply to break reference
                default_options = apply({}, S.options);
                apply(S.options, opts);
            }
        },

        /**
         * Builds an object from the original link element data to store in cache.
         * These objects contain (most of) the following keys:
         *
         * - el: the link element
         * - title: the object's title
         * - player: the player to use for the object
         * - content: the object's URL
         * - gallery: the gallery the object belongs to (optional)
         * - height: the height of the object (only necessary for movies)
         * - width: the width of the object (only necessary for movies)
         * - options: custom options to use (optional)
         *
         * A custom set of options may be passed in here that will be applied when
         * this object is displayed. However, any options that are specified in
         * the link's HTML markup will trump options given here.
         *
         * @param   HTMLElement     link    The link element to process
         * @param   Object          opts    A set of options to use for the object
         * @return  Object                  An object representing the link
         * @public
         */
        buildCacheObj: function(link, opts){
            var href = link.href, // don't use getAttribute() here
            obj = {
                el:         link,
                title:      link.getAttribute('title'),
                options:    apply({}, opts || {}),
                content:    href
            };

            // remove link-level options from top-level options
            each(['player', 'title', 'height', 'width', 'gallery'], function(o){
                if(typeof obj.options[o] != 'undefined'){
                    obj[o] = obj.options[o];
                    delete obj.options[o];
                }
            });

            if(!obj.player)
                obj.player = getPlayer(href);

            // HTML options always trump JavaScript options, so do these last
            var rel = link.getAttribute('rel');
            if(rel){
                // extract gallery name from shadowbox[name] format
                var m = rel.match(S.regex.gallery);
                if(m)
                    obj.gallery = escape(m[2]);

                // other parameters
                each(rel.split(';'), function(p){
                    m = p.match(S.regex.param);
                    if(m){
                        if(m[1] == 'options')
                            eval('apply(obj.options,' + m[2] + ')');
                        else
                            obj[m[1]] = m[2];
                    }
                });
            }

            return obj;
        },

        /**
         * Jumps to the piece in the current gallery with the given index.
         *
         * @param   Number      n       The gallery index to view
         * @return  void
         * @public
         */
        change: function(n){
            if(!S.gallery) return; // no current gallery
            if(!S.gallery[n]){ // index does not exist
                if(!S.options.continuous){
                    return;
                }else{
                    n = n < 0 ? S.gallery.length - 1 : 0; // loop
                }
            }

            // update current
            S.current = n;

            if(typeof slide_timer == 'number'){
                clearTimeout(slide_timer);
                slide_timer = null;
                slide_delay = slide_start = 0; // reset slideshow variables
            }

            if(S.options.onChange)
                S.options.onChange();

            loadContent();
        },

        /**
         * Removes all onclick listeners from elements that have been setup with
         * Shadowbox and clears all objects from cache.
         *
         * @return  void
         * @public
         */
        clearCache: function(){
            each(S.cache, function(obj){
                if(obj.el)
                    S.lib.removeEvent(obj.el, 'click', handleClick);
            });
            S.cache = [];
        },

        /**
         * Deactivates Shadowbox.
         *
         * @return  void
         * @public
         */
        close: function(){
            if(!active) return; // already closed
            active = false;

            listenKeys(false);

            // remove the content
            if(S.content){
                S.content.remove();
                S.content = null;
            }

            // clear slideshow variables
            if(typeof slide_timer == 'number')
                clearTimeout(slide_timer);
            slide_timer = null;
            slide_delay = 0;

            if(S.options.onClose)
                S.options.onClose();

            S.skin.onClose();

            S.revertOptions();

            // reset troublesome elements to stored visibility settings
            each(v_cache, function(c){
                c[0].style.visibility = c[1];
            });
        },

        /**
         * Gets the id that should be used for content elements.
         *
         * @return  String          The content element id
         * @public
         */
        contentId: function(){
            return content_id;
        },

        /**
         * Gets the values that should appear in the counter (if the skin
         * supports counters). If a "skip" style counter is used, the return
         * value should be an array of all counter indexes that should be
         * displayed. If the "default" counter is used, the return value will
         * be a simple "1 of 5" message as a string. The skin can use the return
         * type to determine how to build the counter.
         *
         * @return  mixed           The counter as described above
         * @public
         */
        getCounter: function(){
            var len = S.gallery.length;

            if(S.options.counterType == 'skip'){
                // limit the counter?
                var c = [],
                    i = 0,
                    end = len,
                    limit = parseInt(S.options.counterLimit) || 0;

                if(limit < len && limit > 2){ // support large galleries
                    var h = Math.floor(limit / 2);
                    i = S.current - h;
                    if(i < 0) i += len;
                    end = S.current + (limit - h);
                    if(end > len) end -= len;
                }
                while(i != end){
                    if(i == len) i = 0;
                    c.push(i++);
                }
            }else
                var c = (S.current + 1) + ' ' + S.lang.of + ' ' + len;

            return c;
        },

        /**
         * Gets the current gallery object.
         *
         * @return  Object          The current gallery item
         * @public
         */
        getCurrent: function(){
            return S.current > -1 ? S.gallery[S.current] : null;
        },

        /**
         * Determines if there is a next piece to display in the current
         * gallery.
         *
         * @return  Boolean         True if there is another piece
         * @public
         */
        hasNext: function(){
            return S.gallery.length > 1 &&
                (S.current != S.gallery.length - 1 || S.options.continuous);
        },

        /**
         * Initializes the Shadowbox environment. Should be called by the user in
         * the <head> of the HTML document.
         *
         * Note: This function attempts to load all Shadowbox dependencies
         * dynamically using document.write. However, if these dependencies are
         * already included, they won't be loaded again.
         *
         * @param   Object      opts    (optional) The default options to use
         * @return  void
         * @public
         */
        init: function(opts){
            if(initialized) return; // don't initialize twice
            initialized = true;

            opts = opts || {};
            init_options = opts;

            // apply options
            if(opts)
                apply(S.options, opts);

            // compile file type regular expressions here for speed
            for(var e in S.options.ext)
                S.regex[e] = new RegExp('\.(' + S.options.ext[e].join('|') + ')\s*$', 'i');

            if(!S.path){
                // determine script path automatically
                var path_re = /(.+)shadowbox\.js/i, path;
                each(document.getElementsByTagName('script'), function(s){
                    if((path = path_re.exec(s.src)) != null){
                        S.path = path[1];
                        return false;
                    }
                });
            }

            // determine adapter
            if(S.options.adapter)
                S.adapter = S.options.adapter;
            else{
                for(var lib in S.libraries){
                    if(typeof window[lib] != 'undefined'){
                        S.adapter = S.libraries[lib];
                        break;
                    }
                }
                if(!S.adapter)
                    S.adapter = 'base';
            }

            // load dependencies
            if(S.options.useSizzle && !window['Sizzle'])
                U.include(S.path + 'libraries/sizzle/sizzle.js');
            if(!S.lang)
                U.include(S.path + 'languages/shadowbox-' + S.options.language + '.js');
            each(S.options.players, function(p){
                if((p == 'swf' || p == 'flv') && !window['swfobject'])
                    U.include(S.path + 'libraries/swfobject/swfobject.js');
                if(!S[p])
                    U.include(S.path + 'players/shadowbox-' + p + '.js');
            });
            if(!S.lib)
                U.include(S.path + 'adapters/shadowbox-' + S.adapter + '.js');
        },

        /**
         * Tells whether or not Shadowbox is currently activated.
         *
         * @return  Boolean         True if activated, false otherwise
         * @public
         */
        isActive: function(){
            return active;
        },

        /**
         * Tells whether or not Shadowbox is currently in the middle of a
         * slideshow in a paused state.
         *
         * @return  Boolean         True if paused, false otherwise
         * @public
         */
        isPaused: function(){
            return slide_timer == 'paused';
        },

        /**
         * Loads Shadowbox into the DOM. Is called automatically by each adapter
         * as soon as the DOM is ready.
         *
         * @return  void
         * @public
         */
        load: function(){
            // apply skin options, re-apply user init options in case they overwrite
            if(S.skin.options){
                apply(S.options, S.skin.options);
                apply(S.options, init_options);
            }

            // append markup and initialize skin
            var markup = S.skin.markup.replace(/\{(\w+)\}/g, function(m, p){
                return S.lang[p];
            });
            S.lib.append(document.body, markup);

            if(S.skin.init)
                S.skin.init();

            // set up window resize event handler
            var id;
            S.lib.addEvent(window, 'resize', function(){
                // use 50 ms event buffering to prevent jerky window resizing
                if(id){
                    clearTimeout(id);
                    id = null;
                }
                // check if activated because IE7 fires window resize event
                // when container display is set to block
                if(active){
                    id = setTimeout(function(){
                        if(S.skin.onWindowResize)
                            S.skin.onWindowResize();
                        var c = S.content;
                        if(c && c.onWindowResize)
                            c.onWindowResize();
                    }, 50);
                }
            });

            if(!S.options.skipSetup)
                S.setup();
        },

        /**
         * Jumps to the next piece in the gallery.
         *
         * @return  void
         * @public
         */
        next: function(){
            S.change(S.current + 1);
        },

        /**
         * Opens the given object in Shadowbox. This object may be either an
         * anchor/area element, or an object similar to the one created by
         * Shadowbox.buildCacheObj().
         *
         * @param   mixed       obj         The object or link element that defines
         *                                  what to display
         * @return  void
         * @public
         */
        open: function(obj){
            // if it's a link element, build an object on the fly
            if(U.isLink(obj))
                obj = S.buildCacheObj(obj);

            // set up the gallery
            if(obj.constructor == Array){
                S.gallery = obj;
                S.current = 0;
            }else{
                if(!obj.gallery){
                    // single item, no gallery
                    S.gallery = [obj];
                    S.current = 0;
                }else{
                    // gallery item, build gallery from cached gallery elements
                    S.current = null;
                    S.gallery = [];
                    each(S.cache, function(c){
                        if(c.gallery && c.gallery == obj.gallery){
                            if(S.current == null && c.content == obj.content && c.title == obj.title)
                                S.current = S.gallery.length;
                            S.gallery.push(c);
                        }
                    });

                    // if not found in cache, prepend to front of gallery
                    if(S.current == null){
                        S.gallery.unshift(obj);
                        S.current = 0;
                    }
                }
            }

            obj = S.getCurrent();
            if(obj.options){
                S.revertOptions();
                S.applyOptions(obj.options);
            }

            // filter gallery for unsupported elements
            var g, r, m, s, a, oe = S.options.errors, msg, el;
            for(var i = 0; i < S.gallery.length; ++i){
                // use apply to break the reference to the original object here
                // because we'll be modifying the properties of the gallery objects
                // directly and we don't want to taint them in case they are used
                // again in a future call
                g = S.gallery[i] = apply({}, S.gallery[i]);
                r = false; // remove the element?
                if(g.player == 'unsupported'){
                    // don't support this at all
                    r = true;
                }else if(m = S.regex.unsupported.exec(g.player)){
                    // handle unsupported elements
                    if(S.options.handleUnsupported == 'link'){
                        g.player = 'html';
                        // generate a link to the appropriate plugin download page(s)
                        switch(m[1]){
                            case 'qtwmp':
                                s = 'either';
                                a = [oe.qt.url, oe.qt.name, oe.wmp.url, oe.wmp.name];
                            break;
                            case 'qtf4m':
                                s = 'shared';
                                a = [oe.qt.url, oe.qt.name, oe.f4m.url, oe.f4m.name];
                            break;
                            default:
                                s = 'single';
                                if(m[1] == 'swf' || m[1] == 'flv') m[1] = 'fla';
                                a = [oe[m[1]].url, oe[m[1]].name];
                        }
                        msg = S.lang.errors[s].replace(/\{(\d+)\}/g, function(m, n){
                            return a[n];
                        });
                        g.content = '<div class="sb-message">' + msg + '</div>';
                    }else
                        r = true;
                }else if(g.player == 'inline'){
                    // inline element, retrieve innerHTML
                    m = S.regex.inline.exec(g.content);
                    if(m){
                        var el = U.get(m[1]);
                        if(el)
                            g.content = el.innerHTML;
                        else
                            throw 'Cannot find element with id ' + m[1];
                    }else
                        throw 'Cannot find element id for inline content';
                }else if(g.player == 'swf' || g.player == 'flv'){
                    var version = (g.options && g.options.flashVersion) || S.options.flashVersion;
                    if(!swfobject.hasFlashPlayerVersion(version)){
                        // express install will be triggered because the client
                        // does not have the minimum required version of flash
                        // installed, set height and width to those of express
                        // install swf
                        g.width = 310;
                        // minimum height is 127, but +20 pixels on top and bottom
                        // looks better
                        g.height = 177; 
                    }
                }
                if(r){
                    S.gallery.splice(i, 1); // remove from gallery
                    if(i < S.current)
                        --S.current; // maintain integrity of S.current
                    else if(i == S.current)
                        S.current = i > 0 ? i - 1 : i; // look for supported neighbor
                    --i; // decrement index for next loop
                }
            }

            // anything left to display?
            if(S.gallery.length){
                if(!active){
                    // fire onOpen hook
                    if(typeof S.options.onOpen == 'function' && S.options.onOpen(obj) === false) return;

                    // hide elements troublesome for modal overlays
                    v_cache = [];
                    each(['select', 'object', 'embed', 'canvas'], function(tag){
                        each(document.getElementsByTagName(tag), function(el){
                            v_cache.push([el, el.style.visibility || 'visible']);
                            el.style.visibility = 'hidden';
                        });
                    });

                    // set initial dimensions & load
                    var h = S.options.autoDimensions && 'height' in obj
                        ? obj.height
                        : S.options.initialHeight;
                    var w = S.options.autoDimensions && 'width' in obj
                        ? obj.width
                        : S.options.initialWidth;

                    S.skin.onOpen(h, w, loadContent);
                }else
                    loadContent();

                active = true;
            }
        },

        /**
         * Pauses the current slideshow.
         *
         * @return  void
         * @public
         */
        pause: function(){
            if(typeof slide_timer != 'number') return;

            var time = new Date().getTime();
            slide_delay = Math.max(0, slide_delay - (time - slide_start));

            // if there's any time left on current slide, pause the timer
            if(slide_delay){
                clearTimeout(slide_timer);
                slide_timer = 'paused';

                if(S.skin.onPause)
                    S.skin.onPause();
            }
        },

        /**
         * Sets the timer for the next image in the slideshow to be displayed.
         *
         * @return  void
         * @public
         */
        play: function(){
            if(!S.hasNext()) return;
            if(!slide_delay) slide_delay = S.options.slideshowDelay * 1000;
            if(slide_delay){
                slide_start = new Date().getTime();
                slide_timer = setTimeout(function(){
                    slide_delay = slide_start = 0; // reset slideshow
                    S.next();
                }, slide_delay);

                if(S.skin.onPlay)
                    S.skin.onPlay();
            }
        },

        /**
         * Jumps to the previous piece in the gallery.
         *
         * @return  void
         * @public
         */
        previous: function(){
            S.change(S.current - 1);
        },

        /**
         * Reverts Shadowbox' options to the last default set in use before
         * Shadowbox.applyOptions() was called.
         *
         * @return  void
         * @public
         */
        revertOptions: function(){
            apply(S.options, default_options);
        },

        /**
         * Calculates the dimensions for Shadowbox according to the given
         * parameters. Will determine if content is oversized (too large for the
         * viewport) and will automatically constrain resizable content
         * according to user preference.
         *
         * @param   Number      height      The content height
         * @param   Number      width       The content width
         * @param   Number      max_h       The maximum height available (should
         *                                  be the height of the viewport)
         * @param   Number      max_w       The maximum width available (should
         *                                  be the width of the viewport)
         * @param   Number      tb          The extra top/bottom pixels that are
         *                                  required for borders/toolbars
         * @param   Number      lr          The extra left/right pixels that are
         *                                  required for borders/toolbars
         * @param   Boolean     resizable   True if the content is able to be
         *                                  resized. Defaults to false
         * @return  Object                  The Shadowbox.dimensions object
         * @public
         */
        setDimensions: function(height, width, max_h, max_w, tb, lr, resizable){
            var h = height = parseInt(height),
                w = width = parseInt(width),
                pad = parseInt(S.options.viewportPadding) || 0;

            // calculate the max height/width
            var extra_h = 2 * pad + tb;
            if(h + extra_h >= max_h) h = max_h - extra_h;
            var extra_w = 2 * pad + lr;
            if(w + extra_w >= max_w) w = max_w - extra_w;

            // handle oversized content
            var resize_h = height,
                resize_w = width,
                change_h = (height - h) / height,
                change_w = (width - w) / width,
                oversized = (change_h > 0 || change_w > 0);
            if(resizable && oversized && S.options.handleOversize == 'resize'){
                // adjust resized height/width, preserve original aspect ratio
                if(change_h > change_w)
                    w = Math.round((width / height) * h);
                else if(change_w > change_h)
                    h = Math.round((height / width) * w);
                resize_w = w;
                resize_h = h;
            }

            // update Shadowbox.dimensions
            S.dimensions = {
                height:     h + tb,
                width:      w + lr,
                inner_h:    h,
                inner_w:    w,
                top:        (max_h - (h + extra_h)) / 2 + pad,
                left:       (max_w - (w + extra_w)) / 2 + pad,
                oversized:  oversized,
                resize_h:   resize_h,
                resize_w:   resize_w
            };

            return S.dimensions;
        },

        /**
         * Sets up listeners on the given links that will trigger Shadowbox. If no
         * links are given, this method will set up every anchor element on the page
         * with the appropriate rel attribute. It is important to note that any
         * options given here will be applied to all link elements. Multiple calls
         * to this method may be needed if different options are desired.
         *
         * Note: Because AREA elements do not support the rel attribute, they must
         * be explicitly passed to this method.
         *
         * @param   Array       links       An array (or array-like) list of anchor
         *                                  and/or area elements to set up
         * @param   Object      opts        Some options to use for the given links
         * @return  void
         * @public
         */
        setup: function(links, opts){
            // get links if none specified
            if(!links){
                var links = [], rel;
                each(document.getElementsByTagName('a'), function(a){
                    rel = a.getAttribute('rel');
                    if(rel && S.regex.rel.test(rel)) links.push(a);
                });
            }else{
                var len = links.length;
                if(len){
                    if(window['Sizzle']){
                        if(typeof links == 'string')
                            links = Sizzle(links); // lone selector
                        else if(len == 2 && links.push && typeof links[0] == 'string' && links[1].nodeType)
                            links = Sizzle(links[0], links[1]); // selector + context
                    }
                }else
                    links = [links]; // single link
            }

            each(links, function(link){
                if(typeof link.shadowboxCacheKey == 'undefined'){
                    // assign cache key expando, use integer primitive to avoid
                    // memory leak in IE
                    link.shadowboxCacheKey = S.cache.length;
                    // add onclick listener
                    S.lib.addEvent(link, 'click', handleClick);
                }
                S.cache[link.shadowboxCacheKey] = S.buildCacheObj(link, opts);
            });
        }

    },

    U = S.util = {

        /**
         * Animates any numeric (not color) style of the given element from its
         * current state to the given value. Defaults to using pixel-based
         * measurements.
         *
         * @param   HTMLElement     el      The element to animate
         * @param   String          p       The property to animate (in camelCase)
         * @param   mixed           to      The value to animate to
         * @param   Number          d       The duration of the animation (in
         *                                  seconds)
         * @param   Function        cb      A callback function to call when the
         *                                  animation completes
         * @return  void
         * @public
         */
        animate: function(el, p, to, d, cb){
            var from = parseFloat(S.lib.getStyle(el, p));
            if(isNaN(from)) from = 0;

            var delta = to - from;
            if(delta == 0){
                if(cb) cb();
                return; // nothing to animate
            }

            var op = p == 'opacity';

            function fn(ease){
                var to = from + ease * delta;
                if(op)
                    U.setOpacity(el, to);
                else
                    el.style[p] = to + 'px'; // default unit is px
            }

            // cancel the animation here if duration is 0 or if set in the options
            if(!d || (!op && !S.options.animate) || (op && !S.options.animateFade)){
                fn(1);
                if(cb) cb();
                return;
            }

            d *= 1000; // convert to milliseconds
            var begin = new Date().getTime(),
                end = begin + d,
                time,
                timer = setInterval(function(){
                    time = new Date().getTime();
                    if(time >= end){ // end of animation
                        clearInterval(timer);
                        fn(1);
                        if(cb) cb();
                    }else
                        fn(S.options.ease((time - begin) / d));
                }, 10); // 10 ms interval is minimum on webkit
        },

        /**
         * Applies all properties of e to o.
         *
         * @param   Object      o       The original object
         * @param   Object      e       The extension object
         * @return  Object              The original object with all properties
         *                              of the extension object applied
         * @public
         */
        apply: function(o, e){
            for(var p in e)
                o[p] = e[p];
            return o;
        },

        /**
         * A utility function used by the fade functions to clear the opacity
         * style setting of the given element. Required in some cases for IE.
         *
         * @param   HTMLElement     el      The element
         * @return  void
         * @public
         */
        clearOpacity: function(el){
            var s = el.style;
            if(window.ActiveXObject){
                // be careful not to overwrite other filters!
                if(typeof s.filter == 'string' && (/alpha/i).test(s.filter))
                    s.filter = s.filter.replace(/[\w\.]*alpha\(.*?\);?/i, '');
            }else
                s.opacity = '';
        },

        /**
         * Calls the given function for each element of obj. The obj element must
         * be array-like (meaning it must have a length property and be able to
         * be accessed using the array square bracket syntax). If scope is not
         * explicitly given, the callback will be called with a scope of the
         * current item. Will stop execution if a callback returns false.
         *
         * @param   mixed       obj     An array-like object containing the
         *                              elements
         * @param   Function    fn      The callback function
         * @param   mixed       scope   The scope of the callback
         * @return  void
         * @public
         */
        each: function(obj, fn, scope){
            for(var i = 0, len = obj.length; i < len; ++i)
                if(fn.call(scope || obj[i], obj[i], i, obj) === false) return;
        },

        /**
         * Gets an element by its id.
         *
         * @param   String      id      The element id
         * @return  HTMLElement         A reference to the element with the
         *                              given id
         * @public
         */
        get: function(id){
            return document.getElementById(id);
        },

        /**
         * Dynamically includes a JavaScript file in the current page.
         *
         * @param   String      file    The name of the js file to include
         * @return  void
         * @public
         */
        include: function(){
            var includes = {};
            return function(file){
                if(includes[file]) return; // don't include same file twice
                includes[file] = true;
                document.write('<scr' + 'ipt type="text/javascript" src="' + file + '"><\/script>');
            }
        }(),

        /**
         * Determines if the given object is an anchor/area element.
         *
         * @param   mixed       obj     The object to check
         * @return  Boolean             True if the object is a link element
         * @public
         */
        isLink: function(obj){
            if(!obj || !obj.tagName) return false;
            var up = obj.tagName.toUpperCase();
            return up == 'A' || up == 'AREA';
        },

        /**
         * Removes all child nodes from the given element.
         *
         * @param   HTMLElement     el      The element
         * @return  void
         * @public
         */
        removeChildren: function(el){
            while(el.firstChild)
                el.removeChild(el.firstChild);
        },

        /**
         * Sets the opacity of the given element to the specified level.
         *
         * @param   HTMLElement     el      The element
         * @param   Number          o       The opacity to use
         * @return  void
         * @public
         */
        setOpacity: function(el, o){
            var s = el.style;
            if(window.ActiveXObject){
                s.zoom = 1; // trigger hasLayout
                s.filter = (s.filter || '').replace(/\s*alpha\([^\)]*\)/gi, '') +
                    (o == 1 ? '' : ' alpha(opacity=' + (o * 100) + ')');
            }else
                s.opacity = o;
        }

    },

    // shorthand
    apply = U.apply,
    each = U.each,

    /**
     * The initial options object that was given by the user.
     *
     * @var     Object
     * @private
     */
    init_options,

    /**
     * Keeps track of whether or not Shadowbox.init has been called.
     *
     * @var     Boolean
     * @private
     */
    initialized = false,

    /**
     * Stores the default set of options in case a custom set of options is used
     * on a link-by-link basis so we can restore them later.
     *
     * @var     Object
     * @private
     */
    default_options = {},

    /**
     * The id to use for content objects.
     *
     * @var     String
     * @private
     */
    content_id = 'sb-content',

    /**
     * Keeps track of whether or not Shadowbox is activated.
     *
     * @var     Boolean
     * @private
     */
    active = false,

    /**
     * The timeout id for the slideshow transition function.
     *
     * @var     Number
     * @private
     */
    slide_timer,

    /**
     * Keeps track of the time at which the current slideshow frame was
     * displayed.
     *
     * @var     Number
     * @private
     */
    slide_start,

    /**
     * The delay on which the next slide will display.
     *
     * @var     Number
     * @private
     */
    slide_delay = 0,

    /**
     * A cache for elements that are troublesome for modal overlays.
     *
     * @var     Array
     * @private
     */
    v_cache = [];

    // detect plugin support
    if(navigator.plugins && navigator.plugins.length){
        var names = [];
        each(navigator.plugins, function(p){
            names.push(p.name);
        });
        names = names.join();
        var detectPlugin = function(n){
            return names.indexOf(n) > -1;
        }
        var f4m = detectPlugin('Flip4Mac');
        S.plugins = {
            fla:    detectPlugin('Shockwave Flash'),
            qt:     detectPlugin('QuickTime'),
            wmp:    !f4m && detectPlugin('Windows Media'), // if it's Flip4Mac, it's not really WMP
            f4m:    f4m
        }
    }else{
        function detectPlugin(n){
            try{
                var axo = new ActiveXObject(n);
            }catch(e){}
            return !!axo;
        }
        S.plugins = {
            fla:    detectPlugin('ShockwaveFlash.ShockwaveFlash'),
            qt:     detectPlugin('QuickTime.QuickTime'),
            wmp:    detectPlugin('wmplayer.ocx'),
            f4m:    false
        }
    }

    /**
     * Determines the player needed to display the file at the given URL. If
     * the file type is not supported, the return value will be 'unsupported'.
     * If the file type is not supported but the correct player can be
     * determined, the return value will be 'unsupported-*' where * will be the
     * player abbreviation (e.g. 'qt' = QuickTime).
     *
     * @param   String      url     The url of the file
     * @return  String              The name of the player to use
     * @private
     */
    function getPlayer(url){
        var re = S.regex,
            p = S.plugins,
            m = url.match(re.domain),
            d = m && document.domain == m[1]; // same domain
        if(url.indexOf('#') > -1 && d) return 'inline';
        var q = url.indexOf('?');
        if(q > -1) url = url.substring(0, q); // strip query string for player detection purposes
        if(re.img.test(url)) return 'img';
        if(re.swf.test(url)) return p.fla ? 'swf' : 'unsupported-swf';
        if(re.flv.test(url)) return p.fla ? 'flv' : 'unsupported-flv';
        if(re.qt.test(url)) return p.qt ? 'qt' : 'unsupported-qt';
        if(re.wmp.test(url)){
            if(p.wmp) return 'wmp';
            if(p.f4m) return 'qt';
            if(S.client.isMac) return p.qt ? 'unsupported-f4m' : 'unsupported-qtf4m';
            return 'unsupported-wmp';
        }
        if(re.qtwmp.test(url)){
            if(p.qt) return 'qt';
            if(p.wmp) return 'wmp';
            return S.client.isMac ? 'unsupported-qt' : 'unsupported-qtwmp';
        }
        if(!d || re.iframe.test(url))
            return 'iframe';
        return 'unsupported'; // same domain, not supported
    }

    /**
     * Handles all clicks on links that have been set up to work with Shadowbox
     * and cancels the default event behavior when appropriate.
     *
     * @param   HTMLEvent   e           The click event object
     * @return  void
     * @private
     */
    function handleClick(e){
        // get anchor/area element
        var link;
        if(U.isLink(this)){
            link = this; // jQuery, Prototype, YUI
        }else{
            link = S.lib.getTarget(e); // Ext, standalone
            while(!U.isLink(link) && link.parentNode)
                link = link.parentNode;
        }

        //S.lib.preventDefault(e); // good for debugging

        if(link){
            // if this link has already been set up, use the cached version
            var key = link.shadowboxCacheKey;
            if(typeof key != 'undefined' && typeof S.cache[key] != 'undefined')
                link = S.cache[key];

            S.open(link);
            if(S.gallery.length) S.lib.preventDefault(e); // stop event
        }
    }

    /**
     * Sets up a listener on the document for keystrokes.
     *
     * @param   Boolean     on      True to enable the listener, false to turn
     *                              it off
     * @return  void
     * @private
     */
    function listenKeys(on){
        if(!S.options.enableKeys) return;
        S.lib[(on ? 'add' : 'remove') + 'Event'](document, 'keydown', handleKey);
    }

    /**
     * A listener function that is fired when a key is pressed.
     *
     * @param   mixed       e       The event object
     * @return  void
     * @private
     */
    function handleKey(e){
        var code = S.lib.keyCode(e);

        // attempt to prevent default key action
        S.lib.preventDefault(e);

        switch(code){
            case 81: // q
            case 88: // x
            case 27: // esc
                S.close();
                break;
            case 37: // left
                S.previous();
                break;
            case 39: // right
                S.next();
                break;
            case 32: // space
                S[(typeof slide_timer == 'number' ? 'pause' : 'play')]();
        }
    }

    /**
     * Loads the Shadowbox with the current piece.
     *
     * @return  void
     * @private
     */
    function loadContent(){
        var obj = S.getCurrent();
        if(!obj) return;

        // determine player, inline is really just HTML
        var p = obj.player == 'inline' ? 'html' : obj.player;
        if(typeof S[p] != 'function')
            throw 'Unknown player: ' + p;

        var change = false;
        if(S.content){
            // changing from some previous content
            S.content.remove(); // remove old content
            change = true;

            S.revertOptions();
            if(obj.options)
                S.applyOptions(obj.options);
        }

        // make sure the body element doesn't have any children, just in case
        U.removeChildren(S.skin.bodyEl());

        // load the content
        S.content = new S[p](obj);
        listenKeys(false); // disable the keyboard while content is loading

        S.skin.onLoad(S.content, change, function(){
            if(!S.content) return;

            if(typeof S.content.ready != 'undefined'){
                // if content object has a ready property, wait for it to be
                // ready before loading
                var id = setInterval(function(){
                    if(S.content){
                        if(S.content.ready){
                            clearInterval(id);
                            id = null;
                            S.skin.onReady(contentReady);
                        }
                    }else{ // content has been removed
                        clearInterval(id);
                        id = null;
                    }
                }, 100);
            }else
                S.skin.onReady(contentReady);
        });

        // preload neighboring gallery images
        if(S.gallery.length > 1){
            var next = S.gallery[S.current + 1] || S.gallery[0];
            if(next.player == 'img'){
                var a = new Image();
                a.src = next.content;
            }
            var prev = S.gallery[S.current - 1] || S.gallery[S.gallery.length - 1];
            if(prev.player == 'img'){
                var b = new Image();
                b.src = prev.content;
            }
        }
    }

    /**
     * Callback that should be called with the content is ready to be loaded.
     *
     * @return  void
     * @private
     */
    function contentReady(){
        if(!S.content) return;
        S.content.append(S.skin.bodyEl(), content_id, S.dimensions);
        S.skin.onFinish(finishContent);
    }

    /**
     * Callback that should be called when the content is finished loading.
     *
     * @return  void
     * @private
     */
    function finishContent(){
        if(!S.content) return;

        if(S.content.onLoad)
            S.content.onLoad();
        if(S.options.onFinish)
            S.options.onFinish();
        if(!S.isPaused())
            S.play(); // kick off next slide

        listenKeys(true); // re-enable keyboard when finished
    }

    return S;

}();

/**
 * The default skin for Shadowbox. Separated out into its own class so that it may
 * be customized more easily by skin developers.
 */
Shadowbox.skin = function(){

    var S = Shadowbox,
        U = S.util,

    /**
     * Keeps track of whether or not the overlay is activated.
     *
     * @var     Boolean
     * @private
     */
    overlay_on = false,

    /**
     * Id's of elements that need transparent PNG support in IE6.
     *
     * @var     Array
     * @private
     */
    png = [
        'sb-nav-close',
        'sb-nav-next',
        'sb-nav-play',
        'sb-nav-pause',
        'sb-nav-previous'
    ];

    /**
     * Sets the top of the container element. This is only necessary in IE6
     * where the container uses absolute positioning instead of fixed.
     *
     * @return  void
     * @private
     */
    function fixTop(){
        U.get('sb-container').style.top = document.documentElement.scrollTop + 'px';
    }

    /**
     * Toggles the visibility of #sb-container and sets its size (if on
     * IE6). Also toggles the visibility of elements (<select>, <object>, and
     * <embed>) that are troublesome for semi-transparent modal overlays. IE has
     * problems with <select> elements, while Firefox has trouble with
     * <object>s.
     *
     * @param   Function    cb      A callback to call after toggling on, absent
     *                              when toggling off
     * @return  void
     * @private
     */
    function toggleVisible(cb){
        var so = U.get('sb-overlay'),
            sc = U.get('sb-container'),
            sb = U.get('sb-wrapper');

        if(cb){
            if(S.client.isIE6){
                // fix container top before showing
                fixTop();
                S.lib.addEvent(window, 'scroll', fixTop);
            }
            if(S.options.showOverlay){
                overlay_on = true;

                // set overlay color/opacity
                so.style.backgroundColor = S.options.overlayColor;
                U.setOpacity(so, 0);
                if(!S.options.modal) S.lib.addEvent(so, 'click', S.close);

                sb.style.display = 'none'; // cleared in onLoad
            }
            sc.style.visibility = 'visible';
            if(overlay_on){
                // fade in effect
                var op = parseFloat(S.options.overlayOpacity);
                U.animate(so, 'opacity', op, S.options.fadeDuration, cb);
            }else
                cb();
        }else{
            if(S.client.isIE6)
                S.lib.removeEvent(window, 'scroll', fixTop);
            S.lib.removeEvent(so, 'click', S.close);
            if(overlay_on){
                // fade out effect
                sb.style.display = 'none';
                U.animate(so, 'opacity', 0, S.options.fadeDuration, function(){
                    // the following is commented because it causes the overlay to
                    // be hidden on consecutive activations in IE8, even though we
                    // set the visibility to "visible" when we reactivate
                    //sc.style.visibility = 'hidden';
                    sc.style.display = '';
                    sb.style.display = '';
                    U.clearOpacity(so);
                });
            }else
                sc.style.visibility = 'hidden';
        }
    }

    /**
     * Toggles the display of the nav control with the given id on and off.
     *
     * @param   String      id      The id of the navigation control
     * @param   Boolean     on      True to toggle on, false to toggle off
     * @return  void
     * @private
     */
    function toggleNav(id, on){
        var el = U.get('sb-nav-' + id);
        if(el) el.style.display = on ? '' : 'none';
    }

    /**
     * Toggles the visibility of the "loading" layer.
     *
     * @param   Boolean     on      True to toggle on, false to toggle off
     * @param   Function    cb      The callback function to call when toggling
     *                              completes
     * @return  void
     * @private
     */
    function toggleLoading(on, cb){
        var ld = U.get('sb-loading'),
            p = S.getCurrent().player,
            anim = (p == 'img' || p == 'html'); // fade on images & html

        if(on){
            function fn(){
                U.clearOpacity(ld);
                if(cb) cb();
            }

            U.setOpacity(ld, 0);
            ld.style.display = '';

            if(anim)
                U.animate(ld, 'opacity', 1, S.options.fadeDuration, fn);
            else
                fn();
        }else{
            function fn(){
                ld.style.display = 'none';
                U.clearOpacity(ld);
                if(cb) cb();
            }

            if(anim)
                U.animate(ld, 'opacity', 0, S.options.fadeDuration, fn);
            else
                fn();
        }
    }

    /**
     * Builds the content for the title and information bars.
     *
     * @param   Function    cb      A callback function to execute after the
     *                              bars are built
     * @return  void
     * @private
     */
    function buildBars(cb){
        var obj = S.getCurrent();

        // build the title, if present
        U.get('sb-title-inner').innerHTML = obj.title || '';

        // build the nav
        var c, n, pl, pa, p;
        if(S.options.displayNav){
            c = true;
            // next & previous links
            var len = S.gallery.length;
            if(len > 1){
                if(S.options.continuous)
                    n = p = true; // show both
                else{
                    n = (len - 1) > S.current; // not last in gallery, show next
                    p = S.current > 0; // not first in gallery, show previous
                }
            }
            // in a slideshow?
            if(S.options.slideshowDelay > 0 && S.hasNext()){
                pa = !S.isPaused();
                pl = !pa;
            }
        }else{
            c = n = pl = pa = p = false;
        }
        toggleNav('close', c);
        toggleNav('next', n);
        toggleNav('play', pl);
        toggleNav('pause', pa);
        toggleNav('previous', p);

        // build the counter
        var c = '';
        if(S.options.displayCounter && S.gallery.length > 1){
            var count = S.getCounter();
            if(typeof count == 'string') // default
                c = count;
            else{
                U.each(count, function(i){
                    c += '<a onclick="Shadowbox.change(' + i + ');"'
                    if(i == S.current) c += ' class="sb-counter-current"';
                    c += '>' + (i + 1) + '</a>';
                });
            }
        }
        U.get('sb-counter').innerHTML = c;

        cb();
    }

    /**
     * Hides the title and info bars.
     *
     * @param   Boolean     anim    True to animate the transition
     * @param   Function    cb      A callback function to execute after the
     *                              animation completes
     * @return  void
     * @private
     */
    function hideBars(anim, cb){
        var sw = U.get('sb-wrapper'),
            st = U.get('sb-title'),
            si = U.get('sb-info'),
            ti = U.get('sb-title-inner'),
            ii = U.get('sb-info-inner'),
            t = parseInt(S.lib.getStyle(ti, 'height')) || 0,
            b = parseInt(S.lib.getStyle(ii, 'height')) || 0;

        function fn(){
            // hide bars here in case of overflow, build after hidden
            ti.style.visibility = ii.style.visibility = 'hidden';
            buildBars(cb);
        }

        if(anim){
            U.animate(st, 'height', 0, 0.35);
            U.animate(si, 'height', 0, 0.35);
            U.animate(sw, 'paddingTop', t, 0.35);
            U.animate(sw, 'paddingBottom', b, 0.35, fn);
        }else{
            st.style.height = si.style.height = '0px';
            sw.style.paddingTop = t + 'px';
            sw.style.paddingBottom = b + 'px';
            fn();
        }
    }

    /**
     * Shows the title and info bars.
     *
     * @param   Function    cb      A callback function to execute after the
     *                              animation completes
     * @return  void
     * @private
     */
    function showBars(cb){
        var sw = U.get('sb-wrapper'),
            st = U.get('sb-title'),
            si = U.get('sb-info'),
            ti = U.get('sb-title-inner'),
            ii = U.get('sb-info-inner'),
            t = parseInt(S.lib.getStyle(ti, 'height')) || 0,
            b = parseInt(S.lib.getStyle(ii, 'height')) || 0;

        // clear visibility before animating into view
        ti.style.visibility = ii.style.visibility = '';

        // show title?
        if(ti.innerHTML != ''){
            U.animate(st, 'height', t, 0.35);
            U.animate(sw, 'paddingTop', 0, 0.35);
        }
        U.animate(si, 'height', b, 0.35);
        U.animate(sw, 'paddingBottom', 0, 0.35, cb);
    }

    /**
     * Adjusts the height of #sb-body and centers #sb-wrapper vertically
     * in the viewport.
     *
     * @param   Number      height      The height to use for #sb-body
     * @param   Number      top         The top to use for #sb-wrapper
     * @param   Boolean     anim        True to animate the transition
     * @param   Function    cb          A callback to use when the animation
     *                                  completes
     * @return  void
     * @private
     */
    function adjustHeight(height, top, anim, cb){
        var sb = U.get('sb-body'),
            s = U.get('sb-wrapper'),
            h = parseInt(height),
            t = parseInt(top);

        if(anim){
            U.animate(sb, 'height', h, S.options.resizeDuration);
            U.animate(s, 'top', t, S.options.resizeDuration, cb);
        }else{
            sb.style.height = h + 'px';
            s.style.top = t + 'px';
            if(cb) cb();
        }
    }

    /**
     * Adjusts the width and left of #sb-wrapper.
     *
     * @param   Number      width       The width to use for #sb-wrapper
     * @param   Number      left        The left to use for #sb-wrapper
     * @param   Boolean     anim        True to animate the transition
     * @param   Function    cb          A callback to use when the animation
     *                                  completes
     * @return  void
     * @private
     */
    function adjustWidth(width, left, anim, cb){
        var s = U.get('sb-wrapper'),
            w = parseInt(width),
            l = parseInt(left);

        if(anim){
            U.animate(s, 'width', w, S.options.resizeDuration);
            U.animate(s, 'left', l, S.options.resizeDuration, cb);
        }else{
            s.style.width = w + 'px';
            s.style.left = l + 'px';
            if(cb) cb();
        }
    }

    /**
     * Resizes Shadowbox to the appropriate height and width for the current
     * content.
     *
     * @param   Function    cb      A callback function to execute after the
     *                              resize completes
     * @return  void
     * @private
     */
    function resizeContent(cb){
        var c = S.content;
        if(!c) return;

        // set new dimensions
        var d = setDimensions(c.height, c.width, c.resizable);

        switch(S.options.animSequence){
            case 'hw':
                adjustHeight(d.inner_h, d.top, true, function(){
                    adjustWidth(d.width, d.left, true, cb);
                });
            break;
            case 'wh':
                adjustWidth(d.width, d.left, true, function(){
                    adjustHeight(d.inner_h, d.top, true, cb);
                });
            break;
            default: // sync
                adjustWidth(d.width, d.left, true);
                adjustHeight(d.inner_h, d.top, true, cb);
        }
    }

    /**
     * Calculates the dimensions for Shadowbox, taking into account the borders
     * and surrounding elements of #sb-body.
     *
     * @param   Number      height      The content height
     * @param   Number      width       The content width
     * @param   Boolean     resizable   True if the content is able to be
     *                                  resized. Defaults to false
     * @return  Object                  The new dimensions object
     * @private
     */
    function setDimensions(height, width, resizable){
        var sbi = U.get('sb-body-inner')
            sw = U.get('sb-wrapper'),
            so = U.get('sb-overlay'),
            tb = sw.offsetHeight - sbi.offsetHeight,
            lr = sw.offsetWidth - sbi.offsetWidth,
            max_h = so.offsetHeight, // measure overlay to get viewport size for IE6
            max_w = so.offsetWidth;

        return S.setDimensions(height, width, max_h, max_w, tb, lr, resizable);
    }

    return {

        /**
         * The HTML markup to use.
         *
         * @var     String
         * @public
         */
        markup: '<div id="sb-container">' +
                    '<div id="sb-overlay"></div>' +
                    '<div id="sb-wrapper">' +
						'<div id="sb-nav">' +
                                    '<a id="sb-nav-close" title="{close}" onclick="Shadowbox.close()"></a>' +
                                    '<a id="sb-nav-play" title="{play}" onclick="Shadowbox.play()"></a>' +
                                    '<a id="sb-nav-pause" title="{pause}" onclick="Shadowbox.pause()"></a>' +
                        '</div>' +
                        '<div id="sb-body">' +
						  '<a id="sb-nav-next" title="{next}" onclick="Shadowbox.next()"></a>' +
                            '<div id="sb-body-inner"></div>' +
                            '<div id="sb-loading">' +
                                '<a onclick="Shadowbox.close()">{cancel}</a>' +
                            '</div>' +
					   	  '<a id="sb-nav-previous" title="{previous}" onclick="Shadowbox.previous()"></a>' +
                        '</div>' +
						'<div id="sb-title">' +
                            '<div id="sb-title-inner"></div>' +
                        '</div>' +
                        '<div id="sb-info">' +
                            '<div id="sb-info-inner">' +
                                '<div id="sb-counter"></div>' +
                                '<div style="clear:both"></div>' +
                            '</div>' +
                        '</div>' +

                    '</div>' +
                '</div>',

        options: {

            /**
             * Determines the sequence of the resizing animations. A value of
             * "hw" will resize first the height, then the width. Likewise, "wh"
             * will resize the width first, then the height. The default is
             * "sync" and will resize both simultaneously.
             *
             * @var     String
             * @public
             */
            animSequence: 'sync'

        },

        /**
         * Initialization function. Called immediately after this skin's markup
         * has been appended to the document with all of the necessary language
         * replacements done.
         *
         * @return  void
         * @public
         */
        init: function(){
            // several fixes for IE6
            if(S.client.isIE6){
                // trigger hasLayout on sb-body
                U.get('sb-body').style.zoom = 1;

                // support transparent PNG's via AlphaImageLoader
                var el, m, re = /url\("(.*\.png)"\)/;
                U.each(png, function(id){
                    el = U.get(id);
                    if(el){
                        m = S.lib.getStyle(el, 'backgroundImage').match(re);
                        if(m){
                            el.style.backgroundImage = 'none';
                            el.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=' +
                                m[1] + ',sizingMethod=scale);';
                        }
                    }
                });
            }
        },

        /**
         * Gets the element that content should be appended to.
         *
         * @return  HTMLElement     The body element
         * @public
         */
        bodyEl: function(){
            return U.get('sb-body-inner');
        },

        /**
         * Called when Shadowbox opens from an inactive state.
         *
         * @param   Number      h       The initial height to use
         * @param   Number      w       The initial width to use
         * @param   Function    cb      The function to call when finished
         * @return  void
         * @public
         */
        onOpen: function(h, w, cb){
            U.get('sb-container').style.display = 'block';

            var d = setDimensions(h, w);
            adjustHeight(d.inner_h, d.top, false);
            adjustWidth(d.width, d.left, false);
            toggleVisible(cb);
        },

        /**
         * Called when a new piece of content is being loaded.
         *
         * @param   mixed       content     The content object
         * @param   Boolean     change      True if the content is changing
         *                                  from some previous content
         * @param   Function    cb          A callback that should be fired when
         *                                  this function is finished
         * @return  void
         * @public
         */
        onLoad: function(content, change, cb){
            toggleLoading(true);

            hideBars(change, function(){ // if changing, animate the bars transition
                if(!content) return;

                // if opening, clear #sb-wrapper display
                if(!change) U.get('sb-wrapper').style.display = '';

                cb();
            });
        },

        /**
         * Called when the content is ready to be loaded (e.g. when the image
         * has finished loading). Should resize the content box and make any
         * other necessary adjustments.
         *
         * @param   Function    cb          A callback that should be fired when
         *                                  this function is finished
         * @return  void
         * @public
         */
        onReady: function(cb){
            resizeContent(function(){
                showBars(cb);
            });
        },

        /**
         * Called when the content is loaded into the box and is ready to be
         * displayed.
         *
         * @param   Function    cb          A callback that should be fired when
         *                                  this function is finished
         * @return  void
         * @public
         */
        onFinish: function(cb){
            toggleLoading(false, cb);
        },

        /**
         * Called when Shadowbox is closed.
         *
         * @return  void
         * @public
         */
        onClose: function(){
            toggleVisible(false);
        },

        /**
         * Called in Shadowbox.play().
         *
         * @return  void
         * @public
         */
        onPlay: function(){
            toggleNav('play', false);
            toggleNav('pause', true);
        },

        /**
         * Called in Shadowbox.pause().
         *
         * @return  void
         * @public
         */
        onPause: function(){
            toggleNav('pause', false);
            toggleNav('play', true);
        },

        /**
         * Called when the window is resized.
         *
         * @return  void
         * @public
         */
        onWindowResize: function(){
            var c = S.content;
            if(!c) return;

            // set new dimensions
            var d = setDimensions(c.height, c.width, c.resizable);

            adjustWidth(d.width, d.left, false);
            adjustHeight(d.inner_h, d.top, false);

            var el = U.get(S.contentId());
            if(el){
                // resize resizable content when in resize mode
                if(c.resizable && S.options.handleOversize == 'resize'){
                    el.height = d.resize_h;
                    el.width = d.resize_w;
                }
            }
        }

    };

}();

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();