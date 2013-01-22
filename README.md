Goolge Scholar G-Index
======================

 - Calculates and adds [G-Index](http://en.wikipedia.org/wiki/G-index). in Google Scholar Profile
 - The script can be used as a [Greasemonkey](http://en.wikipedia.org/wiki/Greasemonkey) / [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) script
 - Or, you may just create a browser bookmark with the following Javascript URL.
 - Once the Google Scholar profile is loaded, just click the bookmark and it'll automatically calculate and add G-Index beneath the H-Index and i10-Index on the same page.

```javascript
javascript:(function(){
 d=document;
 s=d.createElement("script");
 s.src="https://raw.github.com/gsbabil/Google-Scholar-Gindex/master/Google_Scholar_G-Index.user.js";
 d.getElementsByTagName("head")[0].appendChild(s);
})();
```

 - Here's a screenshot showing how to add the bookmark in Google Chrome:

![Creating Bookmark in Chrome](http://github.com/gsbabil/google-scholar-gindex/raw/master/bookmark-screenshot-chrome.png)


Credit
------

Credit is due to [Guido Governatori](http://www.governatori.net/) for his original [Ruby script](http://www.governatori.net/gindex.rb).
