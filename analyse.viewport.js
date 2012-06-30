//var loader = function (url) {
//    var script = document.createElement('script');
//    script.src = url;
//    script.type = "text/javascript";
//    script.language = "javascript";
//    document.body.appendChild(script);
//};
//
//loader('http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js');
//loader('http://www.appelsiini.net/download/jquery.viewport.js');


String.prototype.startsWith = function(str) 
{
    return (this.match("^"+str)==str)
}



var customEvent = document.createEvent('Event');
customEvent.initEvent('myCustomEvent', true, true);
var images = "";
var urls = [];
var x = 0;
var pathname = window.location.origin;

$("img:in-viewport").each(function () {
    var src = $(this).attr("src");
    if(src !== undefined) {
        if(!src.startsWith("http")){
            src = pathname + src;
        }
        urls[x++] = src;
    }
});

$("div:in-viewport").each(function () {
    var src = $(this).backgroundImageUrl();
    if(src !== undefined) {
        if(!src.startsWith("http")){
            src = pathname + src;
        }
        urls[x++] = src;
    }
});

$("head script").each(function () {
    var src = $(this).attr("src");
    if(src !== undefined) {
        if(!src.startsWith("http")){
            src = pathname + src;
        }
        urls[x++] = src;
    }
});

$("head link").each(function () {
    var src = $(this).attr("href");
    if(src !== undefined) {
        if(!src.startsWith("http")){
            src = pathname + src;
        }
        urls[x++] = src;
    }
});





chrome.extension.sendRequest(urls);
