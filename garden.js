function garden() {
var coins = 999999;
var coin_frame = 0;

var paused = false;

var mousePos = { x: 0, y: 0 };

// btosc is for controlling the oscillation of the button hover indicator
var btosc = 0;

var newButton = {
	x: 20,
	y: 20,
	img: newGarden,
	hover: false
};

var continueButton = {
	x: 20,
	y: newButton.y + newButton.img.height + 10,
	img: continueGarden,
	hover: false
};

var saveButton = {
	x: 20,
	y: continueButton.y + continueButton.img.height + 10,
	img: saveGarden,
	hover: false
};

// name, x, y, mood, belly, swim, fly, run, power, stamina
var chaos = new Array();

var selected = null;

for (i = 0; i <= 5; i++) {
	chaos.push({
		name: "Omochao",
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		mood: 5,
		belly: 4,
		swim: 3,
		fly: 2,
		run: 1,
		power: 0,
		stamina: 0
	});
}

canvas.onclick = function() { 
	for (i = 0; i < chaos.length; i++) {
		if (mousePos.x >= chaos[i].x && mousePos.x <= chaos[i].x + chaoSprite.width && 
			mousePos.y >= chaos[i].y && mousePos.y <= chaos[i].y + chaoSprite.height) {
			if (selected == chaos[i]) {
				selected = null;
			} else {
				selected = chaos[i];
			}
			return;
		}
	}
	selected = null;
	return;
};
canvas.onmousemove = function(evt) { mousePos = getMousePos(evt); };
canvas.onkeydown = function(evt) {
	if (evt.keyCode == KEY.P) {
		paused = !paused;
	}
};

// kick off the initial frame
draw();

function cleanup() {
	canvas.onclick = null;
	canvas.onmousemove = null;
	canvas.onkeydown = null;
}

function update() {
	if (btosc <= Math.PI) { btosc += 0.1; }
	else { btosc = -Math.PI; }

	if (paused) {
		buttonBoundsCheck(newButton, mousePos);
		buttonBoundsCheck(continueButton, mousePos);
		buttonBoundsCheck(saveButton, mousePos);
	}
}

function drawButton(button) {
	ctx.drawImage(button.img, button.x, button.y);
	if (button.hover) {
		ctx.drawImage(buttonHover, button.x + button.img.width + 10 + Math.sin(btosc) * 4, button.y + button.img.height / 2 - buttonHover.height / 2);
	}
}

function drawStatus(level, max, x, y) {
	for (i = 0; i < level; i++) {
		ctx.drawImage(statusFilled, x + i * (statusFilled.width + 1), y);
	}
	for (i = level; i < max; i++) {
		ctx.drawImage(statusUnfilled, x + i * (statusUnfilled.width + 1), y);
	}
	ctx.closePath();
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
	
	for (i = 0; i < chaos.length; i++) {
		ctx.drawImage(chaoSprite, chaos[i].x, chaos[i].y);
	}
	
	ctx.drawImage(coinSprite[Math.floor(coin_frame)], 50, 50);
	coin_frame += 0.2;
	if (coin_frame >= coinSprite.length) coin_frame = 0;
	
	if (selected) {
		ctx.drawImage(statsBackground, canvas.width - statsBackground.width, 0);
		var sx = canvas.width - statsBackground.width / 2;
		var sxb = sx - (10 * statusFilled.width) / 2;
		
		ctx.textAlign = "center"; 
		ctx.font = "30px serif";
		ctx.fillText(selected.name, sx, 34);
		
		ctx.textAlign = "left"; 
		ctx.font = "20px serif";
		ctx.fillText("Mood", sxb, 60);
		drawStatus(selected.mood, 10, sxb, 70);
		ctx.fillText("Belly", sxb, 100);
		drawStatus(selected.belly, 10, sxb, 110);
		ctx.fillText("Swim", sxb, 140);
		drawStatus(selected.swim, 10, sxb, 150);
		ctx.fillText("Fly", sxb, 180);
		drawStatus(selected.fly, 10, sxb, 190);
		ctx.fillText("Run", sxb, 220);
		drawStatus(selected.run, 10, sxb, 230);
		ctx.fillText("Power", sxb, 260);
		drawStatus(selected.power, 10, sxb, 270);
		ctx.fillText("Stamina", sxb, 300);
		drawStatus(selected.stamina, 10, sxb, 310);
	}
	
	if (paused) {
		ctx.beginPath();
		ctx.fillStyle = "rgba(0, 0, 100, 0.7)";
		ctx.fillRect( 0, 0, canvas.width, canvas.height );
		ctx.closePath();
		
		drawButton(newButton);
		drawButton(continueButton);
		drawButton(saveButton);
	}
	
	ctx.drawImage(cursorSprite, mousePos.x, mousePos.y);
	
	window.requestAnimationFrame(draw);
}


}