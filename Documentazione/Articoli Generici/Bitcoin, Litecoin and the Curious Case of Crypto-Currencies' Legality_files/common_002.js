var rtid=window.setTimeout("history.go(0)", 480000);

//top main nav
$(document).ready(function(){
    $("#nav_ibt ul li").mouseover(function(){
        var id=$(this).attr("id");
    });
    $(".navarr").click(function(){
        $(".nav_inner").hide();     
        var aid = $(this).attr("id");
        var cid = aid.substring(9);
        var cnum = parseInt(cid);

        
        $(this).blur();
        var loadurl = '/mainpage/ajax/ajax_top_section_box.php?cate='+$(this).parent().attr('id');
        loadpage('nav_html_'+cnum,loadurl,'http://img.ibtimes.com/www/site/us/images/ajax_load.gif',130);
        //var position = $(this).parent().position();
        //$("#nav_inner").css({"left":position.left,"top":position.top+29});
        $("#nav_html_"+cnum).show();
        //$(this).parent().addClass("active");
        return false;
    });
    $(".nav_inner").click(function(){
        $(".nav_inner").hide();    
    });
    
    $("#navlist li.mnav").hover(function(){},function(){
        $(this).find(".nav_inner").hide();
        
    });
});

//top search
function chk_search(type){
	f=document.topsearch;
	if(f.q.value==""){f.q.className='focusred';f.q.focus();return false;}
	if(type=="submit")document.topsearch.submit();
	return true;
}
function PopUp(URL, width, height,scroll) {
	day = new Date();
	id = day.getTime();
	eval("page" + id + " = window.open(URL, 'infoPage', 'toolbar=0,scrollbars='+scroll+',location=0,statusbar=0,menubar=0,resizable=0,width=' + width + ',height=' + height + ',left = 100,top = 0');");
}
function loadpage(res,loadurl,loadimg,padding){
	loadimg = '<div style="width:100%;margin: 0 auto;text-align:center;"><img src="'+loadimg+'" style="border:none;padding:'+padding+'px"></div>';
	$("#"+res).html(loadimg).load(loadurl, null, function(responseText){
		//$("#"+res).hide();
		//$("#"+res).show("show");
	});
}
function GetXmlHttpObject(){ 
	var objXMLHttp=null;
	if (window.XMLHttpRequest) objXMLHttp=new XMLHttpRequest();
	else if (window.ActiveXObject)	objXMLHttp=new ActiveXObject('Microsoft.XMLHTTP');
	return objXMLHttp;
}
function setPng24(obj) {
	obj.width=obj.height=1;
	obj.className=obj.className.replace(/\bpng24\b/i,'');
	obj.style.filter =
	"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
	obj.src=''; 
	return '';
}
function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return null
}
function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

//book mark
function setString(str1) {
	appname = navigator.appName;
	if (appname == "Netscape") { 
        
		var str = "Bookmark IBTimes";
	} else if (appname == "Microsoft Internet Explorer") {
		var str = "Make IBTimes Your Homepage";
	}
    if(str1)
        str =str1;
	document.write(str);
}
function CreateBookmarkLink(val) { 
	var b_url = "http://www.ibtimes.com/"; 
	var ua=navigator.userAgent.toLowerCase();
    var isKonq=(ua.indexOf('konqueror')!=-1);
    var isSafari=(ua.indexOf('webkit')!=-1);
    var isMac=(ua.indexOf('mac')!=-1);
    var buttonStr=isMac?'Command/Cmd':'CTRL';

	if (appname == "Microsoft Internet Explorer") { 
		val.style.behavior='url(#default#homepage)'; 
		val.setHomePage(b_url);
	} else if (isKonq) {
		alert('Please press CTRL + B to bookmark our site.');
	} else if (isSafari) {
		 alert('Please press '+buttonStr+' + D to bookmark our site.');
	} else if (isMac) {
		alert('Please press Command/Cmd + D to bookmark our site.'); 
	} else { 
		window.sidebar.addPanel(document.title, b_url,""); 
	} 
}

