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
	subV1V2(v1, v2) {
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
		return this.x * (v.x || 0) + this.y * (v.y || 0);
	};
}

function getRandomArb(min, max) {
  return Math.random() * (max - min) + min;
}

var canvas = document.querySelector('canvas');
var c = canvas.getContext("2d");
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);
c.lineWidth = 3;
window.addEventListener("resize", () => {
	canvas.setAttribute('width', window.innerWidth);
	canvas.setAttribute('height', window.innerHeight);
});

function drawPoint(pos, r, color) {
	c.beginPath();
	c.arc(pos.x, pos.y, r, 0, Math.PI*2);
	c.fillStyle = color;
	c.fill();
	c.strokeStyle = '#00000033';
	c.stroke();
}
function drawLine(a, b) {
	c.beginPath();
	c.moveTo(a.x, a.y);
	c.lineTo(b.x, b.y);
	c.strokeStyle = '#FFFFFF22';
	c.stroke();
}
