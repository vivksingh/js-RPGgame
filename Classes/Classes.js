class Boundary {
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
    constructor({ position, velocity, image , frames = {max : 1}, sprites = {}}){
        this.position = position;
        this.velocity = velocity;
        this.image = image
        this.frames = {...frames, current : 0, elapsed : 0};
        this.sprites = sprites;
        this.moving = false;
        
        
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

            if(this.frames.elapsed >= 5){
                this.frames.elapsed = 0;
                this.frames.current = (this.frames.current + 1) % this.frames.max;
            }
        }
    }
}