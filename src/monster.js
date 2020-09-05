var initMonster = () => {
    var m = $('monster');
    m.width = 64;
    m.height = 6482;
    var c = m.getContext("2d");
    var g = c.createRadialGradient(32, 32, 20, 32, 32, 32);
    g.addColorStop(0, "black");
    //grd.addColorStop(.5, "black");
    g.addColorStop(1, "white");
    c.fillStyle = g;
    c.fillRect(0, 0, 300, 300);
    c.beginPath();
    c.fillStyle = "red";
    c.moveTo(28, 32);
    c.lineTo(18, 32);
    c.lineTo(18, 27);
    c.lineTo(28, 32);
    c.fill();
    c.beginPath();
    c.fillStyle = "red";
    c.moveTo(36, 32);
    c.lineTo(46, 32);
    c.lineTo(46, 27);
    c.lineTo(36, 32);
    c.fill();
    c.beginPath();
    c.arc(32,32,10,Math.PI/4,Math.PI * 3/4);
    c.arc(32,25,20, Math.PI/4, Math.PI* 3/4);
    c.fill();
}

var renderMonster = () => {
    
}