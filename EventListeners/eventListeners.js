window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'w' :
        keys.W.pressed = true;
        lastKey = 'w';
        break;

        case 'a' :
        keys.A.pressed = true;
        lastKey = 'a';
        break;

        case 's' :
        keys.S.pressed = true;
        lastKey = 's';
        break;

        case 'd' :
        keys.D.pressed = true;
        lastKey = 'd';
        break;

    };

});

window.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'w' :
        keys.W.pressed = false;
        break;

        case 'a' :
        keys.A.pressed = false;
        break;

        case 's' :
        keys.S.pressed = false;
        break;

        case 'd' :
        keys.D.pressed = false;
        break;

    };
   
});