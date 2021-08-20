class Boid {
	constructor(pos, hl) {
		this.pos = pos;
		this.vel = new Vector2((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
		this.acc = new Vector2(0 ,0);
		this.localMates = [];
		this.maxforce = 0.3125;
		this.maxspeed = 8;
		this.sepFac = 1;
		this.alFac = 1;
		this.cohFac = 1;
		this.senseRadius = 165;
		this.freewill = 0;
		this.localMates = [];
		this.hl = hl;
	}
	update(){

		if (this.pos.x > canvas.width + 10) {
			this.pos.x = -10;
		}
		if (this.pos.x < -10) {
			this.pos.x = canvas.width + 10;
		}

		if (this.pos.y > canvas.height + 10) {
			this.pos.y = -10;
		}
		if (this.pos.y < -10) {
			this.pos.y = canvas.height + 10;
		}

		//freewill
		var freewillF = new Vector2(getRandomArb(-this.freewill/20, this.freewill/20), (getRandomArb(-this.freewill/20, this.freewill/20)));
		freewillF.limit(this.maxforce);
		this.acc.add(freewillF);

		// console.log(this.desire);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.multS(0);
	}

	pushLocalMates(otherBoids, pres){
		for (var i = 0; i < otherBoids.length; i++) {
			let d = this.pos.dist(otherBoids[i].pos);
			if (otherBoids[i] != this && d <= this.senseRadius && this.localMates.length <= pres) {
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
			tmpD.setMag(this.maxspeed);
			tmpD.sub(this.vel);
			tmpD.limit(this.maxforce);
			tmpD.multS(this.alFac);
			this.acc.add(tmpD);
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
			tmpD.setMag(this.maxspeed);
			tmpD.sub(this.vel)
			tmpD.limit(this.maxforce);
			tmpD.multS(this.cohFac);
			this.acc.add(tmpD);
		}
	}

	separate() {
		var tmpD = new Vector2(0, 0);
		var total = 0;
		for (var i = this.localMates.length - 1; i >= 0; i--) {
			let diff = new Vector2().subV1V2(this.pos, this.localMates[i].pos);
			let d = this.pos.dist(this.localMates[i].pos);
			if (d < 0.01) {
				d = 0.0001;
			}
			diff.divS(d);
			tmpD.add(diff);
			total++;
		}
		if (total != 0) {
			tmpD.divS(total);
			tmpD.setMag(this.maxspeed);
			tmpD.sub(this.vel);
			tmpD.limit(this.maxforce);
			tmpD.multS(this.sepFac);
			this.acc.add(tmpD);
		}
	}

	interest(v, i) {
		var tmpD = new Vector2(v.x, v.y);
		let diff = new Vector2().subV1V2(tmpD, this.pos);
		let d = this.pos.dist(tmpD);
		if (d < i) {
				d = 0;
			}
		diff.multS(d);
		tmpD.add(diff);

		tmpD.sub(this.pos);
		tmpD.setMag(this.maxspeed)
		tmpD.sub(this.vel);
		tmpD.limit(this.maxforce * 0.0006 * (d + i));
		this.acc.add(tmpD);
	}

	draw(){
		this.update();
		if (this.hl) {
			drawPoint(this.pos, 10, '#FFAEBC');
			drawPoint(this.pos, this.senseRadius, '#00000022');
		} else {
			drawPoint(this.pos, 10, '#A0E7E5');
		}
	}
}