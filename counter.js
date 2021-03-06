var clusterData = require("./data");
var scrape = require("./scrape.js");
var dataJson = clusterData.data;
var stopWords = clusterData.stopWords;
function test() {
	console.log("Hello")
}
function count(postText) {
	var postTextArray = removeStopWords(postText);
	var trigram = countTrigram(postTextArray);
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
	console.log(data[0].clusterNumber)
    //printData(); 
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

function countTrigram(arr){
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
    let processed = response.toLowerCase().replace(/[^\w\s]/gi,'').trim();
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
function removeStopWords(postText) {
	var arr = postText.split(" ");
	for (var index = 0; index < stopWords.length; index++) {
		for (var word in arr) {
			if (arr[word] === stopWords[index]) {
				arr.splice(word, 1);
			}
		}
	}
	return arr;
}

var data = [];
//var url = 'https://old.reddit.com/r/SuicideWatch/comments/g54p20/killing_myself_is_a_permanent_solution_to_a/';
//var postText = scrape.getPostText(url, cleanText);
postText = "I only want my close friends and family members to remember me... Not people I haven't talked to in a year or so... It's offensive to me. You could have talked to me and you could have cared, but untill I take my own life, you suddenly care and miss me... I don't mean to offend anyone on this post...";
count(postText)
clusterData.stripUnderscore(dataJson);





