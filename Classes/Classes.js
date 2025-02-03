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

    triggerEvent(){
        //currentScene = prableenHomeScene;
        console.log('Take to another Scene');
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
    constructor({ background, player, foreground, collisionBoundariesMap, conversation = [], triggerTiles = [] }){
        this.background = background;
        this.player = player;
        this.foreground = foreground;
        this.collisionBoundaries = Utility.getCollisionBoundaries(collisionBoundariesMap);
        this.movables = [...this.collisionBoundaries, this.background, this.foreground];
        this.conversation = conversation;
        this.triggerTiles = triggerTiles;
    }

    draw(){
        this.background.draw();
        this.player.draw();
        this.foreground.draw();
    }

    checkTrigger(){
        this.triggerTiles.forEach(tile => {
            if(Utility.isColliding({
                player : this.player,
                boundary : tile
            })){
                return true;
            }
        })
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


class MessageBox {
    constructor({ text, color = "white", x, y, width = 700, height = 150, font = "20px 'Press Start 2P'", radius = 10, author = {} }) {
        this.text = text;
        this.color = color;
        this.font = font;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.author = author;
    }

    draw() {
        // Draw Main Message Box
        Utility.drawRoundedRect({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            radius: this.radius,
            fillColor: this.color,
            strokeColor: this.author.color || "black"
        });

        // Draw Message Text
        c.fillStyle = this.author.color || "black";  
        c.font = this.font;
        c.fillText(this.text, this.x + 25, this.y + (this.height / 2) + 10);

        // Draw Author Box
        const textWidth = c.measureText(this.author.name || "").width;
        const padding = 5;
        const authorBoxWidth = textWidth + padding;

        const authorBoxHeight = 35;
        let authorX = this.x + this.width - authorBoxWidth - 10;
        let authorY = this.y + this.height - authorBoxHeight - 10;

        Utility.drawRoundedRect({
            x: authorX,
            y: authorY,
            width: authorBoxWidth,
            height: authorBoxHeight,
            radius: this.radius,
            fillColor: this.author.bgColor || "white",
            strokeColor: this.author.color || "black"
        });

        // Draw Author Name
        c.fillStyle = this.author.color || "white";
        c.font = "16px 'Press Start 2P'";
        c.fillText(this.author.name, authorX + 10, authorY + 25);
    }
}


