// ==UserScript==
// @name           Google Scholar G-Index
// @namespace      https://github.com/gsbabil
// @description    Adds G-Index and publication count in Google scholar profile
// @require        https://code.jquery.com/jquery.js
// @include        https://scholar.google.com*/citations?*user=*
// @updateURL      https://github.com/gsbabil/google-scholar-gindex/raw/master/Google_Scholar_G-Index.user.js
// @downloadURL    https://github.com/gsbabil/google-scholar-gindex/raw/master/Google_Scholar_G-Index.user.js
// @iconURL        https://gravatar.com/avatar/10f6c9d84191bcbe69ce41177087c4d7
// @author         Babil Golam Sarwar <gsbabil@gmail.com>
// @version        0.0.9
// ==/UserScript==

/* Bookmarklet code */
/********************

javascript:(function(){d=document;s=d.createElement("script");s.src="https://github.com/gsbabil/google-scholar-gindex/raw/master/Google_Scholar_G-Index.user.js?_"+new%20Date().getTime();d.getElementsByTagName("head")[0].appendChild(s);})();

*********************/

var config =
    {
      'jquery_url' : 'https://code.jquery.com/jquery.js',
      'spinner' : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPScxNnB4JyBoZWlnaHQ9JzE2cHgnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0idWlsLXJpbmciPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MiIgc3Ryb2tlLWRhc2hhcnJheT0iMTcxLjUzMDk1ODg4NjAwMjcgOTIuMzYyODI0MDE1NTM5OTMiIHN0cm9rZT0iI2M1NTIzZiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxNiI%2BPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIHZhbHVlcz0iMCA1MCA1MDsxODAgNTAgNTA7MzYwIDUwIDUwOyIga2V5VGltZXM9IjA7MC41OzEiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMHMiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2NpcmNsZT48L3N2Zz4%3D',
      'good_popup_color' : '#ADDD44',
      'bad_popup_color' : '#FF8400',
      'show_more_selector' : 'button#gsc_bpf_more',
      'total_publications_selector' : 'tr.gsc_a_tr',
      'citation_selector' : 'a[href*="cites="]',
      'duplicate_citation_selector' : 'a[onclick*="gsc_md_show_cbyd"]',
      'google_total_citation_selector' :
          'a[title*="This is the number of citations to all publications."]',
      'citation_indices_table_selector' : 'table#gsc_rsb_st > tbody > tr',
      'debug' : true,
    }

var gindex = 0;
var hindex = 0;
var prev_href = "";
var main_timer = null;
var load_next_page_timer = null;
var spinner = null;
var pages_loaded = 1;


main();

