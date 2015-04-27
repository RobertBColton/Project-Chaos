function garden() {
// kick off the initial frame
draw();

var coins = 999999;

var mousePos;

canvas.onclick = function() { };
canvas.onmousemove = function(evt) { mousePos = getMousePos(evt); };

function cleanup() {
	canvas.onclick = null;
	canvas.onmousemove = null;
}

function update() {

}

function draw() {
	update();

	ctx.drawImage(grassBackground, 0, 0);
	
	for (i = 0; i < 7; i++) {
		ctx.drawImage(fruit_data[i][0], 0, i * 20);
	}
	
	for (i = 0; i < 12; i++) {
		ctx.drawImage(egg_data[i][0], 20, i * 20);
	}
	
	for (i = 0; i < 3; i++) {
		ctx.drawImage(toy_data[i][0], 40, i * 20);
	}
	
	window.requestAnimationFrame(draw);
}


}