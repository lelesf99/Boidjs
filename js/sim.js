flock = [];
var pres = 105;
var intX = canvas.width/2;
var intY = canvas.height/2;
var interest = 0;
var intFac = 0;
var shape = true;

for (var i = 0; i < 128; i++) {
	if (i == 0) {
		flock.push(new Boid(new Vector2(Math.random() * canvas.width, Math.random() * canvas.height), true));
	} else {
		flock.push(new Boid(new Vector2(Math.random() * canvas.width, Math.random() * canvas.height), false));
	}
}

function addBoids(){
	for (var i = 0; i < 64; i++) {
		if (i == 0 && flock.length == 0) {
			flock.push(new Boid(new Vector2(Math.random() * canvas.width, Math.random() * canvas.height), true));
		} else {
			flock.push(new Boid(new Vector2(Math.random() * canvas.width, Math.random() * canvas.height), false));
		}
	}
}
function remBoids(){
	for (var i = 0; i < 64; i++) {
		flock.pop();
	}
}

function animate() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	requestAnimationFrame(animate);

	for (var i = 0; i < flock.length; i++) {
		flock[i].pushLocalMates(flock, pres);
		
		
		flock[i].align();
		flock[i].cohesion();
		flock[i].separate();
		if (interest >= 5) {
			flock[i].interest(new Vector2(intX, intY),interest);
		}
		flock[i].popLocalMates();
	}
	if (interest > 0) {
		interest += intFac;
		if (intFac > 0.5) {
			intFac = intFac - 0.5; 
		} else if(intFac > 0 && intFac <= 0.5) {
			intFac = 0;
		}
	} else {
		interest = 0;
	}
	if(interest >= 1) {
		drawPoint(new Vector2(intX, intY), interest, '#FFFFFF33');
	}
	for (var i = 0; i < flock.length; i++) {
		flock[i].draw(shape);
	}
}
animate();