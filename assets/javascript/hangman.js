var Hangman = function (artistArray, numberOfGuessesCount) {
  // List of available artists
  this.artistArray = artistArray;
  // Number of guesses count
  this.numberOfGuessesCount = numberOfGuessesCount;
  // Indicate if game is running
  this.isPlaying = false;
  // List of artists that have been selected
  this.selectedArtistArray = [];
  // Tracks how many letters the user has guessed correctly.
  this.userCorrectGuessesArray = [];
  // Tracks user guesses
  this.userGuessArray = [];
  // Contains artist name
  this.selectedArtistString;
  // Number of unique letters in the artist's name
  this.artistLetterCount = 0;
  // Function to randomly select artist
  this.artistGenerator = function () {
    if(this.isPlaying === true) {
      // Randomly selected an index number 
      var artistIndex = Math.floor(Math.random()*this.artistArray.length);
      // Assign artist name
      this.selectedArtistString = this.artistArray[artistIndex];
      // Check to see if artist has already been selected
      if(this.selectedArtistArray.indexOf(this.selectedArtistString) > -1) {
        // Remove artist from list if they have been selected already
        this.artistArray.splice(artistIndex,1);
        // Check length of available artists
        if(this.selectedArtistArray.length > 0)
          // Recursively call on function again to select a new name (checked to make sure selectedArtistArray is not empty to avoid infinite loop)
          this.artistGenerator();
        }
      else {
        // Add selected artist to the array of selected artists
        this.selectedArtistArray.push(this.selectedArtistString);
        this.uniqueArtistLetterCount();
        // Add artist name to DOm
        this.insertArtistIntoDom();
      }
    }
  }
  // Track how many letters the user has guessed correctly
  this.userCorrectGuessTracker = function (key) {
    var hasOccurredBoolean = false;
    // Check if key is a correct answer
    if(this.selectedArtistString.toLowerCase().indexOf(key) !== -1){
      // Loop to check if the correct letter has already been entered
      for(var i = 0; i < this.userCorrectGuessesArray.length; i++){
        if(this.userCorrectGuessesArray[i] === key) {
          hasOccurredBoolean = true;
          break;
        }
      }
      // Add to the userCorrectGuessesArray if it's the right letter and has not occurred yet
      if(hasOccurredBoolean == false) {
        this.userCorrectGuessesArray.push(key);
        this.unhideArtistLetterInDom(key);
      }
      console.log(this.userCorrectGuessesArray);
    }
    // Once the correct number of letters has been guessed, generate a new round and reset userGuessArray and userCorrectGuessesArray
    if(this.userCorrectGuessesArray.length === this.artistLetterCount){
      console.log("WIN!");
      this.gameOverCheck();
    }
  }

  // Number of guesses remaining
  this.guessNumberCalculator = function () {
    this.numberOfGuessesCount = this.numberOfGuessesCount - 1;
  }

  // Display letters user already guessed
  this.userGuessTracker = function (key) {
    this.guessNumberCalculator();
    if(this.numberOfGuessesCount > 0){
      // Check if array is empty
      if(this.userGuessArray.length > 0){
        // Check if letter already in array
        if(this.userGuessArray.indexOf(key) < 0)
          this.userGuessArray.push(key);
      }
      else {
        this.userGuessArray.push(key);  
      }
      console.log(this.userGuessArray);
    }
    else if (this.numberOfGuessesCount <= 0){
      console.log("LOSS!");
      this.gameOverCheck();
    }
  }

  // Insert artist name into DOM
  this.insertArtistIntoDom = function () {
    // Select UL by ID Name
    var artistUl = document.getElementById("hangman-ul");
    var artistLi = "";
    // Reset innerHTML to blank
    artistUl.innerHTML = "";
    console.log(artistUl.innerHTML);
    // Loop through selectedArtistString and append <li> tags to them
    for(var i = 0; i < this.selectedArtistString.length; i++) {
      artistLi += "<li>" + this.selectedArtistString.charAt(i) + "</li>";
    }
    // Insert the new <li> tags into the innerHTML of the UL
    artistUl.innerHTML = artistLi;
    console.log(artistLi);
    // Call function to hide the content in the DOM
    this.hideArtistLetterInDom(artistUl);
  }

  // Hide letters in DOM
  this.hideArtistLetterInDom = function (artistUl) {
    var artistLi = artistUl.getElementsByTagName("li");
    for(var i = 0; i < artistLi.length; i++) {
      if(artistLi[i].innerHTML !== " ")
        artistLi[i].style.display = "none";
    }
  }

  // Unhide correctly guessed letters
  this.unhideArtistLetterInDom = function (key) {
    var artistUl = document.getElementById("hangman-ul");
    var artistLi = artistUl.getElementsByTagName("li");
    for(var i = 0; i < artistLi.length; i++) {
      if(artistLi[i].innerHTML.toLowerCase() === key)
        artistUl.children[i].style.display = "block";
    }
  }

  // Calculate how many unique letters in the artists name
  this.uniqueArtistLetterCount = function () {
    // Set artistLetterCount to 0, this will reset the artist count variable when the user runs into the next round
    this.artistLetterCount = 0;
    var hasOccuredBoolean = false;
    // Remove spaces from artist name
    var artistNameFormattedString = this.selectedArtistString.replace(/ /g, "").toLowerCase();
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
      this.artistLetterCount = hasOccuredBoolean == true ? this.artistLetterCount + 0 : this.artistLetterCount + 1;
      hasOccuredBoolean = false;
    }
  }

  // Function to reset arrays for new rounds
  this.resetArray = function (array) {
    array.length = 0;
  }

  // Function to end the game
  this.gameOverCheck = function () {
    if(this.artistArray.length === 0) {
      this.isPlaying = false;
      var artistUl = document.getElementById("container");
      artistUl.innerHTML = "<h1>Game Over!</h1>";
    }
    else if (this.artistArray.length > 0) {
      this.numberOfGuessesCount = numberOfGuessesCount;
      this.artistGenerator();
      this.resetArray(this.userGuessArray);
      this.resetArray(this.userCorrectGuessesArray);
    }
  }
}