const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let lastKey = null;
canvas.width = 1024;
canvas.height = 768;
const offset = {
    x : -400,
    y : -450
}

const collisionMap = []
for(let i = 0;i<boundaries.length;i+=70){
    collisionMap.push(boundaries.slice(i, i+70));
}

console.log(collisionMap);

const image = new Image();
image.src = './img/map.png';
const playerImage = new Image();
playerImage.src = './img/playerDown.png';

class Sprite{
    constructor({ position, velocity, image , frames = {max : 1}}){
        this.position = position;
        this.velocity = velocity;
        this.image = image
        this.frames = frames;
        
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
    }

    draw(){
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height,
        );
    }
}
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



const collisionBoundaries = [];
collisionMap.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
        if(cell === 1025){
            collisionBoundaries.push(new Boundary({
                position : {
                    x : (cellIndex * Boundary.width) + offset.x ,
                    y : (rowIndex * Boundary.height) + offset.y
                }
            }));
        };
    });
});




const background = new Sprite({
    position : {
        x: offset.x,
        y: offset.y
    },
    velocity : 0,
    image : image
})

const player = new Sprite({
    image : playerImage,
    position : {
        x : canvas.width/2 - 192/2,
        y : canvas.height/2 - 68/2
    },
    velocity : 7,
    frames : {
        max : 4
    }
})

function isColliding({ player, boundary }){
    const playerX = player.position.x;
    const playerY = player.position.y;
    const playerWidth = player.width;
    const playerHeight = player.height;

    const boundaryX = boundary.position.x;
    const boundaryY = boundary.position.y;
    const boundaryWidth = boundary.width;
    const boundaryHeight = boundary.height;

    return playerX + playerWidth > boundaryX
    && playerX < boundaryX + boundaryWidth
    && playerY + playerHeight > boundaryY
    && playerY + 20 < boundaryY + boundaryHeight;
}

const keys = {
    W : {
        pressed : false
    },

    A : {
        pressed : false
    },

    S : {
        pressed : false
    },

    D : {
        pressed : false
    }
}

movables = [background, ...collisionBoundaries];

function animate(){
    window.requestAnimationFrame(animate);
    //return;

    movables.forEach(sprite => sprite.draw());
    
    player.draw();


    if(keys.W.pressed && lastKey === 'w'){
        for(let i = 0;i<collisionBoundaries.length;i++){
            const boundary = collisionBoundaries[i];

            if(isColliding({
                player : player,
                boundary : {
                    ...boundary,
                    position : {
                        x : boundary.position.x,
                        y : boundary.position.y + player.velocity
                    }
                }
            })){
                return;
            }
        }
        
        movables.forEach(sprite => sprite.position.y += player.velocity);
    }

    else if(keys.A.pressed && lastKey === 'a'){
        for(let i = 0;i<collisionBoundaries.length;i++){
            const boundary = collisionBoundaries[i];

            if(isColliding({
                player : player,
                boundary : {
                    ...boundary,
                    position : {
                        x : boundary.position.x + player.velocity,
                        y : boundary.position.y 
                    }
                }
            })){
                return;
            }
        }
        
        movables.forEach(sprite => sprite.position.x += player.velocity);
    }

    else if(keys.S.pressed && lastKey === 's'){
        for(let i = 0;i<collisionBoundaries.length;i++){
            const boundary = collisionBoundaries[i];

            if(isColliding({
                player : player,
                boundary : {
                    ...boundary,
                    position : {
                        x : boundary.position.x,
                        y : boundary.position.y - player.velocity
                    }
                }
            })){
                return;
            }
        }
        
        movables.forEach(sprite => sprite.position.y -= player.velocity);
    }

    else if(keys.D.pressed && lastKey === 'd'){
        for(let i = 0;i<collisionBoundaries.length;i++){
            const boundary = collisionBoundaries[i];

            if(isColliding({
                player : player,
                boundary : {
                    ...boundary,
                    position : {
                        x : boundary.position.x - player.velocity,
                        y : boundary.position.y
                    }
                }
            })){
                return;
            }
        }
        
        movables.forEach(sprite => sprite.position.x -= player.velocity);
    }
}

animate();





