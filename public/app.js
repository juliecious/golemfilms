var player;
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	event.target.pauseVideo();
}

var done = false;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.ENDED) {
		player.seekTo(0);
		player.playVideo();
	}
}

function stopVideo() {
	player.stopVideo();
}

$(document).ready(function() {
	var image = new Image();
    var page = undefined;
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    image.onload = function() {
    	$('.splash > .splash-background').css('background-image', 'url(/img/city-min-1920x1080.jpeg)');
    	$('.splash > .splash-top').css('background-image', 'url(/img/top.png)');
    	$('.splash > .splash-bottom').css('background-image', 'url(/img/bottom.png)');
    	$('.splash').addClass('fadein');
    	$('.contact').addClass('fadein');
    }
	image.src = '/img/city-min-1920x1080.jpeg';

	$('.splash').on('click', function() { changePage() });
	$('.overlay').on('click', function() { changePage() });
	$('.back').on('click', function() { changePage() });

	function changePage() {
		if (page == 'splash') {
			page = 'player';
			
			if (!iOS) {
	 			//player.pauseVideo();
	 			$('.overlay').css({ 'pointer-events': 'none'});
	 		}

			$('.splash').css({ 'z-index': '1' });
			$('.splash > .splash-background').removeClass('fadeout').addClass('fadein');
			$('.splash > .splash-text-container').removeClass('fadeout').addClass('fadein');
			$('.back').removeClass('fadein').addClass('fadeout');
			$('.player').removeClass('fadein').addClass('fadeout').css({ 'z-index': '0', 'pointer-events': 'none'});
			$('.overlay').css({ 'z-index': '0'});
		}

		else {
			page = 'splash';

			player.playVideo();

			$('.splash').css({ 'z-index': '0' });
			$('.splash > .splash-background').removeClass('fadein').addClass('fadeout');
			$('.splash > .splash-text-container').removeClass('fadein').addClass('fadeout');
			$('.back').removeClass('fadeout').addClass('fadein');
			$('.player').removeClass('fadeout').addClass('fadein').css({ 'z-index': '1', 'pointer-events': 'auto'});
			$('.overlay').css({ 'z-index': '2', 'pointer-events': 'auto'});
		}
	}
});