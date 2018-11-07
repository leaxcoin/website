const OFFSET = 77;

$(function () {
    $(window).on('scroll', showOrHideNavbar);
    showOrHideNavbar();
});

function showOrHideNavbar() {
    var offset = $(window).scrollTop();
    if(offset > OFFSET) {
        showFixedNav()
    } else {
        hideFixedNav();
    }
}

function showFixedNav () {
    $("#main-nav").addClass('fixed-top');
    $("body").addClass('navbar-fixed-top');
}

function hideFixedNav () {
    $("#main-nav").removeClass('fixed-top');
    $("body").removeClass('navbar-fixed-top');
}