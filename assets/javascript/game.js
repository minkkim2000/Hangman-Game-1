var gameMode;
var gameCategory;
var hangman;
var easy = 27;
var medium = 18;
var hard = 12;
var hipHop2k = "assets/images/2000HipHop.jpg"
var hipHop90s = "assets/images/Back to 90s.jpg"
var twothousandsHipHopArtistArray = ["Eminem","Kanye West","50 Cent","Lil Wayne","Fabolous","TPain","nelly","The Game","Fat Joe","Outkast"];
var ninetiesHipHopArtistArray = ["Nas", "Aaliyah", "Warren G", "Dr Dre", "Snoop Dogg", "Jay Z", "Ice Cube", "TuPac", "Salt N Pepa", "Notorious BIG"];
var modeSelector = document.getElementById("game-mode");
var startGame = document.getElementById("start-game");
var categorySelector = document.getElementById("game-category");
var gameModeSelector = document.getElementById("game-mode");
var gameModeButton = gameModeSelector.getElementsByTagName("button");
var gameCategorySelector = document.getElementById("game-category");
var gameCategoryButton = gameCategorySelector.getElementsByTagName("button");
var imgSelector = document.getElementById("artist-img");


modeSelector.addEventListener("click",function (event) {
	gameMode = event.target.id;
})

categorySelector.addEventListener("click",function (event) {
	gameCategory = event.target.id;
})

startGame.addEventListener("click",function () {
	hangman = null;
	removeElements();
	if (!(gameMode === undefined || gameCategory === undefined)){
		if(gameCategory === "90") {
			if (gameMode === "easy")
				hangman = new Hangman(ninetiesHipHopArtistArray,easy);
			else if (gameMode === "medium") 
				hangman = new Hangman(ninetiesHipHopArtistArray,medium);
			else if (gameMode === "hard") 
				hangman = new Hangman(ninetiesHipHopArtistArray,hard);
			fade(hipHop90s);
		}
		else if (gameCategory === "2000") {
			if (gameMode === "easy") 
				hangman = new Hangman(twothousandsHipHopArtistArray,easy);
			else if (gameMode === "medium") 
				hangman = new Hangman(twothousandsHipHopArtistArray,medium);
			else if (gameMode === "hard") 
				hangman = new Hangman(twothousandsHipHopArtistArray,hard);
			fade(hipHop2k);
		}
		hangman.isPlayingBoolean = true;
		hangman.artistGenerator();
	}
	else if (gameMode === undefined || gameCategory === undefined)
		alert("Please select a game mode and a category");
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

gameModeSelector.addEventListener("click", function (event) {
	selectButton(event, gameModeButton);
});

gameCategorySelector.addEventListener("click", function (event) {
	selectButton(event, gameCategoryButton);
});

function selectButton (event, button) {
	for (var i = 0; i < button.length; i++) {
		button[i].classList.remove("active");
	}
	event.target.classList.add("active");
}

function removeElements() {
	var wins = document.getElementById("wins");
	var artistNameGuess = document.getElementById("hangman-ul");
	var guesses = document.getElementById("guesses");
	var guessed = document.getElementById("already-guessed");
	var artistName = document.getElementById("artist-name");
	var artistSongName = document.getElementById("song-name");
	
	wins.innerHTML = "";
	artistName.innerHTML = "";
	guesses.innerHTML = "";
	guessed.innerHTML = "";
	artistName.innerHTML = "";
	artistSongName.innerHTML = "";
}

function fade (path) {
	imgSelector.classList.add("fade");
	setTimeout(function () {
		imgSelector.classList.remove("fade");
    imgSelector.src=path;
  },1000);
}