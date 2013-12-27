$(document).ready(function(){
    
    // Text Size
    var setFont = getCookie("fontsize");
	setFont = 12;
     if(!setFont){
      setCookie("fontsize",12,15);
      setFont = 12;   
     }else{
         $("#content .content1").css("font-size",setFont+"px");
         $("#content .content2").css("font-size",setFont+"px");
         $("#content .content3").css("font-size",setFont+"px");
         $(".ibt_art .content1").css("font-size",setFont+"px");
         $(".ibt_art .content2").css("font-size",setFont+"px");
         $(".ibt_art .content3").css("font-size",setFont+"px");
     }
   //Top Menu  
   $(".textsize_plus").click(function(){
       if(setFont<30){setFont++;setFont++;}
       setCookie("fontsize",setFont,15);
       $("#content .content1").css("font-size",setFont+"px");
       $("#content .content2").css("font-size",setFont+"px");
       $("#content .content3").css("font-size",setFont+"px");
	   $(".ibt_art .content1").css("font-size",setFont+"px");
	   $(".ibt_art .content2").css("font-size",setFont+"px");
	   $(".ibt_art .content3").css("font-size",setFont+"px");
       
   });
   $(".textsize_minus").click(function(){
       if(setFont>8){setFont--;setFont--;}
       setCookie("fontsize",setFont,15);
       $("#content .content1").css("font-size",setFont+"px");
       $("#content .content2").css("font-size",setFont+"px");
       $("#content .content3").css("font-size",setFont+"px");
       $(".ibt_art .content1").css("font-size",setFont+"px");
       $(".ibt_art .content2").css("font-size",setFont+"px");
       $(".ibt_art .content3").css("font-size",setFont+"px");
   });    

	/******************* Email Form  ***********************/
	$("#subscribeform").submit(function(){
		$.post("/art/services/newsletter.php",$("#subscribeform").serialize(),function(data){

			$("#ibtSubscriberEmail").attr("value","");
			if(data == "Thanks"){
				$("#subscribediv .thanks").html("Thank you for your submitting.");
				$("#subscribediv .errormsg").html("");

			}else{
				$("#subscribediv .thanks").html("");
				$("#subscribediv .errormsg").html(data);
			}
		});
	});
    
    /************Gallery Button****************/
    $("#img_next_btn").mouseover(function(){
            $(this).attr("src","http://img.ibtimes.com/www/site/us/images/bt_sd_next.gif");
    });
    $("#img_next_btn").mouseout(function(){
            $(this).attr("src","http://img.ibtimes.com/www/site/us/images/bt_sd_next2.gif");
    });
    $("#img_prev_btn").mouseover(function(){
            $(this).attr("src","http://img.ibtimes.com/www/site/us/images/bt_sd_prev.gif");
    });
    $("#img_prev_btn").mouseout(function(){
            $(this).attr("src","http://img.ibtimes.com/www/site/us/images/bt_sd_prev2.gif");
    });   
        
    /************ Editors pick tab ****************/ 
	$(function(){
		$('.bk_pickart .tabbed_dot').hover(function(){
			$('.bk_pickart .tabbed_dot').removeClass('current');
			$(this).addClass('current');
			var curindex = $(this).index();
			$('#mostpopular .inner').hide();
			$('#mostpopular #inner_'+curindex).show();
		});
	});

    /************ Most popular tab ****************/ 
	$(function(){
		$('.bk_mostpopular .tabbed').click(function(){
			$('.bk_mostpopular .tabbed').removeClass('current');
			$(this).addClass('current');
			var curindex = $(this).index();
			$('.bk_mostpopular .bd').hide();
			$('.bk_mostpopular #inner_pop_'+curindex).show();
		});
	});
	
    /************ IBTimes TV tab ****************/ 
	$(function(){
		$('.bk_playtvmore .tabbed_dot').hover(function(){
			$('.bk_playtvmore .tabbed_dot').removeClass('current');
			$(this).addClass('current');
			var curindex = $(this).index();
			$('.bk_playtvmore .inner').hide();
			$('.bk_playtvmore #inner_vid_'+curindex).show();
		});
	});
	
    /************ Recommend to you ****************/ 
    var _top = $(window).scrollTop();
    var _direction;
    var hide=getCookie('recommend_hidden');
    $(window).scroll(function(){
    	if(!hide){
	        var _cur_top = $(window).scrollTop();
	        if(_top<_cur_top){
	            _direction = "down";
	        }else{
	            _direction = "up";
	        }
	        $('#sl_height').html(_cur_top);
	        scroll_action(_direction,_cur_top);
	        _top = _cur_top;
        }
    });
	$("#sl_wrap .close").click(function() {
		$("#sl_wrap").hide();
		setCookie('recommend_hidden','true',1);
	});
	$(".bk_recommend .arrow_rt").click(function(){
		if(re_loading==false){
			order_num=order_num+1; 
			var htmstr=$(".bk_recommend .title_next").html();
			$(".bk_recommend .title_art").html(htmstr);
			$(".bk_recommend #re_load").show();
			$.get("/art/ajax/ajax_recommend.php",{order_num: order_num,cat_id: cat_id}, function(data){
				re_loading=true;   
				if(data.status == 'Success'){  
					$(".bk_recommend #re_load").hide();
					$(".bk_recommend .title_next").html(data.str);
					order_num=parseInt(data.order_num);
					recommend_cookie(order_num,cat_id);
					re_loading=false;
				}	
			},"json");
		}
	});
    

    
});

