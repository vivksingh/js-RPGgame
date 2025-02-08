

const transitionManager = new TransitionManager();


let paused = false;
let currentScene = scenes.homeScene;
const player = pb;
const message = new MessageBox({
    text: "Hello, World!",
    author : authorMap.vek
})


// animation loop
function gameLoop(){
    window.requestAnimationFrame(gameLoop);
    currentScene.draw();
    currentScene.checkTrigger();
    //currentScene.drawTriggers();
    //currentScene.drawBounds();


    transitionManager.update();


   

    // movement handling
    // forward
    const { collisionBoundaries, movables, triggerTiles } = currentScene;

    if(keys.W.pressed && lastKey === 'w' && !paused){
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
    else if(keys.A.pressed && lastKey === 'a' && !paused){
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
    else if(keys.S.pressed && lastKey === 's' && !paused){
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
    else if(keys.D.pressed && lastKey === 'd' && !paused){
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

    else if (!currentScene.conversations.alreadyDisplayed) {
        for (let i = 0; i < triggerTiles.length; i++) {
            const tile = triggerTiles[i];
    
            if (Utility.isColliding({ player: player, boundary: tile }) && keys.Enter.pressed) {
                if (currentScene.conversationIndex < currentScene.conversations.conversation.length - 1) {
                    currentScene.conversationIndex++; // Safe to increment
                } else {
                    currentScene.conversations.alreadyDisplayed = true; // Mark as done
                }
                keys.Enter.pressed = false; // Reset key press
                break;
            }
        }
    }

    
}

gameLoop();





