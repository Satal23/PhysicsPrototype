class Enemy {
    constructor(x, y, r) {
        this.body = Matter.Bodies.circle(x,y,r) 
            const options = {
                restitution: 0.4
            }
        this.body = Matter.Bodies.circle(x,y,r,options);
        Matter.Body.setMass(this.body, this.body.mass*4);
        Matter.World.add(world, this.body);
        this.r = r;
        this.dead = false;

    }


    show() {
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(255);
        imageMode(CENTER);
        image(enemyImg, 0, 0, this.r*2, this.r*2);
        pop();
        if(enemy.dead) {
            image(deadImg, 0, 0, this.r*2, this.r*2);
        }
    }
};
