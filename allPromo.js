var allurePromo = {

    flags : {
            "fbPromoSeen" : 0,
            "nlPromoSeen" : 0,
            "fromNL"      : 0,
            "fromFB"      : 0,
            "hasSubed"    : 0,
            "hasLiked"    : 0,
            "pvs"          : 0
    },

    tips : [
        "Want whiter teeth? Choose a blue-based lip color.",
        "Shimmery nude cream or powder eye shadow can brighten up your eyes&mdash;just be sure it's a touch darker than your skin tone.",
        "A tinted primer can help correct your skin tone: Lilac shades brighten sallow skin, and green formulas neutralize redness.",
        "To enhance your lashes and frame your eyes, apply a superskinny strip of black liquid liner along the base of your upper lashes.",
        "Fill in sparse areas of your brows with a pencil that's one to two shades lighter than your hair if you're a brunette, or taupe if you're a blonde.",
        "The easiest way to give limp strands some oomph is to draw a deep side part to lift the roots."
    ],

    state   : 'in',
    tracked : false,
    adPause : false,
    alreadyRan : false,

    setInitFlags : function(){
        if(CN.cookie.get('promoDeskFlags') != ""){
            var promoData = CN.cookie.get('promoDeskFlags');
            this.flags = jQuery.parseJSON(promoData)
        }
        this.flags.fromNL = (document.location.href.indexOf('mbid=nl') > 0)? 1 : 0;
        this.flags.fromFB = (document.location.href.indexOf('mbid=fb') > 0)? 1 : 0;
        this.updateCookie();
        this.setPVFlag();
    },

    setPVFlag : function(){
        this.flags.pvs = ++this.flags.pvs;
        this.updateCookie();

        if(this.flags.pvs == 5){
          this.initFBPromos();
        }
    },


    init : function(){
        this.setInitFlags();
        if(this.flags.nlPromoSeen == 0){
            this.initfloatNLPromos();
        }
    },

    adjustForm : function(isStatic){

           var proCon = (jQuery('.hedNewsWrap').length > 0)? jQuery('.hedNewsWrap') : jQuery('.staticNewsWrap');
           jQuery(proCon).width(jQuery('#x-main').width() - 40 +"px");
           var inWidth = jQuery(proCon).width() - (jQuery('#submit-newsletter').width() + 16);
           mr = '0px';

        if(isStatic){
            mr = '35px';
            inWidth = inWidth - 35;
        }

        jQuery('#newsletter-email').css({
            'width'        : inWidth + "px",
            'padding'      : '0px 8px 0 8px',
            'margin-left' : mr
        });

        if(proCon.hasClass('staticNewsWrap')){
            setTimeout(function(){jQuery(proCon).show()}, 1000);
        }
        else{
            jQuery(proCon).show();
        }
    },

    fbLikeInit : function(top){
        var randTip      = Math.floor(Math.random() * (5 - 0 + 0)) + 0;
        var fbPromoHtml  = '<div class="fbDPromoWrap">';
            fbPromoHtml += '<div class="fbClose"><img src="/css/i/icons/fbClose.png"></div>'
            fbPromoHtml += '<div class=fbTip>'+ this.tips[3] +'</div>';
            fbPromoHtml += '<div class="fbBlurb">FOR MORE BEAUTY INSPIRATION...</div>';
            fbPromoHtml += '<div class="fbLikeWrap"></div></div>';

         var fbInitCode =  '<div id="fb-root"></div>';
            fbInitCode += '<script>(function(d, s, id) {';
            fbInitCode += 'var js, fjs = d.getElementsByTagName(s)[0];';
            fbInitCode += 'if (d.getElementById(id)) return;';
            fbInitCode += '       js = d.createElement(s); js.id = id;';
            fbInitCode += '               js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=431323043618911&version=v2.0";';
            fbInitCode += '               fjs.parentNode.insertBefore(js, fjs);';
            fbInitCode += " }(document, 'script', 'facebook-jssdk'));</script>";

        var fbButton = '<div class="fb-like" data-href="https://www.facebook.com/allure" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>';

        jQuery('BODY').append(fbPromoHtml);
        jQuery('.fbDPromoWrap .fbLikeWrap').append(fbButton);
        jQuery('BODY').append(fbInitCode);
        jQuery('.fbDPromoWrap').css('top', top+'px');


        var fbLoadInt = setInterval(function(){
            if(typeof FB !== "undefined"){
                clearInterval(fbLoadInt);
                allurePromo.floatFBInit();
                FB.Event.subscribe('edge.create', function(response){
                     allurePromo.setPromoSubscribed('fb')
                     jQuery('.fbDPromoWrap').remove();
                     s.linkTrackVars = 'eVar37,eVar10' + ',events';
                     s.linkTrackEvents = 'event34,event7';
                     s.events = 'event34,event7';
                     s.eVar37 = 'Facebook';
                     s.eVar10 = 'FBDesktop_Like';
                     s.tl(this, 'o', 'socialShare');
                     s.events = '';
                     s.eVar10 = '';
                     s.eVar37 = '';
                ;})
            }
        }, 200);
    },

    initFBPromos : function(){

        if(jQuery('BODY').hasClass('ss_blogs')){
            if(!this.flags.fbPromoSeen && !this.flags.hasLiked && !this.flags.fromFB){
                var fbPos = jQuery('.botSocialShareWrap').offset().top - 220;
                this.fbLikeInit(fbPos);
            }
        }
        if(jQuery('BODY').hasClass('article')){
            if(!this.flags.fbPromoSeen && !this.flags.hasLiked && !this.flags.fromFB){
                var fbPos = jQuery('.botSocialShareWrap').offset().top - 250;
                this.fbLikeInit(fbPos);
            }
        }
        if(jQuery('BODY').find('#media-items-and-related-links').length > 0){
            if(!this.flags.fbPromoSeen && !this.flags.hasLiked && !this.flags.fromFB){
                var fbPos = jQuery('.socialShare').offset().top + jQuery('.shocialShare').height() + 475;
                this.fbLikeInit(fbPos);
            }
        }
        if(jQuery('BODY').hasClass('listC')){
            if(!this.flags.fbPromoSeen && !this.flags.hasLiked && !this.flags.fromFB){
                var fbPos = jQuery('#livefyre').offset().top - 50;
                this.fbLikeInit(fbPos);
            }
        }
    },

    initStaticNLPromos : function(){
        if(jQuery('BODY').hasClass('home')){
            if(!this.flags.fromNL && !this.flags.hasSubed){
                this.promoFormInit('HP_Promo', false);
                //this.promoFormInit();
            }
        }

        if(jQuery('BODY').hasClass('listC')){
            if(!this.flags.fromNL && !this.flags.hasSubed){
                this.promoFormInit('Slideshow_footerPromo', true);
            }
        }
    },

    initfloatNLPromos : function(){
        if(jQuery('.ss_blogs').length > 0){
            if(!this.flags.nlPromoSeen && !this.flags.hasSubed && !this.flags.fromNL){
                this.promoFormInit('Blog_interstitial', false);
                this.floatNewsletterInit();
            }
        }
        if(jQuery('BODY').hasClass('article')){
            if(!this.flags.nlPromoSeen && !this.flags.hasSubed && !this.flags.fromNL){
                this.promoFormInit('Article_interstitial', false);
                this.floatNewsletterInit();
            }
        }
        if(jQuery('#media-items-and-related-links').length > 0){
            if(!this.flags.nlPromoSeen && !this.flags.hasSubed && !this.flags.fromNL){
                this.promoFormInit('Product_interstitial', false);
                this.floatNewsletterInit();
            }
        }
        if(jQuery('BODY').hasClass('home')){
            if(!this.flags.nlPromoSeen && !this.flags.hasSubed && !this.flags.fromNL){
                this.promoFormInit('home_interstitial', false);
                this.floatNewsletterInit();
            }
        }
        if(jQuery('BODY').hasClass('indexA') && !jQuery('#x-main').hasClass('home')){
            if(!this.flags.nlPromoSeen && !this.flags.hasSubed && !this.flags.fromNL){
                this.promoFormInit('index_interstitial', false);
                this.floatNewsletterInit();
            }
        }
        if(jQuery('BODY').hasClass('listC')){
            if(!this.flags.nlPromoSeen && !this.flags.hasSubed && !this.flags.fromNL){
                this.promoFormInit('slideshow_interstitial', false);
                this.floatNewsletterInit();
            }
        }

    },

    setPromoSeen : function(flag){
        if(flag == 'nl' && this.flags.nlPromoSeen != 1){
            this.flags.nlPromoSeen = 1;
            this.updateCookie();
        }
        if(flag == 'fb' && this.flags.fbPromoSeen != 1){
            this.flags.fbPromoSeen = 1;
            this.updateCookie();
        }
    },

    setPromoSubscribed : function(flag){
        if(flag == "nl" && this.flags.hasSubed != 1){
            this.flags.hasSubed = 1;
            this.updateCookie();
        }
        if(flag == "fb" && this.flags.hasLiked != 1){
            this.flags.hasLiked = 1;
            this.updateCookie();
        }
    },

    updateCookie : function (){
        var cookieData = JSON.stringify(this.flags);
        CN.cookie.set('promoDeskFlags', cookieData, {path:'/', expires: 4*24*60*60*1000});
    },

   floatFBInit : function(){
        jQuery(window).on('scroll',function() {
            if(!allurePromo.isScrolledIntoView('.socialShareWrap')){
                if(allurePromo.state == 'in'){
                    jQuery('.fbDPromoWrap').animate({
                        left:0
                    },  function(){
                        jQuery(this).find('.fbClose').show();
                        allurePromo.state = 'out';
                    });

                    jQuery('.fbDPromoWrap .fbClose').click(function(){
                         jQuery('.fbDPromoWrap').remove();
                    });
                }
            }
            else{
                if(allurePromo.state == 'out'){
                    jQuery('.fbDPromoWrap').animate({
                        left:'-550px'
                    },  function(){
                        jQuery(this).find('.fbClose').hide();
                        allurePromo.state = 'in';
                    });
                }
            }
        });

        this.setPromoSeen('fb');
    },

    isScrolledIntoView:function(elem)
    {
        var $elem = jQuery(elem);
        var $window = jQuery(window);

        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    },

    floatNewsletterInit : function(){


    },

    promoFormInit : function(src, isStatic){

        this.createNewsletter();

        jQuery('#submit-newsletter').click(function(e){
            e.preventDefault();
            allurePromo.submitSubscribe(src);
        });

        jQuery('.hedNewsWrap .close').click(function(){
            jQuery('.nlOverlay').remove();
            allurePromo.setPromoSeen('nl');
        });

        jQuery('#newsletter-email').focus(function(e){
            //e.stopPropogation();
            if(jQuery.trim(jQuery(this).attr('value')) == 'Email Address'){
                jQuery(this).attr('value', '');
                /*jQuery(this).css({
                    'color'      :'#000',
                    'font-style' : 'normal'
                });*/
            }
        });

        jQuery('#newsletter-email').blur(function(e){
            //e.stopPropogation();
            if(jQuery.trim(jQuery(this).attr('value')) == ''){
                jQuery(this).attr('value', 'Email Address');
                /*jQuery(this).css({
                    'color'      :'#989898',
                    'font-style' : 'italic'
                });*/
            }
        });

        jQuery('#newslettersForm').submit(function(e){
            e.preventDefault();
            allurePromo.submitSubscribe(src);
        });
    },

    validateEmail : function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    submitSubscribe : function(src){

        var userEmail = jQuery('#newsletter-email').val();

        if(this.validateEmail(userEmail)){
            this.clearError();
            this.sendSubscribe(userEmail, src);
        }
        else{
            this.suscribeError('Incorrect email, please try again.');
        }
    },

    sendSubscribe : function(email, src){
        //ajax call here should work for all forms

        var xmlReq = this.getNewletterRequestXML(email, src);


        jQuery.ajax({
            url : 'https://user-service.condenastdigital.com/open/newsletter/entries',
            type: 'POST',
            contentType : 'application/xml',
            headers: {'key' : 'DxLdr70gTu2whTtnd8y3BpTBSjA='},
            data: xmlReq,
            success : function(response) {
                  allurePromo.subscribePass()
            },
            error : function(response) {
                allurePromo.suscribeError('There was an error processing this request, please try again.');
            },
            complete : function () {

            }
        });
    },

    getNewletterRequestXML : function(email, src) {
             var xmlData = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
                  xmlData = "<newsletterSubscriptionsRequest email='"+email+"'><longForm>true</longForm>";
                 xmlData = xmlData + "<userEntry zipCode='' partnerCode='' stateCode='' lastName='' firstName='' email='"+email+"' countryCode='' city='' address2='' address1=''/>";
                 xmlData = xmlData + "<entryContext sourceCode='"+ src +"' application='newsletter' formName='batchUploadForm' siteCode='ALL' referer='"+this.escapeXml(document.referrer)+"' url='"+this.escapeXml(document.location.href)+"'></entryContext><newsletterSubscriptions>";
                 xmlData = xmlData + "<newsletterSubscription newsletterId='43' subscribe='true'>";
                 xmlData = xmlData + "</newsletterSubscription>";
                 xmlData = xmlData + "</newsletterSubscriptions>";
                 xmlData = xmlData + "</newsletterSubscriptionsRequest>"
             return xmlData;
    },

    escapeXml : function(s) {

        var XML_CHAR_MAP = {
             '<': '&lt;',
             '>': '&gt;',
             '&': '&amp;',
              '"': '&quot;',
             "'": '&apos;'
         };

        return s.replace(/[<>&"']/g, function (ch) {
            return XML_CHAR_MAP[ch];
        });
    },

    suscribeError : function(error){
        jQuery('.message').removeClass('success');
        jQuery('.message').html(error);
    },

    subscribePass : function(){
        jQuery('.hedNewsWrap .message').addClass('success').text('Thank you for subscribing!').fadeIn();

        jQuery('.hedNewsWrap .close').unbind('click');
        jQuery('.hedNewsWrap .close').click(function(){jQuery('.hedNewsWrap').fadeOut().remove();});

        setTimeout(function(){
            jQuery('.nlOverlay').fadeOut().remove();
        },3000);
        this.setPromoSubscribed('nl');
    },

    clearError : function(){
        jQuery('.message').removeClass('success');
        jQuery('.message').html('');
    },

    createNewsletter : function(){

        if(!this.alreadyRan){
            var NLhtml = '<div class="nlOverlay">';
            NLhtml     += '<div class="hedNewsWrap">';
            NLhtml     +=     '<div class="close"></div>';
            NLhtml     +=    '<div class="imgWrap">';
            NLhtml     +=        '<img src="/css/i/global/allure_newsletter_overlay.jpg">';
            NLhtml     +=    '</div>';
            NLhtml     +=    '<div class="hedNewsFormWrap">';
            NLhtml       +=    '<div class="hed">Sign up for Our Newsletter</div>';
            NLhtml     +=     '<div class="dek">Get your daily dose of beauty tips, tricks, and news, sent straight to your inbox</div>';
            NLhtml     +=        '<form name="newslettersForm" action="https://secure-stag.allure.com/services/newsletters" method="post" class="ng-pristine ng-valid">';
            NLhtml     +=            '<fieldset>';
            NLhtml     +=                '<input type="hidden" name="toolkit.application" value="newsletter">';
            NLhtml       +=                '<input type="hidden" name="toolkit.applicationId" value="">';
            NLhtml       +=                 '<input type="hidden" name="formName" value="shortForm">';
            NLhtml       +=                 '<input type="hidden" name="partnerCode" value="">';
            NLhtml       +=                 '<input type="hidden" name="sourceCode" value="">';
            NLhtml     +=             '</fieldset>';
            NLhtml     +=            '<fieldset>';
            NLhtml     +=           '<div class="message"></div>';
            NLhtml       +=                '<div class="snWrap">';
            NLhtml     +=                    '<input name="email" id="newsletter-email" type="text" value="Email Address">';
            NLhtml     +=                    '<button type="submit" name="submit-newsletter" id="submit-newsletter">GO</button>';
            NLhtml     +=                '</div>';
            NLhtml     +=            '</fieldset>';
            NLhtml     +=        '</form>';
            NLhtml     +=        '<div class="logo"><img src="/css/i/global/allure_bk_logo.png" /></div>';
            NLhtml       +=     '</div>';
            NLhtml     += '</div></div>';

            jQuery('BODY').append(NLhtml);
        }
        this.alreadyRan = true;

      }

}
