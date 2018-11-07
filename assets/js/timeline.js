const ScrollBooster = require('scrollbooster');

const viewport = document.querySelector('#timeline');
const content = document.querySelector('#timeline > ul');

let sb = new ScrollBooster({
    viewport,
    content,
    mode: 'x',
    onUpdate: (data)=> {
        viewport.scrollLeft = data.position.x
    }
});

$(document).ready(fixTimelineWidth);
window.addEventListener("orientationchange", () => {
    setTimeout(fixTimelineWidth, 300);
});

function fixTimelineWidth() {
    $("#timeline").width($(window).width());
    var items = $("#timeline > ul > li").length;
    var width = items * 200;
    $("#timeline > ul").width(width);
}