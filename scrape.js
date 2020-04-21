const request = require('request');
const cheerio = require('cheerio');
const jsonData = require('./data');

function getPostText(url, callBack){

// function takes any old reddit url as a parameter

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

/*function cleanText(response) {
    let processed = response.toLowerCase().replace(/[^\w\s]/gi,'');
	console.log(processed)
    return processed;
}*/



//calls function with an example link
//getPostText("https://old.reddit.com/r/AnarchyChess/comments/fpu1oe/i_lost_my_first_chess_game/", logText);

module.exports = {
	getPostText
};
