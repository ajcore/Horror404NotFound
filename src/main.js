 // This is the beginning method
 var init = () => {
  //set the map Width and Height
  mapWidth = map[0].length;
  mapHeight = map.length;
  generateImage();

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
  //update the player character's position
  move();
  //based on the new player position, update it on the minimap
  updateMiniMap();
  //update what the player sees using raycasting
  castRays();
  //recalls the gameCycle 30 times a second
  setTimeout(gameCycle,1000/30);
}

//This splits the screen into 80 vertical strips, it sets the image asset to each of these strips, so that laater it can be referenced, choose the correct tile, then set the size.
function initScreen() {
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

var generateImage = () => {
  var c = $("img");
  c.width = 128;
  c.height = 192;
  var tc = c.getContext("2d");
  tc.beginPath();
  tc.fillStyle="#D4E6B5";
  tc.rect(0,0,64,192);
  tc.fill();
  tc.beginPath();
  tc.fillStyle="#AFC97E";
  tc.rect(64,0,128, 192);
  tc.fill();
  
  for (var i=0; i <=192; i+=8)
  {
    tc.beginPath();
    tc.strokeStyle="#585123";
    tc.moveTo(0 , i);
    tc.lineTo(128, i);
    tc.stroke();
  }  

  tc.beginPath();
  tc.fillStyle="#431B0F";
  tc.rect(12,72,40, 56);
  tc.fill();
  tc.beginPath();
  tc.rect(76,72,40, 56);
  tc.fill();
  tc.beginPath();
  tc.rect(12,136,40, 56);
  tc.fill();
  tc.beginPath();
  tc.rect(76,136,40, 56);
  tc.fill();

  tc.fillStyle="#FFA400";
  tc.font = "8px Arial";
  tc.fillText("404", 26, 84);
  tc.fillText("404", 90, 84);
  tc.fillText("200", 26, 148);
  tc.fillText("200", 90, 148);

  imgUrl = c.toDataURL();
}