var Hangman = function () {

}

window.onload = function () {
	artistGenerator();
	insertArtistIntoDom();
}

document.onkeyup = function(event) {
	userGuessTracker(event.key);
	userCorrectGuessTracker(event.key);
	guessNumberCalculator();
}

// Theme will be 90's hip hop

// Start game with a press of a button

// Randomly generate a word

// Create list of artists

// List of available artists
var artistArray = ["Nas", "Warren G", "Wu Tang", "Dr Dre", "Snoop Dogg", "Jay Z", "Ice Cube", "TuPac", "Salt N Pepa", "Notorious BIG"];

// List of artists that have been selected
var selectedArtistArray = [];

// Tracks how many letters the user has guessed correctly.
var userCorrectGuessesArray = [];

// Tracks user guesses
var userGuessArray = [];

// Contains artist name
var selectedArtistString;

// Number of guesses allowed
var numberOfGuessesCount = 12;

// Number of unique letters in the artist's name
var artistLetterCount = 0;

// Function to randomly select artist
function artistGenerator () {

	// Randomly selected an index number 
	var artistIndex = Math.floor(Math.random()*artistArray.length);

	// Assign artist name
	selectedArtistString = artistArray[artistIndex];

	// Check to see if artist has already been selected
	if(selectedArtistArray.indexOf(selectedArtistString) > -1) {
		// Remove artist from list if they have been selected already
		artistArray.splice(artistIndex,1);
		// Check length of available artists
		if(selectedArtistArray.length > 0)
			// Recursively call on function again to select a new name (checked to make sure selectedArtistArray is not empty to avoid infinite loop)
			artistGenerator();
	}
	else {
		// Add selected artist to the array of selected artists
		selectedArtistArray.push(selectedArtistString);
		uniqueArtistLetterCount();
	}
}

// Track how many letters the user has guessed correctly
function userCorrectGuessTracker (key) {
	var hasOccurredBoolean = false;

	// Check if key is a correct answer
	if(selectedArtistString.toLowerCase().indexOf(key) !== -1){
		// Loop to check if the correct letter has already been entered
		for(var i = 0; i < userCorrectGuessesArray.length; i++){
			if(userCorrectGuessesArray[i] === key) {
				hasOccurredBoolean = true;
				break;
			}
		}
		// Add to the userCorrectGuessesArray if it's the right letter and has not occurred yet
		if(hasOccurredBoolean == false) {
			userCorrectGuessesArray.push(key);
			unhideArtistLetterInDom(key);
		}
		console.log(userCorrectGuessesArray);
	}
	// Once the correct number of letters has been guessed, generate a new round and reset userGuessArray and userCorrectGuessesArray
	if(userCorrectGuessesArray.length === artistLetterCount){
		artistGenerator();
		resetArray(userGuessArray);
		resetArray(userCorrectGuessesArray);
	}
}

// Number of guesses remaining
function guessNumberCalculator () {
	numberOfGuessesCount = numberOfGuessesCount--;
}

// Display letters user already guessed
function userGuessTracker (key) {
	// Check if array is empty
	if(userGuessArray.length > 0){
		// Check if letter already in array
		if(userGuessArray.indexOf(key) < 0)
			userGuessArray.push(key);
	}
	else {
		userGuessArray.push(key);	
	}
	console.log(userGuessArray);
}

// Insert artist name into DOM
function insertArtistIntoDom () {
	// Select UL by ID Name
	var artistUl = document.getElementById("hangman-ul");
	var artistLi = "";
	// Loop through selectedArtistString and append <li> tags to them
	for(var i = 0; i < selectedArtistString.length; i++) {
		artistLi += "<li>" + selectedArtistString.charAt(i) + "</li>";
	}
	// Insert the new <li> tags into the innerHTML of the UL
	artistUl.innerHTML = artistLi;
	console.log(artistLi);
	// Call function to hide the content in the DOM
	hideArtistNameInDom(artistUl);
}

// Hide words in DOM
function hideArtistNameInDom (artistUl) {
	var artistLi = artistUl.getElementsByTagName("li");
	for(var i = 0; i < artistLi.length; i++) {
		artistLi[i].style.display = "none";
	}
}

// Unhide correctly guessed letters
function unhideArtistLetterInDom (key) {
	var artistUl = document.getElementById("hangman-ul");
	var artistLi = artistUl.getElementsByTagName("li");
	for(var i = 0; i < artistLi.length; i++) {
		if(artistLi[i].innerHTML.toLowerCase() === key)
			artistUl.children[i].style.display = "block";
	}
}

// Calculate how many unique letters in the artists name
function uniqueArtistLetterCount () {
	// Set artistLetterCount to 0, this will reset the artist count variable when the user runs into the next round
	artistLetterCount = 0;
	var hasOccuredBoolean = false;
	// Remove spaces from artist name
	var artistNameFormattedString = selectedArtistString.replace(/ /g, "").toLowerCase();
	console.log(artistNameFormattedString);
	// Initial loop to select letter to check
	for (var i = 1; i < artistNameFormattedString.length + 1; i++) {
		// Loop through all prior letters in the artist's name to identify if they've occurred before
		for (var j = 0; j < i; j++) {
			// Set the hasOccurred boolean to true if there has been a previous occurrance of the letter and break out of current loop
			if(artistNameFormattedString.charAt(i-1) === artistNameFormattedString.charAt(j-1)){
				hasOccuredBoolean = true;
				break;
			}
		}
		// Ternary operator to add to the count if there has been no occurance of the letter in the artist name in any positions prior to the current one (is hasOccuredBoolean == true)
		artistLetterCount = hasOccuredBoolean == true ? artistLetterCount + 0 : artistLetterCount + 1;
		hasOccuredBoolean = false;
	}
}

// Function to reset arrays for new rounds
function resetArray (array) {
	array.length = 0;
}