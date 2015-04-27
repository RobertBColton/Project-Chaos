function garden() {
// kick off the initial frame
draw();

var coins = 999999;

// name, appearance, cost, mood, belly, swim, fly, run, power, stamina
var fruit_data = [
	["Orange", 30, 1, 2, 3, -2, -2, 3, 1],
	["Blue Squash", 30, 1, 2, 3, -2, -2, 3, 1],
	["Heart-Strawberry", 30, 1, 2, 3, -2, -2, 3, 1],
	["Green Apple", 30, 1, 2, 3, -2, -2, 3, 1],
	["Triangular Grape", 30, 1, 2, 3, -2, -2, 3, 1],
	["Pear / Mango", 30, 1, 2, 3, -2, -2, 3, 1],
	["Square Red Apple", 30, 1, 2, 3, -2, -2, 3, 1]
];

// name, cost
var egg_data = [
    ["Normal", 0],
	["Silver", 500],
	["Gold", 1000],
	["Ruby / Pink", 5000],
	["Sapphire / Blue", 7000],
	["Amethyst / Purple", 8000],
	["Emerald / Teal", 10000],
	["Garnet / Red", 12000],
	["Aquamarine / Cyan", 14000],
	["Peridot / Lime", 16000],
	["Topaz / Orange", 18000],
    ["Onyx / Black", 20000]
];

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
	
	window.requestAnimationFrame(draw);
}


}