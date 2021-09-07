class Boid {
	constructor(x, y, hl) {
		this.pos = new Vector2(x, y);
		this.prePos = this.pos;
		this.vel = Vector2.randomV(20, 10);
		this.acc = new Vector2(0 ,0);
		this.preVel = new Vector2(0 ,0);
		this.localMates = [];
		this.senseRadius = 80;
		this.sense = new Circle(this.pos.x, this.pos.y, this.senseRadius);
		this.FOV = 120 * Math.PI / 180;
		this.maxforce = 0.3125;
		this.maxspeed = 8;
		this.minspeed = this.maxspeed/2;
		this.alFac = 1;
		this.cohFac = 1;
		this.sepFac = 1;
		this.hl = hl;
	}
	pushLocalMates(qtree, range){
		this.localMates = qtree.query(range);
		this.localMates.filter((otherBoid) => {
			let d = this.pos.dist(otherBoid.pos);
			if (otherBoid != this && 
				this.localMates.length <= pres && 
				(Vector2.angleBetween(Vector2.subvu(otherBoid.pos, this.pos), this.vel) < this.FOV || 
				d <= this.senseRadius/2)
				) {
				if ((quadHl && link) || (shape && this.hl)) {
					drawLine(otherBoid.pos, this.pos, 1,'#FFFFFF55');
				}
				return true;
			} else {
				return false;
			}
		});
	}
	popLocalMates(){
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
			tmpD.div(total);
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
			tmpD.div(total);
			let d = this.pos.dist(tmpD);

			var arrival = map(d, 0, this.senseRadius, 0.5, 1.6);

			tmpD.sub(this.pos);
			this.seek(tmpD, this.cohFac * arrival);
		}
	}
	separate() {
		var tmpD = new Vector2(0, 0);
		var total = 0;
		for (var i = this.localMates.length - 1; i >= 0; i--) {
			let diff = Vector2.subvu(this.pos, this.localMates[i].pos);
			let d = this.pos.dist(this.localMates[i].pos);
			if (d == 0) {
				d = 0.01;
			}
			diff.div(d);
			tmpD.add(diff);
			total++;
		}
		if (total != 0) {
			tmpD.div(total);
			this.seek(tmpD, this.sepFac);
		}
	}
	interest(v, i) {
		var tmpD = new Vector2(v.x, v.y);
		let diff = Vector2.subvu(tmpD, this.pos);
		let d = this.pos.dist(tmpD);
		if (d < i) {
				d = 0;
			}
		diff.mult(d);
		diff.sub(this.pos);
		this.seek(diff, 0.0000078125 * (d * i));
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
		this.prePos = new Vector2(this.pos.x, this.pos.y);
		
		// slightly seek center
		this.seek(Vector2.subvu(new Vector2(width/2, height/2), this.pos), 0.25);

		this.vel.add(this.acc);
		if (this.vel.mag() <= this.minspeed) {
			this.vel.setMag(this.minspeed);
		}
		this.pos.add(this.vel);
		this.preVel = this.vel;
		this.acc.mult(0);
	}
	draw(shape){
		this.update();
		if (shape) {
			if (this.hl) {
				
				drawCircle(this.pos, this.senseRadius/2, '#00000022');
				drawSense(this.pos, this.senseRadius, this.vel, this.FOV, '#00000022');
				drawTri(this.pos, this.vel, 15, '#FFAEBC');
			} else {
				drawTri(this.pos, this.vel, 15, '#A0E7E5');
			}
		} else {
			drawLine(this.prePos, this.pos, 1, '#FFFFFF');
		}
	}
}