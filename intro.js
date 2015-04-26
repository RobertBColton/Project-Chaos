function intro() {

//audioNormalGarden.addEventListener("canplaythrough", function() { audioNormalGarden.play(); }, false);
audioSEGA.play();

ctx.font = "40px AR DESTINE";
ctx.textAlign = "center";
ctx.fillStyle = "white"
ctx.strokeStyle = "black";
ctx.lineWidth = 1;

setHoverShadow();

var bt1x, bt1y, bt1w, bt1h, bt1txt, bt1hover = false;

bt1txt = "New Garden";
bt1w = ctx.measureText(bt1txt).width;
bt1h = 40;
bt1x = (canvas.width / 4) - bt1w / 2;
bt1y = 70;

var bt2x, bt2y, bt2w, bt2h, bt2txt, bt2hover = false;

bt2txt = "Continue Garden";
bt2w = ctx.measureText(bt2txt).width;
bt2h = 40;
bt2x = (canvas.width * 3 / 4) - bt2w / 2;
bt2y = 70;

// x is for controlling our scrolling water, cx is for scrolling clouds at different speeds, and the same for cx2 for the second cloud layer
var x = 0, cx = 0, cx2 = 0;
// y is for floating emerald island up from the bottom, yosc is for oscillating emerald island once it reaches it's destination 
var y = canvas.height / 2, yosc = 0;

// whether we want to transition to the garden and should stop requesting animation frames
var exiting = false;
// our mouse position object
var mousePos = { x: 0, y: 0 };

function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

canvas.addEventListener("click", function() { if (bt1hover || bt2hover) { exiting = true; } }, false);
canvas.addEventListener("mousemove", function(evt) { mousePos = getMousePos(evt); }, false);

// kick off the initial frame
draw();

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
	
	bt1hover = (mousePos.x >= bt1x && mousePos.x <= bt1x + bt1w && mousePos.y >= bt1y && mousePos.y <= bt1y + bt1h);
	bt2hover = (mousePos.x >= bt2x && mousePos.x <= bt2x + bt2w && mousePos.y >= bt2y && mousePos.y <= bt2y + bt2h);
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

function setHoverShadow() {
	ctx.shadowOffsetX = 2; // Sets the shadow offset x, positive number is right
	ctx.shadowOffsetY = 2; // Sets the shadow offset y, positive number is down
	ctx.shadowBlur = 2; // Sets the shadow blur size
	ctx.shadowColor = "yellow"; // Sets the shadow color
}

function resetHoverShadow() {
	ctx.shadowOffsetX = 0; // Sets the shadow offset x, positive number is right
	ctx.shadowOffsetY = 0; // Sets the shadow offset y, positive number is down
	ctx.shadowBlur = 0; // Sets the shadow blur size
	ctx.shadowColor = "rgba(0, 0, 0, 0)"; // Sets the shadow color
}

// first alpha is for the black overlay, second alpha is for the sega logo, and the timer controls how long after the sega logo appears that the black overlay starts to fade
var alpha = 1.0, alpha2 = 1.0, timer = 100;

function draw() {
	update();
	
	clear();
	
	ctx.beginPath();
	ctx.font = "40px AR DESTINE";
	ctx.textAlign = "start";
	ctx.textBaseline = "top";
	ctx.fillStyle = "white"
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1;
	
	if (bt1hover) setHoverShadow();
	ctx.fillText(bt1txt, bt1x, bt1y);
	ctx.strokeText(bt1txt, bt1x, bt1y);
	
	if (!bt2hover) resetHoverShadow();
	else if (!bt1hover) setHoverShadow();

	ctx.fillText(bt2txt, bt2x, bt2y);
	ctx.strokeText(bt2txt, bt2x, bt2y);
	resetHoverShadow();
	
	ctx.closePath();
	
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