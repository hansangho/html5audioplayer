(function (global, $, util) {

    global.audioplayer = function (options) {
    	if (!options.selector || options.source.length<1) return;

        var config = util.extend({
            selector: '',
			source: [],
			random: false
        }, options);

        if (config.random)  util.shuffleArray( config.source );


        var isTouch		  = 'ontouchstart' in window;
		var eStart		  = isTouch ? 'touchstart'	: 'mousedown';
		var eMove		  = isTouch ? 'touchmove'	: 'mousemove';
		var eEnd		  = isTouch ? 'touchend'	: 'mouseup';
		var eCancel		  = isTouch ? 'touchcancel'	: 'mouseup';

        var This	= this;
		var timer	= 0;
		var index	= 0;
        var nowVol	= 0.5;
        var playerE = $( config.selector );
        var isBarClick = false;
        var nowTabBar;
        var nowBG;
        var playtype 	= '';

        var audio 		= playerE.find('audio')[0];
        var loadText 	= $( config.selector + " " + '.time-loaded' );
        var currentText = $( config.selector + " " + '.time-current' );
        var volumeText 	= $( config.selector + " " + '.volume-current' );
        
        var timeBg 		= $( config.selector + " " + '.barbg.time' );
        var loadBar 	= $( config.selector + " " + '.time .loaded' );
        var currentBar 	= $( config.selector + " " + '.time .current' );
        var volumeBg 	= $( config.selector + " " + '.barbg.volume' );
        var volumeBar 	= $( config.selector + " " + '.barbg.volume .current' );

        var playBtn 	= $( config.selector + " " + '.buttons .play' );
        var nextBtn 	= $( config.selector + " " + '.buttons .next' );
        var prevBtn 	= $( config.selector + " " + '.buttons .prev' );
        var volumeBtn 	= $( config.selector + " " + '.buttons .volume' );
 

        if (audio.canPlayType) {
			if (!!(audio.canPlayType('audio/mpeg').replace(/no/, ''))) {
	        	playtype = '.mp3';
	        } else if (!!(audio.canPlayType('audio/ogg').replace(/no/, ''))) {
	    		playtype = '.ogg';
	    	}

			audio.addEventListener("loadedmetadata", metadataLoaded);
			audio.addEventListener("ended", ended);
			audio.addEventListener("volumechange", volumeChange);

			playBtn.on('click', function (e) {
				if (playBtn.hasClass('pause')) {
					musicPause();
				} else{
					musicPlay('play');
				};
				return false;
			});

			nextBtn.on('click', function (e) {
				This.next();
				return false;
			});

			prevBtn.on('click', function (e) {
				This.prev();
				return false;
			});

			volumeBtn.on('click', function (e) {
				nowVol = (audio.volume==0 && nowVol==0)? 0.5: nowVol;
				audio.volume = (audio.volume==0)? nowVol: 0;
				return false;
			});

			timeBg.on('mousedown', function (e) {
				isBarClick = true;
				if (timer!=0) {
					clearInterval(timer);
					timer = 0;
				};
				nowTabBar = currentBar;
				nowBG = timeBg;
				$(document).on( 'mousemove', seekBar );
				return false;
			});

			audio.volume = nowVol;

			volumeBg.on('mousedown', function (e) {
				isBarClick = true;
				if (timer!=0) {
					clearInterval(timer);
					timer = 0;
				};
				nowTabBar = volumeBar;
				nowBG = volumeBg;
				$(document).on( 'mousemove', seekBar );
				return false;
			});

			$(document).on('mouseup', function (e) {
				$(document).off( 'mousemove', seekBar );
				if (isBarClick) {
					var per = Math.floor((e.pageX - nowBG.offset().left)/nowBG.width()*100);
					per = (per<0)?0:per;
					per = (per>100)?100:per;

					if (nowTabBar == currentBar) {
						audio.currentTime = util.getRePer( per, audio.duration );
					} else{
						audio.volume = per/100;
						nowVol = audio.volume;
					};
					if( timer==0 ) timer = setInterval( update, 500 );
				};
				isBarClick = false;
				return false;
			});

        
        } else{
        	playtype = 'no';
        	fallback();
        };

        // public function-------------------------------------------------
        This.play = function(src){
        	if (src) {
        		config.source = src;
        		index = 0;
        		audio.src = config.source[index] + playtype;
	        	if (playtype=='no') {
	        		fallback ();
	        		return;
	        	}
        	}
			musicPlay('play');
		}

		This.pause = function(){
			musicPause();
		}

		This.prev = function(){
			index--;
			musicPlay('prev');
		}

		This.next = function(){
			index++;
			musicPlay('next');
		}

		This.musicList = function(list){
    		config.source = list;
    		index = 0;
    		audio.src = config.source[index] + playtype;
		}

        // private function-------------------------------------------------
		function musicPlay(caller) {
        	var audioLeng =	config.source.length;
			if ( 0>index || index>(audioLeng-1) ) {
				index = (0>index)? 0: audioLeng-1;
				if(caller=='ended'){
					clearInterval(timer);
					timer = 0;
					playBtn.removeClass('pause');
				}
			}else{
				if (!(audio.paused && caller=='play') || (audio.src=='') ){
					audio.src = config.source[index] + playtype;
				}

				console.log('caller -',caller, audio.src)
				audio.play();
				if( timer==0 ) timer = setInterval( update, 500 );

				playBtn.addClass('pause');
			}
		}

		function musicPause() {
			audio.pause();
			clearInterval(timer);
			timer = 0;
			playBtn.removeClass('pause');
		}

        function update (argument) {
        	if ($.isNumeric(audio.duration)) {
	        	currentText.text(util.second2minute(audio.currentTime));
	        	currentBar.css('width', util.getPer( audio.currentTime, audio.duration )+'%');

	        	loadText.text('load-'+Math.round( util.getPer( audio.buffered.end( 0 ), audio.duration ))+'%' );
	        	loadBar.css('width', util.getPer( audio.buffered.end( 0 ), audio.duration )+'%');
        	};
        }

		function metadataLoaded (e) {
			var total = util.second2minute(e.target.duration);
        	$( config.selector + " " + '.time-total' ).text('/'+util.second2minute(e.target.duration));
		}

		function ended (e) {
			index++;
			musicPlay('ended');
		}

		function volumeChange (e) {
			volumeText.text('vol ' + audio.volume*100 + '%');
			volumeBar.width(audio.volume*100 + '%');
			if(audio.volume==0){
				volumeBtn.addClass('off');
			}else{
				volumeBtn.removeClass('off');
			}
		}

		function seekBar (e) {
			if (isBarClick) {
				var per = Math.floor((e.pageX - nowBG.offset().left)/nowBG.width()*100);
				per = (per<0)?0:per;
				per = (per>100)?100:per;

				nowTabBar.css('width', per+'%');
			}
		}

		function fallback () {
			var aSrc = config.source[0]+'.mp3';
			if ($('#fallbackplayer').length>0) {
				$('#fallbackplayer')[0].url = aSrc;
			}else{
				playerE.empty();
				var wValue = $('#myaudio').css('width');
				var str = 
				'<object classid="clsid:6bf52a52-394a-11d3-b153-00c04f79faa6" id="fallbackplayer" width="'+wValue+'" height="45">\
					<param name="AutoStart" value="true" />\
					<param id="playerurl" name="url" value="'+aSrc+'" />\
					<embed id="playerE" src="'+aSrc+'" width="370" height="45" type="application/x-ms-wmp" autostart="true" />\
				</object>';
				playerE.html(str);
			}
		}
    };

}(this, jQuery, apUtil));