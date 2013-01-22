G-Index and Publication Count in Google Scholar Profile
-------------------------------------------------
![G-index and Total Publication Count Added by the Script](http://github.com/gsbabil/google-scholar-gindex/raw/master/gindex-total-count-screenshot.png)

 - This is a small piece of Java-script that calculates and adds [G-Index](http://en.wikipedia.org/wiki/G-index). on Google Scholar Profile pages
 - The script can be used as a [Greasemonkey](http://en.wikipedia.org/wiki/Greasemonkey) / [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) script
 - Or, you may just create a browser bookmark with the following Javascript URL
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

<p align="center">
  <img src="http://github.com/gsbabil/google-scholar-gindex/raw/master/bookmark-screenshot-chrome.png"/>
</p>


 - The following screenshot shows where the newly added bookmark goes. For ease of use, you should put it on your bookmark-bar.

![Added Bookmar in Firefox's Bookmark-bar](http://github.com/gsbabil/google-scholar-gindex/raw/master/bookmark-bar-screenshot-firefox.png)


Credit
------

Credit is due to [Guido Governatori](http://www.governatori.net/) for his original [Ruby script](http://www.governatori.net/gindex.rb) to calculate G-index from off-line Google scholar page.
