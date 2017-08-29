var twothousandsHipHopArtistArray = ["Eminem","Kanye West","50 Cent","Lil Wayne","Fabolous","TPain","Drake","The Game","Fat Joe","Outkast"];
var ninetiesHipHopArtistArray = ["Nas", "Warren G", "Wu Tang", "Dr Dre", "Snoop Dogg", "Jay Z", "Ice Cube", "TuPac", "Salt N Pepa", "Notorious BIG"];
var easy = 27;
var medium = 18;
var hard = 12;
var gameMode;
var gameCategory;
var hangman;
var modeSelector = document.getElementById("game-mode");
var startGame = document.getElementById("start-game");
var categorySelector = document.getElementById("game-category");

modeSelector.addEventListener("click",function (event) {
	gameMode = event.target.id;
})

categorySelector.addEventListener("click",function (event) {
	gameCategory = event.target.id;
})

startGame.addEventListener("click",function () {
	if (!(gameMode === undefined || gameCategory === undefined)){
		if (gameMode === "easy") {
			if (gameCategory === "90")
				hangman = new Hangman(ninetiesHipHopArtistArray,easy);
			else if (gameCategory === "2000")
				hangman = new Hangman(twothousandsHipHopArtistArray,easy);
		}
		else if (gameMode === "medium") {
			if (gameCategory === "90")
				hangman = new Hangman(ninetiesHipHopArtistArray,medium);
			else if (gameCategory === "2000")
				hangman = new Hangman(twothousandsHipHopArtistArray,medium);
		}
		else if (gameMode === "hard") {
			if (gameCategory === "90")
				hangman = new Hangman(ninetiesHipHopArtistArray,hard);
			else if (gameCategory === "2000")
				hangman = new Hangman(twothousandsHipHopArtistArray,hard);
		}
		hangman.isPlayingBoolean = true;
		hangman.artistGenerator();
	}
	else if (gameMode === undefined || gameCategory === undefined) {
		alert("Please select a game mode and a category");
	}
})

document.onkeyup = function(event) {
	if(!(gameMode === undefined || gameCategory === undefined)){
		// Only allow numbers and letters
		if((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90))
			hangman.userGuessTracker(event.key);
	}
	else
		alert("Please select a game mode and a category");
}
