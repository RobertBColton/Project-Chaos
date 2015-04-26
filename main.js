start();

function clear() {
	ctx.fillStyle = "black";
	ctx.fillRect( 0, 0, canvas.width, canvas.height );
}

function start() {
	canvas = document.getElementById("mcanvas");

	ctx = canvas.getContext("2d") || canvas.getContext("experimental-2d"); // Initialize the GL context

	// Only continue if context is available and working
	if (!ctx) { 
		alert("Unable to initialize WebGL. Your browser may not support it.");
		return; 
	}
	
	clear();
	resources(intro);
}