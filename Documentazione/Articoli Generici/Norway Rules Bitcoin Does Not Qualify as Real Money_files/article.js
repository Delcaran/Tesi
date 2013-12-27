var news_counter = function(c_what,a_id,r_id,c_id){
	if(c_what && a_id){
		var url = "/counter/article";
		url += "?c_what="+c_what+"&a_id="+a_id+"&r_id="+r_id+"&c_id="+c_id+"&referer="+encodeURIComponent(document.referrer);
		$.ajax({"url":url,cache: false});		
	}
}