const pb = new Sprite({
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
})

const scenes = {
    homeScene : new Scene({
        offset : offsets.homeSceneOffset,
    
        // creating a background sprite
        background : new Sprite({
            position : {
                x: offsets.homeSceneOffset.x,
                y: offsets.homeSceneOffset.y
            },
            velocity : 0,
            imagePath : '../Assets/map.png'
        }),
    
        // creating a player sprite
        player : pb,
    
        // creating a foreground sprite
        foreground : new Sprite({
            imagePath : './Assets/foreground.png',
            position : {
                x : offsets.homeSceneOffset.x,
                y : offsets.homeSceneOffset.y
            },
            velocity : 0,
        }),
    
        conversation : [],
    
        triggerTiles : TriggerTileMap.homeSceneTriggerTiles,
    
        // creating a collision boundaries map
        collisionBoundariesMap : Boundary.homeSceneBoundaries,
    
    }),

    ownHomeScene : new Scene({
        offset : offsets.ownHomeSceneOffset,
        player : pb,

        background : new Sprite({
            position : {
                x: offsets.ownHomeSceneOffset.x,
                y: offsets.ownHomeSceneOffset.y
            },
            velocity : 0,
            imagePath : '../Assets/ownHomeMap.png'
        }),

        collisionBoundariesMap : Boundary.ownHomeSceneBoundaries,

        triggerTiles : TriggerTileMap.ownHomeSceneTriggerTiles

    })
}

