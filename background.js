var filter = {
	urls: ['http://statics.plurk.com/*', 'http://emos.plurk.com/*'],
	types: ['image']
};

chrome.webRequest.onHeadersReceived.addListener(function(a) {
	var headers = a["responseHeaders"],
		i, l;
	for(i = 0, l = headers.length; i < l; i++) {
		if(headers[i]["name"] == "Cache-Control") {
			headers[i]["value"] = "max-age=31104000, public";
			break;
		}
	}
	return {
		'responseHeaders': headers
	};
}, filter, ['blocking', 'responseHeaders']);

chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
	var headers = a["requestHeaders"],
		i, l;
	for(i = 0, l = headers.length; i < l; i++) {
		if(headers[i]["name"] == "Cache-Control") {
			headers[i]["value"] = "max-age=31104000, public";
			break;
		}
	}
	return {
		'requestHeaders': headers
	};
}, filter, ['blocking', 'requestHeaders']);