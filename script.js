/*
 * $Id$
 * (c) Copyright 2012 freiheit.com technologies GmbH
 *
 * Created on 24.06.2012 by Christian Hennig  {christian.hennig@freiheit.com}
 * 
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 */

var size=0;
var reqNumbers=0;
var items = 0;

var getFileSize = function(address, element) {
    var req = new XMLHttpRequest();
    req.open('head', address, true);
    req.onreadystatechange = function () {
        
        if ( this.readyState == 1 ) {
            this.abort();
        }
        if ( this.readyState == 2 ) {
            return;
        }
        reqNumbers--;
        
        var actsize = parseInt(this.getResponseHeader("Content-length"),10);
        
        if(!isNaN(actsize)) {
            items++;
            size = size + actsize;
            element.append("<div class='item'><img src='"+address+"'/> ");
            element.append("<span class='size'>"+actsize+"Byte</span> <a target='_foo' href='"+address+"'><span class='url'> "+address+"</span></a></div></br>");
        }
        if(reqNumbers===0) {
            var sizeInKByte = size / 1024 ;
            var out = sizeInKByte.toFixed(2);
            element.append("<br><hr/><br>");
            element.append("<span class='count'>"+items + "</span> Requests <span='size'>" +out+ " KByte</span");
        }
        
    };
    req.send(null);
};

function removeDuplicatedValuesFromArray(inputArray) {
    var uniqueNames= [];
    $.each(inputArray, function(i, el){
        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });
    return uniqueNames;
}

$(document).ready(function () {
    chrome.tabs.executeScript(null, {
        file: "jquery.min.js"
    }, function() {
        chrome.tabs.executeScript(null, {
            file: "jquery.viewport.js"
        },function() {
            chrome.tabs.executeScript(null, {
                file: "analyse.viewport.js"
            });
        });
    });
    
    $('.resources').html("Loading");

    var resourceElement = $('.resources');

    chrome.extension.onRequest.addListener(function(urlsWithDublicates) {
        output = "";
        var urls = removeDuplicatedValuesFromArray(urlsWithDublicates); 
        $('.resources').html("");
        $('.resources').append("<h4>Found " + urls.length+ " Resources</h4>");
        for (var i in urls ) {
            reqNumbers++;
            getFileSize(urls[i],resourceElement);
        }   
    });
    
    

});
