var input;
function correctInput() {
	input = document.getElementById("link").value;
	var checkOldRedditCom = input.substring(input.indexOf("o"), (input.indexOf("m") + 1));
	if (checkOldRedditCom == "old.reddit.com") {
		document.getElementById("submitButton").href = "results.html";
		test();
	} else {
		document.getElementById("submitButton").href = "index.html";
	}
}

function submitKeyClicked(keyPressed) {
	if (keyPressed.keyCode === 13) {
		document.getElementById("submitButton").click();
	}
}

function test() {
	alert(input + " It worked!");
}