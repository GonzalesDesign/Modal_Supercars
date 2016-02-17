/**
 * Created by Odee on 1/11/16.
 */
var acura = acura || {};
acura.rdx = function () {
  var a = {};
  return a.imageWall = function () {
    acura.imagewall.init ($ (".section.imagewall"), {
      modalSelector      : ".full-modal",
      ctaSelector        : ".cover-btn",
      closeButtonSelector: ".close-btn",
      selectStateSelector: ".modal-list-button",
      enableEscToClose   : !0
    })
  }, a.slideGallery = function () {
    acura.slidegallery.init ({
      galleryItemSelector      : "[slide-gallery]",
      wrapperSelector          : "[gallery-wrapper]",
      imageSelector            : "img",
      thumbContainerClass      : "thumbnails",
      thumbActiveClass         : "active",
      autoAttribute            : "slide-gallery-auto",
      fullScreenSelector       : "[gallery-full-container]",
      fullScreenActionAttribute: "gallery-full-action",
      speed                    : 2e3
    })
  }, a.drawingBoard = function () {acura.drawingboard.init ($ (".board-items-container"), {boardItemSelector: ".board-item"})}, a.slideComparison = function () {
    acura.slidecomparison.init ({
      widgetSelector: "[slide-compare]",
      widgetImageSelector: "[slide-compare-image={0}]",
      inputSelector: "[slide-compare-input]"
    })
  }, a.threeSixtyInitialized = !1, a.threeSixty = function () {
    if (!a.threeSixtyInitialized) {
      a.threeSixtyInitialized = !0;
      var b = $ ("[exterior-threesixty]"), c = $ ("[interior-threesixty]"), d = $ ("[threesixty-toggle]");
      if (b.length) {
        var e = b.find ("[exterior-configuration]"), f = b.find ("[exterior-color-selector]"), g = acura.exterior360.loadConfiguration (b, e, f);
        setTimeout (function () {
          acura.exterior360.init (b, {
            reelSelector          : "[exterior-image-reel]",
            colorSelectionSelector: "[exterior-color-selector]",
            configuration         : g
          })
        }, 1500)
      }
      if (c.length) {
        var h = acura.interior360.init (c);
        h || d.remove ()
      }
      d.on ("click", function () {b.add (c).toggleClass ("visible")})
    }
  }, a.icons = function (a) {setTimeout (function () {acura.icons.init ()}, a)}, a.images = function (a) {
    acura.lazyimage.init ({
      lazySelector: "[lazy]",
      sourceAttribute: "lazy-src",
      emptyUrl: "/images/spacer.gif"
    }), setTimeout (function () {acura.lazyimage.loadAll ()}, a)
  }, a.init = function () {a.icons (0), a.images (500), setTimeout (function () {a.imageWall (), a.slideGallery (), a.drawingBoard (), a.slideComparison ()}, 1500)}, a.loopPlayback = !1, a
} (), $ (function () {
  acura.rdx.init ();
  var a;
  $ (acura.modelLandingSlidingPage).on ("PageSlideChanged", function (b, c, d, e, f, g) {
    clearTimeout (a), $.fn.fullpage.setAllowScrolling (!1), a = setTimeout (function () {$.fn.fullpage.setAllowScrolling (!0)}, 800), acura.rdx.loopPlayback || (acura.perspectivevideo.forceLoadVideoLoops (), acura.perspectivevideo.resumeVideoLoops (), acura.rdx.loopPlayback = !0), acura.perspectivevideo.closeVideoPanels (), $ (".full-modal.shown").removeClass ("shown");
    var h = g.attr ("page-section");
    if ("dealer" == h ? $ ("#fp-nav, #footer").addClass ("show-the-footer") : $ ("#fp-nav, #footer").removeClass ("show-the-footer"), "slide-gallery" == h && acura.slidegallery.preloadImages (), "PERSPECTIVE" == h && (acura.rdx.loopPlayback || (acura.perspectivevideo.forceLoadVideoLoops (), acura.perspectivevideo.resumeVideoLoops (), acura.rdx.loopPlayback = !0)), "drawing-board" == h) {
      var i = g.find (".fp-scrollable"), j = g.find (".slimScrollBar");
      i.scrollTop (0), j.css ({top: 0})
    }
    "three-sixty" == h && acura.rdx.threeSixty ()
  }), $ ("#footer").appendTo ("body"), ("ontouchstart"in window || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints) && $ ("html").addClass ("touch"), !document.addEventListener, Modernizr.touch && $.getScript ("/js/ext/fastclick.min.js").done (function (a, b) {
    var c = Origami.fastclick;
    c (document.body)
  });
  var b = $ ("#hidden-compare-text");
  b.css ("left");
  $ ("#comparisionInput").on ({
    slide: function (a, c) {
      var d = parseInt (b.css ("left").replace ("px", "")), e = d;
      if (0 != d) {
        var f = 70, g = 90, h = 150;
        if (c > g && (c = g), c >= f) {
          var i = (c - f) / (g - f);
          e = h * i - h
        }
        e > d && b.css ("left", Math.round (e) + "px")
      }
    }
  })
});
