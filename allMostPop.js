CN.site.allure.mostPop = {

                isIndex : jQuery('BODY').hasClass('indexA'),

                getPopData : function(){
                    var apiKey      = 'allure.com',
                        apiSecret   = 'al2KXhnbjQ5vFlARRyXnz307byr3VJOhHnAnLX5q3qI',
                        section     = jQuery.parseJSON(jQuery('meta[name="parsely-page"]').attr('content').replace(/\\"/g, '"')).section.replace(' ', '+'),
                        inLast      = '72h',
                        limit       = (this.isIndex)? '30' : '25',
                        request     = '';


                    if(jQuery('BODY').hasClass('s_salon-spa-reviews') || jQuery('BODY').hasClass('s_free-samples') || jQuery('BODY').hasClass('s_shopping')){
                        section = 'Beauty+Trends';
                    }

                    if(jQuery('BODY').hasClass('home')){
                        section = '';
                    }


                    request     = '?apikey=' + apiKey + '&secret=' + apiSecret + '&page=1&limit=' + limit + '&time=' + inLast + '&section=' + section ;
                    console.log(request);
                    jQuery.ajax({
                        type : 'GET',
                        url : 'http://api.parsely.com/v2/realtime/posts' + request,
                        dataType : 'jsonp',
                        crossDomain: true,
                        success : function(data) {
                            console.log(data);
                            CN.site.allure.mostPop.prepData(data);
                        },
                        error : function(xhr, textStatus) {

                        }
                    });
                },

                prepData : function(data){
                    console.log(data);
                    var dupChecklist = [window.location.pathname],
                        preppedData  = [],
                        verifyLimit  = (jQuery('BODY').hasClass('listC') || this.isIndex)? 3 : 5;

                    data = data.data;
                    console.log(data);
                    console.log(data.length);

                    if(this.isIndex){
                        jQuery('.numbered-toggle .tab .feature-header a').each(function(){
                            var link = jQuery(this).attr('href');
                            dupChecklist.push(link);
                        });

                        jQuery('.blogriver .feature .blogRiverContent .header a').each(function(){
                            var link = jQuery(this).attr('href');
                            dupChecklist.push(link);
                        });
                    }

                    for(var pc = 0; pc < data.length; pc++){
                        data[pc].link   = data[pc].link.replace('aws.preview.allure.com', 'www.allure.com');
                        data[pc].link   = data[pc].link.replace('preview.allure.com', 'www.allure.com');
                        data[pc].title   = data[pc].title.replace(': Daily Beauty Reporter', '');
                        data[pc].title   = data[pc].title.replace('Daily Beauty Reporter', '');
                        console.log(pc);
                        var isVerified = false;

                        for(var dc = 0; dc < dupChecklist.length; dc++){

                            isVerified = true;

                            if(data[pc].link.replace('http://www.allure.com', '') == dupChecklist[dc]){
                                console.log('dup');
                                isVerified = false;
                                continue;
                            }

                        }

                        if((data[pc].pub_date.indexOf('2015') < 0) && (data[pc].pub_date.indexOf('2014') < 0)){
                            console.log('old');
                            isVerified = false;
                            continue;
                        }

                        if(data[dc].image_url == ''){
                            console.log('no image');
                            isVerified = false;
                            continue;
                        }

                        if(isVerified){
                            preppedData.push(data[pc]);
                        }

                        if(preppedData.length == verifyLimit){
                            break;
                        }

                    }
                    this.displayData(preppedData);
                },

                displayData : function(data){
                    console.log(data);
                    var popDisplay  = '<div class="popWrap" style="display:none;">';
                        popDisplay += '<div class="popTitle">READ THIS NEXT</div><div class="popBorder"></div><div class="clear"></div>';

                    for(var dc = 0; dc < data.length; dc++){
                        popDisplay += '<div '+ ((dc == data.length-1)?'class="plrSub"':'') +'><div class="popImgWrap">';
                        popDisplay += '<a class="track' + (dc+1) + '" href="' + data[dc].link + '"><img src="' + data[dc].image_url + '"></a></div>';
                        popDisplay += '<div class="popLinkWrap"><div><span class="popNum">' + (dc+1) + '</span>';
                        popDisplay += '<a class="track' + (dc+1) + '" href="' + data[dc].link + '">' + data[dc].title + '</a>';
                        popDisplay += '</div></div><div class="clear"></div></div><hr/>';
                    }

                    //popDisplay += '</ul>';
                    popDisplay += '</div>';

                    jQuery('.yrail_textads').before(popDisplay);

                    console.log(jQuery('#cnAllPlrTrgt').parent().find('.sponsored'));


                    var plrChck = setInterval(function(){
                            console.log(jQuery('#cnAllPlrTrgt').parent().find('.sponsored'));
                            if(jQuery('#cnAllPlrTrgt').parent().find('.sponsored').length > 0){
                                 jQuery('.popWrap .plrSub').before(jQuery('#cnAllPlrTrgt').parent().find('.sponsored').clone());
                                 jQuery('.popWrap .plrSub').remove();
                                 jQuery('.popWrap hr:last').remove();

                                 jQuery('.popWrap .sponsored .trackSponsor').click(function(e){
                                     e.preventDefault();
                                     console.log('passed');
                                     jQuery('.plrWrap .sponsored .trackSponsor')[0].click();
                                 });

                                 clearInterval(plrChck);
                            }},300);

                    setTimeout(function(){
                           clearInterval(plrChck);
                           jQuery('.popWrap').fadeIn();
                    }, 4000);
                }
};

CN.site.allure.mostPop.getPopData();
