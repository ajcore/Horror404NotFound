var off = false;
var flash = 100;
var flicker = () => {
    if (off) {
        $("flashlight").classList.remove("blackout");
        off = false;
    }
    if(Math.ceil(Math.random() * flash) == 1) {
        $("flashlight").classList.add("blackout");
        playSound("flashlight");
        off = true;
        if (flash > 1) {
            flash--;
        }
        if (flash == 1) {
            show("lose");
            gFlag = 'e';
        }
    }   
}

var fCounter = () => {
    var d = $("ui");
    d.innerHTML = '';
    d.append(flash + '%');
}