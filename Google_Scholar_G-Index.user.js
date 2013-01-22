// ==UserScript==
// @name           Google Scholar G-Index
// @namespace      https://github.com/gsbabil
// @description    Calculates and adds G-Index in Google Scholar Profile
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include        http://scholar.google.com.au/citations?user=*
// @updateURL      http://github.com/gsbabil/google-scholar-gindex/raw/master/Google_Scholar_G-Index.user.js
// @downloadURL    http://github.com/gsbabil/google-scholar-gindex/raw/master/Google_Scholar_G-Index.user.js
// @iconURL        http://gravatar.com/avatar/10f6c9d84191bcbe69ce41177087c4d7
// @author         gsbabil <gsbabil@gmail.com>
// @version        0.0.2
// ==/UserScript==

var config = {
  'jquery_url' : 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',
  'spinner' : 'data:image/gif;base64,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',
  'good_popup_color' : '#ADDD44',
  'bad_popup_color' : '#FF8400',
}

var total_cites = 0;
var gindex = 0;
var hindex = 0;
var spinner = null;

loadJquery();

window.setTimeout(function(){
  if (window.jQuery) {
    $(document).ready(function(){
      if ($("head").data("gindexed") != 1) {
        showPopup("Calculating G-index ...", config.good_popup_color);
        spinner = showSpinner($('body'), new Date().getTime());
        addGindex();
        $(spinner).remove();
      }
    });
  }
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
  $("head").data("gindexed", 1);
}

function spinnerCss() {
  $('div[id*="spinner_"]').css({
    'position': 'absolute',
    'top': $(window).scrollTop() + 35,
    'left': 5,
    'padding': '0.1em',
    'z-index': '10000',
  });
}

function showSpinner(element, id) {
  $('<div id=spinner_' + id + '><img style="height: 16px; width: 16px" src=' + config.spinner + '></img></div>').prependTo($(element));

  spinnerCss();
  return $('div#spinner_' + id);
}

function popupCss(color) {
  last_popup_color = color;
  var z_index = 9999;
  var last_popup = $('div.popup').last();

  if (last_popup.length > 0) {
    z_index = parseInt(last_popup.css("z-index"));
    if (isNaN(z_index)) {
      z_index = 9999;
    } else {
      z_index = z_index + 1;
    }
  }

  $('div.popup').css({
    'position': 'absolute',
    'top': $(window).scrollTop() + 35,
    'left': 5,
    'background-color': last_popup_color,
    'padding': '0.1em',
    'min-width': '10em',
    'border-color': '#000',
    'border-style': 'solid',
    'border-width': '1.5px',
    'text-align': 'center',
    'z-index': '10000',
    'opacity': '0.80',
  });
}

function showPopup(text, color){
  var id = "popup_" + new Date().getTime();
  $('<div class="popup" id=' + id + '>' + text + '</div>').prependTo('body');
  popupCss(color);

  window.setTimeout(function() {
    $("div#" + id).fadeOut('slow');
    $("div#" + id).remove();
  }, 3000);
}
