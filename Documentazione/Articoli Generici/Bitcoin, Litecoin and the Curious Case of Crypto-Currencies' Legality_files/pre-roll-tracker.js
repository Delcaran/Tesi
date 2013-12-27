		var _gaq = _gaq || [];
		_gaq.push(
			['adTremor._setAccount', 'UA-30354801-12'],
			['adFox._setAccount', 'UA-30354801-4'],
			['adBrightroll._setAccount', 'UA-30354801-7']
		);	//['videoplayer._trackPageview']
		var adTracking_ = {Tremor:2,Fox:2,Brightroll:2}
		var myRegexp = /^http:\/\/oascentral\.ibtimes\.com\/RealMedia\/ads\/adstream_sx\.ads\/(?:uk|passback)\.ibtimes\/([^@]+)@(x[0-9]+)\?/;
		var myRegexpi = /^http:\/\/oascentral\.ibtimes\.com\/RealMedia\/ads\/adstream_lx\.ads\/(?:uk|passback)\.ibtimes\/([\w\/]+)\/IBTimes\/(GBR-[^\/]+)\/([^\/]+)/;
		
		function ibtAdTracking(tag, act, lab){
			var tmp;
			if(tmp = tag.match(/^GBR-(?:[a-zA-Z]+)_(?:[a-zA-Z]+)-(?:[a-zA-Z]+)_([a-zA-Z]+)/)){
				if(adTracking_[tmp[1]]){
					if(adTracking_[tmp[1]]==2){ 
						adTracking_[tmp[1]] = 1;
						_gaq.push(['ad'+tmp[1]+'._trackPageview']);
					}
					_gaq.push(['ad'+tmp[1]+'._trackEvent', act, tag, lab]);
				}
			}
		}
		
		function onAdCallStarted(request) {
				var result = request.formedTag.match(/^http:\/\/app\.scanscout\.com\/ssframework\/get\.xml(?:[\w\?\.=&]+)partnerId=([0-9]+)&/);
				if(result==null) return;
				if(result[1]=='117281') _gaq.push(['adTremor._trackEvent', 'ad-call-detail', 'GBR-TV_MJ-UK_Tremor_VpaidMale_Pre-roll_UK_041613', request.formedTag]);
				else if(result[1]=='395301') _gaq.push(['adTremor._trackEvent', 'ad-call-detail', 'GBR-TV_MJ-UK_Tremor_VpaidFemale_Pre-roll_UK_042913', request.formedTag]);
				else if(result[1]=='434682') _gaq.push(['adTremor._trackEvent', 'ad-call-detail', 'GBR-TV_TM-UK_Tremor_Multi_Pre-roll_DE_091713', request.formedTag]);
		}
		
		function onAdCallFailover(masterRequest, failoverRequest) {
			var result = failoverRequest.formedTag.match(myRegexp);
			if(result==null) return;
			//_gaq.push(['videoplayer._trackEvent', 'oas-call', 'oas-call-failover', result[2]]);
		}
		
		function onImpressionTagSetIbt(info) {
			var result, pos;
			if(info.length){
				for(i in info){
					 if(result = info[i].tag.match(myRegexpi)) pos = result[3].match(/_(x[0-9]{2})/);
					 ibtAdTracking(info[i].campaign, 'ad-call', pos[1]);
				}
			}
		}

		function onLinearAdStart(ad) {
			var result, pos;
			for(obj in ad.impressions){
				if(result = ad.impressions[obj].url.match(myRegexpi)){
					pos = result[3].match(/_(x[0-9]{2})/);
					ibtAdTracking(result[2], 'ad-impression', pos[1]);
					break;
				}
			}
		}

		function onVPAIDAdStart(ad) {
			var result, pos;
			for(obj in ad.impressions){
				if(result = ad.impressions[obj].url.match(myRegexpi)){ 
					pos = result[3].match(/_(x[0-9]{2})/);
					ibtAdTracking(result[2], 'ad-impression', pos[1]);
					break;
				}
			}
		}