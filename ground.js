class Ground extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h)
        this.body.isStatic = true;
    }

    show () {
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(21, 71,52);
        rectMode(CENTER);
        imageMode(CENTER);
        image(grassImg,0, 0, this.w, this.h);
        pop();
    }
}