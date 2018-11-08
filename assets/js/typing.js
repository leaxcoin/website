const Typed = require('typed.js');

$(function () {

    new Typed("#typed-main-text", {
        stringsElement: "#typed-main-text-strings",
        typeSpeed: 70,
        backSpeed: 20,
        backDelay: 6000,
        startDelay: 1500,
        loop: true,
        showCursor: false
    });

});