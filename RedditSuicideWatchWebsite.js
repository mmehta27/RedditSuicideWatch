var input;

function correctInput() {
	input = document.getElementById("link").value;
	var firstR = input.indexOf("r");
	var secondR = input.indexOf("r", firstR + 1); 
	var checkOldRedditCom = input.substring(input.indexOf("o"), secondR + 1);
	if (checkOldRedditCom == "old.reddit.com/r") {
		document.getElementById("submitButton").href = "results.html";
		test();
	} else {
		invalidInput();
		document.getElementById("submitButton").href = "index.html";
	}
}

function invalidInput() {
	alert("Invalid Input!");
}

function submitKeyClicked(keyPressed) {
	if (keyPressed.keyCode === 13) {
		document.getElementById("submitButton").click();
	}
}

function test() {
	alert(input + " It worked!");
}