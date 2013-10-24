// ==UserScript==
// @name           Google Scholar G-Index
// @namespace      https://github.com/gsbabil
// @description    Adds G-Index and publication count in Google scholar profile
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include        http*://scholar.google.com*/citations?*user=*
// @updateURL      http://github.com/gsbabil/google-scholar-gindex/raw/master/Google_Scholar_G-Index.user.js
// @downloadURL    http://github.com/gsbabil/google-scholar-gindex/raw/master/Google_Scholar_G-Index.user.js
// @iconURL        http://gravatar.com/avatar/10f6c9d84191bcbe69ce41177087c4d7
// @author         gsbabil <gsbabil@gmail.com>
// @version        0.0.7
// ==/UserScript==

var config = {
  'jquery_url' : 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',
  'spinner' : 'data:image/gif;base64,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',
  'good_popup_color' : '#ADDD44',
  'bad_popup_color' : '#FF8400',
  'debug' : true,
}

var total_cites = 0;
var total_pubs = 0;
var gindex = 0;
var hindex = 0;
var prev_href = "";
var main_timer = null
var load_next_page_timer = null;
var spinner = null;

/* Babil: once jQuery is loaded, main() will be called */
loadJquery();
main();

function main() {
  main_timer = window.setTimeout(main, 1000);

  if (!window.jQuery) {
    loadJquery();
    return;
  }

  if (window.jQuery) {

    /* Babil: when in bookmark-let, check if we are on the right page */
    if (location.hostname.search("scholar.google.com") < 0 && location.href.search("user=") < 0) {
      showPopup("Current page is <b>not</b> a <br /> Google scholar profile.", config.bad_popup_color);
      window.clearTimeout(main_timer);
      return;
    }

    /* Babil: check if the user is paranoid */
    if ($("head").data("gindexed") == 1 || $("tr.gindex").length > 0) {
      showPopup("G-Index already added.", config.bad_popup_color);
      window.clearTimeout(main_timer);
      $("head").data("gindexed", 1);
      return;
    }

    /* Babil: change publication per-page to 100 */
    if (location.href.search("pagesize=100") < 0) {
      window.location.href = location.href + "&pagesize=100";
      return;
    }

    spinner = $("div[id*='spinner_']");
    if ($(spinner).length == 0) {
      var spinner = showSpinner($('body'), new Date().getTime());
    }

    $(document).ready(function(){
      $("head").data("all_pages_loaded", 0);
      $("head").data("gindexed", 0);

      loadNextPage();

      if ($("head").data("gindexed") != 1 && $("head").data("all_pages_loaded") == 1) {
        showPopup("Calculating G-index ...", config.good_popup_color);
        addGindex();
        $("head").data("gindexed", 1);
        $("div[id*='spinner_']").remove();
        // window.clearTimeout(main_timer);
      }
    });
  }
}

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
  /*
   * Babil: credit is due to the authors of the following scripts:
   * 1. Guido Governatori, http://www.governatori.net/gindex.rb
   * 2. Rob van Glabbeek, http://www.cse.unsw.edu.au/~rvg/gindix.zip
   */

  links = $("a[href*='cites']");
  var g = 0;

  links.each(function(i, link){
    g = g + 1;

    var link_cites = parseInt($(link).text());
    total_cites = total_cites + link_cites;

    if (total_cites >= (g * g)) {
      logDebug("link_cites=" + link_cites + " g=" + g + " g * g=" + (g * g) + " total_cites=" + total_cites);
      gindex = g;
    }
  });

  logDebug("total_cites: " + total_cites);
  logDebug("g-index: " + gindex);

  html = '<tr class="gindex"><td style="text-align:left"><a href="http://en.wikipedia.org/wiki/G-index">g-index</a></td><td>' + gindex + '</td><td>N/A</td></tr>';
  $(html).appendTo($("table#stats > tbody > tr").last().parent());

  total_pubs = $("td#col-year").length;
  var garbage = $("td#col-year").filter(function(){return($(this).text().match('Year'));}).length;
  html = '<tr class="gindex"><td style="text-align:left"><a href="' + location.href + '">Total Publications</a></td><td>' + (total_pubs - garbage) + '</td><td>N/A</td></tr>';
  $(html).appendTo($("table#stats > tbody > tr").first().parent());
}

function spinnerCss() {
  $('div[id*="spinner_"]').css({
    'position': 'absolute',
    'top': $(window).scrollTop() + 35,
    'left': 5,
    'padding': '0.1em',
    'z-index': '10000',
    'height' : '16px',
    'width' : '16px',
  });
}

function showSpinner(element, id) {
  $('<div id=spinner_' + id + '><img src=' + config.spinner + '></img></div>').prependTo($(element));

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
    'min-height': '16px',
    'border-color': '#000',
    'border-style': 'solid',
    'border-width': '1.5px',
    'text-align': 'center',
    'z-index': '10000',
    'opacity': '0.75',
    'color' : 'black',
    'min-width': '15em',
    'font-size': '14px',
  });
}

function showPopup(text, color){
  var id = "popup_" + new Date().getTime();
  $('<div class="popup" id=' + id + '>' + text + '</div>').prependTo('body').first();
  popupCss(color);

  window.setTimeout(function() {
    $("div#" + id).fadeOut('slow');
    $("div#" + id).remove();
  }, 1000);
}

function logDebug(msg, ignore) {
  if(config.debug == true || ignore == true) {
    console.debug(msg);
  }
}

function loadNextPage() {
  if($("head").data("loadNextPage_inprogress") != 1) {
    $("head").data("loadNextPage_inprogress", 1);
    next = $("a[href*='cstart']").filter(function(){return($(this).text().match('Next >'));}).last();

    if(next.length > 0) {
      var href = next[next.length - 1].href;
      var cstart = href.replace(new RegExp('.*cstart=(\\d+)$', 'i'), '$1');
      var id = "loadNextPage_" + cstart;
      logDebug("loadNextPage --> href: " + href);
      logDebug("loadNextPage --> prev_href: " + prev_href);

      if (href == prev_href) {
        logDebug("Reached end of all pages!");
        // window.clearTimeout(load_next_page_timer);
        $("head").data("all_pages_loaded", 1);
        return;
      }

      if (href != prev_href) {
        prev_href = href;
        showPopup("Loading citations ... [" + cstart + "]", config.good_popup_color);
        var spinner = showSpinner();

        $("form#citationsForm").last().append("<span id='" + id + "'></span>");
        $.ajax({
          url: href,
          cache: false,
        }).done(function(html) {
            var new_content = $("form#citationsForm", $(html));
            $("span#" + id).first().replaceWith(new_content);
            $("head").data("loadNextPage_inprogress", 0);
            spinner.remove();
        });
        // load_next_page_timer = window.setTimeout(loadNextPage, 1000);
      }
    } else {
      $("head").data("all_pages_loaded", 1);
    }
  } else {
    logDebug("loadNextPage --> inprogress");
  }
}
