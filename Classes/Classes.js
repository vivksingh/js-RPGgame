class TriggerTile {
    static width = 48;
    static height = 48;

    constructor({ position }){
        this.position = position;
        this.width = 48;
        this.height = 48;
    }

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Sprite{
    constructor({ position, velocity, imagePath , frames = {max : 1}, animationFramePaths = {} }){
        this.position = position;
        this.velocity = velocity;
        this.frames = {...frames, current : 0, elapsed : 0};
        this.moving = false;
        this.animationFrames = {};
        this.image = Utility.getImage(imagePath);

        for (const key in animationFramePaths) {
            this.animationFrames[key] = new Image();
            this.animationFrames[key].src = animationFramePaths[key];
        }
        
        
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
    }


    draw(){
        c.drawImage(
            this.image,
            this.frames.current * this.width,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height,

        );
         
        if(this.frames.max > 1 && this.moving){
            this.frames.elapsed++;
            const animationSpeed = 8;

            if(this.frames.elapsed >= animationSpeed){
                this.frames.elapsed = 0;
                this.frames.current = (this.frames.current + 1) % this.frames.max;
            }
        }
    }
}

class Scene{
    constructor({ background, player, foreground, collisionBoundariesMap }){
        this.background = background;
        this.player = player;
        this.foreground = foreground;
        this.collisionBoundaries = Utility.getCollisionBoundaries(collisionBoundariesMap);
        this.movables = [...this.collisionBoundaries, this.background, this.foreground];
    }

    draw(){
        this.background.draw();
        this.player.draw();
        this.foreground.draw();
    }
}

class MessageBox {
    constructor({ text, color = "white", x, y, font = "20px 'Press Start 2P'" }) {
        this.text = text;
        this.color = color;
        this.font = font;
        this.x = x;
        this.y = y;
    }

    draw() {
        c.fillStyle = "black";
        c.lineJoin = "round";
        c.fillRect(25, 0, 450, 100)
        c.fillStyle = this.color;
        c.font = this.font;
        c.fillText(this.text, 50, 50);
    }
}

class SceneTitle {
    constructor({ text, color = "white", font = "20px 'Press Start 2P'" }) {
        this.text = text;
        this.color = color;
        this.font = font;
    }

    draw() {
        c.fillStyle = this.color;
        c.font = this.font;
        c.fillText(this.text, 50, 50);
    }
}