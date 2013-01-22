// ==UserScript==
// @name           Google Scholar G-Index
// @namespace      https://github.com/gsbabil
// @description    Calculates and adds G-Index in Google Scholar Profile
// @require        http://code.jquery.com/jquery-1.9.0.min.js
// @include        http://scholar.google.com.au/citations?user=*
// @updateURL      http://nicta.info/statusnet-bigscreen-js
// @downloadURL    http://nicta.info/statusnet-bigscreen-js
// @iconURL        http://gravatar.com/avatar/10f6c9d84191bcbe69ce41177087c4d7
// @author         gsbabil <gsbabil@gmail.com>
// @version        0.0.1
// ==/UserScript==

var config = {
  'jquery_url' : 'http://code.jquery.com/jquery-1.9.0.min.js',
}

var total_cites = 0;
var gindex = 0;
var hindex = 0;

loadJquery();
$(document).ready(function(){
  addGindex();
});

function loadJquery() {
  (function() {
    var script = document.createElement("SCRIPT");
    script.src = config.jquery_url;
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

    var checkReady = function(callback) {
        if(window.jQuery) {
          callback(jQuery);
        } else {
          window.setTimeout(function() {
            checkReady(callback);
          }, 100);
        }
      };
    checkReady(function($) {});
  })();
}

function addGindex() {
  links = $("a[href*='cites']");
  links.each(function(i, link){
      gindex = gindex + 1;

      var link_cites = parseInt($(link).text());
      total_cites = total_cites + link_cites;

      if (hindex == 0 && link_cites < gindex) {
          hindex = gindex - 1;
      }

      if (total_cites < (gindex * gindex)) {
          console.debug("your g-index: " + (gindex - 1));
          console.debug("your h-index: " + (hindex - 0));
          return false;
      }
  });

  html = '<tr><td style="text-align:left"><a href="http://en.wikipedia.org/wiki/G-index">g-index</a></td><td>' + (gindex-1) + '</td><td>N/A</td></tr>';
  $(html).appendTo($("table#stats > tbody > tr").last().parent());
}