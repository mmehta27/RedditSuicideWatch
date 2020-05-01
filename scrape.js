const request = require('request');
const cheerio = require('cheerio');
const jsonData = require('./data');

function getPostText(url, callBack){
    request(url, (error,
    response, html) => {
        if(!error && response.statusCode == 200) // ensure successful http response
        { 
            const $ = cheerio.load(html);

            const postText = $('.expando'); // selects postText which is under div class "expando"
            //console.log(postText.text()); // strips out html
			return callBack(postText.text());
        }
    })
};

module.exports = {
	getPostText
};
