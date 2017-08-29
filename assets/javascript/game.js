var twothousandsHipHopArtistArray = [];
var ninetiesHipHopArtistArray = ["Nas", "Warren G", "Wu Tang", "Dr Dre", "Snoop Dogg", "Jay Z", "Ice Cube", "TuPac", "Salt N Pepa", "Notorious BIG"];
var easy = 24;
var medium = 18;
var hard = 12;
var gameMode;
var hangman;
var modeSelector = document.getElementById("game-mode");
var startGame = document.getElementById("start-game");

modeSelector.addEventListener("click",function (event) {
	gameMode = event.target.id;
})

startGame.addEventListener("click",function () {
	if(gameMode === "easy")
		hangman = new Hangman(ninetiesHipHopArtistArray,easy);
	else if (gameMode === "medium")
		hangman = new Hangman(ninetiesHipHopArtistArray,medium);
	else if (gameMode === "hard")
		hangman = new Hangman(ninetiesHipHopArtistArray,hard);
	hangman.isPlayingBoolean = true;
	hangman.artistGenerator();
})

document.onkeyup = function(event) {
	hangman.userGuessTracker(event.key);
}
