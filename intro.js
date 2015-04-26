function intro() {

//audioNormalGarden.addEventListener("canplaythrough", function() { audioNormalGarden.play(); }, false);
audioSEGA.play();

// kick off the initial frame
draw();

// x is for controlling our scrolling water, cx is for scrolling clouds at different speeds, and the same for cx2 for the second cloud layer
var x = 0, cx = 0, cx2 = 0;
// y is for floating emerald island up from the bottom, yosc is for oscillating emerald island once it reaches it's destination 
var y = canvas.height / 2, yosc = 0;
// whether we want to transition to the garden and should stop requesting animation frames
var exiting = false;

canvas.addEventListener("click", function() { exiting = true; }, false);

function update() {
	// each layer should get faster as it gets closer because field of view
	cx2 -= 0.16;
	if (cx2 < -cloudsBackground.width) {
		cx2 = 0;
	}
	
	cx -= 0.22;
	if (cx < -cloudsBackground.width) {
		cx = 0;
	}
	
	x -= 0.34;
	if (x < -waterBackground.width) {
		x = 0;
	}
	
	if (y > 0) { y -= 0.7; }
	else if (yosc <= Math.PI) { yosc += 0.03; }
	else { yosc = -Math.PI; }
}

function clear() {
	ctx.beginPath();
	ctx.fillStyle = "rgb(0, 153, 255)";
	ctx.fillRect( 0, 0, canvas.width, canvas.height );
	ctx.closePath();
}

function drawImageCentered(img, xoff = 0, yoff = 0) {
	ctx.drawImage(img, canvas.width / 2 - img.width / 2 + xoff, canvas.height / 2 - img.height / 2 + yoff);
}

// first alpha is for the black overlay, second alpha is for the sega logo, and the timer controls how long after the sega logo appears that the black overlay starts to fade
var alpha = 1.0, alpha2 = 1.0, timer = 100;

function draw() {
	update();
	
	clear();
	
	//TODO: Fix half pixel alignment...
	ctx.drawImage(cloudsBackground, cx2, canvas.height - cloudsBackground.height - 60);
	ctx.drawImage(cloudsBackground, cx2 - 1 + cloudsBackground.width, canvas.height - cloudsBackground.height - 60);
	
	ctx.drawImage(clouds2Background, cx, canvas.height - clouds2Background.height - 30);
	ctx.drawImage(clouds2Background, cx - 1 + clouds2Background.width, canvas.height - clouds2Background.height - 30);

	ctx.drawImage(waterBackground, x, canvas.height - waterBackground.height);
	ctx.drawImage(waterBackground, x - 1 + waterBackground.width, canvas.height - waterBackground.height);
	
	drawImageCentered(emeraldIsland, 0, y - Math.sin(yosc) * 10);
	
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
		garden();
	}
}


}