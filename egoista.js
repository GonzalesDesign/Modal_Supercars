/**
 * Created by Odee on 12/9/15.
 */

(function () { //IIFE:Immediately-Invoked Function Expression
  'use strict';
  /**-----| Miscellaneous Variables |-----**/
  var aThumbs                   = [];
  var imagesCount               = 30;
  var aThumbnails               = [];
  var aDivs                     = [];
  var aCarouselDescriptionBoxId = [];

  var aThumbTitleText = [
    "Super Car Zero",
    "Super Car Uno",
    "Super Car Dos",
    "Super Car Tres",
    "Super Car Quatro",
    "Super Car Zinco",
    "Super Car 6",
    "Super Car 7",
    "Super Car Otso",
    "Super Car IX",
    "Super Car X",
    "Super Car Onze",
    "Super Car XII",
    "Super Car XIII",
    "Super Car XQuatro",
    "Super Car XV",
    "Super Car 16",
    "Super Car Seventeen",
    "Super Car XVIII",
    "Super Car Nineteen",
    "Super Car XX"
  ];
  var aThumbText      = [
    "Super Car Zero Descriptions.",
    "Super Car Uno  Descriptions.",
    "Super Car Dos  Descriptions.",
    "Super Car Tres  Descriptions.",
    "Super Car Quatro  Descriptions.",
    "Super Car Zinco  Descriptions.",
    "Super Car 6  Descriptions.",
    "Super Car 7  Descriptions.",
    "Super Car Otso  Descriptions.",
    "Super Car IX  Descriptions.",
    "Super Car X  Descriptions.",
    "Super Car Onze  Descriptions.",
    "Super Car XII  Descriptions.",
    "Super Car XIII  Descriptions.",
    "Super Car XQuatro  Descriptions.",
    "Super Car XV  Descriptions.",
    "Super Car 16  Descriptions.",
    "Super Car Seventeen  Descriptions.",
    "Super Car XVIII  Descriptions.",
    "Super Car Nineteen  Descriptions.",
    "Super Car XX  Descriptions."
  ];
  var myThumb;
  var xDist           = 200;
  var yDist           = 200;

  var divX;
  //var divClassX;
  var infoBox;
  var infoBoxClass;
  var divXHeight;
  //var rollOverHeight     = 3;
  //var rollOutHeight      = 1;
  var rollOverPrcnt = "200%"//Grid layout: rollOver percentage
  var rollOutPrcnt = "100%"//Grid layout: rollOut percentage
  var textInfoBox;

  /**-----| Animation Variables |-----**/
  /*  Variables used for animation using GSAP TweenMax engine
   * */
  var tMx       = TweenMax;
  var easeSine  = Sine.easeOut;
  var easePower = Power3.easeOut;
  var elastic   = Elastic.easeOut;
  var layer     = 10;
  var animTym   = .5;

  /**-----| Variables for different screen devices |-----**/
  var cellWidth   = 540;
  var tabletWidth = 720;
  var laptopWidth = 1024;

  /**-----| Screen to image ratio: Static Calculation |-----**/
  var cellWidthMin  = 540;
  var cellHeightMin = 810;//960;
  var origImgWidth        = 500;
  var origImgHeight       = 750;
  var scrnToImgMultiplier = cellHeightMin / origImgHeight;

  /** Samsung Avant Cellphone Resolutions: 540px x 960px**/
  //console.log ("Samsung Avant Cellphone Resolutions: 540px x 960px");

  /** Images original size: 500pxW x 750pxH @ 72dpi **/
      //500 x 1.08 = 540 || 540/500 = 1.08
      //750 x 1.08 = 810
      //960/750=1.28

  var wIw = window.innerWidth; //Browser window inner width
  console.log ("wIw: ", wIw);
  var wIh = window.innerHeight; //Browser window inner height
  //console.log ("wIh: ", wIh);
  //var indxNum;

  /**-----| CSS Class Variables |-----**/


  var thumbWidth = $ (".thumbClass").width ();
  console.log ("thumbWidth1: ", thumbWidth);
  var divXHeight;
  var divXWidth;
  var imageYoffset;// = divXHeight/2;

  var divXWidthPrcent = thumbWidth / 100;
  console.log ("divXWidthPrcent2: ", divXWidthPrcent);
  var imageXoffset    = (wIw * (thumbWidth / 100)) / 2;//100;
  console.log ("imageXoffset3: ", imageXoffset);

  //var carouselTitleBoxClass;// = $ (".carouselTitleBoxClass");
  //var carouselDescriptionBox;// = $ (".carouselDescriptionBoxClass");

  var itemVerticalCenter;
  var containerFluidWidth = $ (".container-fluid");
  //var carouselDescriptionBoxTop;
  //var carouselInnerHeight = $ ('.carousel-inner').height ();

  /**---------===( MODAL CAROUSEL VARIABLES )===---------**/
  var aImages        = [];
  var imgClass       = $ (".imgClass");
  var imgClassHeight = $ (".imgClass").height ();

  var imagesContainer = document.getElementById ("imagesContainer");
  //var imagesContainer = $ ('#imagesContainer');
  var modal         = $ ('.modal');
  var modalDialog   = $ ('.modal-dialog');
  var modalContent  = $ ('.modal-content');
  var close         = $ ('.close');
  var modalBody     = $ ('.modal-body');
  var carousel      = $ ('.carousel');
  var carouselInner = $ (".carousel-inner");
  var item          = $ (".item");
  var itemHeight    = $ (".item").height ();
  var itemActive;

  var carouselTitleBox        = $ (".carouselTitleBoxClass");
  var carouselDescriptionBox  = $ (".carouselDescriptionBoxClass");
  var carouslInnerHeight;
  var aCarouselDescriptionBox = [];
  var glyphChevronLeft; //        = $ ('.glyphicon-chevron-left');
  var glyphChevronRight; //       = $ ('.glyphicon-chevron-right');
  /*var modalHeader = $ ('.modal-header');
   console.log("modalHeader: ", modalHeader);*/
  var intervalTimer = false;//6000;

  /**------------------------------=====| AnimClass Class |=====------------------------------**/
  /*  AnimClass is a Constructor Function or a Class used as a template for the
   *   'mouseover' and 'mouseout' event listeners.
   *   Animates the image width and height when the mouse rolls over/out of it.
   *   It uses the TweenMax engine for the animation
   **************************************************************************************************/
  var AnimClass = function (vXpos, vYpos, vWidth, vHeight, vOpaque, elem2, e2Opacity, eYpos, vImahe) {
    this.Xpos   = vXpos;
    this.Width  = vWidth;
    this.Height = vHeight;
    //this.Opaque = vOpaque;
    this.Elem2         = elem2;
    this.Elem2Sopacity = e2Opacity;
    this.Imahe         = vImahe;
    /**-----| method as member |-----**/
    this.anim          = function () {
      //console.log("AnimClass this: ", this)
      function opaqueAnim () {
        return vOpaque;
      };
      tMx.to (this, animTym, {
        css: {x: vXpos, y: vYpos, width: vWidth, height: vHeight, opacity: opaqueAnim ()}, ease: easeSine
      });
      //console.log ("AnimClass: vXpos: ", vXpos)
      /**-----| Animates the InfoBox with Text |-----**/
      tMx.to (elem2, animTym, {css: {y: eYpos, opacity: e2Opacity}, ease: easePower});
    };
  };

  /**----------=====| fAnimHorGridDistribute Function |=====----------**/
  /*  Animates the display of images across the page based
   *   on the if statements in fScreenQueries function.
   *   elem: divs, vStyleWidth: , vStyleHeight:
   *********************************************************************/
  function fAnimHorGridDistribute (elem, vStyleWidth, vStyleHeight) {
    tMx.to (elem, animTym, {css: {width: vStyleWidth, height: vStyleHeight}, ease: easePower});
  }

  /**----------=====| fRollEvents Function |=====----------**/
  /*  Holds all the necessary parameters to passed into the new AnimClass for
   *   the 'mouseover' and 'mouseout' event listeners animation.
   *******************************************************************/
  function fRollEvents (elem, sXPos, sYPos, sWt, sHt, sOpq, eXPos, eYPos, eWt, eHt, eOpq, elem2, sOpacity,
                        eOpacity, e2sYpos, e2eYpos, vImahe) {
    var animOver = new AnimClass (sXPos, sYPos, sWt, sHt, sOpq, elem2, sOpacity, e2sYpos);
    var animOut  = new AnimClass (eXPos, eYPos, eWt, eHt, eOpq, elem2, eOpacity, e2eYpos);
    elem.addEventListener ('mouseover', animOver.anim);
    elem.addEventListener ('mouseout', animOut.anim);

  }

  /**----------=====| fAnimateTopPosition Function |=====----------**/
  /** Animates element's top position
   ******************************************************************/
  function fAnimateTopPosition (elem, eYpos) {
    //console.log("fAnimateTopPosition: elem ",elem);
    tMx.to (elem, animTym, {css: {top: eYpos}, ease: easePower});
  }

  function fAnimateLeftPosition (elem, eXpos) {
    //console.log("fAnimateTopPosition: elem ",elem);
    tMx.to (elem, animTym, {css: {left: eXpos}, ease: easePower});
  }

  /**-----------=====| fAnimateHeight Function |=====-----------**/
  /** Animates element's height
   ****************************************************************/
  function fAnimateHeight (elem, eHeight) {
    tMx.to (elem, animTym, {css: {height: eHeight}, ease: easePower});
  }

  function fAnimateHeightAutoWidth (elem, eHeight, eWidth) {
    tMx.to (elem, animTym, {css: {position:"absolute", height: eHeight, width:eWidth}, ease: easePower});
  }
  function fAnimateScale (elem, eScale) {
    tMx.to (elem, animTym, {css: {position:"absolute", scale:eScale}, ease: easePower});
  }



  /**----------=====| fAnimateFontSize Function |=====----------**/
  /** Animates font size based on the screen window size
   ***************************************************************/
  function fAnimateFontSize (elem, eFontSize) {
    tMx.to (elem, animTym, {css: {fontSize: eFontSize}, ease: easePower});
  }

  function changeElement (id) {
    var el                   = document.getElementById (id);
    el.style.color           = "red";
    el.style.fontSize        = "15px";
    el.style.backgroundColor = "#FFFFFF";
  }

  function fChangeElemHeight (id, eHt) {
    var el                   = document.getElementById (id);
    el.style.top             = eHt;
    el.style.opacity         = "50%";
    el.style.backgroundColor = "#FFFFFF";
  }

  function fAnimateOpacity (elem, eOpacity) {
    tMx.to (elem, animTym, {css: {opacity: eOpacity}, ease: easePower});
  }

  /*************=====| fBuildThumbnails Function |=====**************/
  /*  Builds and populate the initial grid layout
   ******************************************************************/
  function fBuildThumbnails () {
    for (var i = 0; i < imagesCount; i++) {
      //console.log("i: ",i);
      /**-----| Populates the grid layout with images from images folder |-----**/
      myThumb                 = new Image ();
      myThumb.src             = "images/Egoista/egoista_" + i + ".jpg";
      aThumbs[aThumbs.length] = myThumb; //push
      //console.log("Pushed aThumbs[i]: ", aThumbs[i]);

      /**-----| Create a new div elements with id |-----**/
      divX = document.createElement ('div');
      imagesContainer.appendChild (divX); //append divX into imageContainer
      //aDivs[aDivs.length] = divX; //push
      divX.className = "divClass";
      divX.id        = "itemId" + i;
      //console.log("divX.id : ",divX.id );
      /**-----| Initial CSS value assignment |-----**/
      divX.style.backgroundImage    = myThumb.src;
      divX.style.backgroundPosition = "center";

      //divX.appendChild (myThumb);
      $ (myThumb).appendTo (divX);

      aDivs[aDivs.length] = divX; //push

      myThumb.className                = "thumbClass";
      myThumb.style.position           = "relative";
      myThumb.style.backgroundPosition = "center";
      //myThumb.style.top = "-40px";
      //myThumb.style.padding      = "10px";
      //myThumb.style.margin = "0px";
      //myThumb.style.border       = "1px solid cyan";
      //myThumb.style.width = rollOutPrcnt;//"100%";
      myThumb.style.height = rollOutPrcnt;//"100%";
      //console.log ("myThumb.style.height: ", myThumb.style.height);
      myThumb.style.cursor = "pointer", "hand";
      /**-----| Create a new span to hold the title and description |-----**/
      infoBox                     = document.createElement ('span');
      //infoBox.style.border       = "1px solid cyan";
      divX.appendChild (infoBox);
      infoBox.id                  = "infoBoxId" + i;
      infoBox.className           = "infoBoxClass";
      infoBox.textContent         = aThumbTitleText[i];
      textInfoBox                 = document.getElementsByClassName ("infoBoxClass");
      var textInfoBoxId           = document.getElementById ("infoBoxId" + i);
      /**-----| Create a new div to hold the description text |-----**/
      var infoDescription         = document.createElement ('div');
      //infoDescription.style.border       = "1px solid orange";
      infoBox.appendChild (infoDescription);
      infoDescription.id          = "infoDescId" + i;
      infoDescription.className   = "infoDescriptionClass";
      infoDescription.textContent = aThumbText[i];

      //fInitialResizeGridLayoutWindow();
      //fResizeGridLayoutWindow ();

      //imageXoffset = (wIw * divXWidthPrcent) / 2;
      //console.log ("fBuildThumbnails: imageXoffset: ", imageXoffset);

      /**----------=======( Invoke fScreenQueries )++=====----------**/
      /** fScreenQueries should be invoked first before fRollEvents
       ** to activate some variables that's needed for the fRollEvents
       ***************************************************************/
      fScreenQueries ();
      /**-----| fRollEvents Function invoked per image |-----**/
      fRollEvents (
        myThumb, //element: image
        /** Find the center of the image and the div and use that to start the X Y position for enlargement **/
        -imageXoffset, //Enlargement starting X position
        -imageYoffset, //imageYoffset, //Enlargement starting Y position
        "auto", //Width: rollOver percentage
        rollOverPrcnt, //Image rollOver height
        .85, //Image target opacity on rollOver
        0, //End X position
        0, //End Y position
        "auto", //Width: rollOut percentage
        rollOutPrcnt, //Image rollOut height
        1, //Image rollOut opacity
        textInfoBoxId, //element2: info box
        .75, //e2 Starting opacity
        .25, //e2 End opacity
        -100, //e2 Starting Y position
        100 //e2 End Y position
      );

      //fScreenQueries ();

      /**-----| fBuildModalCarousel Function invoked with click event listener |-----**/
      /**  Call and build the Modal Carousel **/
      myThumb.addEventListener ('click', fBuildModalCarousel);
    }

    //fScreenQueries ();

    /**-----| fResizeGridLayoutWindow Function invoked |-----**/
    //fResizeGridLayoutWindow ();
  }

  /** End fBuildThumbnails ***********************************************************/

  /***************=====| fResizeGridLayoutWindow Function |=====*****************/
  function fResizeGridLayoutWindow () {
    wIw = window.innerWidth;
    wIh = window.innerHeight; //Browser window inner height
    //var imagesWidth = wIw / divXWidth; //Browser window width divided by how many images across
    //divXWidthPrcent = divXWidth / 100;
    //console.log ("wIw: ", wIw);
    //console.log ("wIw *divXWidthPrcent: ", wIw *divXWidthPrcent, divXWidthPrcent);
    thumbWidth = $ (".thumbClass").width ();
    //console.log ("fResizeGridLayoutWindow thumbWidth: ", thumbWidth);
    var thumbClass = $ (".thumbClass");
    //console.log (thumbClass, thumbClass.clientWidth);
    /** Get window width/divXWidth% : 930px/50% =  **/
        //console.log ("divXWidth: ", divXWidth, " :: ", "imagesWidth: ", imagesWidth, " :: ", "imageEnlargement: ", imageEnlargement);
        //console.log ("rollOverHeight: ", rollOverHeight);
        //imageXoffset                 = -(imageEnlargement - imagesWidth) / 2;
        //imageXoffset = (wIw * divXWidthPrcent) / 2;
        //console.log ("fResizeGridLayoutWindow: imageXoffset: ", imageXoffset);
    var imageVerticalEnlargement = divXHeight * 1.5; //Static value, change to dynamic
    imageYoffset           = -(imageVerticalEnlargement - divXHeight) / 2;
    carouselDescriptionBox = $ (".carouselDescriptionBoxClass");

    /**-----| Invoke fScreenQueries |-----**/
    fScreenQueries ();

  };
  /***************=====| End fResizeGridLayoutWindow |=====*****************/

  /***************=====| fScreenQueries Function |=====*****************/
  /** Get the present screen size and adjust elems accordingly
   **
   ********************************************************/
  function fScreenQueries () {
    //console.log ("fScreenQueries:-------------");
    var thumbNails;// = $(".thumbClass");
    if (wIw <= cellWidth) {
      //imagesCount = 14;
      //myThumb.style.width = "100%"; //image inside div
      //myThumb.style.backgroundPosition = "800px";//"center";
      //console.log("cellWidth myThumb: ",myThumb);
      //divX.style.backgroundPosition = "200px";// 100px";
      //divX.style.backgroundPosition = "center";

      divXHeight = 400; //div height
      divXWidth = "100%"; //div width
      imageXoffset = (wIw * 1) / 2; //Enlargement, Reduction starting X position
      imageYoffset = divXHeight / 2; //Enlargement, Reduction starting Y position
      //console.log ("fScreenQueries imageXoffset: ", imageXoffset);
      for (var i = 0; i < aDivs.length; i++) {
        fAnimHorGridDistribute (aDivs[i], divXWidth, divXHeight + "px");
      }
    } else if (wIw > cellWidth && wIw <= tabletWidth) {
      //imagesCount = 14;
      divXHeight = 350;
      divXWidth  = "50%";
      //var result = parseFloat(divXWidth) / 100.0;
      //console.log("result: ",result);
      imageXoffset = (wIw * .5) / 2;
      imageYoffset = divXHeight / 2;
      //console.log("imageXoffset: ",imageXoffset);
      for (var i = 0; i < aDivs.length; i++) {
        fAnimHorGridDistribute (aDivs[i], divXWidth, divXHeight + "px");
      }
    } else if (wIw > tabletWidth && wIw <= laptopWidth) {
      //console.log ("Width: >Tablet && <Laptop-------------: ");
      //imagesCount = 14;
      divXHeight   = 350;
      divXWidth    = "33.333%";
      imageXoffset = (wIw * .33) / 2;
      imageYoffset = divXHeight / 2;

      //fRepositionThumbnails (aThumbs[0], -90, 0); //Only works with the first one
      //fRepositionThumbnails(aThumbs[2], -90, 0);
      //fRepositionThumbnails (aThumbs[0], -90, 0);
      //fRepositionThumbnails (aThumbs[2], -40, 0);
      //fRepositionThumbnails (aThumbs[3], -40, 0);

      for (var i = 0; i < aDivs.length; i++) {
        //thumbNails = aDivs[i].child;
        //aThumbs[i].style.backgroundPosition = "50% 20%";
        /*aThumbs[i].style.width = "600px";
         aThumbs[i].style.height = "auto";*/
        aThumbs[i].style.left = "-50px";
        aThumbs[i].style.top  = "0px";
        aDivs[i].style.border = "1px solid cyan";
        //console.log ("aThumbs[i]: ", aThumbs[i]);
        fAnimHorGridDistribute (aDivs[i], divXWidth, divXHeight + "px");
      }
    } else {
      //imagesCount = 14;
      divXHeight = 300;
      divXWidth  = "25%";//14.28;
      imageXoffset = (wIw * .25) / 2;
      imageYoffset = divXHeight / 2;
      for (var i = 0; i < aDivs.length; i++) {
        fAnimHorGridDistribute (aDivs[i], divXWidth, divXHeight + "px");
      }
    }
  }

  /**---------===( fRepositionThumbnails )===---------**/
  /** Function to individually set the thumbnail's
   * top and left positions within the divClass div.
   *****************************************************/
  function fRepositionThumbnails (elem, xPos, yPos) {
    elem.style.left = xPos + "px";
    elem.style.top  = yPos + "px";
  }

  /***************=====| End fScreenQueries |=====*****************/

  /**-----| Invoked fScreenQueries |-----**/
  //fScreenQueries ();

  /**-----| Invoke fResizeGridLayoutWindow() Function |-----**/
  /* On window resize invoke fResizeGridLayoutWindow function
   *  Function gets the size of the browser window
   *  Check the function's if statements for window size and invoke fAnimHorGridDistribute(...) function
   **************************************************************************/
  window.addEventListener ('resize', fResizeGridLayoutWindow);

  /*********************************************************************************************************/
  /*************************** MODAL CAROUSEL SECTION ******************************************************/
  /*********************************************************************************************************/

  /**-----| Modal Carousel Variables |-----**/


  function fModalHidden () {
    $ ('#myModal').on ('hide.bs.modal', function () {
      console.log ("fModalHidden");
      intervalTimer = false;
      //fResizeGridLayoutWindow();
      //window.addEventListener("resize", fResizeGridLayoutWindow);
      //window.addEventListener ('resize', fResizeModalCarouselWindow);
      /*if(yourConditionNotToCloseMet){
       e.preventDefault();
       }*/
    });
  }

  function fModalShown () {
    $ ('#myModal').on ('shown.bs.modal', function () {
      console.log ("fModalShown");
      intervalTimer = false;
      //window.removeEventListener("resize", fResizeGridLayoutWindow);
      /*$( window ).unload(function() {
       fResizeGridLayoutWindow ();
       console.log("unload fResizeGridLayoutWindow")
       });*/
    });
  }

  //fModalHidden ();
  //fModalShown ();

  /***************=====| fBuildModalCarousel Function |=====*****************/
  /*  This function gets called from the grid layout when an image is clicked
   *  It first clear the content inside the div with a class of carousel-inner
   *  Populates the Bootstrap's Carousel inside the html page
   **************************************************************************/
  var indxNum;

  function fBuildModalCarousel () {
    console.log ("|-----------------| fBuildModalCarousel |-----------------|");
    /**-----| Clears the content within the div class="carousel-inner"... |-----**/
    $ ('.carousel-inner').empty ();
    /**-----| Assign a variable name for the index number |-----**/
    console.log ("$ (this).parents: ", $ (this).parents ('div'));
    var idx = $ (this).parents ('div').index (); //gets the index number of the clicked image
    indxNum = parseInt (idx); //the returned index number gets parsed as integer.
    console.log ("fBuildModalCarousel idx: ", idx);
    console.log ("fBuildModalCarousel indxNum: ", indxNum);
    //x var modalTitleDiv = document.getElementsByClassName("modal-title");

    /*var modalHeaderTest = $ (this).parents ('div');
     console.log("modalHeaderTest: ",modalHeaderTest);*/

    //modalBody = $ ('.modal-body');
    wIh = window.innerHeight;
    /**-----| modalBody: Modal/Carousel dark grey background covering the whole screen |-----**/
    fAnimateHeight (modalBody, wIh);

    //var idx = $ (this).parents ('div').index (); //gets the index number of the clicked image
    //var indxNum = parseInt (idx); //the returned index number gets parsed as integer.
    //console.log("fBuildModalCarousel indxNum: ", indxNum);

    /**-----| Populates the Carousel with images but only shows whatever has a class of "active" |-----**/
    for (var i = 0; i < imagesCount; i++) {
      /**-----| Populate carousel container |-----**/
      var myImage             = new Image ();
      myImage.src             = "images/Egoista/egoista_" + i + ".jpg";
      aImages[aImages.length] = myImage; //push
      myImage.id        = "imgId" + i;
      myImage.className = "imgClass";

      /*var myImgWidth = myImage.width;
      console.log("myImgWidth: ", myImgWidth);*/
      /*myImage.addEventListener('onload', function() {
        console.log('My width is: ', this.naturalWidth);
        console.log('My height is: ', this.naturalHeight);
      });*/

      //myImage.style.position = "relative"; //absolute relative
      //myImage.style.padding  = "0px";
      //myImage.style.margin   = "0px";
      //myImage.style.overflow   = "hidden";
      //myImage.style.border       = "1px solid cyan";
      /*myImage.style.width  = "100%";
       myImage.style.height  = "100%";*/

      //myImage.style.minWidth = "100px";//cellWidthMin + "px"; //540
      //myImage.style.minHeight = "1000px";//"1200px";//cellHeightMin + "px"; //810
      //myImage.style.backgroundSize     = "cover";
      myImage.style.backgroundPosition = "center";

      //alert(this.width + 'x' + this.height);

      /*myImage.onload = function() {
       alert(this.width + 'x' + this.height);
       }*/

      /**-----| Create a new div elements to hold each images with class name and id |-----**/
      var itemDiv = document.createElement ('div');
      itemDiv.id  = "itemId" + i; //Assign a unique ID for each div
      itemDiv.className = "item"; //Assign a Class name for each div
      itemDiv.title       = aThumbTitleText[i];
      itemDiv.description = aThumbText[i];

      /** The combination of these 4 options with 100% values keeps the image and the div at 100% all the time**/
      //myImage.style.width  = "100%"; //100%  100vw
      //myImage.style.height = "100vh"; //auto
      //itemDiv.style.minWidth  = "1000px";
      //itemDiv.style.minHeight  = wIh+"px";
      //itemDiv.style.width  = "100%";
      //itemDiv.style.height = wIh+"px"; //"auto";
      /****************************************************************************************/

      $ (itemDiv).appendTo ("#carouslInnerId"); //Assign itemDiv inside carouslInnerId div
      //carouslInnerId.appendChild (itemDiv); //same as above. appendTo is faster

      /*$ (myImage).appendTo (itemDiv);*/
      itemDiv.appendChild (myImage);
      //itemDiv.appendChild (myImage); //Populate itemDiv div with images but only shows the active div

      /**-----| Title Inside Carousel Body |-----**/
      carouselTitleBox = document.createElement ('span');
      itemDiv.appendChild (carouselTitleBox);
      /*modalHeader.title       = aThumbTitleText[i];
       modalHeader.appendChild (carouselTitleBox);*/
      carouselTitleBox.id          = "carouselTitleBoxId" + i;
      carouselTitleBox.className   = "carouselTitleBoxClass";
      carouselTitleBox.textContent = aThumbTitleText[i];

      /**-----=====( Description Inside Carousel Body )=====-----**/
      carouselDescriptionBox = document.createElement ('div');
      //aCarouselDescriptionBox[aCarouselDescriptionBox.length] = carouselDescriptionBox; //push

      carouselDescriptionBox.id = "carouselDescriptionBoxId" + i;
      //aCarouselDescriptionBoxId[aCarouselDescriptionBoxId.length] = aCarouselDescriptionBoxId.id; //push

      carouselDescriptionBox.className   = "carouselDescriptionBoxClass";
      carouselDescriptionBox.textContent = aThumbText[i];

      itemDiv.appendChild (carouselDescriptionBox);

      itemHeight = $ (".item").height ();
      //fAnimateTopPosition (carouselDescriptionBox, -itemHeight);
      console.log ("itemHeight: ", itemHeight);

      //fResizeGridLayoutWindow();
      //fResizeModalCarouselWindow ();
      //fInitialModalLoad ();

      //window.addEventListener ('resize', fResizeModalCarouselWindow);

      /***************=====| Slid BootStrap Carousel Function |=====*****************/
      /* change modal title when slide changes
       *******************************************************************************/
      /*xxxx$ ('#modalCarousel').on ('slid.bs.carousel', function () {
       $ ('.modal-title').html ($ (this).find ('.active').attr ("title")); //Modal Header
       $ ('.modal-description').html ($ (this).find ('.active').prop ("description")); //Modal Footer
       //x $('.modal-title').html($(this).find('.active').prop("item"));
       //x $('.modal-title').html(aThumbTitleText[i]);
       //x modalTitleDiv.appendChild(i);
       });*/

      /**-----| Activate the 'active' Class for the selected Id |-----**/
      /*for (var i = 0; i < imagesCount; i++) {*/
      if (itemDiv.id === "itemId" + 0) {
        console.log ("itemDiv.id: ", itemDiv.id);
        //console.log ("itemDiv.id: ", itemDiv.id);
        $ (".item").addClass ('active');
        //var itemTest = $ (".item").addClass ('active');
        $ ('#modalCarousel').carousel ({interval: intervalTimer}); //false intervalTimer
        //fAnimateOpacity (itemTest, 1);
        //i++;
        //console.log ("i++: ", i++);
      }
    }
    //}
    fResizeModalCarouselWindow ();
    window.addEventListener ('resize', fResizeModalCarouselWindow);

    /**-----| End for |-----**/

    //fResizeModalCarouselWindow ();

    /**-----| Populates the Carousel with the clicked image |-----**/
    $ ('#modalCarousel').carousel (indxNum);

    /**-----| Show the Modal |-----**/
    $ ('#myModal').modal ('show');

    //fInitialModalLoad ();

  }

  //fInitialModalLoad ();

  /***************=====| End fBuildModalCarousel Function |=====*****************/

  /***************=====| fResizeModalCarouselWindow Function |=====*****************/
  var res = 0;

  var descriptTest;//= "";

  function fResizeModalCarouselWindow () {
    //console.log ("fResizeModalCarouselWindow--------------------", res++);
    wIw = window.innerWidth; //Browser window inner width
    wIh = window.innerHeight; //Browser window inner height

    /**-----| carousel: Vertically centering the main carousel on the screen |-----**/
    //fAnimateTopPosition (carousel, itemVerticalCenter);

    /**-----| modalBody: Modal/Carousel dark grey background covering the whole screen |-----**/
    fAnimateHeight (modalBody, wIh);

    item       = $ (".item");
    itemHeight = $ (".item").height (); //
    //itemHeight = wIh;
    //console.log ("itemHeight3: ", itemHeight);

    imgClass = $ (".imgClass");

    itemVerticalCenter = (wIh - (itemHeight - 50)) / 2;

    carouselInner = $ (".carousel-inner");

    /**-----| Animate Arrows and Descriptions vertical positions |-----**/
    /** Vertical positions are based on the Window Inner Height or .item height.
     *
     *******************************************************************/

    /**-----| Modal Carousel: Queries for different window widths or devices |-----**/
    /** WIDTHS **/
    var imgWidth = $ (".imgClass").width ();
    console.log("imgWidth: ", imgWidth);


    var myImgWidth = aImages[indxNum].width;
    console.log("myImgWidth: ", myImgWidth);
    var myImgHeight = aImages[indxNum].height;
    console.log("myImgHeight: ", myImgHeight);

    /** Calculate the percentage difference between the window.innerWidth and the image **/
    var imgScale;
    var windowImgWidthDifference = wIw / myImgWidth;
    console.log("windowImgWidthDifference: ", windowImgWidthDifference);
    var windowImgHeightDifference = wIh / myImgHeight;
    console.log("windowImgHeightDifference: ", windowImgHeightDifference);
    if(windowImgHeightDifference > windowImgWidthDifference){
      imgScale = windowImgHeightDifference;
    } else{
      imgScale = windowImgWidthDifference;
    }

    console.log("imgScale: ", imgScale);

    //console.log("fResizeModalCarouselWindow:---------");
    var itemW = $ (".item").width ();
    var itemH = $ (".item").height ();
    console.log("itemW itemH: ", itemW, itemH);
    /** position the item div on the screen **/
    fAnimateTopPosition (item, 0);
    fAnimateLeftPosition (item, 0);
    fAnimateHeight (item, wIh);


    carouselDescriptionBox.textContent = descriptTest;
    /** modal carousel screen queries **/
    if (wIw <= 500) { //cellWidth
      fAnimateFontSize (carouselDescriptionBox, 18);
      //carouselDescriptionBox.textContent = "wIw cellWidth 540:---------: ";
      //descriptTest = "wIw cellWidth 540:---------: ";
      console.log ("wIw cellWidth 540:---------: ", wIw, cellWidth);
      fAnimateTopPosition (imgClass, 200);
      fAnimateLeftPosition (imgClass, 0);
      fAnimateScale (imgClass, imgScale);
      //for (var i = 0; i < imagesCount; i++) {
        //console.log ("aThumbs[i]: ", aThumbs[i]);
        //aThumbs[i].style.width = "100%";
        //aImages[i].style.top = -"400px";
        //aImages[i].style.height = itemH;

        //fAnimateHeight (aImages[i], "100%")
    //  }

    } else if (wIw > cellWidth && wIw <= tabletWidth) {
      fAnimateFontSize (carouselDescriptionBox, 22);
      console.log ("wIw tabletWidth 720:---------: ", wIw, tabletWidth);
      fAnimateTopPosition (imgClass, 100);
      fAnimateLeftPosition (imgClass, 0);
      fAnimateScale (imgClass, imgScale);
      //for (var i = 0; i < imagesCount; i++) {

        /*//aImages[i].style.top = "400px";
        fAnimateTopPosition (item, 100);
        fAnimateLeftPosition (item, 200);
        //item.style.left  = "200px";
        //aImages[i].style.minWidth   = "1200px";
        aImages[i].style.width  = "50%";
        aImages[i].style.height = "auto";*/
     // }

    } else if (wIw > tabletWidth && wIw <= laptopWidth) {
      fAnimateFontSize (carouselDescriptionBox, 62);
      //carouselDescriptionBox.textContent = "laptopWidth 1024:---------: ";
      //descriptTest = "laptopWidth 1024:---------: ";
      console.log ("wIw laptopWidth 1024:---------: ", wIw, laptopWidth);
      fAnimateTopPosition (imgClass, 80);
      fAnimateLeftPosition (imgClass, -10);
      /*fAnimateScale ("#imgId28", 3);
      fAnimateScale ("#imgId29", imgScale); //1.7*/
      fAnimateScale (imgClass, imgScale);
      fAnimateFontSize (carouselDescriptionBox, 90);
      /*for (var i = 0; i < imagesCount; i++) {
        /!*fAnimateTopPosition (item, 0);
        fAnimateLeftPosition (item, 0);
        //console.log ("aImages[i]: ", aImages[i]);
        //aImages[i].style.width  = "100%";
        //aImages[i].style.top = "400px";
        //aImages[i].style.top = "0px";
        itemW = "800px";
        //aImages[i].style.position = "absolute";
        aImages[i].style.minWidth = "1000px";
        aImages[i].style.height   = "400px";
        aImages[i].style.width    = "1200px";*!/

      }*/

      containerFluidWidth.margin = "40px";
      //console.log ("containerFluidWidth: ", containerFluidWidth);
    } else {
      /*for (var i = 0; i < imagesCount; i++) {
        /!*aImages[i].style.width  = "100%";
        aImages[i].style.height = "auto";*!/
      }*/
      console.log ("else > 1024:---------: ");
      fAnimateTopPosition (imgClass, 80);
      fAnimateLeftPosition (imgClass, -10);
      /*fAnimateScale ("#imgId28", 3);
      fAnimateScale ("#imgId29", imgScale); //1.7*/
      fAnimateScale (imgClass, imgScale);
      fAnimateFontSize (carouselDescriptionBox, 90);
      /*carouselDescriptionBox = $ (".carouselDescriptionBoxClass");*/
      //descriptTest = "else > 1024:---------: ";
      //carouselDescriptionBox.textContent = "else > 1024:--------->: "; //innerHTML
      //console.log ("carouselDescriptionBox.textContent:---------: ",carouselDescriptionBox.textContent);
    }
    /** End Modal Carousel Queries ***********************************************************/

    /** HEIGHTS **/
    //console.log ("wIh2: ", wIh);
    //console.log ("itemHeight2: ", itemHeight);
    //console.log ("imgClassHeight: ", imgClassHeight);
    /*var carouselDescriptionBoxHeight = $ (".carouselDescriptionBoxClass").height ();
     if (wIh < itemHeight) { // if window inner height is smaller than item height
     fAnimateTopPosition (carouselDescriptionBox, wIh - 150);
     fAnimateTopPosition (glyphChevronLeft, wIh / 2);
     fAnimateTopPosition (glyphChevronRight, wIh / 2);
     } else {
     fAnimateTopPosition (carouselDescriptionBox, itemHeight - carouselDescriptionBoxHeight);
     //fAnimateTopPosition (carouselDescriptionBox, imgClassHeight);
     fAnimateTopPosition (glyphChevronLeft, itemHeight / 2);
     fAnimateTopPosition (glyphChevronRight, itemHeight / 2);
     }*/
  }

  //fInitialModalLoad ();

  /***************=====| fInitialModalLoad Function |=====*****************/
  /** Initial call of Modal/Carousel from the grid layout
   ** Vertically center the Chevron Left and Chevron Right based on the screen size
   ** Description div should be aligned at the bottom of the image or screen
   *******************************************************************/
  function fInitialModalLoad () {
    console.log ("fInitialModalLoad |-------------");

    //fResizeModalCarouselWindow ();

    // Returns height of browser viewport
    //var winHeight = $ (window).height ();

    imgClass = $ (".imgClass");
    /*????*/
    imgClassHeight = imgClass.height ();
    console.log ("imgClassHeight: ", imgClassHeight);

    itemHeight = $ (".item").height (); //get image height
    itemVerticalCenter = (wIh - itemHeight) / 2; //Get the diff of the
    // window inner height minus the image height and divide the value in half and
    // that will be the image top position
    //glyphChevronLeft = $ ('.arrowText');
    glyphChevronLeft                 = $ ('.glyphicon-chevron-left');
    glyphChevronRight                = $ ('.glyphicon-chevron-right');
    carouselDescriptionBox           = $ ('.carouselDescriptionBoxClass');

    /*console.log ("itemHeight: ", itemHeight);
     console.log ("imgClassHeight: ", imgClassHeight);
     console.log ("wIh: ", wIh);
     console.log ("itemVerticalCenter: ", itemVerticalCenter);*/

    /*wIh              d   = window.innerHeight;
     console.log ("wIh: ", wIh);

     //Returns height of HTML document
     var docHeight = $ (document).height ();
     console.log ("itemHeight: ",itemHeight,  " docHeight: " , docHeight);*/

    /*var carslInnrHtPrct = ($ (".carousel-inner").height ()) + "%";
     console.log ("carslInnrHtPrct: ", carslInnrHtPrct);*/

    //carousel = $ ('.carousel');
    //console.log ("carouselDescriptionBox: ", carouselDescriptionBox);

    /*var itemHeight2 = $ ('#carouslInnerId').height ();*/
    //var itemHeight2 = $ ('.carousel-inner').height ();
    //console.log ("itemHeight2: ", itemHeight2);

    /*fAnimateTopPosition (glyphChevronLeft, itemHeight / 2);
     fAnimateTopPosition (glyphChevronRight, itemHeight / 2);
     //fAnimateTopPosition (carouselDescriptionBox, itemHeight - 150);
     fAnimateTopPosition (carouselDescriptionBox, imgClassHeight - 150);
     fAnimateTopPosition (carousel, 0);
     fAnimateHeight (carousel, (wIh - 100));*/
    /**-----| Modal Carousel: Queries for different window widths or devices |-----**/
    /** WIDTHS **/
    if (wIw <= cellWidth) {
      fAnimateFontSize (carouselDescriptionBox, 18);
    } else if (wIw > cellWidth && wIw <= tabletWidth) {
      fAnimateFontSize (carouselDescriptionBox, 22);
    } else if (wIw > tabletWidth && wIw <= laptopWidth) {
      fAnimateFontSize (carouselDescriptionBox, 32);
      containerFluidWidth.margin = "40px";
      //console.log ("containerFluidWidth: ", containerFluidWidth);
    } else {
      fAnimateFontSize (carouselDescriptionBox, 32);
    }
    /** End Modal Carousel Queries ***********************************************************/

    /** HEIGHTS **/
      //console.log ("imgClassHeight: ", imgClassHeight);
    console.log ("wIh: ", wIh);
    console.log ("itemHeight: ", itemHeight);
    var carouselDescriptionBoxHeight = $ (".carouselDescriptionBoxClass").height ();
    //fAnimateTopPosition (carouselDescriptionBox, itemHeight - carouselDescriptionBoxHeight);

    if (wIh > itemHeight) { // if window inner height is smaller than item height
      fAnimateTopPosition (carouselDescriptionBox, wIh - 150);
      //fAnimateTopPosition (glyphChevronLeft, wIh / 2);
      fAnimateTopPosition (glyphChevronRight, wIh / 2);
    } else {
      fAnimateTopPosition (carouselDescriptionBox, itemHeight - carouselDescriptionBoxHeight);
      //fAnimateTopPosition (carouselDescriptionBox, imgClassHeight);
      //fAnimateTopPosition (glyphChevronLeft, itemHeight / 2);
      fAnimateTopPosition (glyphChevronRight, itemHeight / 2);
    }
    /*fAnimateOpacity (modalContent, .75);*/
    /*fAnimateOpacity (carousel, 1);*/
  }

  /***************=====| End fInitialModalLoad |=====*****************/

  /**-----| Invoke fBuildThumbnails Function |-----**/
  fBuildThumbnails ();

} ());


