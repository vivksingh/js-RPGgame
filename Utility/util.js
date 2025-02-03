
const Utility = {
    // collision detection
    isColliding({ player, boundary}){
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
    },

    // get collision boundaries
    getCollisionBoundaries(boundaries){
        const collisionMap = []
        for(let i = 0;i<boundaries.length;i+=70){
            collisionMap.push(boundaries.slice(i, i+70));
        }

        // creating boundary objects array
        const collisionBoundaries = [];
        collisionMap.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if(cell === 1025){
                    collisionBoundaries.push(new TriggerTile({
                        position : {
                            x : (cellIndex * TriggerTile.width) + offset.x ,
                            y : (rowIndex * TriggerTile.height) + offset.y
                        }
                    }));
                };
            });
        });

        return collisionBoundaries;
    },

    getImage(path){
        const image = new Image();
        image.src = path;
        return image;
    }
}