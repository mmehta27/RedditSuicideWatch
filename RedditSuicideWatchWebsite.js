var input;

function correctInput() {
	input = document.getElementById("link").value;
	var firstR = input.indexOf("r");
	var secondR = input.indexOf("r", firstR + 1); 

	//If new reddit link, convert to old
	var checkNewRedditCom = input.substring(firstR, secondR + 1);
	if (checkNewRedditCom == "reddit.com/r"){
		input = "old." + input;
	}

	var checkOldRedditCom = input.substring(input.indexOf("o"), secondR + 1);
	//Checks whether correct link was given.
	


	if (checkOldRedditCom == "old.reddit.com/r") {
		document.getElementById("submitButton").href = "results.html";
		test();
	} else {
		invalidInput();
		document.getElementById("submitButton").href = "index.html";
	}
}

function invalidInput() {
	//In the future we can try to make it show alert text so it doesn't need to
	//redirect to a new link.
	alert("Invalid Input!");
}

function submitKeyClicked(keyPressed) {
	//Allows user to use enter key to submit text value.
	if (keyPressed.keyCode === 13) {
		document.getElementById("submitButton").click();
	}
}

function test() {
	//Can remove later, meant to check all the logic was right
	alert(input + " It worked!");
}