// Recommend to you
var sl_show=false;
var re_loading=false;
function scroll_action(direction,cur_top){
	var position=$('#sl_point').position();
	var point=position.top;
	if(direction=="down"&&point<(cur_top+500)&&sl_show==false){
		sl_show=true;
		$('#sl_wrap').stop().animate({'marginRight':'377px'},200);
		recommend_cookie(order_num,cat_id);
	}else if(direction=="up"&&point>cur_top&&sl_show==true){
		sl_show=false;
		$('#sl_wrap').stop().animate({'marginRight':'-30px'},800);
	}
}
function recommend_cookie(order_num,cat_id){
	var c_value=getCookie('re_ids_'+cat_id);
	var this_num=0;
	var new_value="";
	var check="";
	new_value=order_num+1;
	setCookie('re_ids_'+cat_id,new_value,0.5);
}

//make email address avoid spamming
var tld_ = new Array()
tld_[0] = "com";
tld_[1] = "co.uk";
tld_[2] = "co.in";
tld_[3] = "co.id";
tld_[4] = ".com.au";
tld_[5] = ".com.cn";
tld_[6] = ".com.hk";
tld_[7] = ".com.mx";
tld_[8] = "de";
var topDom_ = 13;
var m_ = "mailto:";
var a_ = "@";
var d_ = ".";
function mail(name, dom, tl, params){
	var s = eform(name,dom,tl);
	document.write('<a href="'+m_+s+params+'">'+s+'</a>');
}
function mail2(name, dom, tl, params, display){
	document.write('<a href="'+m_+eform(name,dom,tl)+params+'">'+display+'</a>');
}
function eform(name, dom, tl){
	var s = name+a_;
	if (tl!=-2){
		s+= dom;
		if (tl>=0)s+= d_+tld_[tl];
	}
	else s+= swapper(dom);
	return s;
}
function swapper(d){
	var s = "";
	for (var i=0; i<d.length; i+=2)
		if (i+1==d.length)
			s+= d.charAt(i)
		else
			s+= d.charAt(i+1)+d.charAt(i);
	return s.replace(/\?/g,'.');
}

