const homeScene = new Scene({
    // creating a background sprite
    background : new Sprite({
        position : {
            x: offset.x,
            y: offset.y
        },
        velocity : 0,
        imagePath : '../Assets/map.png'
    }),

    // creating a player sprite
    player : new Sprite({
        imagePath : '../Assets/playerDown.png',
        position : {
            x : canvas.width/2 - 192/2,
            y : canvas.height/2 - 68/2
        },
        velocity : 10,
        frames : {
            max : 4
        },
        animationFramePaths : {
            playerDown : '../Assets/playerDown.png',
            playerUp : '../Assets/playerUp.png',
            playerLeft : '../Assets/playerLeft.png',
            playerRight : '../Assets/playerRight.png'
        }
    }),

    // creating a foreground sprite
    foreground : new Sprite({
        imagePath : './Assets/foreground.png',
        position : {
            x : offset.x,
            y : offset.y
        },
        velocity : 0,
    }),

    // creating a collision boundaries map
    collisionBoundariesMap : Boundary.homeSceneBoundaries,
})
