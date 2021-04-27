class Meteorite{
    constructor(x,y,r){
        var options={
            isStatic:false,
            'friction':0.5,
            'density':0.5,
            }

            this.image=loadImage("Images/asteroid2.png");
            this.body=Bodies.cirlce(x,y,r,options);
            this.radius=r;
            World.add(this.body, world);


    }
    display(){
        var pos=this.body.position;
        push();
        translate(pos.x,pos.y);
        imageMode(RADIUS);
        image(this.image, 0, 0, this.radius, this.radius);
        pop();
    }
}