//this is the starting method to case all 80 rays
var castRays = () => {
	var stripIndex = 0;
	//for all 80 rays
    for (var i=0; i < numRays; i++) {
		//gets the position of the ray relative to the player's view (instead of 0 to 80, it's -40 to 40 multiplied by stripWidth of 4 px)
		var rayScreenPos = (-numRays/2 + i) * stripWidth;
		//gets the hypotenuse of the triangle formed (rayScreenPos is the length from the center to the outter edge of the strip's side, viewDist is the distance from the player straight ahead)
		/*
							rayScreenPos
								|
								V				
			----------------.---------.---------------------------- <-- each dash represents a strip
							 \		  |
							  \		  |
							   \	  |
				rayViewDist -->	\	  |
								 \	  | <-- viewDist
								  \	  |
								   \  |
									\ |
									 \|
									  O <-- player
		*/
		var rayViewDist = Math.sqrt(rayScreenPos * rayScreenPos + viewDist*viewDist);
		//calculates the angle between viewDist and rayViewDist
		var rayAngle = Math.asin(rayScreenPos / rayViewDist);
		//calculate the path of rayViewDist to draw the green line representing the ray and also sets the tile to be shown for that ray
        castSingleRay(player.rot + rayAngle, stripIndex++);
    }
}

//for a single ray, set the path of the ray and set the tile to be shown for that ray
var castSingleRay = (rayAngle, stripIndex) => {
	//take the rayAngle and reduce it to be withing 1 circle (ignoring how many full circle rotations it might do)
	rayAngle %= twoPI;
	//make the rayAngle a positive rotation.
    if (rayAngle < 0) {
        rayAngle += twoPI;
	}
	//is the current strip to the right or the left of the player's center
	var right = (rayAngle > twoPI * 0.75 || rayAngle < twoPI * 0.25);
	//are we looking towards the top of the minimap or the bottom
	var up = (rayAngle > Math.PI);
	//get rayscreenPos/rayViewDist and viewDIst/rayViewDist. This will be for calculating the slope of the ray later
	var angleSin = Math.sin(rayAngle), angleCos = Math.cos(rayAngle);
	
	var dist = 0;
	var xHit = 0, yHit = 0;
	var textureX;
	var wallX;
	var wallY;
	var wallType = 0;

	//the code below is done twice from different perspectives
	//calculate what the slope of the ray will be
	var slope = angleSin/angleCos;
	//round the slope, so for every pixel left or right, move dY
	var dX = right ? 1 : -1;
	var dY = dX * slope;

	var x = right ? Math.ceil(player.x): Math.floor(player.x);
	var y = player.y + (x - player.x) * slope;

	while(x>=0 && x<mapWidth && y>=0 && y<mapHeight) {
		wallX = Math.floor(x + (right? 0 : -1));
		wallY = Math.floor(y);

		if (map[wallY][wallX] > 0) {
			var distX = x - player.x;
			var distY = y - player.y;

			dist = distX*distX + distY*distY;

			wallType = map[wallY][wallX]; // we'll remember the type of wall we hit for later
			textureX = y % 1;	// where exactly are we on the wall? textureX is the x coordinate on the texture that we'll use later when texturing the wall.
			if (!right) textureX = 1 - textureX; // if we're looking to the left side of the map, the texture should be reversed

			xHit = x;
			yHit = y;
			break;
		}
		x += dX;
		y += dY;
	}

	var slope = angleCos / angleSin;
	var dY = up ? -1 : 1;
	var dX = dY * slope;
	var y = up ? Math.floor(player.y) : Math.ceil(player.y);
	var x = player.x + (y - player.y) * slope;

	while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
		var wallY = Math.floor(y + (up ? -1 : 0));
		var wallX = Math.floor(x);
		if (map[wallY][wallX] > 0) {
			var distX = x - player.x;
			var distY = y - player.y;
			var blockDist = distX*distX + distY*distY;
			if (!dist || blockDist < dist) {
				dist = blockDist;
				xHit = x;
				yHit = y;
				wallType = map[wallY][wallX];
				textureX = x % 1;
				if (up) textureX = 1 - textureX;
			}
			break;
		}
		x += dX;
		y += dY;
	}

	if(dist) {
		drawRay(xHit, yHit);
		var strip = screenStrips[stripIndex];

		dist = Math.sqrt(dist);

		// use perpendicular distance to adjust for fish eye
		// distorted_dist = correct_dist / cos(relative_angle_of_ray)
		dist = dist * Math.cos(player.rot - rayAngle);

		// now calc the position, height and width of the wall strip

		// "real" wall height in the game world is 1 unit, the distance from the player to the screen is viewDist,
		// thus the height on the screen is equal to wall_height_real * viewDist / dist

		var height = Math.round(viewDist / dist);

		// width is the same, but we have to stretch the texture to a factor of stripWidth to make it fill the strip correctly
		var width = height * stripWidth;

		// top placement is easy since everything is centered on the x-axis, so we simply move
		// it half way down the screen and then half the wall height back up.
		var top = Math.round((screenHeight - height) / 2);

		strip.style.height = height+"px";
		strip.style.top = top+"px";

		strip.img.style.height = Math.floor(height * numTextures) + "px";
		strip.img.style.width = Math.floor(width*2) +"px";
		strip.img.style.top = -Math.floor(height * (wallType-1)) + "px";
        
        // if (textureX == 2)
        // {
        //     strip.style.backgroundColor = "blue";
        // }

		// var texX = Math.round(textureX*width);

		// if (texX > width - stripWidth)
		// 	texX = width - stripWidth;

		// strip.img.style.left = -texX + "px";
	}
}

function drawRay(rayX, rayY) {
	var miniMapObjects = $("minimapobjects");
	var objectCtx = miniMapObjects.getContext("2d");

	objectCtx.strokeStyle = "rgba(0,100,0,0.3)";
	objectCtx.lineWidth = 0.5;
	objectCtx.beginPath();
	objectCtx.moveTo(player.x * miniMapScale, player.y * miniMapScale);
	objectCtx.lineTo(
		rayX * miniMapScale,
		rayY * miniMapScale
	);
	objectCtx.closePath();
	objectCtx.stroke();
}