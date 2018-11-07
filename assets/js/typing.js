const Typed = require('typed.js');

$(function () {

    new Typed("#typed-main-text", {
        strings: [
            "A New Currency. <br><strong>The Real Estate <br>Evolution.</strong>", 
            "The Evolution Of The <br> Real Estate.<br><strong>A New Currency.</strong>", 
        ],
        typeSpeed: 70,
        backSpeed: 20,
        backDelay: 6000,
        startDelay: 1500,
        loop: true,
        showCursor: false
    });

});