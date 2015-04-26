function intro() {

//audioNormalGarden.addEventListener("canplaythrough", function() { audioNormalGarden.play(); }, false);
audioNormalGarden.play();

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
	ctx.fillStyle = "rgb(0, 153, 255)";
	ctx.fillRect( 0, 0, canvas.width, canvas.height );
}

function draw_image_centered(img) {
	ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2);
}

function draw() {
	update();

	clear();
	ctx.drawImage(cloudsBackground, x, canvas.height - cloudsBackground.height);
	ctx.drawImage(cloudsBackground, x + cloudsBackground.width, canvas.height - cloudsBackground.height);
	ctx.drawImage(cloudsBackground, x + cloudsBackground.width * 2, canvas.height - cloudsBackground.height);
	
	draw_image_centered(emeraldIsland);
	
	window.requestAnimationFrame(draw);
}


}