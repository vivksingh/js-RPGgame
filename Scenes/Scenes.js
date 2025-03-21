const pb = new Sprite({
    imagePath : '../Assets/playerDown.png',
    position : {
        x : canvas.width/2 - 192/2,
        y : canvas.height/2 - 68/2
    },
    velocity : 16,
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

const witch = new Sprite({
    imagePath : '../Assets/witch.png',
    position : {
        x : 500,
        y : 270
    },
    velocity : 0,
    frames : {
        max : 1
    },
    animationFramePaths : {}

})

const sprite = new Sprite({
    imagePath : '../Assets/vek.png',
    position : {
        x : 700,
        y : 370
    },
    velocity : 0,
    frames : {
        max : 1
    },
    animationFramePaths : {}

})

const vek = new Sprite({
    imagePath : '../Assets/vek.png',
    position : {
        x : 700,
        y : 370
    },
    velocity : 0,
    frames : {
        max : 1
    },
    animationFramePaths : {}

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
        title : 'Vek World',
    
        conversation : Conversations.homeSceneConversation,    
    
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
        title : "Village House",
        triggerTiles : TriggerTileMap.ownHomeSceneTriggerTiles

    }),

    forestScene : new Scene({
        offset : offsets.forestSceneOffset,
        player : pb,

        background : new Sprite({
            position : {
                x: offsets.forestSceneOffset.x,
                y: offsets.forestSceneOffset.y
            },
            velocity : 0,
            imagePath : '../Assets/forestMap.png'
        }),

        foreground : new Sprite({
            imagePath : './Assets/forestMapForeground.png',
            position : {
                x : offsets.forestSceneOffset.x,
                y : offsets.forestSceneOffset.y
            },
            velocity : 0,
        }),

        title : "Forest of Frantic Feelings",
        conversation : Conversations.forestSceneConversation,
        collisionBoundariesMap : Boundary.forestSceneBoundaries,
        triggerTiles : TriggerTileMap.forestSceneTriggerTiles
    }),

    witchVillageScene : new Scene({
        offset : offsets.witchVillageSceneOffset,
        player : pb,
        background : new Sprite({
            position : {
                x: offsets.witchVillageSceneOffset.x,
                y: offsets.witchVillageSceneOffset.y
            },
            velocity : 0,
            imagePath : './Assets/witchVillageMap.png'
        }),
        title : "Witch Village",

        foreground : new Sprite({
            imagePath : './Assets/witchVillageForeground.png',
            position : {
                x : offsets.witchVillageSceneOffset.x,
                y : offsets.witchVillageSceneOffset.y
            },
            velocity : 0,
        }),
        conversation : Conversations.witchVillageSceneConversation,
        collisionBoundariesMap : Boundary.witchVillageSceneBoundaries,
        triggerTiles : TriggerTileMap.witchVillageSceneTriggerTiles
    }),

    witchVillageHouseScene : new Scene({
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
        title : " Witch Village House",
        triggerTiles : TriggerTileMap.witchVillageHouseSceneTriggerTiles
    
    }),

    finalScene : new Scene({
        offset : offsets.finalSceneOffset,
        player : pb,

        background : new Sprite({
            position : {
                x: offsets.finalSceneOffset.x,
                y: offsets.finalSceneOffset.y
            },
            velocity : 0,
            imagePath : '../Assets/FinalMap.png'
        }),
        
        conversation : Conversations.finalSceneConversation,
        title : "Please Press Enter to Continue",
        collisionBoundariesMap : Boundary.finalSceneBoundaries,
        triggerTiles : TriggerTileMap.finalSceneTriggerTiles
    }),

    endingScene : new Scene({
        background : new Sprite({
            position : {
                x: 0,
                y: 0
            },
            velocity : 0,
            imagePath : '../Assets/endingScene.png'
        }),

        title : "Thank You For Playing",
        collisionBoundariesMap : [],
        triggerTiles : [],
    })
}

