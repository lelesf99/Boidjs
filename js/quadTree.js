class quadTree {
    constructor(cap, bound) {
        this.cap = cap;
        this.bound = bound;
        
        this.points = [];
        
        this.quad1 = null;
        this.quad2 = null;
        this.quad3 = null;
        this.quad4 = null;
    }

    subdivide() {
        let quad1Box = new Rect(
            this.bound.x + this.bound.w / 2, 
            this.bound.y, 
            this.bound.w / 2, 
            this.bound.h / 2
            );
        let quad2Box = new Rect(this.bound.x, 
            this.bound.y, 
            this.bound.w / 2, 
            this.bound.h / 2
            );
        let quad3Box = new Rect(this.bound.x, 
            this.bound.y + this.bound.h / 2, 
            this.bound.w / 2, 
            this.bound.h / 2
            );
        let quad4Box = new Rect(this.bound.x + this.bound.w / 2, 
            this.bound.y + this.bound.h / 2, 
            this.bound.w / 2, 
            this.bound.h / 2
            );

        this.quad1 = new quadTree(this.cap, quad1Box);
        this.quad2 = new quadTree(this.cap, quad2Box);
        this.quad3 = new quadTree(this.cap, quad3Box);
        this.quad4 = new quadTree(this.cap, quad4Box);
    }

    insert(point) {
        if (!this.bound.containsPoint(point)) {
            return false;
        }
        if (this.points.length < this.cap && this.quad1 == null) {
            this.points.push(point);
            return true;
        }
        if (this.quad1 == null){
            this.subdivide();
        }

        for (let i = 0; i < this.points.length; i++) {
            this.insert(this.points.pop());
        }
        
        if (this.quad1.insert(point)) return true;
        if (this.quad2.insert(point)) return true;
        if (this.quad3.insert(point)) return true;
        if (this.quad4.insert(point)) return true;

        return false;
    }

    query(range, result, show) {
        if (!result) {
            result = [];
        }

        if (!range.intersectsBox(this.bound)){
            return result;
        }

        this.points.forEach(p => {
            if (range.containsPoint(p))
                result.push(p);
        });

        if (this.quad1 == null) {
            if (show) {
                this.bound.show('#550000');
            }
            return result;
        }   

        this.quad1.query(range, result, show);
        this.quad2.query(range, result, show);
        this.quad3.query(range, result, show);
        this.quad4.query(range, result, show);

        return result;
    }

    show(color) {
        this.bound.show(color);
        if (this.quad1) this.quad1.show();
        if (this.quad2) this.quad2.show();
        if (this.quad3) this.quad3.show();
        if (this.quad4) this.quad4.show();
    }
}