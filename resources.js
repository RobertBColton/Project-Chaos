var canvas; // A global variable for our Canvas
var ctx; // A global variable for the Canvas2D context

var audioNormalGarden, audioSEGA;

var cloudsBackground, clouds2Background, waterBackground, emeraldIsland, grassBackground, SEGALogo;
var newGarden, continueGarden, buttonHover;

// image, name, appearance, cost, mood, belly, swim, fly, run, power, stamina
var fruit_data = [
	[null, "Orange", 30, 1, 2, 3, -2, -2, 3, 1],
	[null, "Blue Squash", 60, 0, 1, 2, 5, -1, -1, 3],
	[null, "Heart-Strawberry", 55, 2, 2, 4, -3, 4, -3, 2],
	[null, "Green Apple", 50, -1, 1, 0, -1, 3, 4, 2],
	[null, "Triangular Grape", 30, 1, 2, -2, 3, 3, -2, 1],
	[null, "Pear / Mango", 55, 2, 2, -2, 4, -2, 4, 2],
	[null, "Square Red Apple", 70, -3, 0, 3, 1, 3, 2, -5]
];

// image, name, cost
var egg_data = [
	[null, "Normal", 0],
	[null, "Silver", 500],
	[null, "Gold", 1000],
	[null, "Ruby / Pink", 5000],
	[null, "Sapphire / Blue", 7000],
	[null, "Amethyst / Purple", 8000],
	[null, "Emerald / Teal", 10000],
	[null, "Garnet / Red", 12000],
	[null, "Aquamarine / Cyan", 14000],
	[null, "Peridot / Lime", 16000],
	[null, "Topaz / Orange", 18000],
	[null, "Onyx / Black", 20000]
];

// image, name, cost
var toy_data = [
	[null, "Trumpet", 1000],
	[null, "Duck", 2000],
	[null, "Television", 8000]
];

function resources(callback) {
	// draw the load progress at least once
	draw();
	
	// load our actual resources
	var loadedImages = 0, maxImages = 31;
	var loadedAudio = 0, maxAudio = 1;
	
	cloudsBackground = loadImage("backgrounds/clouds.png");
	clouds2Background = loadImage("backgrounds/clouds2.png");
	waterBackground = loadImage("backgrounds/island.png");
	emeraldIsland = loadImage("backgrounds/emeraldisland.png");
	grassBackground = loadImage("backgrounds/grass.png");
	newGarden = loadImage("backgrounds/newgarden.png");
	continueGarden = loadImage("backgrounds/continuegarden.png");
	buttonHover = loadImage("backgrounds/hover.png");
	SEGALogo = loadImage("sprites/sega.png");
	//audioNormalGarden = loadAudio("audio/garden.mp3");
	audioSEGA = loadAudio("audio/sega.mp3");
	
	fruit_data[0][0] = loadImage("sprites/fruit/orange.png");
	fruit_data[1][0] = loadImage("sprites/fruit/eggplant.png");
	fruit_data[2][0] = loadImage("sprites/fruit/hero.png");
	fruit_data[3][0] = loadImage("sprites/fruit/lemon.png");
	fruit_data[4][0] = loadImage("sprites/fruit/triangle.png");
	fruit_data[5][0] = loadImage("sprites/fruit/avocado.png");
	fruit_data[6][0] = loadImage("sprites/fruit/apple.png");
	
	egg_data[0][0] = loadImage("sprites/eggs/normal.png");
	egg_data[1][0] = loadImage("sprites/eggs/silver.png");
	egg_data[2][0] = loadImage("sprites/eggs/gold.png");
	egg_data[3][0] = loadImage("sprites/eggs/pink.png");
	egg_data[4][0] = loadImage("sprites/eggs/blue.png");
	egg_data[5][0] = loadImage("sprites/eggs/lavender.png");
	egg_data[6][0] = loadImage("sprites/eggs/green.png");
	egg_data[7][0] = loadImage("sprites/eggs/red.png");
	egg_data[8][0] = loadImage("sprites/eggs/aqua.png");
	egg_data[9][0] = loadImage("sprites/eggs/lime.png");
	egg_data[10][0] = loadImage("sprites/eggs/orange.png");
	egg_data[11][0] = loadImage("sprites/eggs/purple.png");
	
	toy_data[0][0] = loadImage("sprites/trumpet.png");
	toy_data[1][0] = loadImage("sprites/duck.png");
	toy_data[2][0] = loadImage("sprites/television.png");
	
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
		
		// we're already on the event loop so just draw one frame
		//window.requestAnimationFrame(draw);
		draw();
		
		if (done()) { callback(); }
	}
	
	// audio loading helper
	function loadAudio(src) {
		var audio = new Audio();
		// if we don't remove the event listener this will keep getting triggered at the end of each play through of the audio
		var e = function() { loadAudioComplete(); audio.removeEventListener("canplaythrough", e, false); };
		audio.addEventListener("canplaythrough", e, false);
		audio.src = src;
		return audio;
	}

	// update the progress bar
	function loadAudioComplete() {
		loadedAudio++;
		// we're already on the event loop so just draw one frame
		//window.requestAnimationFrame(draw);
		draw();
		
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