// advertisement
function click_texts(val,val2){
	xmlHttp=GetXmlHttpObject();
	xmlHttp.open("GET","/textad/click_textad.php?banner="+val+"&zone="+val2,true);
	xmlHttp.send(null);
}
function view_texts(val,val2){
	xmlHttp=GetXmlHttpObject();
	xmlHttp.open("GET","/textad/view_textad.php?banner="+val+"&zone="+val2,true);
	xmlHttp.send(null);
}
function view_banner(val,val2){
	xmlHttp=GetXmlHttpObject();
	xmlHttp.open("GET","/banner/view_banner.php?banner="+val+"&zone="+val2,true);
	xmlHttp.send(null);
}
function click_banner(val,val2){
	xmlHttp=GetXmlHttpObject();
	xmlHttp.open("GET","/banner/click_banner.php?ibt_banner="+val+"&zone="+val2,true);
	xmlHttp.send(null);
}

function view_banner_global(val,val2){
	xmlHttp=GetXmlHttpObject();
	var url="http://www.ibtimes.com/banner/view_banner.php";
	url=url+"?banner="+val;
	url=url+"&zone="+val2;
	xmlHttp.open("GET",url,true);
	xmlHttp.send(null);		
}
function click_banner_global(val,val2){
	xmlHttp=GetXmlHttpObject();
	var url="http://www.ibtimes.com/banner/click_banner.php";
	url=url+"?ibt_banner="+val;
	url=url+"&zone="+val2;
	xmlHttp.open("GET",url,true);
	xmlHttp.send(null);		
}	
function openflash(width,height,src){ 
    var text="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0\" width="+width+" height="+height+"><param name=movie value="+src+"><param name=quality value=high ><param name=wmode value=transparent><param name=menu value=false><embed src="+src+" quality=high  pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash\" type=\"application/x-shockwave-flash\" width="+width+" height="+height+"  wmode=transparent menu=false></embed></object>"; 
	document.write(text); 
} 
function openflash2(divid,width,height,src){ 
    var text="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0\" width="+width+" height="+height+"><param name=movie value="+src+"><param name=quality value=high ><param name=wmode value=transparent><param name=menu value=false><embed src="+src+" quality=high  pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash\" type=\"application/x-shockwave-flash\" width="+width+" height="+height+"  wmode=transparent menu=false></embed></object>"; 
	document.getElementById(divid).innerHTML=text;
} 
function cookie_banner(bnid,bnmax){
	var c_value=getCookie('ibtbn');
	var this_num=0;
	var new_value="";
	var check="";
	if (c_value!=null){
		var arr = c_value.split(",");
		for(var i=0;i<arr.length;i++){
			var cook_bn = arr[i].split(":");
			if(cook_bn[0]){
				if(cook_bn[0] == bnid){
					this_num=parseInt(cook_bn[1])+1;
					if(this_num<bnmax)cook_bn[1]=this_num;
					else cook_bn[1]=10000;
					check=true;
				}
				new_value+=cook_bn[0]+":"+cook_bn[1]+",";
			}
		}
		if(!check)new_value +=bnid+":1";
		setCookie('ibtbn',new_value,1);
	}else{
		setCookie('ibtbn',bnid+":1",1);
	}
}

//any toggle slides
function toggle_slide(target,exp_days){
  if ($("#"+target).is(":hidden")){$("#"+target).show("slow");setCookie(target, "show", exp_days);}
  else {$("#"+target).slideUp();setCookie(target, "hide", exp_days);}
}
function check_slide(target){
	if(getCookie(target)=="hide")$("#"+target).hide();
	else $("#"+target).show();
}

//ajax page nav
function minus_page(page,limit,total){
	page--;
	if(page<1){
		var max_page = Math.ceil(total/limit);
		page = max_page;
	}
	return page;
}
function plus_page(page,limit,total){
	page++;
	var max_page = Math.ceil(total/limit);
	if(page>max_page){
		page = 1;
	}
	return page;
}

