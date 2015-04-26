function intro() {

//audioNormalGarden.addEventListener("canplaythrough", function() { audioNormalGarden.play(); }, false);
audioSEGA.play();

// kick off the initial frame
draw();

// x is for controlling our scrolling water, cx is for scrolling clouds at different speed, y is for floating emerald island up from the bottom
var x = 0, cx = 0, y = canvas.height / 2;
// whether we want to transition to the garden and should stop requesting animation frames
var exiting = false;

canvas.addEventListener("click", function() { exiting = true; }, false);

function update() {
	x -= 0.2;
	if (x < -waterBackground.width) {
		x = 0;
	}
	
	cx -= 0.5;
	if (cx < -cloudsBackground.width) {
		cx = 0;
	}
	
	if (y > 0) { y -= 0.7; }
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
	ctx.drawImage(cloudsBackground, cx, canvas.height - cloudsBackground.height - 30);
	ctx.drawImage(cloudsBackground, cx + cloudsBackground.width, canvas.height - cloudsBackground.height - 30);
	//ctx.drawImage(cloudsBackground, cx + cloudsBackground.width * 2, canvas.height - cloudsBackground.height - 20);

	ctx.drawImage(waterBackground, x, canvas.height - waterBackground.height);
	ctx.drawImage(waterBackground, x + waterBackground.width, canvas.height - waterBackground.height);
	//ctx.drawImage(waterBackground, x + waterBackground.width * 2, canvas.height - waterBackground.height);
	
	drawImageCentered(emeraldIsland, 0, y);
	
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