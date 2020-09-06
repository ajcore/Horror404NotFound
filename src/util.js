var $ = (id) => {
    return document.getElementById(id);
}
var dc = (tag) => { return document.createElement(tag); };

var show = (id) => {
    $(id).style.display = "block";
}

var rand = (i) => {
    return Math.floor(Math.random() * i);
}