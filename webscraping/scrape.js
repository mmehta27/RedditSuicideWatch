const request = require('request');
const cheerio = require('cheerio');

function getPostText(url){

// function takes any old reddit url as a parameter

    request(url, (error,
    response, html) => {
        if(!error && response.statusCode == 200) // ensure successful http response
        { 
            const $ = cheerio.load(html);

            const postText = $('.expando'); // selects postText which is under div class "expando"
            console.log(postText.text()); // strips out html
        }
    })
};

//calls function with an example link
getPostText('https://old.reddit.com/r/SuicideWatch/comments/fjjtc5/my_life_has_gone_to_shit/');