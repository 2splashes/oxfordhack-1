var gifTerms = [
    'cats',
    'dogs',
    'bunnies',
    'kids'
];

module.exports = {
    getGIFKeyword: function () {
        return gifTerms[Math.floor(Math.random() * gifTerms.length)];
    }
};