//Video
var cur_vid_id;
var cur_close_id;
function close_videos(){
	if(cur_vid_id){
		cur_close_id=cur_vid_id;
		$("#video_wrap_"+cur_vid_id+" .video_image").css('z-index',3);
		$("#vidframe_"+cur_vid_id).html(' ');
     	$("#video_wrap_"+cur_vid_id+" .video_image").delay(300).animate({
		    width: 280,
		    height: 156
		  }, 500, function(){
		  	$("#video_wrap_"+cur_close_id+" .frame_click").show();	  	
		});		
		cur_vid_id=0;
		
	}
}
function show_video(id){ 
    	close_videos(); 
    	cur_vid_id=id;
    	$("#video_wrap_"+id+" .frame_click").hide();
		$("#vidframe_"+id).html('<div class="vid_close" style="display:none;" onclick="close_videos();">close</div><iframe src="http://tv.ibtimes.com/embed_auto/'+id+'" scrolling="no"  marginHeight="0" marginWidth="0" frameborder="0" width="680" height="376"></iframe>');
     	$("#vidimage_"+id).animate({
		    width: 680,
		    height: 376
		  }, 500, function(){
		  	$("#video_wrap_"+id+" .video_image").delay(2000).css('z-index',3);	
		  	$("#video_wrap_"+id+" .vid_close").show();  	
		  });
}

//For Large Video
var cur_play_tv_id;
var cur_close_tv_id;
var auto_play_tv;

function pause_videos(){
	if(cur_play_tv_id){
		cur_close_tv_id=cur_play_tv_id;
		$("#video_wrap_"+cur_play_tv_id+" .video_image").css('z-index',3);
		$("#vidframe_"+cur_play_tv_id).html(' ');
     	$("#video_wrap_"+cur_play_tv_id+" .video_image").delay(300).animate({
		    width: 680,
		    height: 376
		  }, 500, function(){
		  	$("#video_wrap_"+cur_close_tv_id+" .frame_click").show();	  	
		});		
     	cur_play_tv_id=0;
	}
}
function play_video(id){ 
    	pause_videos(); 
    	cur_play_tv_id=id;
		int = window.clearInterval(auto_play_tv);
    	$("#video_wrap_"+id+" .frame_click").hide();
		$("#vidframe_"+id).html('<div class="vid_close" style="display:none;" onclick="pause_videos();">close</div><iframe src="http://tv.ibtimes.com/embed_auto/'+id+'" scrolling="no"  marginHeight="0" marginWidth="0" frameborder="0" width="680" height="376"></iframe>');
     	$("#vidimage_"+id).animate({
		    width: 680,
		    height: 376
		  }, 500, function(){
		  	$("#video_wrap_"+id+" .video_image").delay(2000).css('z-index',3);	
		  	$("#video_wrap_"+id+" .vid_close").show();  	
		  });
}

/****************
Essensial Function
*****************/

function in_text(text,needle){
    var result="F";
    if(text==null)result="F";
    else if(text){
        var id_arr  = text.split(',');
        for(var i=0;i<id_arr.length;i++){
            if(needle==id_arr[i]&&id_arr[i])result="T";
        }
    }
    return result;
}

function findPos(obj) {
	var pos = new Array();
	if (obj.offsetParent) {
		pos[0] = obj.offsetLeft;
		pos[1] = obj.offsetTop;
		while (obj = obj.offsetParent) {
			pos[0] += obj.offsetLeft;
			pos[1] += obj.offsetTop;
		}
	}
	return pos;
}

/**************************
Gallery
**************************/
function seeFull(){
	var thumbposition = $("#articlethumb").position();

	$("#fullBox").css("left",(thumbposition.left - 10)+"px" );
	$("#fullBox").css("top",(thumbposition.top - 10)+"px" );
	$("#fullBox").css("display","block" );
}

function closeFull(){
	$("#fullBox").css("display","none" );
}
var gallerycurrent = 1;
var gallerynumFull = function(num){
	$("#imgNum #img-num-"+num).attr("class","imgcurrent");
	var idinfo = $("#fullImage #picture"+num+" img.fullimg").attr("id");
	
	$("#imgNum #img-num-"+gallerycurrent).attr("class","");
	$("#fullImage #picture"+gallerycurrent).css("display","none");
	$("#fullImage #picture"+num).css("display","block");
	
	gallerycurrent = num;


}

