
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
        

        const res = playerX + playerWidth > boundaryX
        && playerX < boundaryX + boundaryWidth
        && playerY + playerHeight > boundaryY
        && playerY + playerHeight/2 < boundaryY + boundaryHeight;
        
        
        return res;
    },

    // get collision boundaries
    getCollisionBoundaries(boundaries, offset){
        const collisionMap = []
        for(let i = 0;i<boundaries.length;i+=70){
            collisionMap.push(boundaries.slice(i, i+70));
        }

        // creating boundary objects array
        const collisionBoundaries = [];
        collisionMap.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if(cell in TileToMethodMap){
                    collisionBoundaries.push(new TriggerTile({
                        position : {
                            x : (cellIndex * TriggerTile.width) + offset.x ,
                            y : (rowIndex * TriggerTile.height) + offset.y
                        }, 
                        onTrigger : TileToMethodMap[cell]
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
    },

    //Function to Draw Rounded Rectangles
    drawRoundedRect({ x, y, width, height, radius = 10, fillColor, strokeColor }) {
    c.fillStyle = fillColor;
    c.beginPath();

    // Top-left corner
    c.moveTo(x + radius, y);
    c.lineTo(x + width - radius, y);
    c.quadraticCurveTo(x + width, y, x + width, y + radius);

    // Top-right corner
    c.lineTo(x + width, y + height - radius);
    c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);

    // Bottom-right corner
    c.lineTo(x + radius, y + height);
    c.quadraticCurveTo(x, y + height, x, y + height - radius);

    // Bottom-left corner
    c.lineTo(x, y + radius);
    c.quadraticCurveTo(x, y, x + radius, y);

    c.closePath();
    c.fill();

    // Stroke border if specified
    if (strokeColor) {
        c.strokeStyle = strokeColor;
        c.lineWidth = 2;
        c.stroke();
    }
    },
    
    
}