// Identifies game mode (easy, medium, hard)
var gameMode;
// Identifies era (90s or 2000s)
var gameCategory;
// Variable used to create a new instance of the hangman object
var hangman;
// Number of guesses based on mode (easy, medium and hard)
var easy = 27;
var medium = 18;
var hard = 12;
// File path for images
var hipHop2k = "assets/images/2000HipHop.jpg"
var hipHop90s = "assets/images/Back to 90s.jpg"
// Array of available artists
var twothousandsHipHopArtistArray = ["Eminem","Kanye West","50 Cent","Lil Wayne","Fabolous","TPain","nelly","The Game","Fat Joe","Outkast"];
var ninetiesHipHopArtistArray = ["Nas", "Aaliyah", "Warren G", "Dr Dre", "Snoop Dogg", "Jay Z", "Ice Cube", "TuPac", "Puff Daddy", "Notorious BIG"];
// DOM selectors
var modeSelector = document.getElementById("game-mode");
var startGame = document.getElementById("start-game");
var categorySelector = document.getElementById("game-category");
var gameModeSelector = document.getElementById("game-mode");
var gameModeButton = gameModeSelector.getElementsByTagName("button");
var gameCategorySelector = document.getElementById("game-category");
var gameCategoryButton = gameCategorySelector.getElementsByTagName("button");
var imgSelector = document.getElementById("artist-img");

// Event listener for game difficulty
modeSelector.addEventListener("click",function (event) {
	gameMode = event.target.id;
})

// Event listener for era (90's or 2000's)
categorySelector.addEventListener("click",function (event) {
	gameCategory = event.target.id;
})

// Event listener to start game
startGame.addEventListener("click",function () {
	// Remove previous instance of hangman object
	hangman = null;
	// Remove any existing elements created through javascript
	removeElements();
	// Make sure a game difficulty and era selected
	if (!(gameMode === undefined || gameCategory === undefined)){
		// Depending on choice create new instance of hangman object and pass variables through 
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
		// Set state of the game to true (playing)
		hangman.isPlayingBoolean = true;
		// Run the artist generator
		hangman.artistGenerator();
	}
	// Notify user to select a mode if they didn't
	else if (gameMode === undefined || gameCategory === undefined)
		alert("Please choose a difficulty and pick an era");
})

// Event listener for any key presses that are letters or numbers
document.onkeyup = function(event) {
	if(!(gameMode === undefined || gameCategory === undefined)){
		// Only allow numbers and letters
		if((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90))
			hangman.userGuessTracker(event.key);
	}
	else {
		if((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90))
			alert("Please choose a difficulty and pick an era");
	}
}

// Event listener to keep buttons highlighted when clicking away
gameModeSelector.addEventListener("click", function (event) {
	selectButton(event, gameModeButton);
});

// Event listener to keep buttons highlighted when clicking away
gameCategorySelector.addEventListener("click", function (event) {
	selectButton(event, gameCategoryButton);
});

// Function to keep button highlighted
function selectButton (event, button) {
	for (var i = 0; i < button.length; i++) {
		button[i].classList.remove("active");
	}
	event.target.classList.add("active");
}

// Function to remove elements created by javascript
function removeElements() {
	var wins = document.getElementById("wins");
	var artistNameGuess = document.getElementById("hangman-ul");
	var guesses = document.getElementById("guesses");
	var guessed = document.getElementById("already-guessed");
	var artistName = document.getElementById("artist-name");
	var artistSongName = document.getElementById("song-name");
	var gameOver = document.getElementById("game-over");

	wins.innerHTML = "";
	artistName.innerHTML = "";
	guesses.innerHTML = "";
	guessed.innerHTML = "";
	artistName.innerHTML = "";
	artistSongName.innerHTML = "";
	gameOver.innerHTML = "";
}

// Function to fade images
function fade (path) {
	imgSelector.classList.add("fade");
	setTimeout(function () {
		imgSelector.src=path;
		setTimeout(function () {
			imgSelector.classList.remove("fade");
	  },200);
	},1000);
}