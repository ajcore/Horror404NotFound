var move = () => {
	var moveStep = player.speed * player.moveSpeed;	// player will move this far along the current direction vector

	player.rot += player.dir * player.rotSpeed * Math.PI / 180; // add rotation if player is rotating (player.dir != 0)

	var newX = player.x + Math.cos(player.rot) * moveStep;	// calculate new player position with simple trigonometry
	var newY = player.y + Math.sin(player.rot) * moveStep;

    if (isBlocking(newX, newY)) {
        return;
    } else {
        player.x = newX; // set new position
        player.y = newY;
    }
}

var isBlocking = (x, y) => {
    if (y<0 || y>=mapHeight || x<0 || x>=mapWidth) {
        return true;
    }
    return (map[Math.floor(y)][Math.floor(x)] !== 0);
}

// bind keyboard events to game functions (movement, etc)
var bindKeys = () => {

	document.onkeydown = (e) => {
		e = e || window.event;
		if(gFlag == 's') {
			if (e.keyCode == 32) {
				gFlag = 'i';
			}
		}
		switch (e.keyCode) { // which key was pressed?

			case 38: // up, move player forward, ie. increase speed
				player.speed = 1;
				break;

			case 40: // down, move player backward, set negative speed
				player.speed = -1;
				break;

			case 37: // left, rotate player left
				player.dir = -1;
				break;

			case 39: // right, rotate player right
				player.dir = 1;
				break;
		}
	}

	document.onkeyup = (e) => {
		e = e || window.event;

		switch (e.keyCode) {
			case 38:
			case 40:
				player.speed = 0;	// stop the player movement when up/down key is released
				break;
			case 37:
			case 39:
				player.dir = 0;
				break;
		}
	}
}