//main video
$(document).ready(function(){
	$(".playico").hover(function() {
		$(this).children().attr("src","http://img.ibtimes.com/www/site/2011/video/images/btn_playnow_main_hover.png");

	});
	$(".playico").mouseleave(function() {
		$(this).children().attr("src","http://img.ibtimes.com/www/site/2011/video/images/btn_playnow_main.png");
	});
});



/* Share Function */
function ibtimes_share(service,shortURL) {
    // Get href and title
    // PDS URL correction, remove when going live

    var url = (shortURL ? shortURL : location.href);
    //if (!shortURL) { url = url.replace(/^http:\/\/[a-z]+\.u\./i,'http://www.') };

    encodedurl = encodeURIComponent(url);
    var encodedtitle = encodeURIComponent(document.title);

    var serviceURL = null;
    if (service == 'delicious') {
        serviceURL = 'http://del.icio.us/post?v=4&noui&jump=close'
            + '&url='      + encodedurl
            + '&title='    + encodedtitle;
    } else if (service == 'digg') {
        serviceURL = 'http://digg.com/submit?phase=2'
            + '&url='      + encodedurl
            + '&title='    + encodedtitle;
    } else if (service == "myspace"){
        serviceURL = 'http://www.myspace.com/Modules/PostTo/Pages/?'
            + 'u='         + encodedurl 
            + '&t='        + encodedtitle;
    } else if(service == 'stumbleupon'){
        serviceURL = 'http://www.stumbleupon.com/submit'
            + '?url='         + encodedurl 
            + '&title='        + encodedtitle;
            
    } else if (service == 'facebook') {
        serviceURL = 'http://www.facebook.com/sharer.php'
            + '?u=' + encodedurl
            + '&t=' + encodedtitle;
    } else if(service == 'buzz'){
        serviceURL = 'http://buzz.yahoo.com/buzz'
            + '?targetUrl=' + encodedurl 
            + '&headline=' + encodedtitle;
    } else if(service == 'yahoobookmk'){
        serviceURL = 'http://bookmarks.yahoo.com/toolbar/savebm?opener=tb'
            + '&u=' + encodedurl
            + '&t=' + encodedtitle;
    } else if (service == "yahoomyweb"){
        serviceURL = 'http://myweb2.search.yahoo.com/myresults/bookmarklet'
            + '?u='         + encodedurl 
            + '&t='        + encodedtitle;
    } else if (service == "propeller"){
        serviceURL = 'ttp://www.propeller.com/submit/'
            + '?U='         + encodedurl 
            + '&T='        + encodedtitle;


    } else if(service == 'windowslive'){
        serviceURL = 'https://favorites.live.com/quickadd.aspx?marklet=1&mkt=en-us&top=1'
            + '&url='   + encodedurl
            + '&title=' + encodedtitle; 
    } else if( service == 'mixx'){
        serviceURL = 'http://www.mixx.com/submit';
            + '?page_url='  + encodedurl
            + '&t='         + encodedtitle;   
    } else if (service == 'fark') {
        serviceURL = 'http://www.fark.com/cgi/fark/submit.pl'
            + '?new_url='     + encodedurl
            + '&new_comment=' + encodedtitle;
    } else if (service == 'google') {
        serviceURL = 'http://www.google.com/bookmarks/mark?op=add'
            + '&bkmk='       + encodedurl
            + '&title='      + encodedtitle
            + '&labels='     + ''
            + '&annotation=' + '';
    } else if (service == 'newsvine') {
        serviceURL = 'http://www.newsvine.com/_tools/seed&save'
            + '?u='      + encodedurl;
    } else if (service == 'reddit') {
        serviceURL = 'http://reddit.com/submit'
            + '?url='      + encodedurl
            + '&title='    + encodedtitle;
    } else if (service == 'slashdot') {
        serviceURL = 'http://slashdot.org/bookmark.pl'
            + '?url='   + encodedurl
            + '&title=' + encodedtitle;
    } else if (service == 'technorati') {
        serviceURL = 'http://technorati.com/faves?sub=favthis'
            + '&add=' + encodedurl;
    } else if (service == 'twitter') {
        serviceURL = 'http://twitter.com/home?status='
            + encodedtitle
            + ' ' + encodedurl;
    } else if (service == 'tweetmeme') {
        serviceURL = 'http://api.tweetmeme.com/share?url='
           + encodedurl
           + '&service=bit.ly';
    } else if (service == 'linkedin') {
        serviceURL = 'http://www.linkedin.com/shareArticle?mini=true&url=' + encodedurl + '&title=' + encodedtitle +'&summary=' + exDek + '&source=ibtimes.com'

        /*
        if (sfgate_article_paratext) {
           serviceURL = serviceURL + '&summary=' + encodeURIComponent(sfgate_article_paratext);
        }
        */
    }
    if ( serviceURL != null ) {
        
        var theNewWin = window.open(serviceURL,'sfgateshare','width=900,height=640,resizable=yes,toolbar=no,location=no,scrollbars=yes');
        if ( typeof theNewWin != "undefined" &&
             theNewWin != null ) {
            theNewWin.focus();
        }
    }
}

