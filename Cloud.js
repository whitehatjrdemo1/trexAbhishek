class Cloud{
    constructor(){
        this.cloud = createSprite(canvas.width,100);
        this.cloud.velocityX = -3;
        this.cloud.y = Math.round(random(50, canvas.height/2));
        this.image = loadImage("images/cloud.png");
        this.cloud.addImage(this.image);
        this.cloud.depth = trex.depth
        trex.depth++
    }
}