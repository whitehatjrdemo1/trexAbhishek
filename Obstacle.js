class Obstacle{
    constructor(){
        this.obs = createSprite(canvas.width,canvas.height-50);
        this.obs.velocityX = -3;
        obstacle1 = loadImage("images/obstacle1.png");
        obstacle2 = loadImage("images/obstacle2.png");
        obstacle3 = loadImage("images/obstacle3.png");
        obstacle4 = loadImage("images/obstacle4.png");
        obstacle5 = loadImage("images/obstacle5.png");
        obstacle6 = loadImage("images/obstacle6.png");
        var rand = Math.round(random(1,6));
        switch(rand){
            case 1: this.image = obstacle1;
            this.obs.addImage(this.image);
            break; 
            case 2: this.image = obstacle2;
            this.obs.addImage(this.image);
            break; 
            case 3: this.image = obstacle3;
            this.obs.addImage(this.image);
            break;
            case 4: this.image = obstacle4;
            this.obs.addImage(this.image);
            break; 
            case 5: this.image = obstacle5;
            this.obs.addImage(this.image);
            break;
            case 6: this.image = obstacle6;
            this.obs.addImage(this.image);
            default:break;   
        }
    }
}