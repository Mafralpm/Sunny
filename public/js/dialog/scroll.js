$(document).ready(function() {
    var height = document.querySelector("body").offsetHeight;
    document.querySelector("#scroll-fixed").style.height = (height - 250) + "px";
    // limit-overflow
});

function scroll() {
    var objDiv = document.getElementById("scroll-fixed");
    objDiv.scrollTop = objDiv.scrollHeight;
}