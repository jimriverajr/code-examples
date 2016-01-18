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

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */

(function($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for ( var i=types.length; i; ) {
            $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i=types.length; i; ) {
                    this.addEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i=types.length; i; ) {
                    this.removeEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
        if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;

        // Gecko
        if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaY = 0;
            deltaX = -1*delta;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

})(jQuery);



/* Copyright (c) 2012 HyeonJe Jun (http://github.com/noraesae)
 * Licensed under the MIT License
 */
'use strict';
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    // The default settings for the plugin
    var defaultSettings = {
        wheelSpeed: 10,
        wheelPropagation: false,
        minScrollbarLength: null,
        useBothWheelAxes: false,
        useKeyboard: true
    };

    $.fn.perfectScrollbar = function (suppliedSettings, option) {

        return this.each(function () {
            // Use the default settings
            var settings = $.extend(true, {}, defaultSettings),
                $this = $(this);

            if (typeof suppliedSettings === "object") {
                // But over-ride any supplied
                $.extend(true, settings, suppliedSettings);
            } else {
                // If no settings were supplied, then the first param must be the option
                option = suppliedSettings;
            }

            // Catch options

            if (option === 'update') {
                if ($this.data('perfect-scrollbar-update')) {
                    $this.data('perfect-scrollbar-update')();
                }
                return $this;
            }
            else if (option === 'destroy') {
                if ($this.data('perfect-scrollbar-destroy')) {
                    $this.data('perfect-scrollbar-destroy')();
                }
                return $this;
            }

            if ($this.data('perfect-scrollbar')) {
                // if there's already perfect-scrollbar
                return $this.data('perfect-scrollbar');
            }

            // Or generate new perfectScrollbar

            // Set class to the container
            $this.addClass('ps-container');

            var $scrollbarXRail = $("<div class='ps-scrollbar-x-rail'></div>").appendTo($this),
                $scrollbarYRail = $("<div class='ps-scrollbar-y-rail'></div>").appendTo($this),
                $scrollbarX = $("<div class='ps-scrollbar-x'></div>").appendTo($scrollbarXRail),
                $scrollbarY = $("<div class='ps-scrollbar-y yscroll'></div>").appendTo($scrollbarYRail),
                scrollbarXActive,
                scrollbarYActive,
                scrollbarXDisplay,
                scrollbarYDisplay,
                containerWidth,
                containerHeight,
                contentWidth,
                contentHeight,
                scrollbarXWidth,
                scrollbarXLeft,
                scrollbarXBottom = parseInt($scrollbarXRail.css('bottom'), 10),
                scrollbarYHeight,
                scrollbarYTop,
                scrollbarYRight = parseInt($scrollbarYRail.css('right'), 10);

            var updateContentScrollTop = function () {
                var scrollTop = parseInt(scrollbarYTop * (contentHeight - containerHeight) / (containerHeight - scrollbarYHeight), 10);
                $this.scrollTop(scrollTop);
                //$this.css('scrollTop', scrollTop);
                $scrollbarXRail.css({bottom: scrollbarXBottom - scrollTop});
            };

            var updateContentScrollLeft = function () {
                var scrollLeft = parseInt(scrollbarXLeft * (contentWidth - containerWidth) / (containerWidth - scrollbarXWidth), 10);
                $this.scrollLeft(scrollLeft);
                $scrollbarYRail.css({right: scrollbarYRight - scrollLeft});
            };

            var getSettingsAdjustedThumbSize = function (thumbSize) {
                if (settings.minScrollbarLength) {
                    thumbSize = Math.max(thumbSize, settings.minScrollbarLength);
                }
                return thumbSize;
            };

            var updateScrollbarCss = function () {
                $scrollbarXRail.css({left: $this.scrollLeft(), bottom: scrollbarXBottom - $this.scrollTop(), width: containerWidth, display : scrollbarXDisplay});
                $scrollbarYRail.css({top: $this.scrollTop(), right: scrollbarYRight - $this.scrollLeft(), height: containerHeight, display : scrollbarYDisplay});
                $scrollbarX.css({left: scrollbarXLeft, width: scrollbarXWidth});
                $scrollbarY.css({top: scrollbarYTop, height: scrollbarYHeight});
            };

            var updateBarSizeAndPosition = function () {
                containerWidth = $this.width();
                containerHeight = $this.height();
                contentWidth = $this.prop('scrollWidth');
                var prevheight = $this.height();
                var prevScrollTop = $this.scrollTop();
                var prevScrollLeft =  $this.scrollLeft();
                $this.css("height", "auto");
                contentHeight = $this.height();
                $this.css("height", prevheight);
                $this.scrollTop(prevScrollTop);
                $this.scrollLeft(prevScrollLeft);

                if (containerWidth < contentWidth) {
                    scrollbarXActive = true;
                    scrollbarXWidth = getSettingsAdjustedThumbSize(parseInt(containerWidth * containerWidth / contentWidth, 10));
                    scrollbarXLeft = parseInt($this.scrollLeft() * (containerWidth - scrollbarXWidth) / (contentWidth - containerWidth), 10);
                }
                else {
                    scrollbarXActive = false;
                    scrollbarXWidth = 0;
                    scrollbarXLeft = 0;
                    $this.scrollLeft(0);
                }

                if (containerHeight < contentHeight) {
                    scrollbarYActive = true;
                    scrollbarYDisplay = "block";
                    scrollbarYHeight = getSettingsAdjustedThumbSize(parseInt(containerHeight * containerHeight / contentHeight, 10));
                    scrollbarYTop = parseInt($this.scrollTop() * (containerHeight - scrollbarYHeight) / (contentHeight - containerHeight), 10);
                }
                else {
                    scrollbarYActive = false;
                    scrollbarYDisplay = "none";
                    scrollbarYHeight = 0;
                    scrollbarYTop = 0;
                    $this.scrollTop(0);
                }

                var scrollUpdate = false;
                if (scrollbarYTop >= containerHeight - scrollbarYHeight) {
                    scrollbarYTop = containerHeight - scrollbarYHeight;
                    scrollUpdate = true;
                }
                if (scrollbarXLeft >= containerWidth - scrollbarXWidth) {
                    scrollbarXLeft = containerWidth - scrollbarXWidth;
                    scrollUpdate = true;
                }

                if(scrollUpdate) $this.trigger("perfectScrollbarUpdated");

                updateScrollbarCss();
            };

            var moveBarX = function (currentLeft, deltaX) {
                var newLeft = currentLeft + deltaX,
                    maxLeft = containerWidth - scrollbarXWidth;

                if (newLeft < 0) {
                    scrollbarXLeft = 0;
                }
                else if (newLeft > maxLeft) {
                    scrollbarXLeft = maxLeft;
                }
                else {
                    scrollbarXLeft = newLeft;
                }
                $scrollbarXRail.css({left: $this.scrollLeft()});
                $scrollbarX.css({left: scrollbarXLeft});
            };

            var moveBarY = function (currentTop, deltaY) {
                var newTop = currentTop + deltaY,
                    maxTop = containerHeight - scrollbarYHeight;

                if (newTop < 0) {
                    scrollbarYTop = 0;
                }
                else if (newTop > maxTop) {
                    scrollbarYTop = maxTop;
                }
                else {
                    scrollbarYTop = newTop;
                }
                $scrollbarYRail.css({top: $this.scrollTop()});
                $scrollbarY.css({top: scrollbarYTop});
            };

            var bindMouseScrollXHandler = function () {
                var currentLeft,
                    currentPageX;

                $scrollbarX.bind('mousedown.perfect-scrollbar', function (e) {
                    currentPageX = e.pageX;
                    currentLeft = $scrollbarX.position().left;
                    $scrollbarXRail.addClass('in-scrolling');
                    e.stopPropagation();
                    e.preventDefault();
                });

                $(document).bind('mousemove.perfect-scrollbar', function (e) {
                    if ($scrollbarXRail.hasClass('in-scrolling')) {
                        updateContentScrollLeft();
                        moveBarX(currentLeft, e.pageX - currentPageX);
                        e.stopPropagation();
                        e.preventDefault();
                    }
                });

                $(document).bind('mouseup.perfect-scrollbar', function (e) {
                    if ($scrollbarXRail.hasClass('in-scrolling')) {
                        $scrollbarXRail.removeClass('in-scrolling');
                    }
                });

                currentLeft =
                    currentPageX = null;
            };

            var bindMouseScrollYHandler = function () {
                var currentTop,
                    currentPageY;

                $scrollbarY.bind('mousedown.perfect-scrollbar', function (e) {
                    currentPageY = e.pageY;
                    currentTop = $scrollbarY.position().top;
                    $scrollbarYRail.addClass('in-scrolling');
                    e.stopPropagation();
                    e.preventDefault();

                });

                $(document).bind('mousemove.perfect-scrollbar', function (e) {
                    if ($scrollbarYRail.hasClass('in-scrolling')) {
                        updateContentScrollTop();
                        moveBarY(currentTop, e.pageY - currentPageY);
                        e.stopPropagation();
                        e.preventDefault();
                    }
                });

                $(document).bind('mouseup.perfect-scrollbar', function (e) {
                    if ($scrollbarYRail.hasClass('in-scrolling')) {
                        $scrollbarYRail.removeClass('in-scrolling');
                        CN.stats.omniture.trackAction('desktopRightRailModule',this);
                    }
                });

                currentTop =
                    currentPageY = null;
            };

            // bind handlers
            var bindMouseWheelHandler = function () {
                var shouldPreventDefault = function (deltaX, deltaY) {
                    var scrollTop = $this.scrollTop();
                    if (scrollTop === 0 && deltaY > 0 && deltaX === 0) {
                        return !settings.wheelPropagation;
                    }
                    else if (scrollTop >= contentHeight - containerHeight && deltaY < 0 && deltaX === 0) {
                        return !settings.wheelPropagation;
                    }

                    var scrollLeft = $this.scrollLeft();
                    if (scrollLeft === 0 && deltaX < 0 && deltaY === 0) {
                        return !settings.wheelPropagation;
                    }
                    else if (scrollLeft >= contentWidth - containerWidth && deltaX > 0 && deltaY === 0) {
                        return !settings.wheelPropagation;
                    }
                    return true;
                };

                var shouldPrevent = false;
                $this.bind('mousewheel.perfect-scrollbar', function (e, delta, deltaX, deltaY) {
                    if (!settings.useBothWheelAxes) {
                        // deltaX will only be used for horizontal scrolling and deltaY will
                        // only be used for vertical scrolling - this is the default
                        $this.scrollTop($this.scrollTop() - (deltaY * settings.wheelSpeed));
                        $this.scrollLeft($this.scrollLeft() + (deltaX * settings.wheelSpeed));
                    } else if (scrollbarYActive && !scrollbarXActive) {
                        // only vertical scrollbar is active and useBothWheelAxes option is
                        // active, so let's scroll vertical bar using both mouse wheel axes
                        if (deltaY) {
                            $this.scrollTop($this.scrollTop() - (deltaY * settings.wheelSpeed));
                        } else {
                            $this.scrollTop($this.scrollTop() + (deltaX * settings.wheelSpeed));
                        }
                    } else if (scrollbarXActive && !scrollbarYActive) {
                        // useBothWheelAxes and only horizontal bar is active, so use both
                        // wheel axes for horizontal bar
                        if (deltaX) {
                            $this.scrollLeft($this.scrollLeft() + (deltaX * settings.wheelSpeed));
                        } else {
                            $this.scrollLeft($this.scrollLeft() - (deltaY * settings.wheelSpeed));
                        }
                    }

                    // update bar position
                    updateBarSizeAndPosition();

                    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
                    if (shouldPrevent) {
                        e.preventDefault();
                    }
                });

                // fix Firefox scroll problem
                $this.bind('MozMousePixelScroll.perfect-scrollbar', function (e) {
                    if (shouldPrevent) {
                        e.preventDefault();
                    }
                });
            };

            var bindKeyboardHandler = function () {
                var shouldPreventDefault = function (deltaX, deltaY) {
                    var scrollTop = $this.scrollTop();
                    if (scrollTop === 0 && deltaY > 0 && deltaX === 0) {
                        return false;
                    }
                    else if (scrollTop >= contentHeight - containerHeight && deltaY < 0 && deltaX === 0) {
                        return false;
                    }

                    var scrollLeft = $this.scrollLeft();
                    if (scrollLeft === 0 && deltaX < 0 && deltaY === 0) {
                        return false;
                    }
                    else if (scrollLeft >= contentWidth - containerWidth && deltaX > 0 && deltaY === 0) {
                        return false;
                    }
                    return true;
                };

                var hovered = false;
                $this.bind('mouseenter.perfect-scrollbar', function (e) {
                    hovered = true;
                });
                $this.bind('mouseleave.perfect-scrollbar', function (e) {
                    hovered = false;
                });

                var shouldPrevent = false;
                $(document).bind('keydown.perfect-scrollbar', function (e) {
                    if (!hovered) {
                        return;
                    }

                    var deltaX = 0,
                        deltaY = 0;

                    switch (e.which) {
                        case 37: // left
                            deltaX = -3;
                            break;
                        case 38: // up
                            deltaY = 3;
                            break;
                        case 39: // right
                            deltaX = 3;
                            break;
                        case 40: // down
                            deltaY = -3;
                            break;
                        default:
                            return;
                    }

                    $this.scrollTop($this.scrollTop() - (deltaY * settings.wheelSpeed));
                    $this.scrollLeft($this.scrollLeft() + (deltaX * settings.wheelSpeed));

                    // update bar position
                    updateBarSizeAndPosition();

                    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
                    if (shouldPrevent) {
                        e.preventDefault();
                    }
                });
            };

            var bindRailClickHandler = function () {
                var stopPropagation = function (e) { e.stopPropagation(); };

                $scrollbarY.bind('click.perfect-scrollbar', stopPropagation);
                $scrollbarYRail.bind('click.perfect-scrollbar', function (e) {
                    var halfOfScrollbarLength = parseInt(scrollbarYHeight / 2, 10),
                        positionTop = e.pageY - $scrollbarYRail.offset().top - halfOfScrollbarLength,
                        maxPositionTop = containerHeight - scrollbarYHeight,
                        positionRatio = positionTop / maxPositionTop;

                    if (positionRatio < 0) {
                        positionRatio = 0;
                    } else if (positionRatio > 1) {
                        positionRatio = 1;
                    }

                    $this.scrollTop((contentHeight - containerHeight) * positionRatio);

                    // update bar position
                    updateBarSizeAndPosition();
                });

                $scrollbarX.bind('click.perfect-scrollbar', stopPropagation);
                $scrollbarXRail.bind('click.perfect-scrollbar', function (e) {
                    var halfOfScrollbarLength = parseInt(scrollbarXWidth / 2, 10),
                        positionLeft = e.pageX - $scrollbarXRail.offset().left - halfOfScrollbarLength,
                        maxPositionLeft = containerWidth - scrollbarXWidth,
                        positionRatio = positionLeft / maxPositionLeft;

                    if (positionRatio < 0) {
                        positionRatio = 0;
                    } else if (positionRatio > 1) {
                        positionRatio = 1;
                    }

                    $this.scrollLeft((contentWidth - containerWidth) * positionRatio);

                    // update bar position
                    updateBarSizeAndPosition();
                });
            };

            // bind mobile touch handler
            var bindMobileTouchHandler = function () {
                var applyTouchMove = function (differenceX, differenceY) {
                    $this.scrollTop($this.scrollTop() - differenceY);
                    $this.scrollLeft($this.scrollLeft() - differenceX);

                    // update bar position
                    updateBarSizeAndPosition();
                };

                var startCoords = {},
                    startTime = 0,
                    speed = {},
                    breakingProcess = null,
                    inGlobalTouch = false;

                $(window).bind("touchstart.perfect-scrollbar", function (e) {
                    inGlobalTouch = true;
                });
                $(window).bind("touchend.perfect-scrollbar", function (e) {
                    inGlobalTouch = false;
                });

                $this.bind("touchstart.perfect-scrollbar", function (e) {
                    var touch = e.originalEvent.targetTouches[0];

                    startCoords.pageX = touch.pageX;
                    startCoords.pageY = touch.pageY;

                    startTime = (new Date()).getTime();

                    if (breakingProcess !== null) {
                        clearInterval(breakingProcess);
                    }

                    e.stopPropagation();
                });
                $this.bind("touchmove.perfect-scrollbar", function (e) {
                    if (!inGlobalTouch && e.originalEvent.targetTouches.length === 1) {
                        var touch = e.originalEvent.targetTouches[0];

                        var currentCoords = {};
                        currentCoords.pageX = touch.pageX;
                        currentCoords.pageY = touch.pageY;

                        var differenceX = currentCoords.pageX - startCoords.pageX,
                            differenceY = currentCoords.pageY - startCoords.pageY;

                        applyTouchMove(differenceX, differenceY);
                        startCoords = currentCoords;

                        var currentTime = (new Date()).getTime();
                        speed.x = differenceX / (currentTime - startTime);
                        speed.y = differenceY / (currentTime - startTime);
                        startTime = currentTime;

                        e.preventDefault();
                    }
                });
                $this.bind("touchend.perfect-scrollbar", function (e) {
                    clearInterval(breakingProcess);
                    breakingProcess = setInterval(function () {
                        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
                            clearInterval(breakingProcess);
                            return;
                        }

                        applyTouchMove(speed.x * 30, speed.y * 30);

                        speed.x *= 0.8;
                        speed.y *= 0.8;
                    }, 10);
                });
            };

            var destroy = function () {
                $this.unbind('.perfect-scrollbar');
                $(window).unbind('.perfect-scrollbar');
                $(document).unbind('.perfect-scrollbar');
                $this.data('perfect-scrollbar', null);
                $this.data('perfect-scrollbar-update', null);
                $this.data('perfect-scrollbar-destroy', null);
                $scrollbarX.remove();
                $scrollbarY.remove();
                $scrollbarXRail.remove();
                $scrollbarYRail.remove();

                // clean all variables
                $scrollbarX =
                    $scrollbarY =
                        containerWidth =
                            containerHeight =
                                contentWidth =
                                    contentHeight =
                                        scrollbarXWidth =
                                            scrollbarXLeft =
                                                scrollbarXBottom =
                                                    scrollbarYHeight =
                                                        scrollbarYTop =
                                                            scrollbarYRight = null;
            };

            var ieSupport = function (version) {
                $this.addClass('ie').addClass('ie' + version);

                var bindHoverHandlers = function () {
                    var mouseenter = function () {
                        $(this).addClass('hover');
                    };
                    var mouseleave = function () {
                        $(this).removeClass('hover');
                    };
                    $this.bind('mouseenter.perfect-scrollbar', mouseenter).bind('mouseleave.perfect-scrollbar', mouseleave);
                    $scrollbarXRail.bind('mouseenter.perfect-scrollbar', mouseenter).bind('mouseleave.perfect-scrollbar', mouseleave);
                    $scrollbarYRail.bind('mouseenter.perfect-scrollbar', mouseenter).bind('mouseleave.perfect-scrollbar', mouseleave);
                    $scrollbarX.bind('mouseenter.perfect-scrollbar', mouseenter).bind('mouseleave.perfect-scrollbar', mouseleave);
                    $scrollbarY.bind('mouseenter.perfect-scrollbar', mouseenter).bind('mouseleave.perfect-scrollbar', mouseleave);
                };

                var fixIe6ScrollbarPosition = function () {
                    updateScrollbarCss = function () {
                        $scrollbarX.css({left: scrollbarXLeft + $this.scrollLeft(), bottom: scrollbarXBottom, width: scrollbarXWidth});
                        $scrollbarY.css({top: scrollbarYTop + $this.scrollTop(), right: scrollbarYRight, height: scrollbarYHeight});
                        $scrollbarX.hide().show();
                        $scrollbarY.hide().show();
                    };
                    updateContentScrollTop = function () {
                        var scrollTop = parseInt(scrollbarYTop * contentHeight / containerHeight, 10);
                        $this.scrollTop(scrollTop);
                        $scrollbarX.css({bottom: scrollbarXBottom});
                        $scrollbarX.hide().show();
                    };
                    updateContentScrollLeft = function () {
                        var scrollLeft = parseInt(scrollbarXLeft * contentWidth / containerWidth, 10);
                        $this.scrollLeft(scrollLeft);
                        $scrollbarY.hide().show();
                    };
                };

                if (version === 6) {
                    bindHoverHandlers();
                    fixIe6ScrollbarPosition();
                }
            };

            var supportsTouch = (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);

            var initialize = function () {
                var ieMatch = navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);
                if (ieMatch && ieMatch[1] === 'msie') {
                    // must be executed at first, because 'ieSupport' may addClass to the container
                    ieSupport(parseInt(ieMatch[2], 10));
                }

                updateBarSizeAndPosition();
                bindMouseScrollXHandler();
                bindMouseScrollYHandler();
                bindRailClickHandler();
                if (supportsTouch) {
                    bindMobileTouchHandler();
                }
                if ($this.mousewheel) {
                    bindMouseWheelHandler();
                }
                if (settings.useKeyboard) {
                    bindKeyboardHandler();
                }
                $this.data('perfect-scrollbar', $this);
                $this.data('perfect-scrollbar-update', updateBarSizeAndPosition);
                $this.data('perfect-scrollbar-destroy', destroy);
            };
            // initialize
            initialize();

            return $this;
        });
    };
}));




