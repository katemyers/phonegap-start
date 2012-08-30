/**
*	Plugin for accessing the NPR Bus API via jquery
*
*/

(function($){
	var BUSAPI = function(element, options) {
		
		var elem = 	$(element);
		var obj = this;

		// Defaults
		var settings = $.extend({
	           size : 50,
	           from : 0,
	           apiHost : "api-jgrosman.npr.org"
			}, options || {});
		
		
		/**
		 * Load all the streams available
		 * 
		 * @arg options {apiKey, size, from, callback}
		 */
		this.loadStreams = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}

			var apiUrl = "http://" + settings.apiHost + "/v2/streams?apiKey=" + settings.apiKey + "&size=" + settings.size + "&from=" + settings.from;
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};
		
		/**
		 * Load a single stream, by stream guid
		 * 
		 * @arg options {apiKey, guid, callback}
		 */
		this.loadStream = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}
			
			if (!settings.guid) {
				alert('Required option (guid) not found');
				return;
			}

			var apiUrl = "http://" + settings.apiHost + "/v2/streams/" + settings.guid + "?apiKey=" + settings.apiKey;
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};
		
		/**
		 * Load all the stations available
		 * 
		 * @arg options {apiKey, size, from, callback}
		 */
		this.loadStations = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}

			var apiUrl = "http://" + settings.apiHost + "/v2/stations?apiKey=" + settings.apiKey + "&size=" + settings.size + "&from=" + settings.from;
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};
		
		/**
		 * Load a single station, by station guid
		 * 
		 * @arg options {apiKey, guid, callback}
		 */
		this.loadStation = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}
			
			if (!settings.guid) {
				alert('Required option (guid) not found');
				return;
			}

			var apiUrl = "http://" + settings.apiHost + "/v2/stations/" + settings.guid + "?apiKey=" + settings.apiKey;
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};
		
		/**
		 * Load all the programs available
		 * 
		 * @arg options {apiKey, size, from, callback}
		 */
		this.loadPrograms = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}

			var apiUrl = "http://" + settings.apiHost + "/v2/programs?apiKey=" + settings.apiKey + "&size=" + settings.size + "&from=" + settings.from;
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};
		
		/**
		 * Load a single program, by program guid
		 * 
		 * @arg options {apiKey, guid, callback}
		 */
		this.loadProgram = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}
			
			if (!settings.guid) {
				alert('Required option (guid) not found');
				return;
			}

			var apiUrl = "http://" + settings.apiHost + "/v2/programs/" + settings.guid + "?apiKey=" + settings.apiKey;
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};
				
		/**
		 * Load all the streams for a station, by station guid
		 * 
		 * @arg options {apiKey, size, from, guid, callback}
		 */
		this.loadStationsForStream = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}
			
			if (!settings.guid) {
				alert('Required option (guid) not found');
				return;
			}

			var apiUrl = "http://" + settings.apiHost + "/v2/stations/" + settings.guid + "/streams?apiKey=" + settings.apiKey + "&size=" + settings.size + "&from=" + settings.from;
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};
		
		/**
		 * Get the episode playing on stream right now
		 * 
		 * @arg options {apiKey, guid, callback}
		 */
		this.loadCurrentEpisodeForStream = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}
			
			if (!settings.guid) {
				alert('Required option (guid) not found');
				return;
			}

			var apiUrl = "http://" + settings.apiHost + "/v2/streams/" + settings.guid + "/times/now/episodes?apiKey=" + settings.apiKey;
			
			console.debug(apiUrl);
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};
		
		/**
		 * Get all episodes playing right now
		 * 
		 * @arg options {apiKey, size, from, callback}
		 */
		this.loadCurrentEpisodes = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}
			
			var apiUrl = "http://" + settings.apiHost + "/v2/times/now/episodes?apiKey=" + settings.apiKey  + "&size=" + settings.size + "&from=" + settings.from;;
			
			console.debug(apiUrl);
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};
		
		/**
		 * Get the local streams
		 * 
		 * @arg options {apiKey, lat, lon, callback}
		 */
		this.loadLocalStreams = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}
			
			if (!settings.lat) {
				alert('Required option (lat) not found');
				return;
			}
			
			if (!settings.lon) {
				alert('Required option (lon) not found');
				return;
			}			

			var apiUrl = "http://" + settings.apiHost + "/v2/locations/" + settings.lat + "," + settings.lon + "/streams?apiKey=" + settings.apiKey;
			
			console.debug(apiUrl);
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};
		
		/**
		 * Get the local episodes
		 * 
		 * @arg options {apiKey, lat, lon, callback}
		 */
		this.loadLocalEpisodes = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}
			
			if (!settings.lat) {
				alert('Required option (lat) not found');
				return;
			}
			
			if (!settings.lon) {
				alert('Required option (lon) not found');
				return;
			}			

			var apiUrl = "http://" + settings.apiHost + "/v2/locations/" + settings.lat + "," + settings.lon + "/episodes?apiKey=" + settings.apiKey;
			
			console.debug(apiUrl);
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};		
		
		/**
		 * Get the episodes playing now for this program
		 * 
		 * @arg options {apiKey, guid, callback}
		 */
		this.loadCurrentEpisodesForProgram = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}
			
			if (!settings.guid) {
				alert('Required option (guid) not found');
				return;
			}
		

			var apiUrl = "http://" + settings.apiHost + "/v2/programs/" + settings.guid + "/times/now/episodes?apiKey=" + settings.apiKey;
			
			console.debug(apiUrl);
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};	
		
		/**
		 * Get the episodes playing next for this program
		 * 
		 * @arg options {apiKey, guid, callback}
		 */
		this.loadNextEpisodeForProgram = function(options) {

			if ( options ) { 
				$.extend( settings, options );
			}

			if (!settings.apiKey) {
				alert('Required option (apiKey) not found');
				return;
			}
			
			if (!settings.guid) {
				alert('Required option (guid) not found');
				return;
			}
		

			var apiUrl = "http://" + settings.apiHost + "/v2/programs/" + settings.guid + "/_next/episodes?apiKey=" + settings.apiKey;
			
			console.debug(apiUrl);
			
			// fetch the api result
			$.getJSON(apiUrl, null, function(data) {
				if (settings.callback) {
					settings.callback(data);
				}
			});
		};	
		
	};
		
		
		$.fn.bus = function(options) {
			var element = $(this);

			// Return early if this element already has a plugin instance
			if (element.data('BUSAPI')) {
				return element.data('BUSAPI');
			}

			// pass options to plugin constructor
			var myplugin = new BUSAPI(this, options);

			// Store plugin object in this element's data
			element.data('BUSAPI', myplugin);

			return myplugin;
		};
	
})(jQuery);