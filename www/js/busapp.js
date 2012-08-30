var episodesSize = 30;
var playNowAudio = null;


$(document).ready(function() {

	
	renderCurrentEpisodeTable();
	renderLocalEpisodeTable();
	
	$('.allEpisodesPrevious').click(function() {
		if ($(this).parent().hasClass('disabled')) {
			return false;
		}
		else {
			var startAt = parseInt($('#allEpisodesTable').attr('data-start'));			
			startAt -= episodesSize;
			
			if (startAt < episodesSize) {
				$(this).parent().addClass("disabled");	
			}
			
			$('#allEpisodesTable').attr('data-start', startAt);
			renderCurrentEpisodeTable();
			return false;
		}
	});
	
	$('.allEpisodesNext').click(function() {
		if ($(this).parent().hasClass('disabled')) {
			return false;
		}
		else {
			var startAt = parseInt($('#allEpisodesTable').attr('data-start'));
			startAt += episodesSize;
			
			$('.allEpisodesPrevious').parent().removeClass("disabled");
			
			$('#allEpisodesTable').attr('data-start', startAt);
			renderCurrentEpisodeTable();
			return false;
		}
	});
	
	$('.localEpisodesPrevious').click(function() {
		if ($(this).parent().hasClass('disabled')) {
			return false;
		}
		else {
			var startAt = parseInt($('#localEpisodesTable').attr('data-start'));			
			startAt -= episodesSize;
			
			if (startAt < episodesSize) {
				$(this).parent().addClass("disabled");	
			}
			
			$('#localEpisodesTable').attr('data-start', startAt);
			renderLocalEpisodeTable();
			return false;
		}
	});
	
	$('.localEpisodesNext').click(function() {
		if ($(this).parent().hasClass('disabled')) {
			return false;
		}
		else {
			var startAt = parseInt($('#localEpisodesTable').attr('data-start'));
			startAt += episodesSize;
			
			$('.localEpisodesPrevious').parent().removeClass("disabled");
			
			$('#localEpisodesTable').attr('data-start', startAt);
			renderLocalEpisodeTable();
			return false;
		}
	});
	
	$(document).on('click', ".playNowBtn", function(event) {
		
		var thisBtn = this;
		
		if ($(this).attr('data-isPlaying') == 'true' && playNowAudio != null) {
			playNowAudio.pause();
			$(this).html('<i class="icon-play icon-white"></i>').attr('data-isPlaying', 'false');
			return false;
		}
		else {
			$('.playNowBtn').html('<i class="icon-play icon-white"></i>').attr('data-isPlaying', 'false');
			$(thisBtn).html("<i class='icon-signal icon-white'></i>");
			
			if ($(this).attr('data-mp3url')) {
				$(thisBtn).html('<i class="icon-stop icon-white"></i>').attr('data-isPlaying', 'true');
				if (!playNowAudio) {
					playNowAudio = new Audio();
				}
				
				playNowAudio.src = $(this).attr('data-mp3url');
				playNowAudio.play();
			}
			else {
			
				var streamUrl = $(this).attr('data-streamurl');
				
				$.get("/sandbox/jquerybus/decodeStream.php?filename=" + streamUrl,null, function(mp3Url) {
					
					if (mp3Url != "ERROR") {
						
						$(thisBtn).html('<i class="icon-stop icon-white"></i>').attr('data-isPlaying', 'true').attr('data-mp3url', mp3Url);
						if (!playNowAudio) {
							playNowAudio = new Audio();
						}
						
						playNowAudio.src = mp3Url;
						playNowAudio.play();
						
						$(playNowAudio).unbind('error').one('error', function(event) {
							$(thisBtn).html("<i class='icon-warning-sign icon-white'></i>").attr("disabled", "disabled").removeClass('playNowBtn');
						});
						
					}
					else {
						$(thisBtn).html("<i class='icon-warning-sign icon-white'></i>").attr("disabled", "disabled").removeClass('playNowBtn');
					}
				});
			}
			return false;
		}
		
	});
	
	
	$("#programsTable tr").each(function() {
		var rowElm = this;
		var prgGuid = $(this).attr('data-guid');
		
		$(this).bus().loadCurrentEpisodesForProgram({"guid" : prgGuid, "size" : 1, "callback" : function(data) {
			if (data[0] != "No results found") {
				var episode = data[0];
				
				var streamUrl = "";
				$.each(episode.stream.audio, function(index, audioStream) {
					if (audioStream.type == "Audio MP3 Stream") {
						streamUrl = audioStream.url;
						return false;
					}
						
				});

				
				$(rowElm).append("<td><button class='btn btn-inverse playNowBtn' data-streamUrl='" + streamUrl + "' data-isPlaying='false'><i class='icon-play icon-white'></i></button></td>");
			}
			else {
				$(rowElm).bus().loadNextEpisodeForProgram({"guid" : prgGuid, "size" : 1, "callback" : function(data) {
					var episode = data[0];
					$(rowElm).append("<td><i class='icon-arrow-right'></i>" + episode.airtime.start + "</td>");
				}});
			}
		}});
		
		
	});
	
});

renderCurrentEpisodeTable = function() {
	var startAt = $('#allEpisodesTable').attr('data-start');
	
	$('#allEpisodesTable').bus().loadCurrentEpisodes({"size" : episodesSize, "from" : startAt, "callback" : function(data) {
		renderTableCallback(data, $('#allEpisodesTable'), $('.allEpisodesNext') )
	}});
};

renderLocalEpisodeTable = function() {
	var startAt = $('#localEpisodesTable').attr('data-start');
	
	navigator.geolocation.getCurrentPosition(function(pos) {
		var lat = pos.coords.latitude;
		var lon = pos.coords.longitude;
	
		$('#localEpisodesTable').bus().loadLocalEpisodes({"lat" : lat, "lon" : lon, "size" : episodesSize, "from" : startAt, "callback" : function(data) {
			renderTableCallback(data, $('#localEpisodesTable'), $('.localEpisodesNext') )
		}});
	});
};

renderTableCallback = function(data, tableElement, nextButtonElm) {
	$(tableElement).empty();
	
	if (data.length < episodesSize) {
		$(nextButtonElm).parent().addClass("disabled");
	}
	else {
		$(nextButtonElm).parent().removeClass("disabled");
	}
		
	
	$.each(data, function(index, episode) {
		
		
		if (episode.program) {
			var episodeName = episode.program.name;
			
			var streamName = "???";
			if (episode.stream) {
				streamName = episode.stream.name;
			}

			var stationName = "???";
			if (episode.stream && episode.stream.station && episode.stream.station.length > 0) {
				stationName = episode.stream.station[0].name;
			}
			
			var streamUrl = "";
			$.each(episode.stream.audio, function(index, audioStream) {
				if (audioStream.type == "Audio MP3 Stream") {
					streamUrl = audioStream.url;
					return false;
				}
					
			});
			
			$(tableElement).append("<tr><td>" + episodeName + "</td><td>" + streamName + " (" + stationName + ")</td><td><button class='btn btn-inverse playNowBtn' data-streamUrl='" + streamUrl + "' data-isPlaying='false'><i class='icon-play icon-white'></i></button></td></tr>");
		}
	});
	
	$('.playNowBtn').each(function() {
		if ($(this).attr('data-streamurl') == "") {
			$(this).remove();
		}
	});
	
};
	
