const available = [
    'en', 
    'pt-br'
];

const sections = [
    'main', 
    'contributors',
    'countries'
];

const data = {};

available.forEach(lang => {
    data[lang] = {};
    sections.forEach(section => {
        data[lang][section] = require(`./${lang}/${section}.json`);
    });
});

module.exports = data;