function intro() {

//audioNormalGarden.addEventListener("canplaythrough", function() { audioNormalGarden.play(); }, false);
audioSEGA.play();

test();

// kick off the initial frame
draw();

var x = 0, y = canvas.height / 2;

function update() {
	x--;
	if (x < -cloudsBackground.width) {
		x = 0;
	}
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

var alpha = 1.0, timer = 100;

function draw() {
	update();

	clear();
	ctx.drawImage(cloudsBackground, x, canvas.height - cloudsBackground.height);
	ctx.drawImage(cloudsBackground, x + cloudsBackground.width, canvas.height - cloudsBackground.height);
	ctx.drawImage(cloudsBackground, x + cloudsBackground.width * 2, canvas.height - cloudsBackground.height);
	
	drawImageCentered(emeraldIsland, 0, y);
	if (y > 0) { y -= 0.7; }
	
	if (alpha > 0) {
		ctx.beginPath();
		ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
		ctx.fillRect( 0, 0, canvas.width, canvas.height );
		ctx.closePath();
		drawImageCentered(SEGALogo);
		if (timer > 0) { 
			timer -= 1;
		} else {
			alpha -= 0.01;
		}
	}
	
	window.requestAnimationFrame(draw);
}


}