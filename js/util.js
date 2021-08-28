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
	sub(v) {
		this.x = (this.x - v.x);
		this.y = (this.y - v.y);
		return this
	}
	static subV1V2(v1, v2) {
		return new Vector2((v1.x - v2.x), (v1.y - v2.y));
	}
	multS(k) {
		this.x = this.x * k;
		this.y = this.y * k;
		return this
	}
	divS(k) {
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
		if (len !== 0) this.multS(1 / len);
		return this;
	}
	setMag(k) {
		return this.normalize().multS(k);
	}
	limit(max) {
		const mSq = this.magSq();
		if (mSq > max * max) {
			this.divS(Math.sqrt(mSq)).multS(max);
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

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.lineWidth = 4;

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	offCanvas.width = window.innerWidth;
	offCanvas.height = window.innerHeight;
});

function drawPoint(pos, r, color) {
	offCtx.beginPath();
	offCtx.arc(pos.x, pos.y, r, r, 0, Math.PI*2);
	offCtx.fillStyle = color;
	offCtx.fill();
	offCtx.strokeStyle = '#00000033';
	offCtx.stroke();
}
function drawSense(pos, r, head, arc, color) {
	offCtx.beginPath();
	offCtx.ellipse(pos.x, pos.y, r, r, head.angle(), -arc, arc);
	offCtx.lineTo(pos.x, pos.y);
	offCtx.closePath();
	offCtx.fillStyle = color;
	offCtx.fill();
	offCtx.strokeStyle = '#00000033';
	offCtx.stroke();
}
function drawTri(pos, head, size, color) {
	offCtx.save();
	offCtx.beginPath();
	offCtx.translate(pos.x, pos.y);
	offCtx.rotate(head.angle());
	offCtx.moveTo(size, 0);
	offCtx.lineTo(- size, - size / 2);
	offCtx.lineTo(- size, + size / 2);
	offCtx.lineTo(size, 0);
	offCtx.fillStyle = color;
	offCtx.fill();
	offCtx.strokeStyle = '#00000033';
	offCtx.stroke();
	offCtx.restore();
}
function drawLine(a, b) {
	offCtx.beginPath();
	offCtx.moveTo(a.x, a.y);
	offCtx.lineTo(b.x, b.y);
	offCtx.strokeStyle = '#FFFFFF22';
	offCtx.stroke();
}
