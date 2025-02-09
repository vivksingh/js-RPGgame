class TriggerTile {
    static width = 48;
    static height = 48;

    constructor({ position,  onTrigger = () => {} }){
        this.position = position;
        this.width = 48;
        this.height = 48;
        this.onTrigger = onTrigger;
    }

    draw(color = 'red'){
        c.fillStyle = color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    triggerEvent(){
        this.onTrigger();
    }

    startConversation(){

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
            const animationSpeed = 4;

            if(this.frames.elapsed >= animationSpeed){
                this.frames.elapsed = 0;
                this.frames.current = (this.frames.current + 1) % this.frames.max;
            }
        }
    }
}

class Scene{
    constructor({ background, player, foreground, collisionBoundariesMap, offset = {x : 0, y : 0}, conversation = [], triggerTiles = [] }){
        this.background = background;
        this.player = player;
        this.foreground = foreground;
        this.collisionBoundaries = Utility.getCollisionBoundaries(collisionBoundariesMap, offset);
        this.conversations = Utility.getMessageBoxes(conversation);
        this.triggerTiles = Utility.getCollisionBoundaries(triggerTiles, offset);
        this.movables = [...this.collisionBoundaries, ...this.triggerTiles, this.background];
        if(this.foreground) this.movables.push(this.foreground);
        this.offset = offset;
        this.conversationIndex = -1;
    }

    draw() {
        // Draw the basic scene
        this.background.draw();
        this.player.draw();
        if (this.foreground) this.foreground.draw();
    
        // Handle conversations
        if (this.conversationIndex >= this.conversations.conversation.length) {
            this.conversations.alreadyDisplayed = true; // Mark as displayed when finished
            this.conversationIndex = this.conversations.conversation.length - 1; // Prevent out-of-bounds
        }
    
        // Display the current conversation if it exists
        if (this.conversationIndex >= 0 && !this.conversations.alreadyDisplayed) {
            this.conversations.conversation[this.conversationIndex].draw();
            if(this.conversationIndex >= 24) witch.draw();
        }
    
        console.log(this.conversationIndex); // For debugging
    }

    checkTrigger(){
        for(let i=0;i<this.triggerTiles.length;i++){
            const tile = this.triggerTiles[i];

            if(Utility.isColliding({ player : this.player, boundary : tile })){
                tile.triggerEvent();
                return;
            }
        }
    }

    drawTriggers(){
        this.triggerTiles.forEach(tile => {
            tile.draw('blue');
        });
    }

    drawBounds(){
        this.collisionBoundaries.forEach(boundary => {
            boundary.draw();
        });
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
    constructor({ text, color = "white", x = 100, y= 500, width = 800, height = 150, font = "20px 'Press Start 2P'", radius = 10, author = {} }) {
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
    
        // Draw Message Text with Wrapping
        c.fillStyle = this.author.color || "black";  
        c.font = this.font;
    
        const lineHeight = 30; // Adjust based on font size
        const maxWidth = this.width - 50; // Padding from both sides
        const words = this.text.split(' ');
        let line = '';
        let y = this.y + 40; // Starting Y position for text
    
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const testWidth = c.measureText(testLine).width;
    
            if (testWidth > maxWidth && i > 0) {
                c.fillText(line, this.x + 25, y);
                line = words[i] + ' ';
                y += lineHeight; // Move to next line
            } else {
                line = testLine;
            }
        }
        c.fillText(line, this.x + 25, y); // Draw the last line
    
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

class TransitionManager {
    constructor() {
        this.opacity = 0;
        this.isTransitioning = false;
        this.direction = 'in'; // 'in' for fade-in, 'out' for fade-out
        this.callback = null;
        this.speed = 0.05;
    }

    startTransition(callback) {
        this.isTransitioning = true;
        this.direction = 'in';
        this.callback = callback;
    }

    update() {
        if (!this.isTransitioning) return;

        if (this.direction === 'in') {
            this.opacity += this.speed;
            if (this.opacity >= 1) {
                this.opacity = 1;
                this.direction = 'out';
                if (this.callback) this.callback(); // Switch Scene Here
            }
        } else if (this.direction === 'out') {
            this.opacity -= this.speed;
            if (this.opacity <= 0) {
                this.opacity = 0;
                this.isTransitioning = false;
            }
        }

        this.draw();

    }

    draw() {
        if (this.isTransitioning) {
            c.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
            c.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}