// e js/pluck/comments/cpiece_cmt_cnt.js

// /js/utils/customSocial.js

function social_popup(type){
	if(type=="yahoobuzz"){
      var sharelink = 'http://buzz.yahoo.com/buzz?targetUrl=' + exURL + '&headline=' + exHed + '&summary='+ exDek;
      window.open(sharelink, "","status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollsbars=0,height=590,width=614");
     }
}

var ibt_customFacebook = new Array();

function customSocial(type, basename, urllink, urltitle, double) {
   this.type = type;
   this.basename = basename;
   this.urllink = urllink;
   this.urltitle = urltitle;
   if (typeof double != 'undefined') {
      this.double = double;
   }
   if (type == 'tweetmeme') {
      this.sharelink = 'http://api.tweetmeme.com/share?url=' + escape(urllink) + '&service=bit.ly';
   } else if (type == 'facebook') {
      this.sharelink = 'http://www.facebook.com/sharer.php?u=' + escape(urllink) + '&t=' + escape(urltitle);
      ibt_customFacebook[ibt_customFacebook.length] = basename;  
   } 

   this.cntel = document.getElementById(basename + '_cnt');
   if (type == 'tweetmeme') {
      this.imgel = document.getElementById(basename + '_img');
   }
   if (double) {
      this.cntel2 = document.getElementById(basename + '_1_cnt');
      
      if (type == 'tweetmeme') {
         this.imgel2 = document.getElementById(basename + '_1_img');
      }
   }
   if (type == 'tweetmeme') {
      var head= document.getElementsByTagName('head')[0];
      
      var script= document.createElement('script');
      script.type= 'text/javascript';
      script.src = 'http://api.tweetmeme.com/url_info.jsonc?url=' + escape(urllink) + '&callback=' + basename + '.Process';
      head.appendChild(script);
   }
}

function ibt_customFacebookSetup() {
   var facebookIframe = document.getElementById('customFacebookIframe');
   if (typeof facebookIframe != 'undefined' && typeof ibt_customFacebook != 'undefined') {
      for (var i =0; i < ibt_customFacebook.length; i++) {
          //  alert(facebookIframe.contentWindow);
          facebookIframe.contentWindow.ibt_facebookCount(ibt_customFacebook[i]);
      }
   }
}

