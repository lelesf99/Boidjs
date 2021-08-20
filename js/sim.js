flock = [];
var pres = 105;
var intX = canvas.width/2;
var intY = canvas.height/2;
var interest = 1;
var intFac = 0;

for (var i = 0; i < 512; i++) {
	if (i == 0) {
		flock.push(new Boid(new Vector2(Math.random() * canvas.width, Math.random() * canvas.height), true));
	} else {
		flock.push(new Boid(new Vector2(Math.random() * canvas.width, Math.random() * canvas.height), false));
	}
}
animate();
function animate() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	requestAnimationFrame(animate);
	if (interest >= 1) {
		interest += intFac;
		if (intFac >= 0.1) {
			intFac = intFac - 0.1; 
		}
	} else {
		interest = 1;
		intFac = intFac + 0.1;
	}
	for (var i = 0; i < flock.length; i++) {
		flock[i].pushLocalMates(flock, pres);
		
		flock[i].separate();
		flock[i].align();
		flock[i].cohesion();
		if (interest >= 5) {
			flock[i].interest(new Vector2(intX, intY),interest);
		}
		flock[i].popLocalMates();
	}
	if(interest >= 1) {
		drawPoint(new Vector2(intX, intY), interest, '#FFFFFF33');
	}
	for (var i = 0; i < flock.length; i++) {
		flock[i].draw();
	}
}