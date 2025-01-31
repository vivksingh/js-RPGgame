const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let lastKey = null;
canvas.width = 1024;
canvas.height = 768;

const collisionMap = []
for(let i = 0;i<boundaries.length;i+=70){
    collisionMap.push(boundaries.slice(i, i+70));
}

const image = new Image();
image.src = './img/map.png';
const foregroundImage = new Image();
foregroundImage.src = './img/foreground.png';

const playerDown = new Image();
playerDown.src = './img/playerDown.png';
const playerUp = new Image();
playerUp.src = './img/playerUp.png';
const playerLeft = new Image();
playerLeft.src = './img/playerLeft.png';
const playerRight = new Image();
playerRight.src = './img/playerRight.png';

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
    image : playerDown,
    position : {
        x : canvas.width/2 - 192/2,
        y : canvas.height/2 - 68/2
    },
    velocity : 6,
    frames : {
        max : 4
    },
    sprites : {playerDown, playerUp, playerLeft, playerRight}
});

const foreground = new Sprite({
    image : foregroundImage,
    position : {
        x : offset.x,
        y : offset.y
    },
    velocity : 0,
});

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
    && playerY + playerHeight/2 < boundaryY + boundaryHeight;
}

movables = [background, ...collisionBoundaries, foreground];

function animate(){
    window.requestAnimationFrame(animate);
    //return;
    background.draw();
    //movables.forEach(sprite => sprite.draw());
    
    player.draw();
    foreground.draw();


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
        
        player.image = player.sprites['playerUp'];
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
        
        player.image = player.sprites['playerLeft'];
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
        
        player.image = player.sprites['playerDown'];
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
        
        player.image = player.sprites['playerRight'];
        movables.forEach(sprite => sprite.position.x -= player.velocity);
    }
}

animate();





