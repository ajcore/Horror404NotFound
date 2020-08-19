var init = () => {
  ctx = $("game").getContext("2d");
  ctx.moveTo(0,0);
  ctx.lineTo(800,600);
  ctx.stroke();
  door(100,100, "404", "30px Arial");
  
}