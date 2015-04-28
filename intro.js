function intro() {

//audioNormalGarden.addEventListener("canplaythrough", function() { audioNormalGarden.play(); }, false);
audioSEGA.play();

// btosc is for controlling the oscillation of the button hover indicator
var bt1x, bt1y, bt2x, bt2y, btosc = 0;
var bt1img = newGarden, bt2img = continueGarden;
var bt1hover = false, bt2hover = false;

bt1x = 20;
bt1y = 20;

bt2x = 40;
bt2y = 60;

// x is for controlling our scrolling water, cx is for scrolling clouds at different speeds, and the same for cx2 for the second cloud layer
var waterx = 0, cloudsx = 0, cloudsx2 = 0;
// y is for floating emerald island up from the bottom, yosc is for oscillating emerald island once it reaches it's destination 
var islandy = canvas.height / 2, yosc = 0;

// whether we want to transition to the garden and should stop requesting animation frames
var exiting = false;
// our mouse position object
var mousePos = { x: 0, y: 0 };

canvas.onclick = function() { if (bt1hover || bt2hover) { exiting = true; } };
canvas.onmousemove = function(evt) { mousePos = getMousePos(evt); };

function cleanup() {
	canvas.onclick = null;
	canvas.onmousemove = null;
}

// kick off the initial frame
draw();

function update() {
	// each layer should get faster as it gets closer because field of view
	cloudsx2 -= 0.16;
	if (cloudsx2 < -cloudsBackground.width) {
		cloudsx2 = 0;
	}
	
	cloudsx -= 0.22;
	if (cloudsx < -clouds2Background.width) {
		cloudsx = 0;
	}
	
	waterx -= 0.34;
	if (waterx < -waterBackground.width) {
		waterx = 0;
	}
	
	if (islandy > 0) { islandy -= 0.7; }
	else if (yosc <= Math.PI) { yosc += 0.03; }
	else { yosc = -Math.PI; }
	
	if (btosc <= Math.PI) { btosc += 0.1; }
	else { btosc = -Math.PI; }
	
	if (yosc != 0) {
		bt1hover = (mousePos.x >= bt1x && mousePos.x <= bt1x + bt1img.width && mousePos.y >= bt1y && mousePos.y <= bt1y + bt1img.height);
		bt2hover = (mousePos.x >= bt2x && mousePos.x <= bt2x + bt2img.width && mousePos.y >= bt2y && mousePos.y <= bt2y + bt2img.height);
	}
}

function clear() {
	ctx.beginPath();
	ctx.fillStyle = "rgb(0, 153, 255)";
	ctx.fillRect( 0, 0, canvas.width, canvas.height );
	ctx.closePath();
}

function drawImageCentered(img, xoff, yoff) {
	xoff = xoff | 0;
	yoff = yoff | 0;
	ctx.drawImage(img, canvas.width / 2 - img.width / 2 + xoff, canvas.height / 2 - img.height / 2 + yoff);
}

// first alpha is for the black overlay, second alpha is for the sega logo, and the timer controls how long after the sega logo appears that the black overlay starts to fade
var alpha = 1.0, alpha2 = 1.0, timer = 100;

function draw() {
	update();
	
	clear();
	
	if (yosc != 0) {
		ctx.beginPath();
		ctx.drawImage(bt1img, bt1x, bt1y);
		ctx.drawImage(bt2img, bt2x, bt2y);
		if (bt1hover) {
			ctx.drawImage(buttonHover, bt1x + bt1img.width + 10 + Math.sin(btosc) * 4, bt1y);
		} else if (bt2hover) {
			ctx.drawImage(buttonHover, bt2x + bt2img.width + 10 + Math.sin(btosc) * 4, bt2y);
		}
		ctx.closePath();
	}
	
	//TODO: Fix half pixel alignment...
	ctx.drawImage(cloudsBackground, cloudsx2, canvas.height - cloudsBackground.height - 60);
	ctx.drawImage(cloudsBackground, cloudsx2 - 1 + cloudsBackground.width, canvas.height - cloudsBackground.height - 60);
	
	ctx.drawImage(clouds2Background, cloudsx, canvas.height - clouds2Background.height - 30);
	ctx.drawImage(clouds2Background, cloudsx - 1 + clouds2Background.width, canvas.height - clouds2Background.height - 30);

	ctx.drawImage(waterBackground, waterx, canvas.height - waterBackground.height);
	ctx.drawImage(waterBackground, waterx - 1 + waterBackground.width, canvas.height - waterBackground.height);
	
	drawImageCentered(emeraldIsland, 0, islandy - Math.sin(yosc) * 10);
	
	if (alpha > 0) {
		ctx.beginPath();
		ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
		ctx.fillRect( 0, 0, canvas.width, canvas.height );
		ctx.closePath();
		
		if (timer > 0) { 
			timer -= 1;
		} else {
			alpha -= 0.01;
		}
	} else {
		alpha2 -= 0.02;
	}
	if (alpha2 > 0) {
		ctx.globalAlpha = alpha2;
		drawImageCentered(SEGALogo);
		ctx.globalAlpha = 1.0;
	}
	
	if (!exiting) {
		window.requestAnimationFrame(draw);
	} else {
		cleanup();
		garden();
	}
}


}