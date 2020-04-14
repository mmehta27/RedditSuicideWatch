var variableName = require("./data");
var dataJson = variableName.data;

function counter(postText){ 

    var arr = postText.split(" "); 
    var freq = {}; // dictionary from clusterNumber to frequency in postText (output)
    
    for (wordindex =0; wordindex < arr.length; wordindex++) {
        word = arr[wordindex]
        for (var clusterNum in dataJson){
            for (pairIndex=0; pairIndex <  dataJson[clusterNum].word_list.length; pairIndex ++){
                var pair = dataJson[clusterNum].word_list[pairIndex]
                if (word == pair[0]){
                    if (clusterNum in freq){
                        freq[clusterNum] +=1;
                    } else {
                        freq[clusterNum] = 1;
                    }
                }
            }
        }
    }
    return freq 
};


//example

//var postText = "I feel betrayed by my friends and family and I am tired of feeling this way";
//var freq = counter(postText);
//for (var clusterNum in freq) {
//    console.log(clusterNum, freq[clusterNum]);
//}