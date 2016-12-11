# G-Index, Publication Count and a lot more inside Google Scholar Profile

<p align="center">
  <img src="https://raw.github.com/gsbabil/google-scholar-gindex/master/screenshots/gindex-total-count-screenshot-2.png"/>
</p>

- This is a small piece of Java-script that calculates and adds
[G-Index](http://en.wikipedia.org/wiki/G-index) and total publication count on
Google scholar profile pages.

- The script can be used as
a [Greasemonkey](http://en.wikipedia.org/wiki/Greasemonkey)
/ [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
script. That way the G-index and total publication count  will be
automatically added every time a Google scholar profile page is visited.

- Or, you may just create a browser bookmark with the following Javascript URL.
Although this is the quickest way to start using the script, it'll require you
to click the bookmark button every time you'll calculate g-index.

- If you are using the bookmark method, once the Google Scholar profile is
loaded, just click the bookmark and it'll automatically calculate and add
G-Index beneath the H-Index and i10-Index on the same page.

- To create a quick bookmark in your bookmark-bar, you may just select the
whole Java-script code below, drag and drop it on your bookmark-bar.

```javascript
javascript:(function(){d=document;s=d.createElement("script"); s.src="https://raw.github.com/gsbabil/Google-Scholar-Gindex/master/Google_Scholar_G-Index.user.js?_"+new Date().getTime(); d.getElementsByTagName("head")[0].appendChild(s);})();
```

 - Here's a screen-shot showing how to add the bookmark in Google Chrome:

<p align="center">
  <img src="https://raw.github.com/gsbabil/google-scholar-gindex/master/screenshots/bookmark-screenshot-chrome.png"/>
</p>

- The following screen-shot shows where the newly added bookmark goes. For ease
of use, you should un-hide your bookmark-bar and place your bookmark there.

![Added Bookmar in Firefox's
Bookmark-bar](https://raw.github.com/gsbabil/google-scholar-gindex/master/screenshots/bookmark-bar-screenshot-firefox.png)


## Credit

Credit is due to [Guido Governatori](http://www.governatori.net/) for his [Ruby
script](http://www.governatori.net/gindex.rb) and [Rob van
Glabbeek](http://www.cse.unsw.edu.au/~rvg) for his [PERL
script](http://www.cse.unsw.edu.au/~rvg/gindix.zip) to calculate G-index from
_off-line_ Google scholar HTML page.
