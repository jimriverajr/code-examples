/*!
 * Expander - v1.4.5 - 2013-03-24
 * http://plugins.learningjquery.com/expander/
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function(e){e.expander={version:"1.4.5",defaults:{slicePoint:100,preserveWords:!0,widow:4,expandText:"read more",expandPrefix:"&hellip; ",expandAfterSummary:!1,summaryClass:"summary",detailClass:"details",moreClass:"read-more",lessClass:"read-less",collapseTimer:0,expandEffect:"slideDown",expandSpeed:250,collapseEffect:"slideUp",collapseSpeed:200,userCollapse:!0,userCollapseText:"read less",userCollapsePrefix:" ",onSlice:null,beforeExpand:null,afterExpand:null,onCollapse:null,afterCollapse:null}},e.fn.expander=function(a){function l(e,a){var l="span",s=e.summary;return a?(l="div",x.test(s)&&!e.expandAfterSummary?s=s.replace(x,e.moreLabel+"$1"):s+=e.moreLabel,s='<div class="'+e.summaryClass+'">'+s+"</div>"):s+=e.moreLabel,[s,"<",l+' class="'+e.detailClass+'"',">",e.details,"</"+l+">"].join("")}function s(e){var a='<span class="'+e.moreClass+'">'+e.expandPrefix;return a+='<a href="#">'+e.expandText+"</a></span>"}function n(a,l){return a.lastIndexOf("<")>a.lastIndexOf(">")&&(a=a.slice(0,a.lastIndexOf("<"))),l&&(a=a.replace(c,"")),e.trim(a)}function t(e,a){a.stop(!0,!0)[e.collapseEffect](e.collapseSpeed,function(){var l=a.prev("span."+e.moreClass).show();l.length||a.parent().children("div."+e.summaryClass).show().find("span."+e.moreClass).show(),e.afterCollapse&&e.afterCollapse.call(a)})}function r(a,l,s){a.collapseTimer&&(o=setTimeout(function(){t(a,l),e.isFunction(a.onCollapse)&&a.onCollapse.call(s,!1)},a.collapseTimer))}var i="init";"string"==typeof a&&(i=a,a={});var o,d=e.extend({},e.expander.defaults,a),p=/^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i,c=d.wordEnd||/(&(?:[^;]+;)?|[a-zA-Z\u00C0-\u0100]+)$/,f=/<\/?(\w+)[^>]*>/g,u=/<(\w+)[^>]*>/g,m=/<\/(\w+)>/g,x=/(<\/[^>]+>)\s*$/,h=/^(<[^>]+>)+.?/,C={init:function(){this.each(function(){var a,i,c,x,C,v,S,g,b,y,E,w,T,I,P=[],j=[],k={},D=this,$=e(this),A=e([]),L=e.extend({},d,$.data("expander")||e.meta&&$.data()||{}),O=!!$.find("."+L.detailClass).length,z=!!$.find("*").filter(function(){var a=e(this).css("display");return/^block|table|list/.test(a)}).length,F=z?"div":"span",U=F+"."+L.detailClass,W=L.moreClass+"",Q=L.lessClass+"",Z=L.expandSpeed||0,q=e.trim($.html()),B=(e.trim($.text()),q.slice(0,L.slicePoint));if(L.moreSelector="span."+W.split(" ").join("."),L.lessSelector="span."+Q.split(" ").join("."),!e.data(this,"expanderInit")){for(e.data(this,"expanderInit",!0),e.data(this,"expander",L),e.each(["onSlice","beforeExpand","afterExpand","onCollapse","afterCollapse"],function(a,l){k[l]=e.isFunction(L[l])}),B=n(B),C=B.replace(f,"").length;L.slicePoint>C;)x=q.charAt(B.length),"<"===x&&(x=q.slice(B.length).match(h)[0]),B+=x,C++;for(B=n(B,L.preserveWords),v=B.match(u)||[],S=B.match(m)||[],c=[],e.each(v,function(e,a){p.test(a)||c.push(a)}),v=c,i=S.length,a=0;i>a;a++)S[a]=S[a].replace(m,"$1");if(e.each(v,function(a,l){var s=l.replace(u,"$1"),n=e.inArray(s,S);-1===n?(P.push(l),j.push("</"+s+">")):S.splice(n,1)}),j.reverse(),O)b=$.find(U).remove().html(),B=$.html(),q=B+b,g="";else{if(b=q.slice(B.length),y=e.trim(b.replace(f,"")),""===y||y.split(/\s+/).length<L.widow)return;g=j.pop()||"",B+=j.join(""),b=P.join("")+b}L.moreLabel=$.find(L.moreSelector).length?"":s(L),z&&(b=q),B+=g,L.summary=B,L.details=b,L.lastCloseTag=g,k.onSlice&&(c=L.onSlice.call(D,L),L=c&&c.details?c:L),E=l(L,z),$.html(E),T=$.find(U),I=$.find(L.moreSelector),"slideUp"===L.collapseEffect&&"slideDown"!==L.expandEffect||$.is(":hidden")?T.css({display:"none"}):T[L.collapseEffect](0),A=$.find("div."+L.summaryClass),w=function(e){e.preventDefault(),I.hide(),A.hide(),k.beforeExpand&&L.beforeExpand.call(D),T.stop(!1,!0)[L.expandEffect](Z,function(){T.css({zoom:""}),k.afterExpand&&L.afterExpand.call(D),r(L,T,D)})},I.find("a").unbind("click.expander").bind("click.expander",w),L.userCollapse&&!$.find(L.lessSelector).length&&$.find(U).append('<span class="'+L.lessClass+'">'+L.userCollapsePrefix+'<a href="#">'+L.userCollapseText+"</a></span>"),$.find(L.lessSelector+" a").unbind("click.expander").bind("click.expander",function(a){a.preventDefault(),clearTimeout(o);var l=e(this).closest(U);t(L,l),k.onCollapse&&L.onCollapse.call(D,!0)})}})},destroy:function(){this.each(function(){var a,l,s=e(this);s.data("expanderInit")&&(a=e.extend({},s.data("expander")||{},d),l=s.find("."+a.detailClass).contents(),s.removeData("expanderInit"),s.removeData("expander"),s.find(a.moreSelector).remove(),s.find("."+a.summaryClass).remove(),s.find("."+a.detailClass).after(l).remove(),s.find(a.lessSelector).remove())})}};return C[i]&&C[i].call(this),this},e.fn.expander.defaults=e.expander.defaults})(jQuery);


/*!
 * imagesLoaded PACKAGED v3.0.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){var t=document.documentElement,n=function(){};t.addEventListener?n=function(e,t,n){e.addEventListener(t,n,!1)}:t.attachEvent&&(n=function(t,n,i){t[n+i]=i.handleEvent?function(){var t=e.event;t.target=t.target||t.srcElement,i.handleEvent.call(i,t)}:function(){var n=e.event;n.target=n.target||n.srcElement,i.call(t,n)},t.attachEvent("on"+n,t[n+i])});var i=function(){};t.removeEventListener?i=function(e,t,n){e.removeEventListener(t,n,!1)}:t.detachEvent&&(i=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var r={bind:n,unbind:i};"function"==typeof define&&define.amd?define("eventie/eventie",r):e.eventie=r}(this),function(e){function t(e,t){for(var n in t)e[n]=t[n];return e}function n(e){return"[object Array]"===c.call(e)}function i(e){var t=[];if(n(e))t=e;else if("number"==typeof e.length)for(var i=0,r=e.length;r>i;i++)t.push(e[i]);else t.push(e);return t}function r(e,n){function r(e,n,s){if(!(this instanceof r))return new r(e,n);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=i(e),this.options=t({},this.options),"function"==typeof n?s=n:t(this.options,n),s&&this.on("always",s),this.getImages(),o&&(this.jqDeferred=new o.Deferred);var a=this;setTimeout(function(){a.check()})}function c(e){this.img=e}r.prototype=new e,r.prototype.options={},r.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},r.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},r.prototype.check=function(){function e(e,r){return t.options.debug&&a&&s.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},r.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify(t,e)})},r.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},o&&(o.fn.imagesLoaded=function(e,t){var n=new r(this,e,t);return n.jqDeferred.promise(o(this))});var f={};return c.prototype=new e,c.prototype.check=function(){var e=f[this.img.src];if(e)return this.useCached(e),void 0;if(f[this.img.src]=this,this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this.proxyImage=new Image;n.bind(t,"load",this),n.bind(t,"error",this),t.src=this.img.src},c.prototype.useCached=function(e){if(e.isConfirmed)this.confirm(e.isLoaded,"cached was confirmed");else{var t=this;e.on("confirm",function(e){return t.confirm(e.isLoaded,"cache emitted confirmed"),!0})}},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindProxyEvents()},c.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindProxyEvents()},c.prototype.unbindProxyEvents=function(){n.unbind(this.proxyImage,"load",this),n.unbind(this.proxyImage,"error",this)},r}var o=e.jQuery,s=e.console,a=s!==void 0,c=Object.prototype.toString;"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],r):e.imagesLoaded=r(e.EventEmitter,e.eventie)}(window);



if (typeof CN === 'undefined' || !CN) {
    var CN = {};
}

CN.bridesSlide = {

    sliderData       : [],
    totalSlides      : 1,
    currentSlide     : 0,
    currentIndex     : 0,
    ssIter           : 1,
    adInterval       : 10,
    userCount        : 0,
    imgsPreloaded    : 1,
    itemClass        : '',
    isReplay         : false,
    $viewallThumbs   : null,
    slideLinkData    : null,
    viewedSlideshows : {list:[]},
    nextSlideshow    : {
                            url   : '',
                            title : '',
                            image : ''
                        },
    hasNextSlideshow : false,


    init : function(data){

        if(data.length > 0){

            this.prepData(data);
            jQuery('html.slideshow-showinitial-false #items-container .item').fadeIn();
            jQuery('.control-bar .total').html(this.totalSlides);

            this.getViewedSlideshows();
            if(this.hasViewed(location.pathname)){
                this.viewedSlideshows.list.push(location.pathname);
                this.saveViewedSlideshows();
            }
            this.initBindings();
            this.createViewall();

            if(window.location.hash.match(/slide=/)){

                var curHashSlide = window.location.hash.replace(/#slide=/, ''),
                    that = this;

                if(curHashSlide == this.totalSlides){
                    this.showLastSlide();
                    this.currentSlide = this.totalSlides;
                }

                if(curHashSlide < this.totalSlides){
                     jQuery(document).trigger('slideChange', {slide : parseInt(curHashSlide), that : that});
                }



            }
            else{
                var that = this;
                jQuery(document).trigger('slideChange', {slide : parseInt(1), that : that});
                if(jQuery('.intro').length > 0){
                    jQuery('.intro').append('<div class="list-view-slideshow"></div>');
                    jQuery('.list-view-slideshow').click(function(){
                        jQuery('.intro-container').hide();
                        jQuery('#items-container').css({'position': 'static', 'left' : 0});
                        digitalData.pageValue = 'slide' + (that.currentSlide);
                        _satellite.track('slideshows');
                    });
                }
            }
        }
        else{
            this.prepPoshlyQuiz();
        }
    },

    prepData : function(data){

        var that = this;

        jQuery.each(data, function(key, value){
            that.sliderData.push(that.sliderPrepper(value.item));
        });
        this.totalSlides  = this.sliderData.length + 1;
        this.currentSlide = parseInt(this.getCurSlideFromUrl());
        this.currentIndex = this.currentSlide - 1;

        this.getSlidelinkData();
   },

    prepPoshlyQuiz : function(){
        jQuery('.utilities-top').remove();
        //jQuery('.headers-container').remove();

        var that = this;

        jQuery(document).on('st.poshly.piques.pageview', function(e,data) {
          //omniture or ad refresh calls
             that.poshlyQuizTrackingFn(e,data);
         });
    },

     poshlyQuizTrackingFn : function(e,data) {

        if(typeof(data.pgNum) == 'undefined'){
            digitalData.pageValue = 'question' + (data.questionIndex);
        }
        else{
             if(data.pgNum == 'start page'){
                digitalData.pageValue = 'quizIntro';
            }
            if(data.pgNum == 'thanks page'){
                digitalData.pageValue = 'quizEnd';
            }
        }

        if(this.ssIter > 1){
              _satellite.track('slideshows');
              this.refreshAds();
               allurePromo.setPVFlag();
         }
         this.ssIter += 1;

        jQuery.ajax({
            type : 'GET',
            url : '/pv.xml',
            dataType : 'xml',
            success : function(data) {
            try {
                CN.debug.info("Comscore Non-Conventional(quiz) Page view triggered.");
            } catch(e) {
                CN.debug.error('COMSCORE beacon call for quiz page view failed' + e.message);
                }
            },
            error : function(xhr, textStatus) {
                CN.debug.error('page view xml load failed for slideshow, probably 404: ' + textStatus);
            }
        });

        jQuery('.zerg-unit').show();
        if (typeof COMSCORE !== "undefined") {
            COMSCORE.beacon({
              c1: "2",
              c2: "6035094",
              c4: document.location.href,
              c5: digitalData.pageValue,
              c8: jQuery("title").text()
            });
        }
    },

    imgPl : function(url){
        var pimg = new Image();
        pimg.src = url;
    },

    doPL : function(e,data){
        var plIndex = 0;

        if(data.that.imgsPreloaded + 10 > data.that.totalSlides - 1){
            plIndex = Math.abs((data.that.totalSlides - 1) - data.that.imgsPreloaded);
        }else{
            plIndex = 10;
        }

        for(var plc = 0; plc < plIndex; plc++){

            if(typeof(data.that.sliderData[data.that.imgsPreloaded].imgs.enlargedImage !== 'undefined')){
                data.that.imgPl(data.that.sliderData[data.that.imgsPreloaded].imgs.enlargedImage.img);
                data.that.imgsPreloaded++;
            }
            else{
                data.that.imgPl(data.that.sliderData[data.that.imgsPreloaded].imgs.main.img);
                data.that.imgsPreloaded++;
            }

        }
    },

    sliderPrepper : function (prep){

        var slidePrep = {}, that = this;

        slidePrep.sl_body     = (typeof(prep.body.text) === "object")? null : prep.body.text;
        slidePrep.sl_summary  = prep.search.summary;
        slidePrep.sl_title    = prep.search.title;
        slidePrep.sl_lead     = (typeof(prep.header) === "object")? prep.header.html.text : null;
        slidePrep.sl_intro    = (typeof(prep.subHeaders.subHeader) === "object")? prep.subHeaders.subHeader.html.text : null;
        slidePrep.sl_credits  = (typeof(prep.photoCredits) === "object")? null : prep.photoCredits;
        slidePrep.sl_id       = prep.metaData.id;
        slidePrep.sl_pageType = prep.metaData.pageType;

        if(prep.mediaItems.mediaItem.length > 1){
            slidePrep.imgs  = getImages(prep.mediaItems.mediaItem[0]);
        }
        else{
            slidePrep.imgs  = getImages(prep.mediaItems.mediaItem);
        }


        function getImages(images){

            var imgList = {};

            jQuery.each(images.formats.format, function(key, value){
                imgList[value.name] = {};
                imgList[value.name].img =  value.source;
                imgList[value.name].altText =  images.altText;

                if(that.imgsPreloaded <= 6 && value.name === "enlargedImage"){
                    that.imgPl(value.source);
                    that.imgsPreloaded++;
                }
            });

            return imgList;
        }

        return slidePrep;
    },

    initBindings : function(){

        jQuery(document).bind('slideChange', this.slideChange);
        jQuery(document).bind('preloadImg', this.preloadImg);
        jQuery(document).bind('adRefresh', this.refreshAds);
        jQuery(document).bind('interstitialAdCall', this.doInterstitialAd);
        jQuery(document).bind('doPreload', this.doPL);

        jQuery('.utilities li').mouseenter(function(){ jQuery(this).children().addClass('detail-socialicon-show')});
        jQuery('.utilities li').mouseleave(function(){ jQuery(this).children().removeClass('detail-socialicon-show')});

        this.clickBindings();


    },

      // Repository for tracking on change of slides
    slideChangeTrackingFn : function() {


        if(this.ssIter > 1){

              if(this.currentSlide == this.totalSlides){
                digitalData.pageValue = 'endSlide';
            }
            else{
                digitalData.pageValue = 'slide' + (this.currentSlide);
            }

            if(this.currentSlide == this.totalSlides){
                digitalData.pageValue = 'endSlide';
            }
            else{
                digitalData.pageValue = 'slide' + (this.currentSlide);
            }

            _satellite.track('slideshows');
            allurePromo.setPVFlag();
         }
         this.ssIter += 1;

        jQuery.ajax({
            type : 'GET',
            url : '/pv.xml',
            dataType : 'xml',
            success : function(data) {
            try {
                CN.debug.info("Comscore Non-Conventional(slideshow) Page view triggered.");
            } catch(e) {
                CN.debug.error('COMSCORE beacon call for slideshow page view failed' + e.message);
                }
            },
            error : function(xhr, textStatus) {
                CN.debug.error('page view xml load failed for slideshow, probably 404: ' + textStatus);
            }
        });

        jQuery('.zerg-unit').show();
        if (typeof COMSCORE !== "undefined") {
            COMSCORE.beacon({
              c1: "2",
              c2: "6035094",
              c4: document.location.href,
              c5: 'slide' + (this.currentSlide + 1),
              c8: jQuery("title").text()
            });
        }
    },

    clickBindings : function(){

        var that = this;
        jQuery('.control-bar .previous').bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            if(that.currentSlide > 1){
                jQuery(document).trigger('slideChange', {slide : that.currentSlide - 1, that : that});
            }
        });

        jQuery('.control-bar .next').bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            if(that.isReplay && (that.currentSlide == 1) && jQuery('#interAd').is(':visible') ){
                jQuery(document).trigger('slideChange', {slide : that.currentSlide, that : that});
            }
            else{
                jQuery(document).trigger('slideChange', {slide : that.currentSlide + 1, that : that});
            }

                that.isReplay = false;
            });

            jQuery('.control-bar .viewall a').bind('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                that.showViewall();
            })
        /*jQuery('.slide-thumbs li a').bind('mouseover', function(){
            if(jQuery(this).attr('data-index') >= that.imgsPreloaded){
                jQuery(document).trigger('preloadImg', {slide : that.sliderData[jQuery(this).parent().attr('data-index')].imgs.enlargedImage.img, that : that});
            }
        });

        jQuery('.slide-thumbs li a').bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            jQuery(document).trigger('slideChange', {slide : parseInt(jQuery(this).parent().attr('data-index')), that : that});

        });*/

    },

    disableClickBindings : function(){

        jQuery('.navigation .sl_prev').unbind();
        jQuery('.navigation .sl_next').unbind();
        jQuery('.slide-thumbs li a').unbind();

    },

    touchBindings : function(){
        var attachSwipeRight  =  function() {
            var isTouch = document.hasOwnProperty('ontouchend');
           var events = (isTouch) ? {down: 'touchstart',move: 'touchmove',up: 'touchend'} : {down: 'mousedown',move: 'mousemove',up: 'mouseup'};
           var getCursorPosition = (isTouch) ? function (e) {e = e.originalEvent || e;return {x: e.touches[0].clientX,y: e.touches[0].clientY};} :
                                               function (e) {return {x: e.clientX,y: e.clientY};}
           var abs = Math.abs,
                     dragging,
                 canceled,
                 xy,
                 dx,
                 dy;
             function start(e) {
                 if (!isTouch) e.preventDefault();

                 dragging = true;
                 canceled = false;

                 xy = getCursorPosition(e);
                 dx = 0;
                 dy = 0;
                 dragThresholdMet = false;
             }
             function drag(e) {
                 if (!dragging || canceled ) return;

                 var newXY = getCursorPosition(e);
                 dx = xy.x - newXY.x;
                 dy = xy.y - newXY.y;

                 if(Math.abs(dx) > 5){

                    var distance = dx - 5;

                    var opacImg = Math.abs((100 - Math.abs(distance/4))/100);
                    jQuery(document.getElementById('swipeArea')).attr('class', '').css('opacity', opacImg);
                    ApplyTransformProperty(document.getElementById('swipeArea'), 0, -distance);

                }

                 if (dragThresholdMet || abs(dx) > abs(dy) && (abs(dx) > 5)) {
                     dragThresholdMet = true;
                     e.preventDefault();
                 } else if ((abs(dy) > abs(dx)) && (abs(dy) > 5)) {
                     canceled = true;
                 }
             }

             function end(e) {
                 if (!canceled && abs(dx) > 250) {
                     // Move to the next slide if necessary
                     if (dx > 0) {
                         //Nothing
                        if(CN.bridesSlide.isReplay && (CN.bridesSlide.currentSlide == 1) && jQuery('#interAd').is(':visible') ){
                            jQuery(document).trigger('slideChange', {slide : CN.bridesSlide.currentSlide, that : CN.bridesSlide});
                        }
                        else{
                            jQuery(document).trigger('slideChange', {slide : CN.bridesSlide.currentSlide + 1, that : CN.bridesSlide});
                        }
                     } else {
                        jQuery(document).trigger('slideChange', {slide : CN.bridesSlide.currentSlide - 1, that : CN.bridesSlide});
                     }
                 } else {
                   //Dont do anything
                   jQuery(document.getElementById('swipeArea')).attr('style', '').addClass('tablet-full-reset');
                 }
             }

             jQuery('.swipeArea').unbind();
             jQuery('#media-count-2-container').unbind();

             jQuery('.swipeArea').bind(events.down,start)
                               .bind(events.move,drag)
                               .bind(events.up,end);

            function ApplyTransformProperty(element, deltaY, deltaX){
                var properties = [
                'transform',
                'WebkitTransform',
                'msTransform',
                'MozTransform',
                'OTransform'
                ];
                var p;
                while (p = properties.shift()) {
                    if (typeof element.style[p] != 'undefined' && element.style[p] != null) {
                        element.style[p] = "translate3d("+deltaX+"px, "+deltaY+"px, 0px)";
                    }
                }
                return false;
              }
         };

        attachSwipeRight();
    },

    updateSocialBar: function() {
        CN.page.config.url=location.href;
        CN.socialmedia.getTweet();
        CN.socialmedia.getPinit.prepareSSPinIt(location.href,  jQuery('.media-placement-primary .photo .w img').attr('src'));
        CN.page.config.title = jQuery('.item-text .headers h1').text();
    },

    initUpdateSocialBar: function(){
        CN.page.config.url=window.location.href.split('#')[0];
        CN.site.brides.socialmedia.getFacebookShare();
        CN.page.config.title = jQuery('.item-text .headers h1').text();
        jQuery('.utility-gplusone div').remove();
        jQuery('.utility-gplusone').html('<g:plusone></g:plusone>');
        jQuery("#gplus-script").remove();
        CN.socialmedia.getGooglePlusOne();
    },

    getCurSlideFromUrl : function(){

        var url = window.location.href.split('?');

        if(url.length > 1){
            var params   = url[1];
            var splitPar = params.split('&');

            var check = params.match(/(?!=slide=)\d{1,}/);
            if(check){
                return check[0];
            }
        }

        return false;
    },

    setCurSlideUrl : function(){
        location.hash = 'slide=' + this.currentSlide;
    },

    setCurSlide : function(){
        if(!this.currentSlide){
            this.currentSlide = 1;
        }

        if(this.currentSlide > 1){
            jQuery('.item-text .headers .sub-header').hide();
            jQuery('.item-text .headers .byline').hide();
            jQuery('.item-text .headers .intro-container').hide();
            jQuery('.control-bar .previous a').removeClass('start');
        }
        else{
            jQuery('.item-text .headers .sub-header').show();
            jQuery('.item-text .headers .byline').show();
            jQuery('.item-text .headers .intro-container').show();
            jQuery('.control-bar .previous a').addClass('start');
        }

        if((this.currentSlide == this.imgsPreloaded - 1) && (this.currentSlide < this.totalSlides-1)){
            jQuery(document).trigger('doPreload', {'that' : this});
        }

        this.userCount++;

        jQuery('.control-bar .current').html(this.currentSlide);
        jQuery('.slide-thumbs li').removeClass('active')
        jQuery('.slide-thumbs li[data-index="'+ this.currentSlide +'"]').addClass('active');
        this.setCurSlideUrl();

        if (!(jQuery.browser.msie) || (jQuery.browser.msie  && parseInt(jQuery.browser.version, 10) > 9)){
            if(typeof(this.sliderData[this.currentIndex]) != 'undefined'){
                jQuery('.item-inner .item-text .body .text').append('<div data-shopthis-id="ALLURE-12" style="margin-top:10px;" data-cms-id="'+  this.sliderData[this.currentIndex].sl_id  +'"></div>');
            }
        }
        jQuery(document).trigger('adRefresh');
        this.slideChangeTrackingFn();
    },

    createViewall : function(){

        jQuery('#livefyre').before('<div class="slideshow-viewall-container"><div class="slideshow-viewall-close">Close</div><div class="slideshow-viewall-content"><ol class="slideshow-navigation-viewall"></ol><div style="clear:both;"></div></div></div>');

        for(var tc =0; tc < this.sliderData.length; tc++){

            if(typeof(this.sliderData[tc].imgs.thumbnail) === "undefined"){
                var thbImg = this.sliderData[tc].imgs.main.img;
                var thbAlt = this.sliderData[tc].imgs.main.altText;
            }
            else{
                var thbImg = this.sliderData[tc].imgs.thumbnail.img;
                var thbAlt = this.sliderData[tc].imgs.thumbnail.altText;
            }

            var activeClass = (tc == this.currentSlide)? ' active' : '',
            slideIndex = tc+1;

            jQuery('.slideshow-navigation-viewall').append('<li data-index="'+slideIndex+'"><a href="javascript:void(0)"><div><img src="' +thbImg+ '" alt="' +thbAlt+ '" /><br/>'+slideIndex+'</div></a></li>'  );
        }

        jQuery('.slideshow-navigation-viewall').append('<li data-index="'+this.totalSlides+'"><img alt="" src="/images/default-thumbnail.gif"></li>');
        this.$viewallThumbs   = jQuery('.slideshow-viewall-container');

    },

    showViewall : function(){

        var that = this;
        jQuery('#show-footer').hide();
        jQuery('#items-container').hide();
        jQuery('.items-inner').hide();
        jQuery('.lastSlide').hide();

        this.$viewallThumbs.show();

        jQuery('.next-button').hide();
        jQuery('.img-shadow').click(function(){
            that.showSlides();
        });

        jQuery('.slideshow-viewall-close').bind('click', function(){
            that.showSlides();
        });

        this.$viewallThumbs.find('ol.slideshow-navigation-viewall li').unbind('click');
        this.$viewallThumbs.find('ol.slideshow-navigation-viewall li').bind('click', function(e){
            that.goToSlide(parseInt(jQuery(this).attr('data-index')));
            that.showSlides();

            //jQuery(document).trigger('slideChange', {slide : parseInt(jQuery(this).attr('data-index')), that : that});

        });

    },

    showSlides    :    function(){

        if(this.currentSlide == this.totalSlides){
            jQuery('#items-container').hide();
            this.showLastSlide();
        }
        else{
            jQuery('#items-container').fadeIn();
        }

        this.$viewallThumbs.fadeOut();
        jQuery('#items-container').fadeIn();
        jQuery('.next-button').show();
        jQuery('.item-inner').fadeIn();
        jQuery('#yslideCon').fadeIn();
    },

    animateThumbs : function(){

        if(this.totalSlides < 9){
            return;
        }

        var slideIndex = this.currentSlide,
            steps = 0,
            distance,
            slideLeft = parseInt(jQuery('.slide-thumbs').css('left'));


            if(slideIndex <= 3){
                slideIndex = 4
            }

            if(slideIndex >= this.totalSlides - 4 ){
                slideIndex = this.totalSlides - 4;
            }

            steps = 4 - slideIndex;

            distance = steps * jQuery('.slide-thumbs li').outerWidth(true);
            jQuery('.slide-thumbs').animate({left : +distance});


    },

    goToSlide : function(slide){
        jQuery('.media-placement-primary .photo .w img').addClass('swipeArea');
        //if(jQuery('.OUTBRAIN').is(':visible')){
            jQuery('#slideshow-cm-container').hide();
            jQuery('.items .item').show();
        //}
        console.log(slide);
       if(slide == this.totalSlides - 1){
            this.prepLastSlide();
        }

        if(slide == this.totalSlides){
            this.currentIndex = slide - 1;
            this.currentSlide = slide;

            this.showLastSlide();
            this.setCurSlide();
            return;
        }
        this.currentIndex = slide - 1;
        this.currentSlide = slide;

        if(this.itemClass != ''){
            jQuery('.item').removeClass(this.itemClass);
        }

        this.itemClass = 'item' + this.sliderData[this.currentIndex].sl_pageType;
        jQuery('.item').addClass(this.itemClass);

        if(typeof(this.sliderData[this.currentIndex].imgs.enlargedImage) === "undefined"){
            var nextImg = this.sliderData[this.currentIndex].imgs.main.img;
            var nextAlt = this.sliderData[this.currentIndex].imgs.main.altText;
        }
        else{
            var nextImg = this.sliderData[this.currentIndex].imgs.enlargedImage.img;
            var nextAlt = this.sliderData[this.currentIndex].imgs.enlargedImage.altText;
        }

        if(this.sliderData[this.currentIndex].sl_lead !== null){
            jQuery('.item .headers-container h3').html(this.sliderData[this.currentIndex].sl_lead);
        }else{
            jQuery('.item .headers-container h3').html('');
        }

        if(this.sliderData[this.currentIndex].sl_intro !== null) {
            jQuery('.item .headers-container h4 span').html(this.sliderData[this.currentIndex].sl_intro);
        } else {
            jQuery('.item .headers-container h4 span').html('');
        }

        //jQuery('.item .item-text .body .text').remove();
        if(this.sliderData[this.currentIndex].sl_body !== null){
            jQuery('.item .item-text .body .text').html(this.sliderData[this.currentIndex].sl_body);
        }
        else{
            jQuery('.item .item-text .body .text').html('');
        }

        if(this.sliderData[this.currentIndex].sl_credits !== null){
            jQuery('.item .item-text .body .text').append('<cite class="photo-credits">' + this.sliderData[this.currentIndex].sl_credits + '</cite>');
        }




        jQuery('.item .photo .w img').hide();
        jQuery('.item .photo .w img').attr('src', nextImg);
        jQuery('.item .photo .w img').attr('alt', nextAlt);



        jQuery('.listC .' + this.itemClass + ' .item-inner').attr('style', '');
        if(jQuery('.jScrollPaneContainer').length > 0){
            jQuery('.listC .' + this.itemClass + ' .item-inner').unwrap();
            jQuery('.jScrollPaneTrack, .jScrollArrowDown, .jScrollArrowUp').remove();
            jQuery('.listC .' + this.itemClass + ' .item-inner').attr('style', '');
        }
        //jQuery('.listC .' + this.itemClass + ' .item-inner').jScrollPane({ scrollbarWidth: 14,showArrows: false});

        var that = this;

        imagesLoaded( '.swipeArea', function(){
            jQuery('.media-placement-primary .photo .w img').show();
        });
        CN.site.allure.socialShare.ss_imgShare(that.currentSlide);

        if(this.is_touch_device()){
           this.touchBindings();
        }

        this.setCurSlide();
    },

    slideChange : function(e, data){
        data.that.goToSlide(data.slide);
        //if (this.currentSlide===(this.totalSlides-1)) {
        //    data.that.columnCountIEFix();
        //}

    },

    preloadImg : function(e, data){
        data.that.imgPl(data.img);
    },

    refreshAds : function(){
        if(typeof(CN.dart) !== "undefined"){

            //jQuery('.refreshAd').hide();
            CN.dart.refresh();
            //jQuery('iframe').one('load', function(e){jQuery('.refreshAd').fadeIn();});
        }
    },

    doInterstitialAd : function(){

        jQuery('.item .media .photo .w img').fadeOut();
        jQuery('.media-placement-primary .photo .pinWrap').remove();
        jQuery('.item .media .photo .w').append('<div id="interAd"><div id="slideshowInterstitial_300x250_frame"></div></div>');
        CN.dart.call( 'slideshowInterstitial_', { sz: '300x250', kws: ["interstitial"] } );
        jQuery('.item .media .photo .w').fadeIn();
        if(CN.bridesSlide.is_touch_device()){
            CN.bridesSlide.touchAd();
        }

    },

    touchAd : function(){
        jQuery('.swipeArea').unbind();

        var attachSwipeRightAd  =  function() {
        var isTouch = document.hasOwnProperty('ontouchend');
       var events = (isTouch) ? {down: 'touchstart',move: 'touchmove',up: 'touchend'} : {down: 'mousedown',move: 'mousemove',up: 'mouseup'};
       var getCursorPosition = (isTouch) ? function (e) {e = e.originalEvent || e;return {x: e.touches[0].clientX,y: e.touches[0].clientY};} :
                                           function (e) {return {x: e.clientX,y: e.clientY};}
       var abs = Math.abs,
                 dragging,
             canceled,
             xy,
             dx,
             dy;
         function start(e) {
             if (!isTouch) e.preventDefault();

             dragging = true;
             canceled = false;

             xy = getCursorPosition(e);
             dx = 0;
             dy = 0;
             dragThresholdMet = false;
         }
         function drag(e) {
             if (!dragging || canceled ) return;

             var newXY = getCursorPosition(e);
             dx = xy.x - newXY.x;
             dy = xy.y - newXY.y;

             if (dragThresholdMet || abs(dx) > abs(dy) && (abs(dx) > 5)) {
                 dragThresholdMet = true;
                 e.preventDefault();
             } else if ((abs(dy) > abs(dx)) && (abs(dy) > 5)) {
                 canceled = true;
             }
         }

         function end(e) {
             if (!canceled && abs(dx) > 10) {
                 // Move to the next slide if necessary
                 if (dx > 0) {
                     //Nothing
                     CN.bridesSlide.goToSlide(CN.bridesSlide.currentSlide+1);
                 } else {
                    CN.bridesSlide.goToSlide(CN.bridesSlide.currentSlide-1)
                 }
             } else {
               //Dont do anything
             }
         }


         jQuery('#media-count-2-container').bind(events.down,start)
                           .bind(events.move,drag)
                           .bind(events.up,end);
     };

        attachSwipeRightAd();
    },

    showLastSlide : function(){
        var that = this;

        if(jQuery('.OUTBRAIN').length == 0){
            this.prepLastSlide();
        }

        jQuery('.items .item').hide();
        jQuery('#slideshow-cm-container').show();

        jQuery('.control-bar  .next').unbind();
        jQuery('.control-bar  .next').click(function(e){
            //e.preventDefault();
            //that.replayShow();
        });
        console.log(this.hasNextSlideshow);
        if(this.hasNextSlideshow){
            this.showNextSlideshow();
        }
    },

    prepLastSlide : function(){

         jQuery('#slideshow-cm-extra').append('<div class="OUTBRAIN" data-src="http://www.allure.com'+ window.location.pathname +'" data-widget-id="AR_8" data-ob-template="allure" ></div>');
         jQuery('#slideshow-cm-extra').append('<div class="OUTBRAIN" data-src="http://www.allure.com'+ window.location.pathname +'" data-widget-id="AR_7" data-ob-template="allure" ></div>');
         jQuery('BODY').append('<script type="text/javascript" src="http://widgets.outbrain.com/outbrain.js"></script>');
    },

     getSlidelinkData : function(){
        var section     = jQuery.parseJSON(jQuery('meta[name="parsely-page"]').attr('content').replace(/\\"/g, '"')).section.replace(' ', '-').toLowerCase();

        if(jQuery('BODY').hasClass('s_salon-spa-reviews') || jQuery('BODY').hasClass('s_free-samples')){
            section = 'beauty-trends';
        }

        if(jQuery('BODY').hasClass('s_shopping')){
            section = 'shopping';
        }

        if(jQuery('BODY').hasClass('s_awards-show-beauty')){
            section = 'celebrity-trends';
        }

        if(jQuery('BODY').hasClass('s_makeup-looks')){
            section = 'makeup-looks';
        }

        if(jQuery('BODY').hasClass('s_wedding-hair-makeup')){
            section = 'hair-ideas';
        }

        jQuery.ajax({
            type : 'GET',
            url : 'http://www.allure.com/search/api?docType=slideshow&rows=40&section='+section+'&sort=publishdate%20desc',
            dataType : 'json',
            success : function(data) {
                CN.bridesSlide.slideLinkData = data.response.docs;
                CN.bridesSlide.getNextSSLink();
                if((CN.bridesSlide.currentSlide == CN.bridesSlide.totalSlides) && CN.bridesSlide.hasNextSlideshow){
                    CN.bridesSlide.showNextSlideshow();
                }

            },
            error : function(xhr, textStatus) {

            }
        });
    },

    saveViewedSlideshows : function(){
        if(localStorage != "undefined"){
            var store = JSON.stringify(this.viewedSlideshows);
            localStorage.setItem('viewedSlideshows', store);
        }else{
            var store = JSON.stringify(this.viewedSlideshows);
            CN.cookie.set('viewedSlideshows', store, {path:'/', expires: 4*24*60*60*1000});
        }
    },

    getViewedSlideshows : function(){
        if(localStorage != "undefined"){
            if(localStorage.getItem('viewedSlideshows') != null){
                var store = localStorage.getItem('viewedSlideshows', store);
                this.viewedSlideshows = jQuery.parseJSON(store);
            }
        }else{
            if(CN.cookie.get('viewedSlideshows') != ""){
                var store = CN.cookie.get('viewedSlideshows');
                this.viewedSlideshows = jQuery.parseJSON(store);
            }
        }
    },

    getNextSSLink : function(){
        this.getViewedSlideshows();

        if(this.slideLinkData.length != 0){
            for(var ns = 0; ns < this.slideLinkData.length; ns++){

                var isVerified = true;

                 for(var vs = 0; vs < this.viewedSlideshows.list.length; vs++){

                    if(this.viewedSlideshows.list[vs] == this.slideLinkData[ns].url){
                        isVerified = false;
                        continue;
                    }

                }

                if(isVerified == true){
                    this.nextSlideshow.url   = this.slideLinkData[ns].url;
                    this.nextSlideshow.title = this.slideLinkData[ns].searchtitle;
                    this.nextSlideshow.image = this.slideLinkData[ns].searchimage;
                    this.hasNextSlideshow    = true;
                    //this.addNextSSUnit();
                    break;
                }

            }
        }

    },

    hasViewed : function(curSlide){

        for(var ns = 0; ns < this.viewedSlideshows.list.length; ns++){

            if(this.viewedSlideshows.list[ns] == curSlide){
                return false;
            }
        }
        return true;
    },

    showNextSlideshow : function(){
        jQuery('.control-bar .next a[title="Next slide"]').addClass('last');
        jQuery('.control-bar .next a.last').attr('href', this.nextSlideshow.url);
        jQuery('.control-bar .next a.last').html('Next Up');

        /*jQuery('.control-bar .next').hover(
            function(){jQuery('.nextSSWrap').fadeIn();},
            function(){jQuery('.nextSSWrap').hide();}
        );*/

        var that = this;

        jQuery('.control-bar .previous a').on('click', function(event){
            jQuery('.control-bar .next a.last').attr('href', 'javascript:void(0)');
            jQuery('.control-bar .next a.last').html('Next');
            jQuery('.control-bar .next a.last').removeClass('last');
            /*jQuery('.control-bar .next').unbind('hover');*/


             jQuery('.control-bar .next').bind('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                if(that.isReplay && (that.currentSlide == 1) && jQuery('#interAd').is(':visible') ){
                    jQuery(document).trigger('slideChange', {slide : that.currentSlide, that : that});
                }
                else{
                    jQuery(document).trigger('slideChange', {slide : that.currentSlide + 1, that : that});
                }

                    that.isReplay = false;
            });

            jQuery(this).off(event);

        });
          //jQuery('.nextSSWrap').fadeIn();
    },

    addNextSSUnit : function(){
        var nextSlideshowHMTL = '<div class="nextSSWrap">';
            nextSlideshowHMTL +=     '<div class="imgWrap">';
            nextSlideshowHMTL +=        '<a href="' + this.nextSlideshow.url + '">'
            nextSlideshowHMTL +=             '<img src="' + this.nextSlideshow.image + '"/>';
            nextSlideshowHMTL +=         '</a>';
            nextSlideshowHMTL +=     '</div>';
            nextSlideshowHMTL +=     '<div class="linkWrap">';
            nextSlideshowHMTL +=         '<a href="' + this.nextSlideshow.url + '">' + this.nextSlideshow.title + '</a>';
            nextSlideshowHMTL +=     '</div>';
            nextSlideshowHMTL += '</div>';
        this.imgPl(this.nextSlideshow.image);
        jQuery('.control-bar .next').append(nextSlideshowHMTL);
    },

    replayShow : function(){
        var that = this;
        this.currentIndex = 0;
        this.currentSlide = 1;
        this.isReplay = true;

        this.goToSlide(this.currentSlide);
        /*jQuery('.control-bar  .next').unbind();
        jQuery('.control-bar .next').bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            if(that.isReplay && (that.currentSlide == 1) && jQuery('#interAd').is(':visible') ){
                jQuery(document).trigger('slideChange', {slide : that.currentSlide, that : that});
            }
            else{
                jQuery(document).trigger('slideChange', {slide : that.currentSlide + 1, that : that});
            }

                that.isReplay = false;
            });
        */
     },
    getSlideCMs: function() {

        var cmSlideFooter    = 'AMS_BRI_GLOBAL_SLIDESHOW_FOOTER',
            cmSlideSubscribe = 'AMS_BRI_GLOBAL_SLIDESHOW_SUBSCRIBE';
        CN.hearstQue.register(function(pageAds){
                if ((typeof pageAds !== 'undefined') && (typeof pageAds[cmSlideFooter] !== 'undefined') && window.pageAds[cmSlideFooter].match(/<[a-z][\s\S]*>/) && (CN.url.params('nojoy') != 1) ) {
                    jQuery('.cm-footer-holder').html(window.pageAds[cmSlideFooter]);
                }
             });
         CN.hearstQue.register(function(pageAds){
                if ((typeof pageAds !== 'undefined') && (typeof pageAds[cmSlideSubscribe] !== 'undefined') && window.pageAds[cmSlideSubscribe].match(/<[a-z][\s\S]*>/) && (CN.url.params('nojoy') != 1) ) {
                    jQuery('.cm-subscribe-holder').html(window.pageAds[cmSlideSubscribe]);
                }
             });
    },

    is_touch_device : function() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }
}


