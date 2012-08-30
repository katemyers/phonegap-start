getUrlParameter = function( pname, pdefault ) {
	try {    
		// From this page:  http://www.netlobo.com/url_query_string_javascript.html
		pname = pname.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+pname+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		if( results === null ) {
			return pdefault;
		}
		else {
			return results[1];
		}
	} catch (e) {
		alert(e);
	}
};


function renderStream(stream, elm) {
	
	$(elm).append("<tr><td>" + stream.name + "</td><td>" + stream.description + "</td><td>" + stream.station[0].name + "</td><td>" + stream.guid + "</td><td id='episode" + stream.guid + "'>Unknown</td></tr>");
	
	var streamName = stream.name;
	$(elm).bus({apiKey :  getUrlParameter('apiKey', null)}).loadCurrentEpisodeForStream({'guid' : stream.guid, 'callback' : function(data) {
		console.dir(data[0]);
		
		var episodeName = "Unknown";
		if (data[0] != "No results found") {
			episodeName = data[0].program.name;
			
			var streamUrl = null;
			$.each(data[0].stream.audio, function(index, audioStream) {
				if (audioStream.type == "Audio MP3 Stream") {
					streamUrl = audioStream.url;
					return false;
				}
					
			});
			
			if (streamUrl) {
				$.get("decodeStream.php?filename=" + streamUrl,null, function(mp3Url) {
					
					if (mp3Url != "ERROR") {
						var aElm = document.createElement("audio");
						var sElm = document.createElement("source");
						sElm.src = mp3Url;
						sElm.type = "audio/mp3";
						$(aElm).html(sElm);
						aElm.controls = "controls";
						$('#episode' + data[0].stream.guid).html(episodeName + "<br />").append(aElm);
					}
				});
				
			}
		}
			
		
		

	}});
}


function renderStation(station, elm) {
	$(elm).append("<tr><td>" + station.name + "<td>" + station.guid + "</td></tr>");
}


$(document).ready(function() {
	
	var apiKeyFromUrl = getUrlParameter('apiKey', null);
	
	navigator.geolocation.getCurrentPosition(function(pos) {
		var lat = pos.coords.latitude;
		var lon = pos.coords.longitude;
		
		$(document).bus({"apiKey" : apiKeyFromUrl}).loadLocalStreams({"lat" : lat, "lon" : lon, "callback" : function(data) {
			$.each(data, function(index, stream) {
        		//console.dir(stream);
        	    renderStream(stream, $('.streams table'));            		
        	});
		}});
		
	});
		
	
	
});