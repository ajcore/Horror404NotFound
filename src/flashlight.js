var off = false;
var flicker = () => {
    if (off) {
        $("flashlight").classList.remove("blackout");
    }
    if(Math.ceil(Math.random() * 20) == 1) {
        $("flashlight").classList.add("blackout");
        off = true;
    }   
}