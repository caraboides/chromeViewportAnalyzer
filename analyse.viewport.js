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


String.prototype.startsWith = function (str) {
    return (this.match("^" + str) == str);
};

function makeAbsolutPath (str) {
    if (str.startsWith("http")) {
        return str;
    }
    if (str.startsWith("/")){
        return window.location.origin +str;
    }
    var path =  window.location.origin  + window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));
    return  path + "/" + str;
}


var images = "";
var urls = [];
var x = 0;

$("img:in-viewport").each(function () {
    var src = $(this).attr("src");
    if ((typeof src) !== "undefined" && src !== "none") {
        urls[x++] = makeAbsolutPath(src);
    }
});

$("div:in-viewport").each(function () {
    var src = $(this).backgroundImageUrl();
    if ((typeof src) !== "undefined" && src !== "none") {
        urls[x++] = makeAbsolutPath(src);
    }
});

$("head script").each(function () {
    var src = $(this).attr("src");
    if ((typeof src) !== "undefined" && src !== "none") {
        urls[x++] = makeAbsolutPath(src);
    }
});

$("head link").each(function () {
    var src = $(this).attr("href");
    if ((typeof src) !== "undefined" && src !== "none") {
        urls[x++] = makeAbsolutPath(src);
    }
});

chrome.extension.sendRequest(urls);