function main() {
    // main_timer = window.setTimeout(main, 1000);

    if (!window.jQuery) {
        loadJquery();
    }

    if (window.jQuery) {
        /* Babil: when in bookmark-let, check if we are on the right page */
        if (location.hostname.indexOf("scholar.google.com") < 0 &&
            location.href.indexOf("user=") < 0) {
            showPopup(
                "Current page is <b>not</b> a <br /> Google scholar profile.",
                config.bad_popup_color);
            // window.clearTimeout(main_timer);
            return;
        }

        var sort_by = getURLParameter('sortby');
        if (sort_by === undefined) {
            sort_by = '';
        }
        debugLog("sort_by:" + sort_by);

        /* Babil: check if the user is paranoid */
        if (jQuery("head").data("gindexed") == 1 ||
            jQuery("tr.gindex").length > 0) {
            showPopup("G-Index already added.", config.bad_popup_color);
            // window.clearTimeout(main_timer);
            jQuery("head").data("gindexed", 1);
            return;
        }

        /* Babil: change publication per-page to 100 */
        if (location.href.indexOf("pagesize") < 0 ||
            location.href.indexOf("cstart") < 0) {
            var user_id = getURLParameter('user');

            // window.clearTimeout(main_timer);
            location.href = location.origin + "/citations?user=" + user_id +
                            "&cstart=0&pagesize=100&sortby=" + sort_by;
            return;
        }

        spinner = jQuery("div[id*='spinner_']");
        if (jQuery(spinner).length == 0) {
            var spinner = showSpinner(jQuery('body'), new Date().getTime());
        }

        jQuery(document).ready(function() {
            jQuery("head").data("all_pages_loaded", 0);
            jQuery("head").data("gindexed", 0);

            load_next_page_timer =
                window.setInterval(loadAllCitationPages, 1000);
            loadAllCitationPages();
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
            if (window.jQuery) {
                callback(jQuery);
            } else {
                window.setTimeout(function() { checkReady(callback); }, 100);
            }
        };
        checkReady(function(jQuery){});
    })();
}

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function addGindex() {
    /*
     * Babil: credit is due to the authors of the following scripts:
     * 1. Guido Governatori, http://www.governatori.net/gindex.rb
     * 2. Rob van Glabbeek, http://www.cse.unsw.edu.au/~rvg/gindix.zip
     */

    var citation_links = jQuery(config.citation_selector);
    var g = 0;
    var total_cites = 0;
    var duplicate_cites = 0;

    citation_links.each(function(i, link) {
        g = g + 1;

        var num_citation_in_link = parseInt(jQuery(link).text());
        total_cites = total_cites + num_citation_in_link;

        if (total_cites >= (g * g)) {
            debugLog("num_citation_in_link=" + num_citation_in_link +
                     " total_cites=" + total_cites + " g=" + g + " g*g=" +
                     (g * g));
            gindex = g;
        }
    });

    var duplicate_citation_links = jQuery(config.duplicate_citation_selector);
    duplicate_citation_links.each(function(i, link) {
        var num_duplicate_in_link = parseInt(jQuery(link).text());
        duplicate_cites = duplicate_cites + num_duplicate_in_link;
    });

    var google_total_cites =
        parseInt($(config.google_total_citation_selector).parent().next().text());
    var effective_total_cites = total_cites - duplicate_cites;

    var total_pubs = jQuery(config.total_publications_selector).length;
    var pubs_with_cites = citation_links.length;

    debugLog("total_cites: " + total_cites);
    debugLog("google_total_cites: " + google_total_cites);
    debugLog("effective_total_cites: " + effective_total_cites);
    debugLog("duplicate_cites: " + duplicate_cites);
    debugLog("g-index: " + gindex);

    html = '<tr style="font-weight:600">' +
           '<td class="gsb_rsb_std">..........</td>' +
           '<td class="gsc_rsb_std">..........</td>' +
           '<td class="gsc_rsb_std">..........</td>' + '</tr>';
    jQuery(html)
        .appendTo(jQuery(config.citation_indices_table_selector).last().parent());

    html = '<tr>' + '<td class="gsb_rsb_std"><a href=' +
           'https://en.m.wikipedia.org/wiki/G-index>g-index</a></td>' +
           '<td class="gsc_rsb_std">' + gindex + '</td>' +
           '<td class="gsc_rsb_std">n/a</td>' + '</tr>';
    jQuery(html)
        .appendTo(jQuery(config.citation_indices_table_selector).last().parent());

    html = '<tr>' + '<td class="gsb_rsb_sc1">Publications with Citations</td>' +
           '<td class="gsc_rsb_std">' + pubs_with_cites + '</td>' +
           '<td class="gsc_rsb_std">n/a</td>' + '</tr>';
    jQuery(html)
        .appendTo(jQuery(config.citation_indices_table_selector).last().parent());

    html = '<tr>' +
           '<td class="gsb_rsb_sc1">Publications without Citations</td>' +
           '<td class="gsc_rsb_std">' + (total_pubs - pubs_with_cites) +
           '</td>' + '<td class="gsc_rsb_std">n/a</td>' + '</tr>';
    jQuery(html)
        .appendTo(jQuery(config.citation_indices_table_selector).last().parent());

    html = '<tr>' + '<td class="gsb_rsb_sc1">Total Publications</td>' +
           '<td class="gsc_rsb_std">' + total_pubs + '</td>' +
           '<td class="gsc_rsb_std">n/a</td>' + '</tr>';
    jQuery(html)
        .appendTo(jQuery(config.citation_indices_table_selector).last().parent());

    html = '<tr>' + '<td class="gsb_rsb_sc1">Total Counted Citations</td>' +
           '<td class="gsc_rsb_std">' + total_cites + '</td>' +
           '<td class="gsc_rsb_std">n/a</td>' + '</tr>';
    jQuery(html)
        .appendTo(jQuery(config.citation_indices_table_selector).last().parent());

    html = '<tr>' + '<td class="gsb_rsb_sc1">Duplicate Citations</td>' +
           '<td class="gsc_rsb_std">' + duplicate_cites + '</td>' +
           '<td class="gsc_rsb_std">n/a</td>' + '</tr>';
    jQuery(html)
        .appendTo(jQuery(config.citation_indices_table_selector).last().parent());

    html = '<tr>' + '<td class="gsb_rsb_sc1">Effective Total Citations</td>' +
           '<td class="gsc_rsb_std">' + effective_total_cites + '</td>' +
           '<td class="gsc_rsb_std">n/a</td>' + '</tr>';
    jQuery(html)
        .appendTo(jQuery(config.citation_indices_table_selector).last().parent());

    if (effective_total_cites != google_total_cites) {
        html =
            '<tr>' +
            '<td class="gsb_rsb_sc1"><i style="color:red">Counted effective ' +
            'total number of citations does not match with Google provided ' +
            'total citations count above.</i></td>' +
            '<td class="gsc_rsb_std"></td>' +
            '<td class="gsc_rsb_std"><i style="color:red">You should ' +
            '<a href=https://www.google.com.au/search?q=firefox+hard+refresh>' +
            '"hard refresh"</a> this page to get the correct calculation.</i>' +
            '</td></tr>';
        jQuery(html)
            .appendTo(jQuery(config.citation_indices_table_selector).last().parent());
    }

    jQuery("head").data("gindexed", 1);
}

