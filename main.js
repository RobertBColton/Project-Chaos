start();

function clear() {
	ctx.fillStyle = "black";
	ctx.fillRect( 0, 0, canvas.width, canvas.height );
}

function start() {
	canvas = document.getElementById("mcanvas");
	
	// we wan't to capture keyboard input
	canvas.tabIndex = 1000;
	// don't show the dotted selection when the canvas has focus
	canvas.style.outline = "none";
	
	ctx = canvas.getContext("2d") || canvas.getContext("experimental-2d"); // Initialize the GL context

	// Only continue if context is available and working
	if (!ctx) { 
		alert("Unable to initialize WebGL. Your browser may not support it.");
		return; 
	}
	
	clear();
	resources(intro);
}