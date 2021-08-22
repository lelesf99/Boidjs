class Boid {
	constructor(pos, hl) {
		this.pos = pos;
		this.vel = new Vector2((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
		this.acc = new Vector2(0 ,0);
		this.preVel = new Vector2(0 ,0);
		this.freewillVector = new Vector2(Math.random() * canvas.width, Math.random() * canvas.height);
		this.localMates = [];
		this.senseRadius = 165;
		this.FOV = 120 * Math.PI / 180;
		this.maxforce = 0.3125;
		this.maxspeed = 8;
		this.minspeed = 2;
		this.alFac = 1;
		this.cohFac = 1;
		this.sepFac = 1;
		this.freewillFac = 0;
		this.hl = hl;
	}
	

	pushLocalMates(otherBoids, pres){
		for (var i = 0; i < otherBoids.length; i++) {
			let d = this.pos.dist(otherBoids[i].pos);
			if (otherBoids[i] != this  && this.localMates.length <= pres && (d <= this.senseRadius && Vector2.angleBetween(Vector2.subV1V2(otherBoids[i].pos, this.pos), this.vel) < this.FOV || d <= this.senseRadius/2)) {
				if (this.hl) {
					drawLine(this.pos, otherBoids[i].pos);
				}
				this.localMates.push(otherBoids[i]);
			}
		}
	}
	popLocalMates(otherBoids){
		this.localMates.splice(0,this.localMates.length);
	}
	align() {
		var tmpD = new Vector2(0, 0);

		var total = 0;
		for (var i = this.localMates.length - 1; i >= 0; i--) {
			tmpD.add(this.localMates[i].vel);
			total++;
		}
		if (total != 0 ) {
			tmpD.divS(total);
			if (this.alFac < 0.4) {
				this.alFac = 0.4
			}
			this.seek(tmpD, this.alFac);
		}
	}
	cohesion() {
		var tmpD = new Vector2(0, 0);

		var total = 0;
		for (var i = this.localMates.length - 1; i >= 0; i--) {
			tmpD.add(this.localMates[i].pos);
			total++;
		}

		if (total != 0) {
			tmpD.divS(total);
			tmpD.sub(this.pos);
			this.seek(tmpD, this.cohFac);
		}
	}
	separate() {
		var tmpD = new Vector2(0, 0);
		var total = 0;
		for (var i = this.localMates.length - 1; i >= 0; i--) {
			let diff = Vector2.subV1V2(this.pos, this.localMates[i].pos);
			let d = this.pos.dist(this.localMates[i].pos);
			if (d == 0) {
				d = 0.01;
			}
			diff.divS(d);
			tmpD.add(diff);
			total++;
		}
		if (total != 0) {
			tmpD.divS(total);
			this.seek(tmpD, this.sepFac);
		}
	}
	interest(v, i) {
		var tmpD = new Vector2(v.x, v.y);
		let diff = Vector2.subV1V2(tmpD, this.pos);
		let d = this.pos.dist(tmpD);
		if (d < i) {
				d = 0;
			}
		diff.multS(d);
		diff.sub(this.pos);
		this.seek(diff, 0.0000078125 * (d * i));
	}
	seekFreewill(){
		this.freewillVector.add(new Vector2((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100));
		let diff = Vector2.subV1V2(this.freewillVector, this.pos);
		let d = this.pos.dist(this.freewillVector);
		if (d < i) {
				d = 0;
			}
		diff.multS(d);
		diff.sub(this.pos);
		this.seek(diff, this.freewillFac / 20);

		if (this.freewillVector.x > canvas.width + 1000) {
			this.freewillVector.x = -1000;
		}
		if (this.freewillVector.x < -1000) {
			this.freewillVector.x = canvas.width + 1000;
		}

		if (this.freewillVector.y > canvas.height + 1000) {
			this.freewillVector.y = -1000;
		}
		if (this.freewillVector.y < -1000) {
			this.freewillVector.y = canvas.height + 1000;
		}
	}
	seek(target, fac){
		target.setMag(this.maxspeed);
		target.sub(this.vel);
		target.limit(this.maxforce * fac);
		this.acc.add(target);
	}
	update(){
		if (this.pos.x > canvas.width + 20) {
			this.pos.x = -20;
		}
		if (this.pos.x < -20) {
			this.pos.x = canvas.width + 20;
		}

		if (this.pos.y > canvas.height + 20) {
			this.pos.y = -20;
		}
		if (this.pos.y < -20) {
			this.pos.y = canvas.height + 20;
		}
		//freewill
		if (this.freewillFac != 0) {
			this.seekFreewill();
		}
		
		// console.log(this.desire);
		this.vel.add(this.acc);
		if (this.vel.mag() <= this.minspeed) {
			this.vel.setMag(this.minspeed);
		}
		this.pos.add(this.vel);
		this.preVel = this.vel;
		this.acc.multS(0);
	}
	draw(shape){
		this.update();
		if (shape) {
			if (this.hl) {
				
				drawPoint(this.pos, this.senseRadius/2, '#00000022');
				drawSense(this.pos, this.senseRadius, this.vel, this.FOV, '#00000022');
				drawTri(this.pos, this.vel, 15, '#FFAEBC');
			} else {
				drawTri(this.pos, this.vel, 15, '#A0E7E5');
			}
		} else {
			if (this.hl) {
				
				drawPoint(this.pos, this.senseRadius/2, '#00000022');
				drawSense(this.pos, this.senseRadius, this.vel, this.FOV, '#00000022');
				drawPoint(this.pos, 10, '#FFAEBC');
			} else {
				drawPoint(this.pos, 10, '#A0E7E5');
			}
		}
		
	}
}