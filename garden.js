function garden() {
// kick off the initial frame
draw();

function update() {

}

function draw() {
	update();

	ctx.drawImage(grassBackground, 0, 0);
	
	window.requestAnimationFrame(draw);
}


}