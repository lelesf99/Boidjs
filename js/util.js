class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	add(v) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
		return this
	}
    static addvu(v, u) {
		return new Vector2((v.x + u.x), (v.y + u.y));
	}
	sub(v) {
		this.x = (this.x - v.x);
		this.y = (this.y - v.y);
		return this
	}
	static subvu(v, u) {
		return new Vector2((v.x - u.x), (v.y - u.y));
	}
	mult(k) {
		this.x = this.x * k;
		this.y = this.y * k;
		return this
	}
	div(k) {
		this.x = this.x / k;
		this.y = this.y / k;
		return this;
	}
	dist(v){
		return Math.sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
	}
	magSq() {
		const x = this.x;
		const y = this.y;
		return x * x + y * y;
	};
	mag(){
		return Math.sqrt(this.magSq());
	}
	normalize(){
		const len = this.mag();
		if (len !== 0) this.mult(1 / len);
		return this;
	}
	setMag(k) {
		return this.normalize().mult(k);
	}
	limit(max) {
		const mSq = this.magSq();
		if (mSq > max * max) {
			this.div(Math.sqrt(mSq)).mult(max);
		}
		return this;
	};
	dot(v) {
		return this.x * v.x + this.y * v.y;
	};
	static angleBetween(v1, v2){
			return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
	}
	angle(){
		return (this.y < 0) ? -Vector2.angleBetween(this, new Vector2(1,0)) : Vector2.angleBetween(this, new Vector2(1,0));
	}
	static fromVAngle(v, angle) {
		let u = new Vector2(0,0);
		u.x = v.x * Math.cos(angle) - v.y * Math.sin(angle);
		u.y =  v.x * Math.sin(angle) + v.y * Math.cos(angle);
		u.setMag(1);
		return u;
	}
	static randomV(amp, off) {	
		return new Vector2((Math.random() * amp - off), (Math.random() * amp - off));
	}
}

function getRandomArb(min, max) {
  return Math.random() * (max - min) + min;
}

function constrain(n, low, high) {
	return Math.max(Math.min(n, high), low);
};

function map(n, start1, stop1, start2, stop2, withinBounds) {
	const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
	if (!withinBounds) {
		return newval;
	}
	if (start2 < stop2) {
		return this.constrain(newval, start2, stop2);
	} else {
		return this.constrain(newval, stop2, start2);
	}
};

var canvas = document.querySelector('canvas');
var c = canvas.getContext("2d");

var offCanvas = new OffscreenCanvas(window.innerWidth, window.innerHeight);
var offCtx = offCanvas.getContext("2d");

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

c.lineWidth = 10;

window.addEventListener("resize", () => {

	width = window.innerWidth;
	height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;
	offCanvas.width = width;
	offCanvas.height = height;
});

function drawPoint(pos, r, color) {
	offCtx.lineWidth = r;
	offCtx.lineCap = 'round';
	offCtx.strokeStyle = color;
	offCtx.beginPath();
	offCtx.moveTo(pos.x, pos.y);
	offCtx.lineTo(pos.x, pos.y);
	offCtx.stroke();
}
function drawCircle(pos, r, color) {
	offCtx.beginPath();
	offCtx.arc(pos.x, pos.y, r, 0, Math.PI*2);
	offCtx.fillStyle = color;
	offCtx.fill();
	offCtx.strokeStyle = '#00000033';
	offCtx.stroke();
}
function drawSense(pos, r, head, arc, color) {
	offCtx.fillStyle = color;
	offCtx.strokeStyle = '#00000033';
	offCtx.beginPath();
	offCtx.ellipse(pos.x, pos.y, r, r, head.angle(), -arc, arc);
	offCtx.lineTo(pos.x, pos.y);
	offCtx.closePath();
	offCtx.fill();
	offCtx.stroke();
}
function drawTri(pos, head, size, color) {
	offCtx.fillStyle = color;
	offCtx.strokeStyle = '#00000033';
	offCtx.save();
	offCtx.beginPath();
	offCtx.translate(pos.x, pos.y);
	offCtx.rotate(head.angle());
	offCtx.moveTo(size, 0);
	offCtx.lineTo(- size, - size / 2);
	offCtx.lineTo(- size, + size / 2);
	offCtx.lineTo(size, 0);
	offCtx.fill();
	offCtx.stroke();
	offCtx.restore();
}
function drawLine(a, b, s, color) {
	offCtx.lineWidth = s;
	offCtx.lineCap = 'round';
	offCtx.strokeStyle = color;
	offCtx.beginPath();
	offCtx.moveTo(a.x, a.y);
	offCtx.lineTo(b.x, b.y);
	offCtx.stroke();
}
