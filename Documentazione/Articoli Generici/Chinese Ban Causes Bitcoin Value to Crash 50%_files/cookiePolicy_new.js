


function setCookiePage(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function setCookieHours(savename, savevalue, hour, domain){
	var today = new Date();
	today.setTime(today.getTime() + (60*60*1000*hour));
	document.cookie = savename + "=" + savevalue + "; path=/; expires=" + today.toGMTString() + ";";
	if (domain) {
		document.cookie += "domain=" + domain + ";";
	}
}

function checkCookie()
{
var username=getCookie("hasVisited");

if (username!=null && username!="" && username!= -1)
  { 
  removeDivs();
  return true;
  }
  return false;
}

function setTimeOut(){
	setTimeout(function(){
		$("#cookiePolicy").slideUp("slow", function () {
			$("#cookiePolicy").remove();
		});
		$("#cookiePolicyBackground").slideUp("slow", function () {
			$("#cookiePolicyBackground").remove();
		});
	}, 4000);
}

function removeDivs(){
     //if (getCookie('hasVisited')) alert( getCookie('hasVisited'));
    $("#cookiePolicyBackground").css("display","none");
        $("#cookiePolicy").css("display","none");
        $("#cookiePolicyAccept").css("display","none");
       
	
}

$(document).ready(function(){
        check = checkCookie(); 
        
	if(check == false)
        {
            $("#cookiePolicyBackground").css("display","block");
            $("#cookiePolicy").css("display","block");
            $("#cookiePolicyAccept").css("display","block"); 
            setCookiePage('hasVisited', '0', 365);
 
        }
	
	$('#cookiePolicyAccept').bind('click', function() {
         
                setCookiePage('hasVisited', '0',365);
               removeDivs();
        
	});
        setTimeOut();
	$('#linkPrivacyPolicy').attr('target', '_blank').attr('href', '#');
	
	$('#footer_nav .root-level-item.last a').append('<span style="margin-left: 0.5em;background: none no-repeat scroll right center #9D2720;color: #FFFFFF;padding: 0 0.75em;text-decoration: none;text-transform: uppercase;">NEW</span>');
});