function spinnerCss() {
    jQuery('div[id*="spinner_"]')
        .css({
            'position' : 'absolute',
            'top' : jQuery(window).scrollTop() + 35,
            'left' : 5,
            'padding' : '0.1em',
            'z-index' : '100000',
            'height' : '16px',
            'width' : '16px',
        });
}

function showSpinner(element, id) {
    jQuery('<div id=spinner_' + id + '><img src=' + config.spinner +
           '></img></div>').prependTo(jQuery(element));

    spinnerCss();
    return jQuery('div#spinner_' + id);
}

function popupCss(color) {
    last_popup_color = color;
    var z_index = 99999;
    var last_popup = jQuery('div.popup').last();

    if (last_popup.length > 0) {
        z_index = parseInt(last_popup.css("z-index"));
        if (isNaN(z_index)) {
            z_index = 99999;
        } else {
            z_index = z_index + 1;
        }
    }

    jQuery('div.popup')
        .css({
            'position' : 'absolute',
            'top' : jQuery(window).scrollTop() + 35,
            'left' : 5,
            'background-color' : last_popup_color,
            'padding' : '0.1em',
            'min-height' : '16px',
            'border-color' : '#000',
            'border-style' : 'solid',
            'border-width' : '1.5px',
            'text-align' : 'center',
            'z-index' : '10000',
            'opacity' : '0.85',
            'color' : 'black',
            'min-width' : '14em',
            'font-size' : '14px',
            'font-weight' : '600',
        });
}

function showPopup(text, color) {
    var id = "popup_" + new Date().getTime();
    jQuery('<div class="popup" id=' + id + '>' + text + '</div>')
        .prependTo('body')
        .first();
    popupCss(color);

    window.setTimeout(function() {
        jQuery("div#" + id).fadeOut('slow');
        jQuery("div#" + id).remove();
    }, 1000);
}

function debugLog(msg, ignore) {
    if (config.debug == true || ignore == true) {
        console.debug(msg);
    }
}

/* Babil: this function is now obsolete due to changes made to the Google
 * Scholar page HTML. I'm leaving it here for reference only. */
function loadNextPage() {
    if (jQuery("head").data("loadNextPage_inprogress") != 1) {
        jQuery("head").data("loadNextPage_inprogress", 1);
        next = jQuery("a[href*='cstart']")
                   .filter(function() {
                       return (jQuery(this).text().match('Next >'));
                   })
                   .last();

        if (next.length > 0) {
            var href = next[next.length - 1].href;
            var cstart =
                href.replace(new RegExp('.*cstart=(\\d+)$', 'i'), '$1');
            var cstart = start_from;
            var id = "loadNextPage_" + cstart;
            debugLog("loadNextPage --> href: " + href);
            debugLog("loadNextPage --> prev_href: " + prev_href);

            if (href == prev_href) {
                debugLog("Reached end of all pages!");
                // window.clearTimeout(load_next_page_timer);
                jQuery("head").data("all_pages_loaded", 1);
                return;
            }

            if (href != prev_href) {
                prev_href = href;
                showPopup("Loading citations ... [" + cstart + "]",
                          config.good_popup_color);
                var spinner = showSpinner();

                jQuery("form#citationsForm")
                    .last()
                    .append("<span id='" + id + "'></span>");
                jQuery.ajax({
                    url : href,
                    cache : false,
                })
                    .done(function(html) {
                        var new_content =
                            jQuery("form#citationsForm", jQuery(html));
                        jQuery("span#" + id).first().replaceWith(new_content);
                        jQuery("head").data("loadNextPage_inprogress", 0);
                        spinner.remove();
                    });
                // load_next_page_timer = window.setTimeout(loadNextPage, 1000);
            }
        } else {
            jQuery("head").data("all_pages_loaded", 1);
        }
    } else {
        debugLog("loadNextPage --> inprogress");
    }
}

function loadAllCitationPages() {
    if (jQuery("head").data("all_pages_loaded") == 1) {
        // window.clearTimeout(main_timer);
        window.clearInterval(load_next_page_timer);
        return;
    }

    var show_more = jQuery(config.show_more_selector)[0];
    if (show_more.disabled == false) {
        show_more.click();
        pages_loaded = pages_loaded + 1;
        showPopup("Loading citation page: " + pages_loaded,
                  config.good_popup_color);
        debugLog('pages_loaded: ' + pages_loaded);
    } else {
        jQuery("head").data("all_pages_loaded", 1);
        window.clearInterval(load_next_page_timer);
        debugLog('all pages loaded');

        if (jQuery("head").data("gindexed") != 1) {
            // window.clearTimeout(main_timer);
            showPopup("Calculating G-index ...", config.good_popup_color);
            addGindex();
            jQuery("div[id*='spinner_']").remove();
        }
    }
}
