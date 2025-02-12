window.addEventListener('keydown', (e) => {
    handleKeyPress(e.key, true);
});

window.addEventListener('keyup', (e) => {
    handleKeyPress(e.key, false);
});

// Mobile controls
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('touchstart', (e) => {
        const key = e.target.dataset.key;
        handleKeyPress(key, true);
        e.preventDefault();
    });

    button.addEventListener('touchend', (e) => {
        const key = e.target.dataset.key;
        handleKeyPress(key, false);
        e.preventDefault();
    });
});

function handleKeyPress(key, isPressed) {
    switch (key) {
        case 'w': keys.W.pressed = isPressed; if (isPressed) lastKey = 'w'; break;
        case 'a': keys.A.pressed = isPressed; if (isPressed) lastKey = 'a'; break;
        case 's': keys.S.pressed = isPressed; if (isPressed) lastKey = 's'; break;
        case 'd': keys.D.pressed = isPressed; if (isPressed) lastKey = 'd'; break;
        case 'Enter': keys.Enter.pressed = isPressed; break;
    }
    player.moving = isPressed;
}

