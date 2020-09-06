 // This is the beginning method
 var init = () => {
  //set the map Width and Height
  mapWidth = map[0].length;
  mapHeight = map.length;
  generateImage();
  setDoor();
  //start listening for user input
  bindKeys();

  //initialize the different walls
  initScreen();

  //draw the walls of the map
  drawMiniMap();

  //start the game
  gameCycle();
}


//recursively updates game 30 times every second
var gameCycle = () => {
  timer += 1;
  if (gFlag == 'i') {
    start();
    //update the player character's position
    move();
    //based on the new player position, update it on the minimap
    updateMiniMap();
    flicker();
    //update what the player sees using raycasting
    castRays();
    playMusic();
  }
  //recalls the gameCycle 30 times a second
  setTimeout(gameCycle,1000/30);
}

//This splits the screen into 80 vertical strips, it sets the image asset to each of these strips, so that laater it can be referenced, choose the correct tile, then set the size.
var initScreen = () => {
  //get the game screen
  var screen = $("screen");
  //for each of the 80 (4 pixel wide) strips, set the image. It's 4 pixels wide because that's how far apart each ray in the raycasting is.
  for (var i=0;i<screenWidth;i+=stripWidth) {
      //create a new div that will represent a strip left to right.
      var strip = dc("div");
      //set the strips position, width and height
      strip.style.position = "absolute";
      strip.style.left = i + "px";
      strip.style.width = stripWidth+"px";
      strip.style.height = "0px";
      strip.style.overflow = "hidden";
      //if the image doesn't load, it will be blue.
      strip.style.backgroundColor = "grey";
      //add the image to each strip, so it can reference it to set the correct tile.
      var img = new Image();
      img.src = imgUrl;
      img.style.position = "absolute";
      img.style.left = "0px";

      strip.appendChild(img);
      strip.img = img;	// assign the image to a property on the strip element so we have easy access to the image later

      //add strip to array and then add it as a child to the screen div. Adding it to the array for easy access.
      screenStrips.push(strip);
      screen.appendChild(strip);
  }
}

var setDoor = () => {
  var x = map.length;
  var y = map[0].length;
  while(true) {
    x200 = Math.ceil(Math.random() * x);
    y200 = Math.ceil(Math.random() * y);
    console.log(x200 + " " + y200);
    if(map[x200][y200] == 2) {
      map[x200][y200] = 3;
      break;
    }
  }
}