customSocial.prototype.Process = function(obj) {
   if (this.type == 'tweetmeme') {
      if (obj.status == 'success') {
         this.cntel.innerHTML = obj.story.url_count;
         if (obj.story.url_count) {
            //this.imgel.src = 'http://imgs.sfgate.com/graphics/article/retweet.gif';
         }
         
         if (this.double) {
             
             this.cntel2.innerHTML = obj.story.url_count;
            if (obj.story.url_count) {
               //this.imgel2.src = 'http://imgs.sfgate.com/graphics/article/retweet.gif';
            }
         }
         
         var storyurl = obj.story.tm_link;
         var pos = storyurl.lastIndexOf('/');
         if (pos) {
            this.storyid = storyurl.substring(pos + 1,storyurl.length);
            this.popuplink =  'http://tweetmeme.com/popup/option?url_id=' + this.storyid + '&service=bit.ly';
         }
      }
   }
}

customSocial.prototype.AddClick = function() {
   if (!this.added) {
      var newcount = parseFloat(this.cntel.innerHTML) + 1;
      this.cntel.innerHTML = newcount;
      if (this.double) {
         this.cntel2.innerHTML = newcount;
      }
      if (this.type == 'tweetmeme' && newcount == 1) {
         //this.imgel.src = 'http://imgs.sfgate.com/graphics/article/retweet.gif';
         if (this.double) {
            //this.imgel2.src = 'http://imgs.sfgate.com/graphics/article/retweet.gif';
         }                                                       
      }
      this.added = 1;
   }
   
   if (this.type == 'tweetmeme') {
      if (this.popuplink) {
         window.open(this.popuplink, "","status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollsbars=0,height=340,width=500")
      } else {
         window.open(this.sharelink, '_blank');
      }
   } else if (this.type == 'facebook') {
      window.open(this.sharelink, 'sharer','toolbar=0,status=0,width=626,height=436');
   }
   return false;
}


//  end /js/utils/customSocial.js


// Custom STATs
function article_counter(article_id,category_id,country_code,country_id,typology_id,local_id,feed_source){
    $.get("http://old.ibtimes.com/art/ajax/article_counter.php", { article_id: article_id, maincat_id: category_id, country_code: country_code, country_id: country_id, typology_id: typology_id, local_id: local_id, feed_source: feed_source  } );
}

