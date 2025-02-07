

let currentScene = scenes.homeScene;
const player = pb;

// animation loop
function gameLoop(){
    window.requestAnimationFrame(gameLoop);
    currentScene.draw();
    currentScene.checkTrigger();

    transitionManager.update();
    transitionManager.draw(); 


   currentScene.drawTriggers();
   //currentScene.drawBounds();

    // movement handling
    // forward
    const { collisionBoundaries, movables } = currentScene;

    if(keys.W.pressed && lastKey === 'w'){
        for(let i = 0;i<collisionBoundaries.length;i++){
            const boundary = collisionBoundaries[i];

            if(Utility.isColliding({
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
        
        player.image = player.animationFrames['playerUp'];
        movables.forEach(sprite => sprite.position.y += player.velocity);
    }

    // left
    else if(keys.A.pressed && lastKey === 'a'){
        for(let i = 0;i<collisionBoundaries.length;i++){
            const boundary = collisionBoundaries[i];

            if(Utility.isColliding({
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
        
        player.image = player.animationFrames['playerLeft'];
        movables.forEach(sprite => sprite.position.x += player.velocity);
    }

    // down
    else if(keys.S.pressed && lastKey === 's'){
        for(let i = 0;i<collisionBoundaries.length;i++){
            const boundary = collisionBoundaries[i];

            if(Utility.isColliding({
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
        
        player.image = player.animationFrames['playerDown'];
        movables.forEach(sprite => sprite.position.y -= player.velocity);
    }

    // right
    else if(keys.D.pressed && lastKey === 'd'){
        for(let i = 0;i<collisionBoundaries.length;i++){
            const boundary = collisionBoundaries[i];

            if(Utility.isColliding({
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
        
        player.image = player.animationFrames['playerRight'];
        movables.forEach(sprite => sprite.position.x -= player.velocity);
    }
}

gameLoop();





