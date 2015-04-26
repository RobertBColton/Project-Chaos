function intro() {

//audioNormalGarden.addEventListener("canplaythrough", function() { audioNormalGarden.play(); }, false);
audioSEGA.play();

test();

// kick off the initial frame
draw();

var x = 0;

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

function drawImageCentered(img) {
	ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2);
}

var alpha = 1.0;

function draw() {
	update();

	clear();
	ctx.drawImage(cloudsBackground, x, canvas.height - cloudsBackground.height);
	ctx.drawImage(cloudsBackground, x + cloudsBackground.width, canvas.height - cloudsBackground.height);
	ctx.drawImage(cloudsBackground, x + cloudsBackground.width * 2, canvas.height - cloudsBackground.height);
	
	drawImageCentered(emeraldIsland);
	
	if (alpha > 0) {
		ctx.beginPath();
		ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
		ctx.fillRect( 0, 0, canvas.width, canvas.height );
		ctx.closePath();
		drawImageCentered(SEGALogo);
		alpha -= 0.01;
	}
	
	window.requestAnimationFrame(draw);
}


}