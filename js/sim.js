flock = [];
let intX = canvas.width / 2;
let intY = canvas.height / 2;
let interest = 0;
let intFac = 0;
let shape = false;
let frameCount = 0;
let quadHl = false;
let link = false;
let trail = 55;
let quadCap = 32;

for (var i = 0; i < 2048; i++) {
	if (i == 0) {
		flock.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height, false));
	} else {
		flock.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height, false));
	}
}

function addBoids() {
	for (var i = 0; i < 64; i++) {
		if (i == 0 && flock.length == 0) {
			flock.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height, false));
		} else {
			flock.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height, false));
		}
	}
}
function remBoids() {
	for (var i = 0; i < 64; i++) {
		flock.pop();
	}
}


function animate() {
	let qtree = new quadTree(quadCap, new Rect(0, 0, width, height));

	for (var i = 0; i < flock.length; i++) {
		qtree.insert(flock[i]);
	}

	if (shape) {
		c.clearRect(0, 0, canvas.width, canvas.height);
	} else {
		c.fillStyle = '#000000' + trail
		c.fillRect(0, 0, canvas.width, canvas.height);
	}

	offCtx.clearRect(0, 0, canvas.width, canvas.height);
	requestAnimationFrame(animate);



	for (var i = 0; i < flock.length; i++) {
		let range = new Circle(flock[i].pos.x, flock[i].pos.y, flock[i].senseRadius)
		flock[i].pushLocalMates(qtree, range);
		flock[i].align();
		flock[i].cohesion();
		flock[i].separate();
		if (interest >= 5) {
			flock[i].interest(new Vector2(intX, intY), interest);
		}
		flock[i].popLocalMates();
	}

	if (quadHl) {
		qtree.show('#115511');
	}

	if (interest > 0) {
		interest += intFac;
		if (intFac > 0.5) {
			intFac = intFac - 0.5;
		} else if (intFac > 0 && intFac <= 0.5) {
			intFac = 0;
		}
	} else {
		interest = 0;
	}
	if (interest >= 1) {
		drawCircle(new Vector2(intX, intY), interest, '#55555522');
	}
	for (var i = 0; i < flock.length; i++) {
		flock[i].draw(shape);
	}
	c.drawImage(offCanvas, 0, 0);
	frameCount++;
}
animate();