var $ = (id) => {
    return document.getElementById(id);
}
var dc = (tag) => { return document.createElement(tag); };

var show = (id) => {
    $(id).style.display = "block";
}