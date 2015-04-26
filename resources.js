var canvas; // A global variable for our Canvas
var ctx; // A global variable for the Canvas2D context

var audioNormalGarden, audioSEGA;

var cloudsBackground, waterBackground, emeraldIsland, grassBackground, SEGALogo;

function resources(callback) {
	// draw the load progress at least once
	draw();
	
	// load our actual resources
	var loadedImages = 0, maxImages = 5;
	var loadedAudio = 0, maxAudio = 1;
	
	cloudsBackground = loadImage("backgrounds/clouds2.png");
	waterBackground = loadImage("backgrounds/island.png");
	emeraldIsland = loadImage("backgrounds/emeraldisland.png");
	grassBackground = loadImage("backgrounds/grass.png");
	SEGALogo = loadImage("sprites/sega.png");
	//audioNormalGarden = loadAudio("audio/garden.mp3");
	audioSEGA = loadAudio("audio/sega.mp3");
	
	// check for whether we have completed loading all resources
	function done() {
		return (loadedImages + loadedAudio) == (maxImages + maxAudio);
	}
	
	// image loading helper
	function loadImage(src) {
		var img = new Image();
		img.onLoad = loadImageComplete();
		img.src = src;
		return img;
	}

	// update the progress bar
	function loadImageComplete() {
		loadedImages++;
		window.requestAnimationFrame(draw);
		
		if (done()) { callback(); }
	}

	// audio loading helper
	function loadAudio(src) {
		var audio = new Audio();
		audio.addEventListener("canplaythrough", function() { loadAudioComplete(audio); }, false);
		audio.src = src;
		return audio;
	}

	// update the progress bar
	function loadAudioComplete(audio) {
		loadedAudio++;
		window.requestAnimationFrame(draw);
		
		if (done()) { callback(); }
	}

	// clear the canvas for us
	function clear() {
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.fillRect( 0, 0, canvas.width, canvas.height );
		ctx.closePath();
	}

	// draw a generic progress bar
	function progress(current, max) {
		ctx.beginPath();
		ctx.fillStyle = "rgb(0, 51, 153)";
		ctx.rect(40, canvas.height/2 - 7, (canvas.width - 80), 14);
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.fillStyle = "rgb(0, 102, 255)";
		ctx.rect(40, canvas.height/2 - 7, (current/max) * (canvas.width - 80), 14);
		ctx.fill();
		ctx.closePath();
		
		ctx.rect(40, canvas.height/2 - 7, (canvas.width - 80), 14);
		ctx.lineWidth = 3;
		ctx.strokeStyle = "rgb(0, 153, 255)";
		ctx.stroke();
	}

	// draw our progress screen on a frame by frame basis when something changes
	function draw(timestamp) {
		clear();
		ctx.beginPath();
		ctx.font = "48px Segoe UI";
		ctx.textAlign = "center";
		ctx.fillStyle = "white"
		ctx.fillText("Loading...", canvas.width / 2, canvas.height / 2 - 50);
		ctx.closePath();
		progress((loadedAudio + loadedImages) / (maxAudio + maxImages), 1);
	}
}