var clusterData = require("./data");
var scrape = require("./scrape.js");
var dataJson = clusterData.data;

function count(postText) {
	console.log(postText);
	var trigram = countTrigram(postText);
	// console.log(trigram.frequency, trigram.arrayText);
	var bigram = countBigram(trigram.arrayText);
	// console.log(bigram.frequency, bigram.arrayText);
	var arrText = bigram.arrayText;
	if (arrText.length != 0) {
		for (var clusterNum in dataJson){
			for (pairIndex = 0; pairIndex <  dataJson[clusterNum].word_list.length; pairIndex++){
				var pair = dataJson[clusterNum].word_list[pairIndex]
				if ((pair[0].includes(" ")) == false){
					for (wordindex = 0; wordindex < arrText.length; wordindex++) {
						if (arrText[wordindex] === pair[0]) {
							createJson(pair[0], clusterNum);
						}
					}
				}
			}
		}
	}
    printData(); 
}
function countBigram(arr){
	for (var clusterNum in dataJson){
		for (pairIndex = 0; pairIndex <  dataJson[clusterNum].word_list.length; pairIndex++){
			var pair = dataJson[clusterNum].word_list[pairIndex]
			if ((pair[0].includes(" "))){
				var firstSpace = pair[0].indexOf(" ");
				var secondSpace = pair[0].indexOf(" ", firstSpace + 1);
				if (secondSpace == -1) {
					for (index = 1; index < arr.length; index++) {
						var wordArray = arr[index - 1] + " " + arr[index];
						if (wordArray === pair[0]) {
							createJson(pair[0], clusterNum);
							arr.splice(index - 1, 2);
						}
					}
				}
			}
		}
	}
	return {
		arrayText: arr
	};
}

function countTrigram(postText){
	var arr = postText.split(" ");
	var freq = { };
	for (var clusterNum in dataJson){
		for (pairIndex = 0; pairIndex <  dataJson[clusterNum].word_list.length; pairIndex++){
			var pair = dataJson[clusterNum].word_list[pairIndex]
			if ((pair[0].includes(" "))){
				var firstSpace = pair[0].indexOf(" ");
				var secondSpace = pair[0].indexOf(" ", firstSpace + 1);
				if (secondSpace != -1) {
					for (index = 2; index < arr.length; index++) {
						var wordArray = arr[index - 2] + " " + arr[index - 1] + " " + arr[index];
						if (wordArray === pair[0]) {
							createJson(pair[0], clusterNum);
							arr.splice(index - 2, 3);
						}
					}
				}
			}
		}
	}
	return {
		arrayText: arr
	};
}
function cleanText(response) {
    let processed = response.toLowerCase().replace(/[^\w\s]/gi,'');
    count(processed);
}
function createJson(word, clusterNum) {
	if (data.length == 0) {
		var cluster = {"clusterNumber": clusterNum, "words": [[word, 1]]};
		data.push(cluster);
	} else {
		for (var index in data) {
			if (data[index].clusterNumber == clusterNum) {
				for (var pairIndex in data[index].words) {
					if (data[index].words[pairIndex][0] === word) {
						data[index].words[pairIndex][1] += 1;
						return;
					}
				}
				data[index].words.push([word, 1]);
				return;
			}
		}
		var cluster = {"clusterNumber": clusterNum, "words": [[word, 1]]};
		data.push(cluster);
	}
}
function printData() {
	for (var index in data) {
		console.log(data[index]);
	}
}

var data = [];
var url = 'https://old.reddit.com/r/SuicideWatch/comments/g4rqbp/hi_i_love_you_all/';
scrape.getPostText(url, cleanText);
clusterData.stripUnderscore(dataJson);