jQuery(document).ready(function(){
    CN.bridesSlide.init(sliderPrepData);
    jQuery('HTML').removeClass('slideshow-showinitial-false');

    var isPlaylist = false, //if single video set to false, playlist set to true
        vidSource  = '//player.cnevids.com/embedjs/52f2a97f69702d51bf300000/video/5616cd5f61646d0e9300000a.js?theme=light', //add the src of the video you want to use here
        vidTitle   = 'Making Best of Beauty 2015, Episode 3', // Title for Video
        vidAction  = 'Watch Now', //Action call for Video
        playClass  = (isPlaylist)? 'list':'';

    if(jQuery('.vidDisplay').length == 0 && jQuery('#show-footer').length > 0){

       var vidSize  = (jQuery('#show-footer').hasClass('mobile'))? ' width="290" height="170" ' : ' width="420" height="240" ',
           vidDefCode  = '<div class="vidDisplay '+ playClass +'">';

           if(!isPlaylist){
               vidDefCode +=    '<div class="vidTitle">You\'ll Love This Video</div><div class="vidBorder"></div><div class="clear"></div>';
               vidDefCode +=     '<div id="vidWrap">';
               vidDefCode +=    '</div>';
               vidDefCode +=    '<div class="wordWrap">';
               vidDefCode +=        '<div class="vidHed">'+ vidTitle +'</div>';
               vidDefCode +=        '<div class="vidDek">'+ vidAction +'</div>';
               vidDefCode +=    '</div>';
               vidDefCode += '<div class="clear"></div></div>';
           }
           else{
               vidDefCode +=    '<div class="vidTitle"><span>'+ vidAction +'</span><span class="title">'+ vidTitle +'</span></div><div class="vidBorder"></div><div class="clear"></div>';
               vidDefCode +=    '<div class="wordWrap">';
               vidDefCode +=    '</div>';
               vidDefCode +=     '<div id="vidWrap"></div>';
               vidDefCode += '<div class="clear"></div></div>';
            }

       jQuery('#show-footer').after(vidDefCode);

       var vidScript = document.createElement('script');
              vidScript.type  = 'text/javascript';
              vidScript.async = true;
              vidScript.src   = vidSource;

              var vidWrap = document.getElementById('vidWrap');
                  vidWrap.appendChild(vidScript);
       }

       var curUrl = window.location.href;

        if(curUrl.match('/beauty-products/best-of-beauty')){
            var twtPromo = '<div class="twtWrap">'
                twtPromo +=     '<div class="twtPromo">';
                twtPromo +=            '<div class="twtLead">';
                twtPromo +=                'What Best of Beauty products are you obsessing over?  Tell us on Twitter';
                twtPromo +=            '</div>';
                twtPromo +=            '<div class="twtBtn"><a href="https://twitter.com/hashtag/bestofbeauty" target="_BLANK">';
                twtPromo +=                '<img src="/css/i/icons/TwitterLogo_white.png">';
                twtPromo +=                '<span class="hashtag">#BestofBeauty</span>';
                twtPromo +=            '</a></div>';
                twtPromo +=     '</div>';
                twtPromo += '</div>';

                jQuery('.zerg-container').after(twtPromo);
        }
});

