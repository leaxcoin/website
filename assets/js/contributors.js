const Raphael = require("raphael");
const svg = require("./svg/map.json").svg;
var contributors = [];
var countries = [];
var mapCircles = [];
var selectedContributor = null;
var paper;
var mainLayer;
var DATA = {};

$(init);

function init () {

    getData()
        .then(() => {
            contributors = DATA.contributors;
            countries = DATA.countries;

            createMap();

            setCountriesDropdown();
            setCountryClickListener()

            $("#prev-contributor").on('click', prevContributor);
            $("#next-contributor").on('click', nextContributor);

            updateContributorBox(contributors[0]);
            updateNextPrevButtonsState(0);
        });
}

function createMap() {
    paper = Raphael('map');
    paper.setViewBox(0,0,1114,665,true);
    paper.setSize('100%', '100%');

    mainLayer = paper.set();
    var map = paper.path(svg);

    mainLayer.attr({'id': 'mainLayer','name': 'mainLayer'});

    map.attr({
            'class': 'map',
            'parent': 'mainLayer',
            'stroke-width': '0',
            'stroke-opacity': '1'
        })
        .data('id', 'map');
    
    mainLayer.push(map);

    createCircles();
}

function createCircles() {
    contributors.forEach((contributor, key) => {
        var mapCircle = paper.circle(contributor.pos.x, contributor.pos.y, 5);
        mapCircle.attr({
            'class': `circle ${(key == 0)? 'active' : ''}`,
            'parent': 'mainLayer',
            'stroke-width': '0'
        })
        .data('id', `circle_${key}`)
        .click(onCircleClick.bind(null, contributor))
    
        mainLayer.push(mapCircle);
        mapCircles.push(mapCircle);
    });
}

function removeCircles () {
    mainLayer.forEach(item => {
        if(item.type == "circle") {
            item[0].remove();
        }
    });
    mapCircles = [];
}

function onCircleClick (contributor, evt) {
    setCircleActive(evt.target);
    updateContributorBox(contributor);
}

function setCircleActive(target) {
    mapCircles.forEach(circle => {
        $(circle.node).removeClass('active');
    });
    $(target).addClass('active');
}

function setCountriesDropdown() {
    var selected = countries[0];
    var dropdownItems = countries.map((country, key) => {
        return $(`<a class="dropdown-item" key="${key}" href="#"><span class="flag-icon flag-icon-${country.id}"></span> ${country.name}</a>`);
    });

    $("#countries-dropdown").find(".dropdown-menu").html(dropdownItems);

    setSelectedCountry(selected);
}

function setCountryClickListener() {
    $("#countries-dropdown").find(".dropdown-menu a").on('click', function (e) {
        e.preventDefault();
        var key = $(this).attr("key");
        onCountrySelected(countries[key]);
    });
}

function onCountrySelected(country) {
    setSelectedCountry(country);
    contributors = DATA.contributors.filter(contributor => {
        return !country.id || country.id == contributor.country;
    });
    removeCircles();
    createCircles();
    updateContributorBox(contributors[0]);
    updateNextPrevButtonsState(0);
}

function clearMap(paper){
    var paperDom = paper.canvas;
    paperDom.parentNode.removeChild(paperDom);
}

function setSelectedCountry(country) {
    $("#countries-dropdown").find(".dropdown-toggle").html(`<span class="flag-icon flag-icon-${country.id}"></span> ${country.name}`);
}

function updateContributorBox(contributor) {
    selectedContributor = contributor;
    $("#contributor-box img").attr("src", contributor.avatar);
    $("#contributor-box h5 span").text(contributor.name);
    $("#contributor-box h5 small").text(contributor.jobRole);
    $("#contributor-box p").text(contributor.description);
    $("#contributor-box .flag-icon").attr('class', function(i, c) {
        return c.replace(/(^|\s)flag-icon-\S+/g, ` flag-icon-${contributor.country}`);
    });

    if (contributor.twitter) {
        $("#contributor-box .link-twitter").attr("href", contributor.twitter).show();
    } else {
        $("#contributor-box .link-twitter").hide();
    }

    if (contributor.telegram) {
        $("#contributor-box .link-telegram").attr("href", contributor.telegram).show();
    } else {
        $("#contributor-box .link-telegram").hide();
    }
}

function prevContributor () {
    var {contributor, index} = getNextOrPrevContributor(-1);
    updateContributorBox(contributor);
    setCircleActive(mapCircles[index][0]);
    updateNextPrevButtonsState(index);
}

function nextContributor () {
    var {contributor, index} = getNextOrPrevContributor(1);
    updateContributorBox(contributor);
    setCircleActive(mapCircles[index][0]);
    updateNextPrevButtonsState(index);
}

function getNextOrPrevContributor (position) {
    var index = contributors.indexOf(selectedContributor) + position;
    index = contributors[index]? index : 0;
    return {
        contributor: contributors[index],
        index
    };
}

function updateNextPrevButtonsState (index) {
    if((index+1) >= contributors.length) {
        $("#next-contributor").addClass('disabled');
    } else {
        $("#next-contributor").removeClass('disabled');
    }
    if(index == 0) {
        $("#prev-contributor").addClass('disabled');
    } else {
        $("#prev-contributor").removeClass('disabled');
    }
}

function getData() {
    return $.get('/data').then(res => {
        DATA = res;
    }, err => {
        console.error(err);
    });
}