/* jQuery Image Magnify script v1.1 - Article Image Enlarge
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/
jQuery.imageMagnify={
	dsettings: {
		magnifyby: 2, //default increase factor of enlarged image
		duration: 500, //default duration of animation, in millisec
		imgopacity: 0.2 //opacify of original image when enlarged image overlays it
 	},
	cursorcss: '-moz-zoom-in', //Value for CSS's 'cursor' attribute, added to original image
	zIndexcounter: 100,

	refreshoffsets:function($window, $target, warpshell){
		var $offsets=$target.offset()
		var winattrs={x:$window.scrollLeft(), y:$window.scrollTop(), w:$window.width(), h:$window.height()}
		warpshell.attrs.x=$offsets.left //update x position of original image relative to page
		warpshell.attrs.y=$offsets.top
		warpshell.newattrs.x=winattrs.x+winattrs.w/2-warpshell.newattrs.w/2
		warpshell.newattrs.y=winattrs.y+winattrs.h/2-warpshell.newattrs.h/2
		if (warpshell.newattrs.x<winattrs.x+5){ //no space to the left?
			warpshell.newattrs.x=winattrs.x+5	
		}
		else if (warpshell.newattrs.x+warpshell.newattrs.w > winattrs.x+winattrs.w){//no space to the right?
			warpshell.newattrs.x=winattrs.x+5
		}
		if (warpshell.newattrs.y<winattrs.y+5){ //no space at the top?
			warpshell.newattrs.y=winattrs.y+5
		}
	},

	magnify:function($, $target, options){
		var setting={} //create blank object to store combined settings
		var setting=jQuery.extend(setting, this.dsettings, options)
		var attrs=(options.thumbdimensions)? {w:options.thumbdimensions[0], h:options.thumbdimensions[1]} : {w:$target.outerWidth(), h:$target.outerHeight()}
		var newattrs={}
		newattrs.w=(setting.magnifyto)? setting.magnifyto : Math.round(attrs.w*setting.magnifyby)
		newattrs.h=(setting.magnifyto)? Math.round(attrs.h*newattrs.w/attrs.w) : Math.round(attrs.h*setting.magnifyby)
		$target.css('cursor', jQuery.imageMagnify.cursorcss)
		if ($target.data('imgshell')){
			$target.data('imgshell').$clone.remove()
			$target.css({opacity:1}).unbind('click.magnify')
		}	
		var $clone=$target.clone().css({position:'absolute', left:0, top:0, visibility:'hidden', border:'1px solid gray', cursor:'pointer'}).appendTo(document.body)
		$clone.data('$relatedtarget', $target) //save $target image this enlarged image is associated with
		$target.data('imgshell', {$clone:$clone, attrs:attrs, newattrs:newattrs})
		$target.bind('click.magnify', function(e){ //action when original image is clicked on
			var $this=$(this).css({opacity:setting.imgopacity})
			var imageinfo=$this.data('imgshell')
			jQuery.imageMagnify.refreshoffsets($(window), $this, imageinfo) //refresh offset positions of original and warped images
			var $clone=imageinfo.$clone
			$clone.stop().css({zIndex:++jQuery.imageMagnify.zIndexcounter, left:imageinfo.attrs.x, top:imageinfo.attrs.y, width:imageinfo.attrs.w, height:imageinfo.attrs.h, opacity:0, visibility:'visible', display:'block'})
			.animate({opacity:1, left:imageinfo.newattrs.x, top:imageinfo.newattrs.y, width:imageinfo.newattrs.w, height:imageinfo.newattrs.h}, setting.duration,
			function(){ //callback function after warping is complete
				//none added		
			}) //end animate
		}) //end click
		$clone.click(function(e){ //action when magnified image is clicked on
			var $this=$(this)
			var imageinfo=$this.data('$relatedtarget').data('imgshell')
			jQuery.imageMagnify.refreshoffsets($(window), $this.data('$relatedtarget'), imageinfo) //refresh offset positions of original and warped images
			$this.stop().animate({opacity:0, left:imageinfo.attrs.x, top:imageinfo.attrs.y, width:imageinfo.attrs.w, height:imageinfo.attrs.h},  setting.duration,
			function(){
				$this.hide()
				$this.data('$relatedtarget').css({opacity:1}) //reveal original image
			}) //end animate
		}) //end click
	}
};
jQuery.fn.imageMagnify=function(options){
	var $=jQuery
	return this.each(function(){ //return jQuery obj
		var $imgref=$(this)
		if (this.tagName!="IMG")
			return true //skip to next matched element
		if (parseInt($imgref.css('width'))>0 && parseInt($imgref.css('height'))>0 || options.thumbdimensions){ //if image has explicit width/height attrs defined
			jQuery.imageMagnify.magnify($, $imgref, options)
		}
		else if (this.complete){ //account for IE not firing image.onload
			jQuery.imageMagnify.magnify($, $imgref, options)
		}
		else{
			$(this).bind('load', function(){
				jQuery.imageMagnify.magnify($, $imgref, options)
			})
		}
	})
};
jQuery.fn.applyMagnifier=function(options){ //dynamic version of imageMagnify() to apply magnify effect to an image dynamically
	var $=jQuery
	return this.each(function(){ //return jQuery obj
		var $imgref=$(this)
		if (this.tagName!="IMG")
			return true //skip to next matched element
		
	})	

};
//** The following applies the magnify effect to images with class="magnify" and optional "data-magnifyby" and "data-magnifyduration" attrs
//** It also looks for links with attr rel="magnify[targetimageid]" and makes them togglers for that image
jQuery(document).ready(function($){
	var $targets=$('.magnify')
	$targets.each(function(i){
		var $target=$(this)
		var options={}
		if ($target.attr('data-magnifyto'))
			options.magnifyto=parseFloat($target.attr('data-magnifyto'))
		if ($target.attr('data-magnifyby'))
			options.magnifyby=parseFloat($target.attr('data-magnifyby'))
		if ($target.attr('data-magnifyduration'))
			options.duration=parseInt($target.attr('data-magnifyduration'))
		$target.imageMagnify(options)
	})
	var $triggers=$('a[rel^="magnify["]')
	$triggers.each(function(i){
		var $trigger=$(this)
		var targetid=$trigger.attr('rel').match(/\[.+\]/)[0].replace(/[\[\]']/g, '') //parse 'id' from rel='magnify[id]'
		$trigger.data('magnifyimageid', targetid)
		$trigger.click(function(e){
			$('#'+$(this).data('magnifyimageid')).trigger('click.magnify')
			e.preventDefault()
		})
	})
});


/*top7 slides*/
function header_slide(photo_width,photo_limit){
	this.Obj;  
	this.amount;
	this.picture_space = photo_width;
	this.speed;
	this.num = 0;	
	this.moving = true;
	this.target;
	this.autos;
	this.pho_limit=photo_limit;
}		
header_slide.prototype.move = function(val){
	if(this.autos) clearTimeout(this.autos);
	if(this.moving){
		this.Obj = document.getElementById("showbx");
		if(val==(this.pho_limit-1)){ 
			this.moving = false;					
			if(this.num<this.pho_limit){					
				this.amount = (this.num+1)*this.picture_space;
				this.target = -1*this.picture_space*(this.num+1);
				this.go_right();
				this.num++;
			}else{
				this.num=0;
				this.Obj.style.left = "0px";
				this.amount = (this.num+1)*this.picture_space;
				this.target = -1*this.picture_space*(this.num+1);
				this.go_right();
				this.num++;				
			}		
		}else{		
			this.moving = false;		
			if(this.num>0){ 
				
				this.amount = (this.num-1)*this.picture_space;
				this.target = -1*this.picture_space*(this.num-1);
				this.go_left();
				this.num--;
			}else{
				this.num=this.pho_limit;
				this.Obj.style.left = -1*this.picture_space*this.num+"px";
				this.amount = (this.num-1)*this.picture_space;
				this.target = -1*this.picture_space*(this.num-1);
				this.go_left();
				this.num--;					
			}	
		}
	}	
}
header_slide.prototype.go_left =  function (){
	this.Obj = document.getElementById("showbx");
	if(this.Obj.style.left=="") this.Obj.style.left = "-1px";
	var current_pos = parseInt(this.Obj.style.left.substring(0,this.Obj.style.left.indexOf('px')));
	this.speed = -1*parseInt((current_pos+this.amount)/3)+8;
	this.Obj.style.left = current_pos + this.speed + "px";
	var sss = window.setTimeout("hs.go_left()",100);
	if(current_pos>(this.target-11)){ 
		clearTimeout(sss);
		this.Obj.style.left = this.target+"px";
		this.autos = window.setTimeout("hs.automatic()",5000);
		this.moving = true;
	}			
}	
header_slide.prototype.go_right = function(){
	this.Obj = document.getElementById("showbx");
	if(this.Obj.style.left=="") this.Obj.style.left = "-1px";
	var current_pos = parseInt(this.Obj.style.left.substring(0,this.Obj.style.left.indexOf('px')));
	this.speed = parseInt((current_pos+this.amount)/3)+8;
	this.Obj.style.left = current_pos - this.speed + "px";
	var sss = window.setTimeout("hs.go_right()",100);
	if(current_pos<(this.target+12)){ 
		clearTimeout(sss);
		this.Obj.style.left = this.target+"px";
		this.autos = window.setTimeout("hs.automatic()",5000);
		this.moving = true;
	}			
}
header_slide.prototype.automatic= function(){
	if(this.moving){
		this.Obj = document.getElementById("showbx");				
		this.moving = false;			
		if(this.num==this.pho_limit){
			this.num = 0;
			this.Obj.style.left = "0px";
		}
		if(this.num<this.pho_limit){
			this.amount = (this.num+1)*this.picture_space;
			this.target = -1*this.picture_space*(this.num+1);
			this.go_right();
			this.num++;
		}	
	}		
}