//History.js
typeof JSON!="object"&&(JSON={}),function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];a&&typeof a=="object"&&typeof a.toJSON=="function"&&(a=a.toJSON(e)),typeof rep=="function"&&(a=rep.call(t,e,a));switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";gap+=indent,u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1)u[n]=str(n,a)||"null";return i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]",gap=o,i}if(rep&&typeof rep=="object"){s=rep.length;for(n=0;n<s;n+=1)typeof rep[n]=="string"&&(r=rep[n],i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i))}else for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i));return i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}",gap=o,i}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","    ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r;gap="",indent="";if(typeof n=="number")for(r=0;r<n;r+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number")return str("",{"":e});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n]);return reviver.call(e,t,i)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(e,t){"use strict";var n=e.History=e.History||{},r=e.jQuery;if(typeof n.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");n.Adapter={bind:function(e,t,n){r(e).bind(t,n)},trigger:function(e,t,n){r(e).trigger(t,n)},extractEventData:function(e,n,r){var i=n&&n.originalEvent&&n.originalEvent[e]||r&&r[e]||t;return i},onDomLoad:function(e){r(e)}},typeof n.init!="undefined"&&n.init()}(window),function(e,t){"use strict";var n=e.document,r=e.setTimeout||r,i=e.clearTimeout||i,s=e.setInterval||s,o=e.History=e.History||{};if(typeof o.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");o.initHtml4=function(){if(typeof o.initHtml4.initialized!="undefined")return!1;o.initHtml4.initialized=!0,o.enabled=!0,o.savedHashes=[],o.isLastHash=function(e){var t=o.getHashByIndex(),n;return n=e===t,n},o.isHashEqual=function(e,t){return e=encodeURIComponent(e).replace(/%25/g,"%"),t=encodeURIComponent(t).replace(/%25/g,"%"),e===t},o.saveHash=function(e){return o.isLastHash(e)?!1:(o.savedHashes.push(e),!0)},o.getHashByIndex=function(e){var t=null;return typeof e=="undefined"?t=o.savedHashes[o.savedHashes.length-1]:e<0?t=o.savedHashes[o.savedHashes.length+e]:t=o.savedHashes[e],t},o.discardedHashes={},o.discardedStates={},o.discardState=function(e,t,n){var r=o.getHashByState(e),i;return i={discardedState:e,backState:n,forwardState:t},o.discardedStates[r]=i,!0},o.discardHash=function(e,t,n){var r={discardedHash:e,backState:n,forwardState:t};return o.discardedHashes[e]=r,!0},o.discardedState=function(e){var t=o.getHashByState(e),n;return n=o.discardedStates[t]||!1,n},o.discardedHash=function(e){var t=o.discardedHashes[e]||!1;return t},o.recycleState=function(e){var t=o.getHashByState(e);return o.discardedState(e)&&delete o.discardedStates[t],!0},o.emulated.hashChange&&(o.hashChangeInit=function(){o.checkerFunction=null;var t="",r,i,u,a,f=Boolean(o.getHash());return o.isInternetExplorer()?(r="historyjs-iframe",i=n.createElement("iframe"),i.setAttribute("id",r),i.setAttribute("src","#"),i.style.display="none",n.body.appendChild(i),i.contentWindow.document.open(),i.contentWindow.document.close(),u="",a=!1,o.checkerFunction=function(){if(a)return!1;a=!0;var n=o.getHash(),r=o.getHash(i.contentWindow.document);return n!==t?(t=n,r!==n&&(u=r=n,i.contentWindow.document.open(),i.contentWindow.document.close(),i.contentWindow.document.location.hash=o.escapeHash(n)),o.Adapter.trigger(e,"hashchange")):r!==u&&(u=r,f&&r===""?o.back():o.setHash(r,!1)),a=!1,!0}):o.checkerFunction=function(){var n=o.getHash()||"";return n!==t&&(t=n,o.Adapter.trigger(e,"hashchange")),!0},o.intervalList.push(s(o.checkerFunction,o.options.hashChangeInterval)),!0},o.Adapter.onDomLoad(o.hashChangeInit)),o.emulated.pushState&&(o.onHashChange=function(t){var n=t&&t.newURL||o.getLocationHref(),r=o.getHashByUrl(n),i=null,s=null,u=null,a;return o.isLastHash(r)?(o.busy(!1),!1):(o.doubleCheckComplete(),o.saveHash(r),r&&o.isTraditionalAnchor(r)?(o.Adapter.trigger(e,"anchorchange"),o.busy(!1),!1):(i=o.extractState(o.getFullUrl(r||o.getLocationHref()),!0),o.isLastSavedState(i)?(o.busy(!1),!1):(s=o.getHashByState(i),a=o.discardedState(i),a?(o.getHashByIndex(-2)===o.getHashByState(a.forwardState)?o.back(!1):o.forward(!1),!1):(o.pushState(i.data,i.title,encodeURI(i.url),!1),!0))))},o.Adapter.bind(e,"hashchange",o.onHashChange),o.pushState=function(t,n,r,i){r=encodeURI(r).replace(/%25/g,"%");if(o.getHashByUrl(r))throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");if(i!==!1&&o.busy())return o.pushQueue({scope:o,callback:o.pushState,args:arguments,queue:i}),!1;o.busy(!0);var s=o.createStateObject(t,n,r),u=o.getHashByState(s),a=o.getState(!1),f=o.getHashByState(a),l=o.getHash(),c=o.expectedStateId==s.id;return o.storeState(s),o.expectedStateId=s.id,o.recycleState(s),o.setTitle(s),u===f?(o.busy(!1),!1):(o.saveState(s),c||o.Adapter.trigger(e,"statechange"),!o.isHashEqual(u,l)&&!o.isHashEqual(u,o.getShortUrl(o.getLocationHref()))&&o.setHash(u,!1),o.busy(!1),!0)},o.replaceState=function(t,n,r,i){r=encodeURI(r).replace(/%25/g,"%");if(o.getHashByUrl(r))throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");if(i!==!1&&o.busy())return o.pushQueue({scope:o,callback:o.replaceState,args:arguments,queue:i}),!1;o.busy(!0);var s=o.createStateObject(t,n,r),u=o.getHashByState(s),a=o.getState(!1),f=o.getHashByState(a),l=o.getStateByIndex(-2);return o.discardState(a,s,l),u===f?(o.storeState(s),o.expectedStateId=s.id,o.recycleState(s),o.setTitle(s),o.saveState(s),o.Adapter.trigger(e,"statechange"),o.busy(!1)):o.pushState(s.data,s.title,s.url,!1),!0}),o.emulated.pushState&&o.getHash()&&!o.emulated.hashChange&&o.Adapter.onDomLoad(function(){o.Adapter.trigger(e,"hashchange")})},typeof o.init!="undefined"&&o.init()}(window),function(e,t){"use strict";var n=e.console||t,r=e.document,i=e.navigator,s=e.sessionStorage||!1,o=e.setTimeout,u=e.clearTimeout,a=e.setInterval,f=e.clearInterval,l=e.JSON,c=e.alert,h=e.History=e.History||{},p=e.history;try{s.setItem("TEST","1"),s.removeItem("TEST")}catch(d){s=!1}l.stringify=l.stringify||l.encode,l.parse=l.parse||l.decode;if(typeof h.init!="undefined")throw new Error("History.js Core has already been loaded...");h.init=function(e){return typeof h.Adapter=="undefined"?!1:(typeof h.initCore!="undefined"&&h.initCore(),typeof h.initHtml4!="undefined"&&h.initHtml4(),!0)},h.initCore=function(d){if(typeof h.initCore.initialized!="undefined")return!1;h.initCore.initialized=!0,h.options=h.options||{},h.options.hashChangeInterval=h.options.hashChangeInterval||100,h.options.safariPollInterval=h.options.safariPollInterval||500,h.options.doubleCheckInterval=h.options.doubleCheckInterval||500,h.options.disableSuid=h.options.disableSuid||!1,h.options.storeInterval=h.options.storeInterval||1e3,h.options.busyDelay=h.options.busyDelay||250,h.options.debug=h.options.debug||!1,h.options.initialTitle=h.options.initialTitle||r.title,h.options.html4Mode=h.options.html4Mode||!1,h.options.delayInit=h.options.delayInit||!1,h.intervalList=[],h.clearAllIntervals=function(){var e,t=h.intervalList;if(typeof t!="undefined"&&t!==null){for(e=0;e<t.length;e++)f(t[e]);h.intervalList=null}},h.debug=function(){(h.options.debug||!1)&&h.log.apply(h,arguments)},h.log=function(){var e=typeof n!="undefined"&&typeof n.log!="undefined"&&typeof n.log.apply!="undefined",t=r.getElementById("log"),i,s,o,u,a;e?(u=Array.prototype.slice.call(arguments),i=u.shift(),typeof n.debug!="undefined"?n.debug.apply(n,[i,u]):n.log.apply(n,[i,u])):i="\n"+arguments[0]+"\n";for(s=1,o=arguments.length;s<o;++s){a=arguments[s];if(typeof a=="object"&&typeof l!="undefined")try{a=l.stringify(a)}catch(f){}i+="\n"+a+"\n"}return t?(t.value+=i+"\n-----\n",t.scrollTop=t.scrollHeight-t.clientHeight):e||c(i),!0},h.getInternetExplorerMajorVersion=function(){var e=h.getInternetExplorerMajorVersion.cached=typeof h.getInternetExplorerMajorVersion.cached!="undefined"?h.getInternetExplorerMajorVersion.cached:function(){var e=3,t=r.createElement("div"),n=t.getElementsByTagName("i");while((t.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->")&&n[0]);return e>4?e:!1}();return e},h.isInternetExplorer=function(){var e=h.isInternetExplorer.cached=typeof h.isInternetExplorer.cached!="undefined"?h.isInternetExplorer.cached:Boolean(h.getInternetExplorerMajorVersion());return e},h.options.html4Mode?h.emulated={pushState:!0,hashChange:!0}:h.emulated={pushState:!Boolean(e.history&&e.history.pushState&&e.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),hashChange:Boolean(!("onhashchange"in e||"onhashchange"in r)||h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8)},h.enabled=!h.emulated.pushState,h.bugs={setHash:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),safariPoll:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),ieDoubleCheck:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<7)},h.isEmptyObject=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},h.cloneObject=function(e){var t,n;return e?(t=l.stringify(e),n=l.parse(t)):n={},n},h.getRootUrl=function(){var e=r.location.protocol+"//"+(r.location.hostname||r.location.host);if(r.location.port||!1)e+=":"+r.location.port;return e+="/",e},h.getBaseHref=function(){var e=r.getElementsByTagName("base"),t=null,n="";return e.length===1&&(t=e[0],n=t.href.replace(/[^\/]+$/,"")),n=n.replace(/\/+$/,""),n&&(n+="/"),n},h.getBaseUrl=function(){var e=h.getBaseHref()||h.getBasePageUrl()||h.getRootUrl();return e},h.getPageUrl=function(){var e=h.getState(!1,!1),t=(e||{}).url||h.getLocationHref(),n;return n=t.replace(/\/+$/,"").replace(/[^\/]+$/,function(e,t,n){return/\./.test(e)?e:e+"/"}),n},h.getBasePageUrl=function(){var e=h.getLocationHref().replace(/[#\?].*/,"").replace(/[^\/]+$/,function(e,t,n){return/[^\/]$/.test(e)?"":e}).replace(/\/+$/,"")+"/";return e},h.getFullUrl=function(e,t){var n=e,r=e.substring(0,1);return t=typeof t=="undefined"?!0:t,/[a-z]+\:\/\//.test(e)||(r==="/"?n=h.getRootUrl()+e.replace(/^\/+/,""):r==="#"?n=h.getPageUrl().replace(/#.*/,"")+e:r==="?"?n=h.getPageUrl().replace(/[\?#].*/,"")+e:t?n=h.getBaseUrl()+e.replace(/^(\.\/)+/,""):n=h.getBasePageUrl()+e.replace(/^(\.\/)+/,"")),n.replace(/\#$/,"")},h.getShortUrl=function(e){var t=e,n=h.getBaseUrl(),r=h.getRootUrl();return h.emulated.pushState&&(t=t.replace(n,"")),t=t.replace(r,"/"),h.isTraditionalAnchor(t)&&(t="./"+t),t=t.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),t},h.getLocationHref=function(e){return e=e||r,e.URL===e.location.href?e.location.href:e.location.href===decodeURIComponent(e.URL)?e.URL:e.location.hash&&decodeURIComponent(e.location.href.replace(/^[^#]+/,""))===e.location.hash?e.location.href:e.URL.indexOf("#")==-1&&e.location.href.indexOf("#")!=-1?e.location.href:e.URL||e.location.href},h.store={},h.idToState=h.idToState||{},h.stateToId=h.stateToId||{},h.urlToId=h.urlToId||{},h.storedStates=h.storedStates||[],h.savedStates=h.savedStates||[],h.normalizeStore=function(){h.store.idToState=h.store.idToState||{},h.store.urlToId=h.store.urlToId||{},h.store.stateToId=h.store.stateToId||{}},h.getState=function(e,t){typeof e=="undefined"&&(e=!0),typeof t=="undefined"&&(t=!0);var n=h.getLastSavedState();return!n&&t&&(n=h.createStateObject()),e&&(n=h.cloneObject(n),n.url=n.cleanUrl||n.url),n},h.getIdByState=function(e){var t=h.extractId(e.url),n;if(!t){n=h.getStateString(e);if(typeof h.stateToId[n]!="undefined")t=h.stateToId[n];else if(typeof h.store.stateToId[n]!="undefined")t=h.store.stateToId[n];else{for(;;){t=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof h.idToState[t]=="undefined"&&typeof h.store.idToState[t]=="undefined")break}h.stateToId[n]=t,h.idToState[t]=e}}return t},h.normalizeState=function(e){var t,n;if(!e||typeof e!="object")e={};if(typeof e.normalized!="undefined")return e;if(!e.data||typeof e.data!="object")e.data={};return t={},t.normalized=!0,t.title=e.title||"",t.url=h.getFullUrl(e.url?e.url:h.getLocationHref()),t.hash=h.getShortUrl(t.url),t.data=h.cloneObject(e.data),t.id=h.getIdByState(t),t.cleanUrl=t.url.replace(/\??\&_suid.*/,""),t.url=t.cleanUrl,n=!h.isEmptyObject(t.data),(t.title||n)&&h.options.disableSuid!==!0&&(t.hash=h.getShortUrl(t.url).replace(/\??\&_suid.*/,""),/\?/.test(t.hash)||(t.hash+="?"),t.hash+="&_suid="+t.id),t.hashedUrl=h.getFullUrl(t.hash),(h.emulated.pushState||h.bugs.safariPoll)&&h.hasUrlDuplicate(t)&&(t.url=t.hashedUrl),t},h.createStateObject=function(e,t,n){var r={data:e,title:t,url:n};return r=h.normalizeState(r),r},h.getStateById=function(e){e=String(e);var n=h.idToState[e]||h.store.idToState[e]||t;return n},h.getStateString=function(e){var t,n,r;return t=h.normalizeState(e),n={data:t.data,title:e.title,url:e.url},r=l.stringify(n),r},h.getStateId=function(e){var t,n;return t=h.normalizeState(e),n=t.id,n},h.getHashByState=function(e){var t,n;return t=h.normalizeState(e),n=t.hash,n},h.extractId=function(e){var t,n,r,i;return e.indexOf("#")!=-1?i=e.split("#")[0]:i=e,n=/(.*)\&_suid=([0-9]+)$/.exec(i),r=n?n[1]||e:e,t=n?String(n[2]||""):"",t||!1},h.isTraditionalAnchor=function(e){var t=!/[\/\?\.]/.test(e);return t},h.extractState=function(e,t){var n=null,r,i;return t=t||!1,r=h.extractId(e),r&&(n=h.getStateById(r)),n||(i=h.getFullUrl(e),r=h.getIdByUrl(i)||!1,r&&(n=h.getStateById(r)),!n&&t&&!h.isTraditionalAnchor(e)&&(n=h.createStateObject(null,null,i))),n},h.getIdByUrl=function(e){var n=h.urlToId[e]||h.store.urlToId[e]||t;return n},h.getLastSavedState=function(){return h.savedStates[h.savedStates.length-1]||t},h.getLastStoredState=function(){return h.storedStates[h.storedStates.length-1]||t},h.hasUrlDuplicate=function(e){var t=!1,n;return n=h.extractState(e.url),t=n&&n.id!==e.id,t},h.storeState=function(e){return h.urlToId[e.url]=e.id,h.storedStates.push(h.cloneObject(e)),e},h.isLastSavedState=function(e){var t=!1,n,r,i;return h.savedStates.length&&(n=e.id,r=h.getLastSavedState(),i=r.id,t=n===i),t},h.saveState=function(e){return h.isLastSavedState(e)?!1:(h.savedStates.push(h.cloneObject(e)),!0)},h.getStateByIndex=function(e){var t=null;return typeof e=="undefined"?t=h.savedStates[h.savedStates.length-1]:e<0?t=h.savedStates[h.savedStates.length+e]:t=h.savedStates[e],t},h.getCurrentIndex=function(){var e=null;return h.savedStates.length<1?e=0:e=h.savedStates.length-1,e},h.getHash=function(e){var t=h.getLocationHref(e),n;return n=h.getHashByUrl(t),n},h.unescapeHash=function(e){var t=h.normalizeHash(e);return t=decodeURIComponent(t),t},h.normalizeHash=function(e){var t=e.replace(/[^#]*#/,"").replace(/#.*/,"");return t},h.setHash=function(e,t){var n,i;return t!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.setHash,args:arguments,queue:t}),!1):(h.busy(!0),n=h.extractState(e,!0),n&&!h.emulated.pushState?h.pushState(n.data,n.title,n.url,!1):h.getHash()!==e&&(h.bugs.setHash?(i=h.getPageUrl(),h.pushState(null,null,i+"#"+e,!1)):r.location.hash=e),h)},h.escapeHash=function(t){var n=h.normalizeHash(t);return n=e.encodeURIComponent(n),h.bugs.hashEscape||(n=n.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),n},h.getHashByUrl=function(e){var t=String(e).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return t=h.unescapeHash(t),t},h.setTitle=function(e){var t=e.title,n;t||(n=h.getStateByIndex(0),n&&n.url===e.url&&(t=n.title||h.options.initialTitle));try{r.getElementsByTagName("title")[0].innerHTML=t.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(i){}return r.title=t,h},h.queues=[],h.busy=function(e){typeof e!="undefined"?h.busy.flag=e:typeof h.busy.flag=="undefined"&&(h.busy.flag=!1);if(!h.busy.flag){u(h.busy.timeout);var t=function(){var e,n,r;if(h.busy.flag)return;for(e=h.queues.length-1;e>=0;--e){n=h.queues[e];if(n.length===0)continue;r=n.shift(),h.fireQueueItem(r),h.busy.timeout=o(t,h.options.busyDelay)}};h.busy.timeout=o(t,h.options.busyDelay)}return h.busy.flag},h.busy.flag=!1,h.fireQueueItem=function(e){return e.callback.apply(e.scope||h,e.args||[])},h.pushQueue=function(e){return h.queues[e.queue||0]=h.queues[e.queue||0]||[],h.queues[e.queue||0].push(e),h},h.queue=function(e,t){return typeof e=="function"&&(e={callback:e}),typeof t!="undefined"&&(e.queue=t),h.busy()?h.pushQueue(e):h.fireQueueItem(e),h},h.clearQueue=function(){return h.busy.flag=!1,h.queues=[],h},h.stateChanged=!1,h.doubleChecker=!1,h.doubleCheckComplete=function(){return h.stateChanged=!0,h.doubleCheckClear(),h},h.doubleCheckClear=function(){return h.doubleChecker&&(u(h.doubleChecker),h.doubleChecker=!1),h},h.doubleCheck=function(e){return h.stateChanged=!1,h.doubleCheckClear(),h.bugs.ieDoubleCheck&&(h.doubleChecker=o(function(){return h.doubleCheckClear(),h.stateChanged||e(),!0},h.options.doubleCheckInterval)),h},h.safariStatePoll=function(){var t=h.extractState(h.getLocationHref()),n;if(!h.isLastSavedState(t))return n=t,n||(n=h.createStateObject()),h.Adapter.trigger(e,"popstate"),h;return},h.back=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.back,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.back(!1)}),p.go(-1),!0)},h.forward=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.forward,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.forward(!1)}),p.go(1),!0)},h.go=function(e,t){var n;if(e>0)for(n=1;n<=e;++n)h.forward(t);else{if(!(e<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(n=-1;n>=e;--n)h.back(t)}return h};if(h.emulated.pushState){var v=function(){};h.pushState=h.pushState||v,h.replaceState=h.replaceState||v}else h.onPopState=function(t,n){var r=!1,i=!1,s,o;return h.doubleCheckComplete(),s=h.getHash(),s?(o=h.extractState(s||h.getLocationHref(),!0),o?h.replaceState(o.data,o.title,o.url,!1):(h.Adapter.trigger(e,"anchorchange"),h.busy(!1)),h.expectedStateId=!1,!1):(r=h.Adapter.extractEventData("state",t,n)||!1,r?i=h.getStateById(r):h.expectedStateId?i=h.getStateById(h.expectedStateId):i=h.extractState(h.getLocationHref()),i||(i=h.createStateObject(null,null,h.getLocationHref())),h.expectedStateId=!1,h.isLastSavedState(i)?(h.busy(!1),!1):(h.storeState(i),h.saveState(i),h.setTitle(i),h.Adapter.trigger(e,"statechange"),h.busy(!1),!0))},h.Adapter.bind(e,"popstate",h.onPopState),h.pushState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.pushState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.pushState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0},h.replaceState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.replaceState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.replaceState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0};if(s){try{h.store=l.parse(s.getItem("History.store"))||{}}catch(m){h.store={}}h.normalizeStore()}else h.store={},h.normalizeStore();h.Adapter.bind(e,"unload",h.clearAllIntervals),h.saveState(h.storeState(h.extractState(h.getLocationHref(),!0))),s&&(h.onUnload=function(){var e,t,n;try{e=l.parse(s.getItem("History.store"))||{}}catch(r){e={}}e.idToState=e.idToState||{},e.urlToId=e.urlToId||{},e.stateToId=e.stateToId||{};for(t in h.idToState){if(!h.idToState.hasOwnProperty(t))continue;e.idToState[t]=h.idToState[t]}for(t in h.urlToId){if(!h.urlToId.hasOwnProperty(t))continue;e.urlToId[t]=h.urlToId[t]}for(t in h.stateToId){if(!h.stateToId.hasOwnProperty(t))continue;e.stateToId[t]=h.stateToId[t]}h.store=e,h.normalizeStore(),n=l.stringify(e);try{s.setItem("History.store",n)}catch(i){if(i.code!==DOMException.QUOTA_EXCEEDED_ERR)throw i;s.length&&(s.removeItem("History.store"),s.setItem("History.store",n))}},h.intervalList.push(a(h.onUnload,h.options.storeInterval)),h.Adapter.bind(e,"beforeunload",h.onUnload),h.Adapter.bind(e,"unload",h.onUnload));if(!h.emulated.pushState){h.bugs.safariPoll&&h.intervalList.push(a(h.safariStatePoll,h.options.safariPollInterval));if(i.vendor==="Apple Computer, Inc."||(i.appCodeName||"")==="Mozilla")h.Adapter.bind(e,"hashchange",function(){h.Adapter.trigger(e,"popstate")}),h.getHash()&&h.Adapter.onDomLoad(function(){h.Adapter.trigger(e,"hashchange")})}},(!h.options||!h.options.delayInit)&&h.init()}(window)

if (typeof CN === 'undefined' || !CN) {
    var CN = {};
}

CN.tnvSlide = {

    sliderData    : [],
    totalSlides   : 0,
    currentSlide  : 0,
    currentIndex  : 0,
    currentshift  : 0,
    adInterval    : 7,
    userCount     : 0,
    imgsPreloaded : 1,
    isReplay      : false,
    pageLayout    : '',
    options       : null,
    adTimer       : null,
    isInsider     : false,


    /*Controls*/

    $next           : null,
    $prev           : null,
    $viewall        : null,
    $viewallThumbs  : null,
    $slideThumbs    : null,
    intro           : null,
    prevHandle      : false,

    /*Content*/

    $header         : null,
    $subHeader      : null,
    $byline         : null,
    $photobyline    : null,
    $bodyHead       : null,
    $body           : null,
    $img            : null,
    $imgCon         : null,
    $lastSlideCon   : null,
    $count          : null,
    $mainBody       : null,
    $footer         : null,
    $introCon       : null,
    $viewLarger     : null,
    $slideCon       : null,
    $caption        : null,


    init : function(data, options){
        this.options = options;

        this.$next            = jQuery(this.options.next),
            this.$prev            = jQuery(this.options.prev),
            this.$viewall         = jQuery(this.options.viewall),
            this.$slideThumbs     = jQuery(this.options.slideThumbs);
        this.$footer          = jQuery(this.options.footer);
        this.$mainBody        = jQuery(this.options.mainBody);

        this.$header          = jQuery(this.options.header),
            this.$subHeader       = jQuery(this.options.subHeader),
            this.$byline          = jQuery(this.options.byline),
            this.$photobyline     = jQuery(this.options.photobyline),
            this.$bodyHead        = jQuery(this.options.bodyHead),
            this.$body            = jQuery(this.options.body),
            this.$img             = jQuery(this.options.img);
        this.$imgCon          = jQuery(this.options.imgCon);
        this.$count           = jQuery(this.options.count);
        this.$lastSlideCon    = jQuery(this.options.lastSlideCon);
        this.$introCon        = jQuery(this.options.introCon);
        this.$viewLarger      = jQuery(this.options.viewLarger);
        this.$bodyheadCon     = jQuery(this.options.bodyheadCon);
        this.$slideCon        = jQuery(this.options.slideCon);
        this.$caption          = jQuery(this.options.caption);

        this.adInterval       = (this.options.hasOwnProperty('adInterval'))? this.options.adInterval:this.adInterval;
        this.isInsider       = (this.options.hasOwnProperty('isInsider'))? this.options.isInsider:this.isInsider;
        //this.intro      = options.intro;
        this.pageLayout = options.pageLayout;
        this.introData = options.introData;
        this.listdata = options.listdata;
        this.isIntro();
        this.prepData(data);

        jQuery('.navigation .slidetotal').html(this.totalSlides);

        this.setXButton();
        this.getSlideCMs();
        this.prepLastSlide();
        this.prepIntro();
        if(CN.isMobile) this.doMobileIntroOverlay();
        this.setSlowLoadFooterAd();

        this.setStickyHeader();
        if((!this.isInsider)&&CN.isMobile) this.mobileStickyAdAction();
        History.init();

        this.buildSlideshow();

        /*for sponsored ads only*/
        if (CN.isMobile){
            jQuery("#sponsored h1:header").text(function(index, text){
                if(text.length > 41){
                    jQuery(this).text(jQuery(this).text().substr(0,41) + "...");
                }
            });
        }

    },

    isIntro : function(){
        if(jQuery.isEmptyObject(this.introData)){
            this.intro = false;
            return;
        }

        if(this.introData === null){
            this.intro = false;
            return;
        }

        if(this.introData.body['xml-fragment'].text === ''){
            this.intro = false;
            return;
        }

        if(typeof(this.introData.imgUrl) == "undefined" || this.introData.imgUrl === '' || this.introData.imgUrl == null){
            this.intro = false;
            return;
        }

        if(this.introData.length === 0){
            this.intro = false;
            return;
        }

        this.intro = true;
    },


    prepData : function(data){
        var that = this;

        if(this.intro){

            var imgList = {};
            imgList['main'] = {};
            imgList['main'].img =  this.introData.imgUrl;
            imgList['main'].altText =  '';

            var slidePrep = {};
            slidePrep.imgs       = imgList;
            //slidePrep.sl_intro    = this.introData.body['xml-fragment'].text;
            slidePrep.sl_body    = null;
            slidePrep.isIntro    = true;
            slidePrep.imgCaption = null;

            that.sliderData.push(slidePrep);
        }



        jQuery.each(data, function(key, value){
            that.sliderData.push(that.sliderPrepper(value.item));
        });

        this.totalSlides  = this.sliderData.length + 1;
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

            if( typeof(data.that.sliderData[data.that.imgsPreloaded].imgs.enlargedImage) !== 'undefined'){
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



        slidePrep.sl_body    = (typeof(prep.body.text) == "object")? null : prep.body.text;
        slidePrep.sl_head     = (typeof(prep.header.html.text) === "object")? null : prep.header.html.text;
        slidePrep.sl_summary = prep.search.summary;
        slidePrep.sl_title   = prep.search.title;
        slidePrep.sl_lead    = (typeof(prep.body.lead) === "object" || prep.body.lead.length === 0)? null : prep.body.lead;
        slidePrep.sl_credits = (typeof(prep.photoCredits) === "object")? null : prep.photoCredits;
        slidePrep.isIntro    = false;



        if(prep.mediaItems.mediaItem.length > 1){
            slidePrep.imgs       = getImages(prep.mediaItems.mediaItem[0]);
            slidePrep.imgCaption = (typeof(prep.mediaItems.mediaItem[0].caption) === "object")? null : prep.mediaItems.mediaItem[0].caption;

            for (var i=0;i<prep.mediaItems.mediaItem.length;i++){
                if(prep.mediaItems.mediaItem[i].type== 'seal'){
                    slidePrep.imgbannertxt = (typeof(prep.mediaItems.mediaItem[i].caption) === "object")? null : prep.mediaItems.mediaItem[i].caption;
                    break;
                }
            }
        }
        else{
            slidePrep.imgs  = getImages(prep.mediaItems.mediaItem);
            slidePrep.imgCaption = (typeof(prep.mediaItems.mediaItem.caption) === "object")? null : prep.mediaItems.mediaItem.caption;
            slidePrep.imgbannertxt = '';
        }


        function getImages(images){

            var imgList = {};

            jQuery.each(images.formats.format, function(key, value){
                imgList[value.name] = {};
                imgList[value.name].img =  value.source;
                imgList[value.name].altText =  images.altText;

                if(that.imgsPreloaded <= 6 && value.name === "main"){
                    that.imgPl(value.source);
                    that.imgsPreloaded++;
                }
            });

            return imgList;
        }

        return slidePrep;
    },

    prepIntro : function(){
        this.$introCon.find('.img-shadow').append('<a id="list-view-slideshow" class="list-view-slideshow" href="#">start slideshow ></a>');
        this.$introCon.find('.intro-text').append('<a id="list-view-slideshow-bottom" class="list-view-slideshow" href="#">start slideshow ></a>');
    },

    doMobileIntroOverlay : function(){

        /*Slideshow redesign Mobile
         * Create intro layer in mobile for slideshow.
         * This needs to be changed when the intro layer code is stable.
         */
        var closeSlideshowIntro = function(){
            jQuery('#slide-mobile-intro').addClass('hide');
            CN.stats.omniture.trackAction('mobileStartSlideshow',this);
        };

        var copyIntoContainer = function(wrapper, content, container){
            if(content){
                if(wrapper) wrapper.append(jQuery("<div>"+content+"</div>").text());
                else wrapper = content;
                wrapper.appendTo(container);
            }
        };

        var $listBody = jQuery('.list-body'),
            $intro = jQuery('<div id="slide-mobile-intro" class="site-narrow"></div>');

        if(CN.site.teenvogue.isInsider){
            $listBody.find('.headers-container').appendTo($intro).end().end();
            jQuery('#yslideHed .sub-header').appendTo($intro).end().end();
            jQuery('#yslideHed .byline').appendTo($intro).end().end();
        }else{
            copyIntoContainer(jQuery('<div class="sponsored-by">'), jQuery('.sponsored-text a').first().text(), $intro);
            copyIntoContainer(jQuery('<h1 class="content-headline">'), jQuery('.content-headline').first().html(), $intro);
            jQuery('#yslideHed .byline').first().appendTo($intro).end().end();
//            var photoBy = this.$photobyline.first().clone();
//            this.$photobyline.add(photoBy);
//            photoBy.appendTo($intro);
        }
        jQuery('<a href="#" class="list-view-slideshow" id="slideshow-intro-layer">start slideshow</a>').appendTo($intro);

        jQuery('#items-container').append($intro.wrapInner('<div class="intro-wrap"></div>').wrapInner('<div class="center-wrap"></div>'));

        $intro.on('touchmove', closeSlideshowIntro);
        $intro.find(".list-view-slideshow").on('click', closeSlideshowIntro);

        /*End Slideshow redesign Mobile*/
    },

    showIntro : function(){

        this.$viewallThumbs = jQuery(this.options.viewallThumbs),
            this.$slideThumbs     = jQuery(this.options.slideThumbs);
        this.$footer        = jQuery(this.options.footer);
        this.$mainBody      = jQuery(this.options.mainBody);
        this.$imgCon         = jQuery(this.options.imgCon);
        this.$lastSlideCon  = jQuery(this.options.lastSlideCon);

        this.closeLarger();
        this.$imgCon.fadeOut();
        this.$viewallThumbs.fadeOut()
        this.$footer.fadeOut();
        this.$slideThumbs.fadeOut();
        this.$mainBody.fadeOut();

        jQuery('body').addClass('slideshow-intro');
        this.$introCon.show();
        var that = this;

        jQuery('.img-shadow').click(function(){
            that.showSlides();
        });

    },

    buildSlideshow : function(){

        if(!CN.isMobile){
            jQuery('.slideshow-items').prepend('<div class="previous site-full"><a href="#" title="Previous slide">Previous</a></div>');
            jQuery('.slideshow-items').prepend('<div class="next site-full"><a href="#" title="Next slide">Next</a></div>');
        }else{
            this.$img.prepend('<div class="previous-button"><a href="#" title="Previous slide">&nbsp;</a></div>');
            this.$img.prepend('<div class="next-button"><a href="#" title="Next slide">&nbsp;</a></div>');
        }



        this.createThumbs();
        this.createViewall();
        this.initBindings();
        if(window.location.href.match(/slide=/)){
            var query = window.location.href.match(/slide=(\d{1,})/)[0];
            var curHashSlide = query.replace(/slide=/, ''),
                that = this;

            if(curHashSlide < this.totalSlides){
                jQuery(document).trigger('slideChange', {slide : parseInt(curHashSlide), that : that});
            }
            this.showSlides();
        }
        else{
            var that = this;
            jQuery(document).trigger('slideChange', {slide : 1, that : that});
        }
        this.showSlides();
    },

    showSlides    :    function(){

        if(this.$introCon.is(':visible')){
            this.$introCon.fadeOut();
            jQuery('body').removeClass('slideshow-intro');
            CN.stats.omniture.setPaginationValue('intro_hide').trackAjaxPage();
            CN.stats.omniture.setPaginationValue('slide' + (this.currentSlide)).trackAjaxPage();
            this.setCurSlideUrl();
        }

        if(this.currentSlide == this.totalSlides){
            this.$imgCon.hide();
            this.$lastSlideCon.show();
        }
        else{
            this.$imgCon.fadeIn();
        }

        this.$viewallThumbs.fadeOut();
        this.$slideCon.fadeIn();
        jQuery('.next-button').show();
        jQuery('.previous-button').show();
        //this.$imgCon.fadeIn();
        this.$footer.fadeIn();
        this.$slideThumbs.fadeIn();
        this.$mainBody.fadeIn();
        //jQuery('#AMS_TNV_GLOBAL_SLIDESHOW_RIGHTRAIL_A').hide();
        jQuery('#yslideCon').fadeIn();
    },

    initBindings : function(){

        jQuery(document).bind('slideChange', this.slideChange);
        jQuery(document).bind('preloadImg', this.preloadImg);
        jQuery(document).bind('adRefresh', this.refreshAds);
        jQuery(document).bind('interstitialAdCall', this.doInterstitialAd);
        jQuery(document).bind('doPreload', this.doPL);

        jQuery('.utilities li:not(".expand-menu"):not(".livefyre-comment")').mouseenter(function(){ jQuery(this).children().addClass('detail-socialicon-show')});
        jQuery('.utilities li:not(".expand-menu"):not(".livefyre-comment")').mouseleave(function(){ jQuery(this).children().removeClass('detail-socialicon-show')});
        this.clickBindings();
    },

    clickBindings : function(){

        var that = this;
        var previous_slide_button = (CN.isMobile ? '.previous-button' : this.options.prev);
        var next_slide_button = (CN.isMobile ? '.next-button' : this.options.next);

        jQuery(document).delegate(previous_slide_button, 'click', function(e){
            goToPreviousSlide(e);
            COMSCORE.beacon({c1:"2", c2:"6035094"});
            //CN.site.teenvogue.TrackingHelper.fireClickTracking(previous_slide_button, 'leftArrow');

            //var newSlideNumber = that.currentSlide + 1
            //PARSELY.beacon.trackPageView({
            //url: "http://"+location.host + location.pathname + "?slide=" + slide,
            //urlref: "http://"+location.host + location.pathname + "?slide=" + newSlideNumber,
            //js: 1,
            //action_name: "Previous"
            //});
        });

        jQuery(document).delegate(next_slide_button, 'click', function(e){
            goToNextSlide(e);
            COMSCORE.beacon({c1:"2", c2:"6035094"});
            //CN.site.teenvogue.TrackingHelper.fireClickTracking(next_slide_button, 'rightArrow');

            //var newSlideNumber = that.currentSlide - 1
            //PARSELY.beacon.trackPageView({
            //url: "http://"+location.host + location.pathname + "?slide=" + slide,
            //urlref: "http://"+location.host + location.pathname + "?slide=" + newSlideNumber,
            //js: 1,
            //action_name: "Next"
            //});
        });

        this.$slideThumbs.bind('mouseover', function(){
            if(jQuery(this).attr('data-index') >= that.imgsPreloaded){
                jQuery(document).trigger('preloadImg', {slide : that.sliderData[jQuery(this).parent().attr('data-index')].imgs.enlargedImage.img, that : that});
            }
        });

        this.$lastSlideCon.find('.ss-replay').bind('click',function(){
            that.replayShow();
            return false;
        });

        this.$slideThumbs.find('li').bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            jQuery(document).trigger('slideChange', {slide : parseInt(jQuery(this).attr('data-index')), that : that});
            CN.stats.omniture.trackAction('carousel',this);
        });

        this.$slideThumbs.find('.jcarousel-prev').bind('click', function(){
            that.animateThumbs('prev');
        });

        this.$slideThumbs.find('.jcarousel-next').bind('click', function(){
            that.animateThumbs('next');
        });

        this.$viewall.bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            that.showViewall();
            if(!CN.site.teenvogue.isInsider) CN.stats.omniture.trackAction('viewThumbnails',this);
            else CN.stats.omniture.trackActionEvar('click', this, 'eVar10', "viewThumbnails");
        });

        this.$viewLarger.bind('click', function(e){
            CN.stats.omniture.setPaginationValue('slideshow_enlarge').trackAjaxPage();
            e.preventDefault();
            e.stopPropagation();
            that.buildLarger();
        });

        jQuery(document).delegate('.list-view-slideshow', 'click', function(e){
            e.preventDefault();
            e.stopPropagation();

            that.showSlides();
        });

        jQuery('.slideshow-viewall-close').bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            that.showSlides();
        });

        //KeyDown listener that allows arrow navigation in desktop slideshows.
        if (!CN.isMobile) {
            jQuery(document).keydown(function(e) {
                if (e.keyCode == 39) {
                //    CN.site.teenvogue.TrackingHelper.fireClickTracking(this, 'rightArrowKS');
                    goToNextSlide(e);
                } else if (e.keyCode == 37) {
                //    CN.site.teenvogue.TrackingHelper.fireClickTracking(this, 'leftArrowKS');
                    goToPreviousSlide(e);
                }
            });
        }

        function goToNextSlide(e) {
            e.preventDefault();
            e.stopPropagation();

            var slide = (that.currentSlide == 'intro')? 0 : that.currentSlide;

            if(slide == that.totalSlides) return;

            if(that.isReplay && (that.currentSlide == 1) && jQuery('#interAd').is(':visible') ){
                jQuery(document).trigger('slideChange', {slide : slide, that : that});
            } else {
                jQuery(document).trigger('slideChange', {slide : slide + 1, that : that});
            }

            that.isReplay = false;

            jQuery(document).ready(function() {
                var oldTitle = document.title;
                var newtitle = oldTitle.split('::');
                if (newtitle[1]!=null) {
                    document.title = newtitle[1];
                }
            });
        }

        function goToPreviousSlide(e) {
            e.preventDefault();
            e.stopPropagation();

            var slide = (that.currentSlide == 'intro')? 0 : that.currentSlide;

            if(that.currentSlide > 1){
                jQuery(document).trigger('slideChange', {slide : slide - 1, that : that});
            }

            if(that.intro && that.currentSlide > 0){
                jQuery(document).trigger('slideChange', {slide : slide-1, that : that});
            }

            jQuery(document).ready(function() {
                var oldTitle = document.title;
                var newtitle = oldTitle.split('::');
                if (newtitle[1]!=null) {
                    document.title = newtitle[1];
                }
            });
        }

        //social-tall
//        if(!this.isInsider) {
//            var contentPage = jQuery('body.list');
//            if(contentPage.length <= 0) {
//                jQuery(document).delegate('.social-tall-open', 'click', function () {
//                    jQuery('.social-tall .utilities li').animate({
//                        "text-indent": "-9999px",
//                        "height": "26px"
//                    }, 500);
//
//                    jQuery('.social-tall .utilities li').removeClass('blank');
//                    jQuery('.social-tall .utilities').css('z-index', "-1");
//                    jQuery('.social-tall .utilities').animate({"top": "-420px"}, 800);
//                    jQuery(this).removeClass('social-tall-open');
//
//                    jQuery('.social-tall').bind('click', function (e) {
//                        e.preventDefault();
//                        e.stopPropagation();
//
//                        jQuery(this).addClass('social-tall-open');
//                        jQuery('.social-tall .utilities').css('z-index', "-1");
//                        jQuery('.social-tall .utilities').animate({"top": "62px"}, 800, function () {
//                            jQuery('.social-tall .utilities').css('z-index', "1");
//                        });
//                        jQuery('.social-tall').unbind('click');
//                        CN.site.teenvogue.TrackingHelper.trackSocialBar(this);
//                    });
//                });
//
//                jQuery('.social-tall').bind('click', function (e) {
//                    e.preventDefault();
//                    e.stopPropagation();
//
//                    jQuery(this).addClass('social-tall-open');
//                    jQuery('.social-tall .utilities').css('z-index', "-1");
//                    jQuery('.social-tall .utilities').animate({"top": "62px"}, 800, function () {
//                        jQuery('.social-tall .utilities').css('z-index', "1");
//                    });
//                    jQuery('.social-tall').unbind('click');
//                    CN.site.teenvogue.TrackingHelper.trackSocialBar(this);
//                });
//            }
//            jQuery('.social-tall .utilities li:not(".utility-email"):not(".expand-menu"):not(".utility-livefyre-comment")').hover(function(){
//                if(!jQuery(this).hasClass('blank')){
//                        jQuery('.social-tall .utilities li:not(".expand-menu"):not(".utility-livefyre-comment")').css({
//                        "text-indent" : "-9999px",
//                        "height": "20px"
//                        });
//
//                        jQuery('.social-tall .utilities li').removeClass('blank');
//
//                        jQuery(this).addClass('blank');
//
//                        jQuery(this).css({
//                            "text-indent" : 0,
//                            "height": "65px"
//                        });
//                    }
//            },function(){
//                jQuery('.social-tall .utilities li:not(".expand-menu"):not(".utility-livefyre-comment")').css({
//                "text-indent" : "-9999px",
//                "height": "20px"
//                });
//
//                jQuery('.social-tall .utilities li').removeClass('blank');
//
//            }, (function(){
//                jQuery('.social-tall .utilities li.expand-menu').css({"text-indent":"0"});
//            })()
//                ,(function(){
//                jQuery('.social-tall .utilities li.utility-livefyre-comment').css({"text-indent":"0"});
//                })());
//        }
//            jQuery('.social-anchor').bind('click', function(e){
//                e.preventDefault();
//                e.stopPropagation();
//
//                var closeAnim = (jQuery('#show-footer .viewall').length > 0)? 94 : 110;
//                var barAnim = (jQuery('#show-footer .viewall').length > 0)? -200 : -185;
//
//                jQuery('.social-anchor-el .site-narrow .utilities').animate({"left": barAnim + "px"}, 800);
//                jQuery('.social-anchor-el .site-narrow .close-social').animate({"left": closeAnim + "px"}, 800);
//
//                jQuery('.social-anchor-el .site-narrow .close-social').bind('click', function(){
//                        jQuery('.social-anchor-el .site-narrow .utilities li').animate({
//                        "text-indent" : "-9999px",
//                        "width": "26px"
//                        }, 500);
//                        jQuery('.social-anchor-el .site-narrow .utilities li').removeClass('blank');
//                        jQuery('.social-anchor-el .site-narrow .utilities').animate({"left": "241px"}, 800);
//                        jQuery('.social-anchor-el .site-narrow .close-social').animate({"left": "136px"}, 800);
//                        CN.stats.omniture.trackAction('mobileShareBar',this);
//                });
//                if(!CN.site.teenvogue.isInsider) {
//                    jQuery('.social-anchor-el .site-narrow .utilities li:not(".utility-email"):not(".expand-menu"):not(".livefyre-comment")').bind('click', function(e){
//                        e.preventDefault();
//                        e.stopPropagation();
//
//                        if(!jQuery(this).hasClass('blank')){
//                            jQuery('.social-anchor-el .site-narrow .utilities li').animate({
//                            "text-indent" : "-9999px",
//                            "width": "26px"
//                            }, 500);
//
//                            jQuery('.social-anchor-el .site-narrow .utilities li').removeClass('blank');
//
//                            jQuery(this).addClass('blank');
//
//                            jQuery(this).animate({
//                                "text-indent" : 0,
//                                "width": "90px"
//                            }, 500);
//                        }
//
//                    });
//                }
//                CN.stats.omniture.trackAction('mobileShareBar',this);
//            });
        this.omniTracking();
    },

    omniTracking : function(){
//        jQuery('.livefyre-commentcount').bind('click', function(){
//            CN.stats.omniture.trackAction('viewComments',this);
//        });

        jQuery('.story-hed .rubric a').bind('click', function(){
            CN.stats.omniture.trackAction('desktopRubricClicks',this);
        });

        jQuery('.contributor a').bind('click', function(){
            CN.stats.omniture.trackAction('bylineName',this);
        });

        jQuery('.header-logo').bind('click', function(){
            CN.stats.omniture.trackAction('desktopLogoClicks',this);
        });

        jQuery('.features .feature a').bind('click', function(){
            CN.stats.omniture.trackAction('endslideRecList',this);
        });

        jQuery('.global-nav ul li a').bind('click', function(){
            CN.stats.omniture.trackAction('desktopNavClicks',this);
        });

        jQuery('.logo-sm a').bind('click', function(){
            CN.stats.omniture.trackAction('mobileLogoClicks',this);
        });

        jQuery('.sponsored-text a').bind('click', function(){
            CN.stats.omniture.trackAction('sponsoredFeature',this);
        });

        jQuery(document).delegate('.ps-scrollbar-y-rail','click', function(){CN.stats.omniture.trackAction('desktopRightrailModule',this);});
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
                if (!canceled && abs(dx) > 120) {
                    // Move to the next slide if necessary
                    if (dx > 0) {
                        //Nothing
                        if(CN.tnvSlide.isReplay && (CN.tnvSlide.currentSlide == 1) && jQuery('#interAd').is(':visible') ){
                            jQuery(document).trigger('slideChange', {slide : CN.tnvSlide.currentSlide, that : CN.tnvSlide});
                        }
                        else{
                            jQuery(document).trigger('slideChange', {slide : CN.tnvSlide.currentSlide + 1, that : CN.tnvSlide});
                        }
                    } else {
                        jQuery(document).trigger('slideChange', {slide : CN.tnvSlide.currentSlide - 1, that : CN.tnvSlide});
                    }
                } else {
                    //Dont do anything
                    jQuery(document.getElementById('swipeArea')).attr('style', '').addClass('tablet-full-reset');
                }
            }

            jQuery('#swipeArea').unbind();
            jQuery('#media-count-2-container').unbind();

            jQuery('#swipeArea').bind(events.down,start)
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

    setSlowLoadFooterAd: function(){
        if (!CN.site.teenvogue.isInsider) {
            var isHidden = false;
            jQuery(window).scroll(function () {
                var positionTopScreen = jQuery(this).scrollTop(),
                    windowSize = jQuery(this).height(),
                    positionHideComments = jQuery('#toggle_comments').offset().top,
                    footer = jQuery('#AMS_TNV_GLOBAL_FOOTER');

                if((windowSize+positionTopScreen) >= positionHideComments){
                    if(!isHidden) {
                        footer.css({"display":"block"});
                        isHidden = true;
                    }
                }
                else if(isHidden || !footer.css('display')==="block") {
                    footer.css({"display":"none"});
                    isHidden = false;
                }
            });
        }
    },

    setStickyHeader: function(){
        if (!CN.site.teenvogue.isInsider && !CN.isMobile) {
            var isHidden = false;
            jQuery(window).scroll(function () {
                var positionTopScreen = jQuery(this).scrollTop(),
                    positionArrowSlide = jQuery("[title='Previous slide']").offset().top,
                    header = jQuery('body.list').find('header.shell').eq(0),
                    headerHeight = header.height(),
                    positionAd300x250 = jQuery('#listTop300x250_frame').offset().top,
                    limitStickyHeader = (positionAd300x250 < positionArrowSlide) ? positionAd300x250 : positionArrowSlide;

                if(positionTopScreen === 0){
                    header.animate({top:0});
                    header.removeClass('sticky');
                }
                else if((headerHeight+positionTopScreen) >= limitStickyHeader){
                    if(!isHidden) {
                        header.animate({top: -(headerHeight + 20)}, 500);
                        isHidden = true;
                    }
                }
                else if(isHidden || !header.hasClass('sticky')) {
                    header.animate({top:0});
                    header.addClass('sticky');
                    isHidden = false;
                }
            });
        }
    },

    mobileStickyAdAction: function(){
        var $window = jQuery(window),
            commentsBox = jQuery(".social-comments").first(),
            stickyAd = jQuery("#header320x50_frame").first(),
            startPosition = $window.height() + 100;

        if((commentsBox.length === 0) || (stickyAd.length === 0)) return;

        $window.scroll(function () {
            var boxPosition = commentsBox.offset().top,
                screenPosition = ($window.scrollTop() + $window.height());

            if((boxPosition<screenPosition) && (screenPosition>startPosition)){
                if(stickyAd.is(":visible")) stickyAd.slideUp();
            }else{
                if(!stickyAd.is(":visible")) stickyAd.slideDown();
            }
        });
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

        var newURl = this.$slideThumbs.find('li.active a').attr('href');
        var curQuery = document.location.search.replace("?", "").replace(/&slide=\d/g, "").replace(/slide=\d/g, "");

        key = 'slide'; value = this.currentSlide;

        var kvp = document.location.search.substr(1).split('&');
        if (kvp == '') {
            History.replaceState({state : this.currentSlide}, document.title, newURl);
        }
        else {

            var i = kvp.length; var x; while (i--) {
                x = kvp[i].split('=');

                if (x[0] == key) {
                    x[1] = value;
                    kvp[i] = x.join('=');
                    break;
                }
            }

            if (i < 0) { kvp[kvp.length] = [key, value].join('='); }

            //this will reload the page, it's likely better to store this until finished
            History.replaceState({state : this.currentSlide}, document.title, '?' + kvp.join('&'));
        }



        CN.socialmedia.refresh(location.href);

    },

    setXButton : function(){
        if(document.referrer !== '' && document.referrer.match(/teenvogue.com/)){
            jQuery('.x-button a, a.header-close, .header-close a').attr('href', document.referrer);
        }
        else{
            jQuery('.x-button a, a.header-close, .header-close a').attr('href', location.pathname.replace(/\d{4}-\d{2}\/([a-zA-Z0-9#=\-]){1,}[\/]*/, ''));
        }

        if(CN.isMobile){
            jQuery('.x-button a').bind('click', function(){CN.stats.omniture.trackAction('mobileNavClose',this);});
        }
        else{
            jQuery('a.header-close, .header-close a').bind('click', function(){CN.stats.omniture.trackAction('desktopNavClose',this);});
        }

    },

    setCurSlide : function(){

        if(!this.currentSlide){
            this.currentSlide = 1;
        }

        if(this.currentSlide > 1){
            if(this.prevHandled === false){
                this.$prev.addClass('previous');
                this.$prev.removeClass('previous-disabled');
                this.prevHandled = true;
            }
        }
        else{
            this.$prev.removeClass('previous');
            this.$prev.addClass('previous-disabled');
            this.prevHandled = false;
        }

        if((this.currentSlide == this.imgsPreloaded - 1) && (this.currentSlide < this.totalSlides -1)){
            jQuery(document).trigger('doPreload', {'that' : this});
        }

        this.userCount++;

        this.$count.html(this.currentSlide + " / " + this.totalSlides);

        this.$slideThumbs.find('#slideThumbs li').removeClass('active')
        this.$slideThumbs.find('#slideThumbs li[data-index="'+ this.currentSlide +'"]').addClass('active');
        this.setCurSlideUrl();
        this.animateThumbs('auto');

        var introTracking='-No Intro';
        var SSTracking='';
        var subSSTracking = '|null';
        if(this.intro){
            //Intro /fashion/spring-trends/2013-04/white-graduation-dress/?slide=1
            introTracking = '-Intro';
        }
        if(typeof(this.listdata.listSubSectionName) !== "undefined" && this.listdata.listSubSectionName==='myroom'){
            //Slideshow-rooms  /my-life/my-room/2013-11/frankie-clarke-bedroom-tour/?slide=1
            SSTracking = '-Rooms';
        }else{
            if(this.pageLayout === "A"){
                //Slideshow-Standard /fashion/spring-trends/2013-04/white-graduation-dress/?slide=1
                SSTracking = '-Standard';
            }else if (this.pageLayout === "B") {
                //Slideshow-10 Best Dressed /celebrity-style/best-dressed/2013-04/week-of-april-28?slide=1
                SSTracking = '-10 Best Dressed';
            }else if (this.pageLayout === "C") {
                //Slideshow-Standard
                SSTracking = '-Standard';
            }else if (this.pageLayout === "D") {
                //Slideshow-How To /fashion/diy/2013-04/embroidered-beach-bag/?slide=1 diy
                // /beauty/hair/2013-12/retro-holiday-updo-hairstyle-how-to/?slide=1 intro hair
                // beauty/nails/2013-09/tom-ford-comic-book-nail-art-manicure/?slide=1 nail
                // back-to-school/beauty/2013/how-to-make-lip-color-last/?intro intro makeup
                // beauty/health-fitness/2013-10/strong-leg-workout/?intro intro healthandfitness
                if(typeof(this.listdata.listSubSectionName) !== "undefined"){
                    if(this.listdata.listSubSectionName === "diy"){
                        subSSTracking = '|Fashion';
                    }else if(this.listdata.listSubSectionName === "hair"){
                        subSSTracking = '|Hair';
                    }else if(this.listdata.listSubSectionName === "nails"){
                        subSSTracking = '|Nail';
                    }else if(this.listdata.listSubSectionName === "makeup"){
                        subSSTracking = '|Makeup';
                    }else if(this.listdata.listSubSectionName === "healthandfitness"){
                        subSSTracking = '|Fitness';
                    }
                }
                SSTracking = '-How To';
            }
        }

        if(this.isInsider){
            var pagVal = (this.currentSlide === this.totalSlides)? "slide_end": 'slide' + (this.currentSlide);
            CN.stats.omniture.setContentType("Articles").setContentType2("Articles-Slideshow").setPaginationValue(pagVal).doPageTracking2();
            //s.evar32 = "";
            //s.eVar5 = "";
            //s.evar74 = "";
            return;
        }

        if(this.currentSlide === this.totalSlides){
            try{
                CN.stats.omniture.setContentType("Slideshows").setContentType2("Slideshow" +introTracking+SSTracking+subSSTracking).setPaginationValue('slide_end').trackAjaxPage();
            }
            catch(err){}
        }
        else{
            try{
                CN.stats.omniture.setContentType("Slideshows").setContentType2("Slideshow" +introTracking+SSTracking+subSSTracking).setPaginationValue('slide' + (this.currentSlide)).trackAjaxPage();
            }
            catch(err){}
        }

    },

    createViewall : function(){

        this.$footer.before('<div class="slideshow-viewall-container"><div class="slideshow-viewall-close">Close</div><div class="slideshow-viewall-content"><ol class="slideshow-navigation-viewall"></ol><div style="clear:both;"></div></div></div>');

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

            jQuery('.slideshow-navigation-viewall').append('<li data-index="'+slideIndex+'"><img src="' +thbImg+ '" alt="' +thbAlt+ '" /></li>'  );
        }

        jQuery('.slideshow-navigation-viewall').append('<li data-index="'+this.totalSlides+'"><img alt="" src="/images/default-thumbnail.gif"></li>');

        this.$viewallThumbs   = jQuery(this.options.viewallThumbs);
    },

    showViewall : function(){

        var that = this;
        this.$slideCon.hide();
        this.$footer.hide();
        this.$slideThumbs.hide();
        this.$mainBody.hide();
        this.$lastSlideCon.hide();
        this.$imgCon.hide();

        this.$viewallThumbs.show();
        CN.stats.omniture.setPaginationValue('slideshow_viewthumb').trackAjaxPage();

        jQuery('.next-button').hide();
        jQuery('.img-shadow').click(function(){
            that.showSlides();
        });

        this.$viewallThumbs.find('ol.slideshow-navigation-viewall li').unbind('click');
        this.$viewallThumbs.find('ol.slideshow-navigation-viewall li').bind('click', function(e){
            that.showSlides();

            jQuery(document).trigger('slideChange', {slide : parseInt(jQuery(this).attr('data-index')), that : that});
        });

    },

    createThumbs : function(){

        this.$slideThumbs.append('<div class="jcarousel-prev"></div><div class="jcarousel-next"></div><div class="jcarousel-clip jcarousel-clip-horizontal"><ul id="slideThumbs" class="slideshow-navigation-carousel jcarousel-list jcarousel-list-horizontal"></ul></div>');
        var liClass = 'jcarousel-item'



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

            jQuery('#slideThumbs').append('<li class="'+ liClass + activeClass+'" data-index="'+slideIndex+'"><a href="?slide='+slideIndex+'"><img src="' +thbImg+ '" alt="' +thbAlt+ '" /></a></li>'  );
        }

        jQuery('#slideThumbs').append('<li class="'+ liClass +'" data-index="'+this.totalSlides+'"><img alt="" src="/images/default-thumbnail.gif"></li>');

        jQuery('#slideThumbs').css('width', jQuery('#slideThumbs li').outerWidth(true) * (this.totalSlides+1));
    },

    animateThumbs : function(direction){
        if(this.totalSlides < 7){
            return;
        }

        var slideIndex = this.currentSlide,
            steps = 0,
            distance,
            slideLeft = parseInt(jQuery('#slideThumbs').css('left')),
            thumbsMax = jQuery('#slideThumbs').outerWidth(true) - 634;

        if(direction == "auto"){
            if(slideIndex <= 3){
                slideIndex = 3
            }

            if(slideIndex >= this.totalSlides - 4 ){
                slideIndex = this.totalSlides - 4;
            }

            steps = 3 - slideIndex;

            distance = steps * jQuery('#slideThumbs li').outerWidth(true);
            jQuery('#slideThumbs').animate({left : +distance});

        }

        if(direction == "prev"){
            slideLeft = parseInt(jQuery('#slideThumbs').css('left'))
            distance = 3 * jQuery('#slideThumbs li').outerWidth(true);

            if(slideLeft === 0){
                return;
            }
            else{
                if(distance + slideLeft > 0){
                    distance = Math.abs(slideLeft);
                }
                jQuery('#slideThumbs').animate({left : '+='+distance});
            }
        }

        if(direction == "next"){
            slideLeft = parseInt(jQuery('#slideThumbs').css('left'))
            if(Math.abs(slideLeft) > thumbsMax){
                return;
            }

            distance = 3 * jQuery('#slideThumbs li').outerWidth(true);

            if(Math.abs(distance) > Math.abs(thumbsMax) - Math.abs(slideLeft)){
                distance = Math.abs(thumbsMax) - Math.abs(slideLeft);
            }
            jQuery('#slideThumbs').animate({left : '-='+distance});
        }


    },

    goToSlide : function(slide){
        jQuery('.slideshow-controls').removeClass('last');

        if(this.$lastSlideCon.is(':visible')){
            this.$lastSlideCon.hide();
            this.$imgCon.fadeIn();
            //jQuery('#AMS_TNV_GLOBAL_SLIDESHOW_RIGHTRAIL_A').hide();
            jQuery('#yslideCon').fadeIn();
            this.$mainBody.show();
            this.$body.fadeIn();
        }

        jQuery('.slideshow-view-larger-primary').fadeIn();
        jQuery('.slideshow-view-larger-container .slideshow-viewall-container').fadeOut();


        if((this.userCount > 1) && (this.userCount % this.adInterval === 0) && !CN.isMobile){
            this.userCount = 0;
            this.doInterstitialAd();
            return;
        }

        this.currentIndex = slide - 1;
        this.currentSlide = slide;

        if(slide===1){
            this.$slideCon.addClass("first-slide");
        }else {
            this.$slideCon.removeClass("first-slide");
        }

        if(slide == this.totalSlides){
            jQuery('.slideshow-controls').addClass('last');
            this.showLastSlide();
            this.setCurSlide();
            return;
        }

        if(this.sliderData[this.currentIndex].sl_lead !== null && this.sliderData[this.currentIndex].isIntro != true){
            if(jQuery('.item .item-text .lead-introduction .lead').length>0){
                jQuery('.item .item-text .lead-introduction').show();
                jQuery('.item .item-text .lead-introduction .lead').html(this.sliderData[this.currentIndex].sl_lead);
            }else{
                jQuery('.item .item-text .slide_desc').before('<div class="lead-introduction"><div class="lead">'+this.sliderData[this.currentIndex].sl_lead+'</div></div>');
            }

        }else{
            jQuery('.item .item-text .lead-introduction').hide();
        }

        jQuery('#interAd').unbind().remove();

        if(this.sliderData[this.currentIndex].sl_head !== null && this.sliderData[this.currentIndex].isIntro != true){
            this.$bodyHead.html(this.sliderData[this.currentIndex].sl_head);
        }
        else{
            this.$bodyHead.html('');
        }

        if(this.sliderData[this.currentIndex].imgCaption !== null){
            this.$caption.html(this.sliderData[this.currentIndex].imgCaption);
        }
        else{
            this.$caption.html('');
        }

        if(this.listdata.listCaption.length > 1 &&  this.currentSlide===1){
            this.$caption.html(jQuery('<div/>').html(this.listdata.listCaption).text());
        }

        if(this.sliderData[this.currentIndex].sl_credits !== null ){
            this.$photobyline.html(this.sliderData[this.currentIndex].sl_credits);
        }
        else if(this.listdata.listCredit.length > 1){
            this.$photobyline.html(this.listdata.listCredit);
        }
        else{
            this.$photobyline.html('');
        }


        if(this.sliderData[this.currentIndex].sl_body !== null){
            this.$body.html('<div class="text">'+this.sliderData[this.currentIndex].sl_body)+'</div>';
        }
        else{
            this.$body.html('<div class="text"></div>');
        }


        if(this.currentSlide > 1){
            jQuery('#yslideHed').hide();
        }else{
            jQuery('#yslideHed').show();
        }


        if(jQuery('.slideshow-view-larger-container').is(':visible') && typeof(this.sliderData[this.currentIndex].imgs.enlargedImage) !== "undefined"){
            var nextImg = this.sliderData[this.currentIndex].imgs.enlargedImage.img;
            var nextAlt = (typeof(this.sliderData[this.currentIndex].imgs.enlargedImage.altText) == "object")? "" : this.sliderData[this.currentIndex].imgs.enlargedImage.altText;
        }
        else{
            var nextImg = this.sliderData[this.currentIndex].imgs.main.img;
            var nextAlt = (typeof(this.sliderData[this.currentIndex].imgs.main.altText) === "object")? "" : this.sliderData[this.currentIndex].imgs.main.altText;
        }

        if(CN.isMobile){
            nextImg = CN.site.mobile.getImageUrl(nextImg);
        }

        this.$img.each(function(){jQuery(this).hide();});
        this.$img.find('#steps').remove();
        this.$img.find('.item-header').remove();
        this.$img.each(function(){jQuery(this).find('#swipeArea').remove();});
        this.$img.each(function(){jQuery(this).find('img').remove();});
        this.$img.each(function(){jQuery(this).append('<div id="swipeArea">' + '<img src="'+nextImg+'" alt="'+nextAlt+'"/>' + '</div>')});
        this.$imgCon.each(function(){jQuery(this).show()});
        this.$img.each(function(){jQuery(this).fadeIn('slow')});


        var that = this;
        imagesLoaded( '#swipeArea', function(){
            if(jQuery('#swipeArea').width() > jQuery('#swipeArea').height()){
                jQuery('#swipeArea').addClass('horizontal');
            }
            else{
                jQuery('#swipeArea').removeClass('horizontal');
            }

            if(that.pageLayout === 'B'){
                that.$img.find('.item-header').remove();

                if (that.sliderData[that.currentIndex].imgbannertxt === 'na'){
                    that.$img.find('.item-header').remove();
                }else{
                    var itemHeader = jQuery('<div class="item-header"><figure class="media-shadow"> <img alt="#'+that.currentSlide+'" src="/css/images/best-dressed-seal.png" /> <span class="caption">'+ that.sliderData[that.currentIndex].imgbannertxt + '</span></figure></div>');
                    var currentSlideImage = that.$img.find("img:visible");
                    that.$img.prepend(itemHeader);
                    try {
                        var leftPosition = (currentSlideImage.position().left) || 0;
                        itemHeader.css({left: (leftPosition+10)});
                    }catch(e){
                        itemHeader.css({left: 10});
                    }
                }
            }

            if(that.pageLayout === 'D' || that.pageLayout === 'C'){
                that.$body.attr('id', 'slideshow-description-outer');

                if(that.pageLayout === 'D' && (that.currentIndex >= 1) && (that.currentIndex < that.totalSlides-1)){
                    that.$img.find('#steps').remove();

                    if(that.sliderData[that.currentIndex].imgbannertxt === 'Day'){
                        that.$img.prepend('<figure id="steps" class="media"> <img alt="day '+that.currentIndex+'" src="/css/images/diy-seal.png"/><span class="title">DAY</span><span class="caption">'+that.currentIndex+'</span></figure>');
                    }else if (that.sliderData[that.currentIndex].imgbannertxt === 'na'){
                        that.$img.find('#steps').remove();
                    }else{
                        that.$img.prepend('<figure id="steps" class="media"> <img alt="step '+that.currentIndex+'" src="/css/images/diy-seal.png"/><span class="title">STEP</span><span class="caption">'+that.currentIndex+'</span></figure>');
                    }

                }
                else{
                    that.$img.find('#steps').remove();
                }
            }

        });

        if(this.is_touch_device()){
            this.touchBindings();
        }

        if(CN.isMobile){
            jQuery('.next-button').show();
        }

        this.setCurSlide();

        if(this.init){
            var yslideTxtContainer = jQuery('#yslideTxt');
            yslideTxtContainer.perfectScrollbar();
            yslideTxtContainer.on("mouseenter", function(){
                yslideTxtContainer.data("scrollFired", false);
            });
            yslideTxtContainer.on("perfectScrollbarUpdated", function(){
                if(yslideTxtContainer.data("scrollFired")!==true){
                    CN.stats.omniture.trackAction('desktopRightRailModule', this);
                    yslideTxtContainer.data("scrollFired", true);
                }
            });
            this.init = false;
        }else{
            jQuery('#yslideTxt').perfectScrollbar('update');
        }
    },

    slideChange : function(e, data){
        if (!data.that.init){
            jQuery(document).trigger('adRefresh');
        }
        data.that.goToSlide(data.slide);
    },

    preloadImg : function(e, data){
        data.that.imgPl(data.img);
    },

    refreshAds : function(){
        if((!CN.site.teenvogue.isInsider) && (typeof(CN.dart) !== "undefined")){
            /*jQuery('.displayAd').css('visibility', 'hidden');
             jQuery(window).on('CN.customEvents.dartAdDrawn' ,function(){
             jQuery('.displayAd iframe').hide();
             jQuery('.displayAd').css('visibility', 'visible');
             jQuery('.displayAd iframe').fadeIn();
             });*/
            CN.dart.refresh();
        }
    },
    doInterstitialAd : function(){
        this.$imgCon.fadeOut();

        var $adCon = null;

        this.$imgCon.each(function(){
            if(jQuery(this).is(':visible')){
                $adCon = jQuery(this).parent();
            }
        });

        this.disableSlideshow();

        $adCon.prepend('<div class="slideshow-continue">Slideshow will continue in <span class="slideshow-continue-countdown">5</span> seconds. <a href="#" class="slideshow-continue-link">Click to skip</a></div>');
        $adCon.prepend('<div class="displayAd slideshow-dartinterstitial" id="slideshowInterstitial300x250_frame" style="display: block;"></div>');
        $adCon.prepend('<div class="slideshow-advertisement-note">Advertisement</div>');

        CN.dart.call("slideshowInterstitial", {
            sz      : "300x250",
            kws     : ["interstitial","top"],
            store   : false
        });

        var interstitialInterval = setInterval(function(){

            var sl_countdown = parseInt(jQuery('.slideshow-continue-countdown').html()) - 1;


            if(sl_countdown === 0){
                clearTimeout(interstitialInterval);
                CN.tnvSlide.enableSlideshow();
                jQuery('.next').trigger('click');
                return;
            }
            jQuery('.slideshow-continue-countdown').html(sl_countdown);

        }, 1000);

        jQuery('.slideshow-continue-link').bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            clearTimeout(interstitialInterval);
            CN.tnvSlide.enableSlideshow();
            jQuery('.next').trigger('click');
        });

        CN.stats.omniture.setPaginationValue('slideshow_ad').trackAjaxPage();
    },

    disableSlideshow : function(){

        jQuery('.next').addClass('next-disabled');
        jQuery('.next').removeClass('next');

        jQuery('.previous').addClass('previous-disabled');
        jQuery('.previous').removeClass('previous');

        this.$slideThumbs.find('li').unbind('click');
        this.$slideThumbs.find('.jcarousel-prev').unbind('click');
        this.$slideThumbs.find('.jcarousel-next').unbind('click');
        this.$viewall.unbind('click');
        this.$viewLarger.unbind('click');
    },

    enableSlideshow : function(){

        var that = this;

        jQuery('.slideshow-advertisement-note').remove();
        jQuery('.slideshow-dartinterstitial').remove();
        jQuery('.slideshow-continue').remove();

        jQuery('.next-disabled').addClass('next');
        jQuery('.next').removeClass('next-disabled');

        jQuery('.previous-disabled').addClass('previous');
        jQuery('.previous').removeClass('previous-disabled');

        this.$slideThumbs.find('li').bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            jQuery(document).trigger('slideChange', {slide : parseInt(jQuery(this).attr('data-index')), that : that});

        });

        this.$slideThumbs.find('.jcarousel-prev').bind('click', function(){
            that.animateThumbs('prev');
        });

        this.$slideThumbs.find('.jcarousel-next').bind('click', function(){
            that.animateThumbs('next');
        });

        this.$viewall.bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            that.showViewall();
        });

        this.$viewLarger.bind('click', function(){
            CN.stats.omniture.setPaginationValue('slideshow_enlarge').trackAjaxPage();
            that.buildLarger();
        });
    },

    touchAd : function(){
        jQuery('#swipeArea').unbind();

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
                        CN.tnvSlide.goToSlide(CN.tnvSlide.currentSlide+1);
                    } else {
                        CN.tnvSlide.goToSlide(CN.tnvSlide.currentSlide-1)
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
        var $imgCon = this.$imgCon;
        //this.$imgCon         = jQuery(this.options.imgCon);
        //this.$lastSlideCon   = jQuery(this.options.lastSlideCon);

        if(this.pageLayout === "B"){
            this.$body.fadeOut();
            this.$slideThumbs.fadeOut();
        }

        $imgCon.css('display', 'none');
        var nextButton = jQuery('.next-button');
        nextButton.hide();
        this.$mainBody.fadeOut();

        var lastSlideLink = this.lastSlideLink;

        this.$lastSlideCon.each(function(){jQuery(this).fadeIn();});

        if(!CN.isMobile){
            jQuery('#yslideCon').hide();
            //jQuery('#AMS_TNV_GLOBAL_SLIDESHOW_RIGHTRAIL_A').fadeIn();
            jQuery('.slideshow-items').append('<div class="impostor" style="z-index:1000;"><a style="text-align:0;" href="' + lastSlideLink + '">&nbsp;</a></div>');
        }else if(!CN.site.teenvogue.isInsider){
            var impostor = nextButton.clone();
            impostor.addClass('impostor');
            impostor.insertAfter(nextButton);

            $imgCon.addClass('on-last-slide');
            $imgCon.show();
            impostor.show();
        }

        jQuery('.list-view-slideshow, .impostor a').each(function() {
            var elem = jQuery(this);

            elem.attr('href', lastSlideLink);

            elem.click(function () {
                window.open(lastSlideLink, "_self");
            });

        });

        jQuery('.impostor a').each(function(){
            CN.site.teenvogue.TrackingHelper.setClickTracking(this, "endSlideRightArrow");
        });

        jQuery('.list-view-slideshow').each(function(){
            if('recUpNext' in CN.tnvSlide.actionTrackings){
                CN.tnvSlide.actionTrackings.recUpNext(this);
            }
        });

        /*jQuery('#ps1_fs1_content').click(function () {
         window.location = slideLink;
         });
         window.nextSlide = setTimeout(function () {
         window.location = jQuery('#show-footer .impostor a').attr('href');
         }, 5000);

         window.countDown = setInterval(function () {
         if (parseInt(jQuery('.startingIn .slideCount').first().text()) > 0) {
         jQuery('.startingIn .slideCount').text(parseInt(jQuery('.startingIn .slideCount').first().text()) - 1)
         }
         }, 1000);*/

        jQuery('.ss-replay, .previous-button, .previous, .viewall a, .slideshow-navigation-carousel li, .slideshow-navigation-list li').bind('click', function () {
            jQuery('#item-navigation-container').show();
            jQuery('.impostor').unbind();
            jQuery('.impostor').remove();
            $imgCon.removeClass('on-last-slide');
            /*clearInterval(countDown);
             clearTimeout(nextSlide);*/
        });

        CN.stats.omniture.trackAction('endSlideViews',this);

        jQuery('.lastSlide #slideshow-cm-extra .feature-blurb h3').ellipsis();
        jQuery('.lastSlide .recommendation-box .rec-title h3').ellipsis();

    },

    prepLastSlide : function(){

        function createBox(recommendation){
            return '<a href="#" class="ss-replay">Replay</a>\
                    <img src="' + recommendation.thumbnailUrl + '"/>\
                    <div class="feature-blurb">\
                        <h2 class="header">Next Up</h2>\
                        <h3>' + (jQuery("<div>" + recommendation.title + "</div>").text()) + '</h3>\
                        <a class="list-view-slideshow" href="#">start slideshow</a>\
                    </div>';
        }

        function createRecommendedBox(recommendation){
           return  '<div class="recommendation-box">\
                        <a href="' + recommendation.pageUrl.replace("http://localhost:8080", "") + '">\
                            <div class="rec-thumbnail"><img src="' + recommendation.thumbnailUrlSq + '" onerror="this.src=\''+recommendation.thumbnailUrl+'\'"/></div>\
                            <div class="rec-title"><h3>' + (jQuery("<div>" + recommendation.title + "</div>").text()) + '</h3></div>\
                        </a>\
                    </div>';
        }

        if(typeof(tnv_slideshow_recs) != "undefined" && tnv_slideshow_recs.length > 0){

            var slideReplace = "",
                lastSlideContainer = jQuery('#ps1_fs1_content');

            if(jQuery.isArray(tnv_slideshow_recs)) {
                this.lastSlideLink = tnv_slideshow_recs[0].pageUrl.replace(/^(https?:\/\/)([\da-z\.:-]+)\//g, '/');
                slideReplace = createBox(tnv_slideshow_recs[0]);

                var recommendedForYou = jQuery('<div class="recommendations"><h1>Recommended for you</h1></div>');

                for(var i = 1; i < tnv_slideshow_recs.length; i++) {
                    recommendedForYou.append(createRecommendedBox(tnv_slideshow_recs[i]));
                }

                lastSlideContainer.append(recommendedForYou);
            } else {
                var slideInfo = tnv_slideshow_recs.split("|");
                this.lastSlideLink = slideInfo[0].replace(/^(https?:\/\/)([\da-z\.:-]+)\//g, '/');
                slideReplace = createBox({title: slideInfo[2], thumbnailUrl: slideInfo[1]});
            }

           lastSlideContainer.prepend(slideReplace).css('cursor', 'pointer');

            if('recList' in CN.tnvSlide.actionTrackings){
                jQuery('.recommendation-box a').each(function(){
                    CN.tnvSlide.actionTrackings.recList(this);
                });
            }

//              if(CN.isMobile){
//                  jQuery('.feature-blurb').after('<div id="AMS_TNV_MOBILE_SLIDESHOW2" class="ecom-placement site-narrow"></div>');
//
//                    if ((typeof pageAds !== 'undefined') && (typeof pageAds['AMS_TNV_MOBILE_SLIDESHOW2'] !== 'undefined') && window.pageAds['AMS_TNV_MOBILE_SLIDESHOW2'].match(/<[a-z][\s\S]*>/) && (CN.url.params('nojoy') != 1) ) {
//                        jQuery('#AMS_TNV_MOBILE_SLIDESHOW2').html(window.pageAds['AMS_TNV_MOBILE_SLIDESHOW2']);
//                    }
//                    else{
//                        var failsafeHtml = [];
//                        failsafeHtml.push('<a href="https://w1.buysub.com/loc/TNV/ATGFailsafeMobile" TARGET="_BLANK">');
//                        failsafeHtml.push('<img border="0" src="/css/images/TNV_mobile_slideshow2.jpg"  alt="Subscribe to Teen Vogue" title="Subscribe to Teen Vogue" />');
//                        failsafeHtml.push('</a>');
//
//                        jQuery('#AMS_TNV_MOBILE_SLIDESHOW2').html(failsafeHtml.join(''));
//                    }
//                }

        }

    },

    replayShow : function(){
        this.slideIndex = 0;
        this.currentSlide = 1;
        this.isReplay = true;

        this.goToSlide(this.currentSlide);

    },

    getSlideCMs: function() {

        var cmSlideHeader    = 'AMS_TNV_GLOBAL_SLIDESHOW_HEADER_LOGO',
            cmSlideRail = 'AMS_TNV_GLOBAL_SLIDESHOW_RIGHTRAIL_A';

        if ((typeof pageAds !== 'undefined') && (typeof pageAds[cmSlideHeader] !== 'undefined') && window.pageAds[cmSlideHeader].match(/<[a-z][\s\S]*>/) && (CN.url.params('nojoy') != 1) ) {
            jQuery('#' + cmSlideHeader).html(window.pageAds[cmSlideHeader]);
        }
        else{
            jQuery('#' + cmSlideHeader).find('img').attr('src', jQuery('#' + cmSlideHeader).find('img').data('original'));
        }

        if ((typeof pageAds !== 'undefined') && (typeof pageAds[cmSlideRail] !== 'undefined') && window.pageAds[cmSlideRail].match(/<[a-z][\s\S]*>/) && (CN.url.params('nojoy') != 1) ) {
            jQuery('#' + cmSlideRail).html(window.pageAds[cmSlideRail]);
        }
        else{
            jQuery('#' + cmSlideRail).find('img').attr('src', jQuery('#' + cmSlideHeader).find('img').data('original'));
        }
    },

    is_touch_device : function() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    },

    showLargerViewall : function(that){
        jQuery('.slideshow-view-larger-primary').fadeOut();
        jQuery('.slideshow-view-larger-container .slideshow-viewall-container').fadeIn();

        var $viewAllThumbs = jQuery('.slideshow-view-larger-container .slideshow-viewall-container. .slideshow-navigation-viewall'),
            $viewAllCon    = jQuery('.slideshow-view-larger-container .slideshow-viewall-content'),
            scrollSpace       = $viewAllThumbs.outerHeight(true) - $viewAllCon.outerHeight(true);

        if($viewAllCon.find('.slideshow-viewall-larger-scroll').length == 0 && ($viewAllThumbs.outerHeight(true) > $viewAllCon.outerHeight(true))){

            $viewAllCon.append('<div class="slideshow-viewall-larger-scroll" style="display:block;"><a class="text-scroll-up" href="#"></a><a class="text-scroll-down" href="#"></div>"');

            $viewAllCon.find('.slideshow-viewall-larger-scroll .text-scroll-down').bind('click', function(e){
                e.preventDefault();
                e.stopPropagation();

                if(parseInt($viewAllThumbs.css('top')) <= -scrollSpace + 160){
                    return;
                }
                else{
                    $viewAllThumbs.animate({top : '-=160'})
                }
            });

            $viewAllCon.find('.slideshow-viewall-larger-scroll .text-scroll-up').bind('click', function(e){
                e.preventDefault();
                e.stopPropagation();

                if(parseInt($viewAllThumbs.css('top')) == 0){
                    return;
                }
                else{
                    if(parseInt($viewAllThumbs.css('top')) - 160 <= 0){
                        $viewAllThumbs.animate({top : 0})
                    }
                    else{
                        $viewAllThumbs.animate({top : '+=160'});
                    }

                }
            });
        }


    },

    buildLarger : function(){

        var largerHtml = [];

        jQuery('BODY').append('<div class="slideshow-view-larger-container"></div>');

        var largerHeader = [];
        largerHeader.push('<div class="slideshow-view-larger-header">');
        largerHeader.push('        <img class="site-logo" src="/css/images/logo-main.png" alt="Teen Vogue">');
        largerHeader.push('        <header class="story-hed"><h1>'+jQuery('.content-headline').html()+'</h1></header>');
        largerHeader.push('        <div class="slideshow-view-larger-close">Close</div>');
        largerHeader.push('</div>');

        var largerControls = [];
        largerControls.push('<div class="slideshow-view-larger-secondary">');
        largerControls.push('    <div id="view-larger-controls" class="control-bar slideshow-controls slideshow-remote">');
        largerControls.push('        <div class="previous"><a title="Previous slide" href="#">Previous</a></div>');
        largerControls.push('        <div class="count">'+this.currentSlide+' / '+this.totalSlides+'</div>');
        largerControls.push('        <div class="next"><a title="Next slide" href="#">Next</a></div>');
        largerControls.push('        <div class="viewall"><a href="#">view thumbnails</a></div>');
        largerControls.push('    </div>');
        largerControls.push('    <div class="slideshow-view-larger-text viewport">');
        largerControls.push('        <div class="item-inner">');
        largerControls.push('            <header class="item-header">');
        largerControls.push('                <h2 class="header">'+((this.sliderData[this.currentIndex].sl_head != null)? this.sliderData[this.currentIndex].sl_head : '' )+'</h2>');
        largerControls.push('            </header>');
        largerControls.push('            <div class="body viewport" id="slideshow-description-outer">');
        largerControls.push('                <div class="text overview">'+((this.sliderData[this.currentIndex].sl_body != null)? this.sliderData[this.currentIndex].sl_body : '') +'</div>');
        largerControls.push('            </div>');
        largerControls.push('        </div>');
        largerControls.push('    </div>');
        largerControls.push('</div>');


        if(typeof(this.sliderData[this.currentIndex].imgs.enlargedImage) !== "undefined"){
            var nextImg = this.sliderData[this.currentIndex].imgs.enlargedImage.img;
            var nextAlt = (typeof(this.sliderData[this.currentIndex].imgs.enlargedImage.altText) == "object")? "" : this.sliderData[this.currentIndex].imgs.enlargedImage.altText;
        }
        else{
            var nextImg = this.sliderData[this.currentIndex].imgs.main.img;
            var nextAlt = (typeof(this.sliderData[this.currentIndex].imgs.main.altText) === "object")? "" : this.sliderData[this.currentIndex].imgs.main.altText;
        }

        var largerImg = [];
        largerImg.push('<div class="slideshow-view-larger-primary">');
        largerImg.push('    <div class="items slideshow-items">');
        largerImg.push('        <figure class="media"><div>');
        largerImg.push('            <img alt="'+ nextAlt +'" src="'+ nextImg +'">');
        largerImg.push('        </div></figure>');
        largerImg.push('<div id="slideshow-cm-container" class="slideshow-domslide lastSlide">')
        largerImg.push(this.$lastSlideCon.html());
        largerImg.push('</div>');
        largerImg.push('    </div>');
        largerImg.push('</div>');

        //this.$lastSlideCon.clone().appendTo('.slideshow-view-larger-container .slideshow-items');
        jQuery('.slideshow-view-larger-container').append(largerHeader.join(''));
        jQuery('.slideshow-view-larger-container').append(largerImg.join(''));
        jQuery('.slideshow-view-larger-container').append(largerControls.join(''));
        this.$viewallThumbs.clone().appendTo('.slideshow-view-larger-container');

        jQuery('BODY').addClass('view-larger');
        jQuery('.container').hide();
        jQuery('.slideshow-view-larger-container').fadeIn();

        var that = this;

        this.$viewallThumbs = jQuery(this.options.viewallThumbs),
            this.$slideThumbs     = jQuery(this.options.slideThumbs);
        this.$footer        = jQuery(this.options.footer);
        this.$mainBody      = jQuery(this.options.mainBody);

        this.$header        = jQuery(this.options.header),
            this.$subHeader     = jQuery(this.options.subHeader),
            this.$byline         = jQuery(this.options.byline),
            this.$photobyline   = jQuery(this.options.photobyline),
            this.$bodyHead        = jQuery(this.options.bodyHead),
            this.$body             = jQuery(this.options.body),
            this.$img             = jQuery(this.options.img);
        this.$imgCon         = jQuery(this.options.imgCon);
        this.$count         = jQuery(this.options.count);
        this.$lastSlideCon  = jQuery(this.options.lastSlideCon);


        jQuery('.slideshow-view-larger-close').on('click', function(){
            that.closeLarger();
        });

        jQuery('#view-larger-controls .viewall a').on('click', function(){
            that.showLargerViewall(that);
        });

        jQuery('.slideshow-view-larger-container .slideshow-viewall-container ol li').bind('click', function(){
            jQuery(document).trigger('slideChange', {slide : parseInt(jQuery(this).attr('data-index')), that : that});

        });

        this.setUpScrolling();
    },

    closeLarger : function(){

        jQuery('BODY').removeClass('view-larger');
        jQuery('.slideshow-view-larger-container').fadeOut().remove();
        jQuery('.container').show();
    },

    setUpScrolling : function() {

        var larger = {$el : jQuery('.slideshow-view-larger-container')};

        var textScroll = larger.$el,
            pos        = 0,
            max        = textScroll.find('#slideshow-description-outer').addClass('viewport').find('.text').addClass('overview').height(),
            $text      = textScroll.find('#slideshow-description-outer').find('.text'),
            textHeight = parseInt($text.outerHeight(true)),
            maxView    = 390;

        if(textHeight > maxView){
            var scrollHtml = '<div class="slideshow-view-larger-scroll">';
            scrollHtml += '  <a class="text-scroll-up">&nbsp</a>';
            scrollHtml += '  <a class="text-scroll-down">&nbsp</a>';
            scrollHtml += '</div>';

            jQuery('.slideshow-view-larger-scroll').remove();
            jQuery('.slideshow-view-larger-secondary').append(scrollHtml);
            jQuery('.slideshow-view-larger-secondary').find('.slideshow-view-larger-scroll').fadeIn();

            var pos = 0;

            larger.$el.find('.text-scroll-down').click(function(e) {
                e.preventDefault();
                if(pos < textHeight - maxView){
                    $text.animate({top : '-=50px'}, 'fast', 'swing');
                    pos += 50;
                }

            });

            larger.$el.find('.text-scroll-up').click(function(e) {
                e.preventDefault();
                if(pos != 0){
                    $text.animate({top : '+=50px'}, 'fast', 'swing');
                    pos -= 50;
                }
            });

        }
        else{
            larger.$el.find('.slideshow-view-larger-scroll').remove();
        }
    }
};


CN.tnvSlide.loadTrackings = function () {

};

CN.tnvSlide.actionTrackings = {
    recUpNext: function(element){
        CN.site.teenvogue.TrackingHelper.setClickTracking(element, "upNext");
    },
    recList: function(element){
        CN.site.teenvogue.TrackingHelper.setClickTracking(element, "endSlideRecList");
    }
};
