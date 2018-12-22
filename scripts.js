


/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
/*
function dropdown() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
*/

window.onscroll = function() {menuScroll()};
function menuScroll(){
    if (document.body.scrollTop > 75 || document.documentElement.scrollTop > 75) {
        document.getElementById("topnav").className = "test";
        var x = document.getElementById("topnav");
        var y = x.getElementsByTagName("a");
        for (var i = 0; i < y.length; i++) {
            y[i].style.fontWeight = "600";
        }

        }else {
        document.getElementById("topnav").className = "test1";
        var x = document.getElementById("topnav");
        var y = x.getElementsByTagName("a");
        var i;
        for (i = 0; i < y.length; i++) {
            y[i].style.fontWeight = "600";
        }

        }
    }
