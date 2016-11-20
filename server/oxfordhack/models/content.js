var images = [
    'https://unsplash.com/?photo=KvD36NRFjl4',
    'https://unsplash.com/?photo=1Rm9GLHV0UA',
    'https://unsplash.com/?photo=YadCgbsLHcE',
    'https://unsplash.com/?photo=uwQlgl4NbSg',
    'https://unsplash.com/?photo=Z87Vi9zHlRA',
    'https://unsplash.com/?photo=qkEdBIOwT8E',
    'https://unsplash.com/?photo=rem9J638fPs',
    'https://unsplash.com/?photo=-HPhkZcJQNk',
    'https://unsplash.com/?photo=VGOiY1gZZYg',
    'https://unsplash.com/?photo=L4iI59WB4Yw',
    'https://unsplash.com/?photo=YeH5EIRFCIs',
    'https://unsplash.com/?photo=rxbVhOrHnpk',
    'https://unsplash.com/?photo=9O1oQ9SzQZQ',
    'https://unsplash.com/?photo=czVtGYACOMg',
    'https://unsplash.com/?photo=kEXSg0okRGc'
];

var gifTerms = [
    'cats',
    'dogs',
    'bunnies',
    'kids'
];

module.exports = {
    getGIFKeyword: function () {
        return gifTerms[Math.floor(Math.random() * gifTerms.length)];
    },
    getImage: function () {
        return images[Math.floor(Math.random() * images.length)];
    }
};