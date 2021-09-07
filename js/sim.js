flock = [];
let pres = 105;
let intX = canvas.width/2;
let intY = canvas.height/2;
let interest = 0;
let intFac = 0;
let shape = false;
let frameCount = 0;
let quadHl = false;
let quadCap = 32;

for (var i = 0; i < 1024; i++) {
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
	let qtree = new quadTree(quadCap, new box(0, 0, width, height));
	for (var i = 0; i < flock.length; i++) {
		qtree.insert(flock[i]);
	}
	
	if (shape) {
		c.clearRect(0, 0, canvas.width, canvas.height);
	} else {
		c.fillStyle = '#00000088'
		c.fillRect(0, 0, canvas.width, canvas.height);
	}
	
	offCtx.clearRect(0, 0, canvas.width, canvas.height);
	requestAnimationFrame(animate);
	
	

	for (var i = 0; i < flock.length; i++) {
		let range = new box(flock[i].pos.x - flock[i].senseRadius, flock[i].pos.y - flock[i].senseRadius, flock[i].senseRadius*2, flock[i].senseRadius*2)
		flock[i].pushLocalMates(qtree.query(range), pres);
		//flock[i].pushLocalMates(flock, pres);
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
		drawCircle(new Vector2(intX, intY), interest, '#FFFFFF33');
	}
	for (var i = 0; i < flock.length; i++) {
		flock[i].draw();
	}
	if (quadHl) {
		qtree.show();
	}
	c.drawImage(offCanvas, 0,0);
	frameCount++;
}
animate();