//share IBT
function OpenPop(url, name, params) {
	var win = window.open(url, name, params);
}
var exURL     = escape("");
var exHed, exDek,http_host, keywords ="";
 function share_this(site,pal_name){
	  exHed=encodeURIComponent(document.getElementById('title'+pal_name).value);
	  exDek=encodeURIComponent(document.getElementById('sum'+pal_name).value);
	  keywords=encodeURIComponent(document.getElementById('keywords'+pal_name).value);
	  exURL=escape(document.getElementById('url'+pal_name).value);
	  shareArticle(site,pal_name);
 }
 function shareArticle(site,pal_name){
	switch (site) {
		case "digg":
			OpenPop('http://digg.com/remote-submit?phase=2&url='+exURL+'&title='+exHed+'&bodytext='+exDek,'digg','toolbar=no,resizable=yes,scrollbars=yes,width=850,height=500');
			break;		
		case "newsvine":
			OpenPop('http://www.newsvine.com/_wine/save?ver=2&popoff=0&aff=ibtimes&t=' + keywords + '&e=' + exDek + '&h=' + exHed + '&u=' + exURL, 'newsvine', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;		
		case "delicious":
			OpenPop('http://del.icio.us/post?tags=test&v=4&noui&jump=close&url='+exURL+'&title='+exHed+'&notes='+exDek+'&tags='+keywords, 'delicious','toolbar=no,resizable=yes,scrollbars=yes,width=850,height=500');
			break;		
		case "facebook":
			OpenPop('http://www.facebook.com/sharer.php?u=' + exURL + '&t=' + exHed, 'facebook', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;		
		case "stumbleupon":
			OpenPop('http://www.stumbleupon.com/submit?url=' + exURL + '&title=' + exHed, 'stumbleupon', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;		
		case "yahoo":
			OpenPop('http://buzz.yahoo.com/submit?submitUrl=' + exURL + '&submitHeadline=' + exHed+ '&submitSummary=' + exDek, 'yahoo', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;		
		case "myspace":
			OpenPop('http://www.myspace.com/Modules/PostTo/Pages/?u=' + exURL + '&t=' + exHed+ '&c=' + exDek, 'myspace', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;		
		case "google":
			OpenPop('http://www.google.com/bookmarks/mark?op=add&bkmk=' + exURL + '&title=' + exHed+ '&annotation=' + exDek, 'google', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;		
		case "reddit":
			OpenPop('http://www.reddit.com/submit?url=' + exURL + '&title=' + exHed, 'reddit', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;		
		case "linkedin":
			OpenPop('http://www.linkedin.com/shareArticle?mini=true&url=' + exURL + '&title=' + exHed+ '&summary=' + exDek, 'linkedin', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;
		case "technorati":
			OpenPop('http://technorati.com/faves/inistone?add=' + exURL, 'technorati', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;
		case "yahoobookmk":
			OpenPop('http://bookmarks.yahoo.com/toolbar/savebm?opener=tb&u=' + exURL+'&t='+ exHed, 'yahoobookmk', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;
		case "mixx":
			OpenPop('http://www.mixx.com/submit?page_url=' + exURL+'&t='+ exHed, 'mixx', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;
		case "yahoomyweb":
			OpenPop('http://myweb2.search.yahoo.com/myresults/bookmarklet?u=' + exURL+'&t='+ exHed, 'yahoomyweb', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;
		case "propeller":
			OpenPop('http://www.propeller.com/submit/?U=' + exURL+'&T='+ exHed, 'propeller', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;
		case "propeller":
			OpenPop('http://www.propeller.com/submit/?U=' + exURL+'&T='+ exHed, 'propeller', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;
		case "windowslive":
			OpenPop('https://favorites.live.com/quickadd.aspx?marklet=1&mkt=en-us&url=' + exURL+'&title='+ exHed+'&top=1', 'windowslive', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;
		case "friendfeed":
			OpenPop('http://friendfeed.com/share?url=' + exURL+'&title='+ exHed, 'friendfeed', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;
		case "furl":
			OpenPop('http://furl.net/storeIt.jsp?u=' + exURL+'&t='+ exHed, 'furl', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;
		case "xanga":
			OpenPop('http://www.xanga.com/private/editorx.aspx?u=' + exURL+'&t='+ exHed+'&s='+ exDek, 'xanga', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;
		case "blinklist":
			OpenPop('http://blinklist.com/index.php?Action=Blink/addblink.php&Url=' + exURL+'&Title='+ exHed, 'blinklist', 'toolbar=0,status=0,height=500,width=850,scrollbars=yes,resizable=yes');
			break;
	}
}

function CheckAll(objChkBox)
{ 
    bChecked = (objChkBox.checked)?true:false;
	checkLength = (objChkBox.form.length)-1;
    for (x=0;x<checkLength;x++)
    {
        objChkBox.form.elements[x].checked = bChecked;
    }
}
function isEmailAddr(email) {
	var result = false;
	var theStr = new String(email);
	var index = theStr.indexOf("@");
	if (index > 0) {
		var pindex = theStr.indexOf(".",index);
		if ((pindex > index+1) && (theStr.length > pindex+1))
		result = true;
	}
	return result;
}
function verifyRequired(f) {
	if (!isEmailAddr(f.fields_email.value)) {
		alert("Please enter valid email.");
		f.fields_email.focus();
		return false;
	}
	return true;
}

//hover image
$(document).ready(function(){    
    $(".hoverimg").mouseout(function(){
		var txt=$(this).attr('src');        
		var str = txt.split('_');
		var text='';
		text=txt.replace('hover_','');
		$(this).attr('src',text);
    }).mouseover(function(){
        var txt=$(this).attr('src');        
		var str = txt.split('_');
		var text='';
		if(txt.indexOf("hover_")==-1){
			for(var i=0;i<str.length;i++){
				if(i==(str.length-1))text += 'hover_'+str[i];
				else text += str[i]+'_';
			}
			$(this).attr('src',text);
		}
    });
});

//bottom newsletter form
$(document).ready(function(){
	var newsletterAction = "/art/services/newsletter_section.php";
	
	// bottom
	$("#subscribeform1").submit(function(){
		$.post(newsletterAction,$("#subscribeform1").serialize(),function(data){
			$("#ibtSubscriberEmail1").attr("value","");
			if(data == "Thank you for your subscription."){ $("#subscribediv .thanks").html("Thank you for your subscription."); $("#subscribediv .errormsg").html(""); }
			else{ $("#ibtSubscriberEmail1").focus(); $("#subscribediv .thanks").html(""); $("#subscribediv .errormsg").html(data); }
		});
	});
	
	// sidebar or body
	var newsLetterFlag = true;
	$('#imageField').css('cursor','pointer').click(function(){ subscribe($('.subscribestatus'),$('#sidecategory').val(),$('#sidebaremail')); });
	$('#imageField2').css('cursor','pointer').click(function(){ subscribe($('.subscribestatus2'),$('#sidecategory2').val(),$('#sidebaremail2')); });
	$('#imageField3').css('cursor','pointer').click(function(){ subscribe($('.subscribestatus3'),$('#sidecategory3').val(),$('#sidebaremail3')); });
	
	function subscribe(subscribestatus,category,sidebaremail)
	{
		if(sidebaremail.val() && newsLetterFlag) 
		{ 
			newsLetterFlag = false;
			subscribestatus.text('Processing... Please wait...');
			var datastring = 'category='+category+'&ibtSubscriberEmail1='+sidebaremail.val();
			$.post(newsletterAction,datastring,function(data){
				sidebaremail.val('');
				subscribestatus.text(data);	
				newsLetterFlag = true;
			});	
		}
		else subscribestatus.text('Please enter your Email');
	}
	
	// newsletters index
	
});

//success newsletter form
function todos()
{
	var backToLink = document.getElementById('redirect').value;
	if(backToLink.substr(-2) == 'll') window.location = backToLink.slice(0,-2);
}

//bottom edition layer
$(document).ready(function(){
	var tab = $('.tab_editions'); 
	var hidden = $("#tab_hidden");
	tab.hover(
		function(){
			hidden.slideDown('normal');
		},
		function(){
			hidden.slideUp('normal');
		}
	);
	/*
	$("#nav1 li").hover(function(){
	var idname = $(this).attr("id");
		if(idname){
			var id_array = idname.split('_');
			$("#dd_markets").css("display","none");
			$("#dd_carrier").css("display","none");
			$("#dd_lifestyle").css("display","none");
			$("#dd_opinion").css("display","none");
			$("#dd_news").css("display","none");
			$("#dd_tools").css("display","none");
			$("#dd_local").css("display","none");
			$("#dd_"+id_array[1]).fadeIn();
			$(this).find("a.topa").css('background-color',  '#1C4879');
			//$(this).find("a").css('background-position',  '-360px -895px');
		}
	},function(){
		var idname = $(this).attr("id");
		if(idname){
			var id_array = idname.split('_');
			$("#dd_"+id_array[1]).css("display","none");
			
			var class_arr = $(this).attr('class').split(' ');
			if(class_arr[1] ){
				$(this).find("a.topa").css('background-color',  '#0C294C');
				
			}else{
				$(this).find("a.topa").css('background-color',  '#12355B');
				$(this).find("a.topa").css('line-height',  '32px');
				
				$(this).find("a.topa").css('border-bottom',  '1px #1C4879 solid');
			}
			
			//$(this).find("a").css('background-position',  '0px 0px');
		}
	
	});		
		*/									
});

/*more dropdown*/
$(document).ready(function(){
    $(".navmore").click(function(){			
    	if ($("#dropdown").is(":hidden"))$("#dropdown").slideDown();
		else {$("#dropdown").slideUp();}
    });
    $(".navmore").mouseleave(function(){
    	$("#dropdown").slideUp();
    });
});

/*top editions*/
$(document).ready(function(){
    $(".edtion_more").click(function(){	
    	if ($("#edition_drop").is(":hidden"))$("#edition_drop").fadeIn("slow");
		else {$("#edition_drop").fadeOut("slow");}
    });
    $(".edtion_more").mouseleave(function(){
    	$("#edition_drop").fadeOut("slow");
    });
});

/* picture this smooth scrolling */
$(document).ready(function(){
	$('.enable_smooth a').bind('click',function(event){
    	var $anchor = $(this);
        $('html, body').stop().animate({ scrollTop: $($anchor.attr('href')).offset().top }, 1000);
        event.preventDefault();
    });
});

//banner refresh
function refresh_banners(){	
	var wrap = $('.ad_ifrwrap');
	wrap.each(function(){
		var id_name=$(this).attr('id');
		var type=$(this).attr('alt');
		var fix_height='';
		if(ibtad_lists.indexOf(type)!=-1){
			if(type=="leaderboard")fix_height=' height="100" ';
			else if(type=="stats")fix_height=' height="1" width="1" ';
			else fix_height=' onload="this.height=100;" ';
			var more_vars=$('#vars_'+type).attr('value');
			var domain=document.domain;
			if(domain=="img.ibtimes.com")domain="www.ibtimes.com";
			$("#"+id_name).html('<iframe id="ban_'+type+'" '+fix_height+' src="http://'+domain+'/banner/iframe/'+type+'/'+more_vars+'" class="ifrm_ads" scrolling="no" frameborder="0" align="middle"></iframe>');
		}
	});
}
function reinitIframe(){	
	var ifm = $('.ifrm_ads');
	ifm.each(function(){
		var id_name=$(this).attr('id');
		var iframe = document.getElementById(id_name);
		try{
			iframe.height =  Math.max(iframe.contentWindow.document.body.scrollHeight, iframe.contentWindow.document.documentElement.scrollHeight);
			iframe.width =  Math.max(iframe.contentWindow.document.body.scrollWidth, iframe.contentWindow.document.documentElement.scrollWidth);
		}catch (ex){}		
	});
}