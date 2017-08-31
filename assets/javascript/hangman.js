var Hangman = function (artistArray, numberOfGuessesCount) {
  // Properties available outside of constructor function
  // List of available artists
  this.artistArray = artistArray;
  // Number of guesses count
  this.numberOfGuessesCount = numberOfGuessesCount;
  // Indicate if game is running
  this.isPlayingBoolean = false;
  // Make artistGenerator function available outside constructor
  this.artistGenerator = artistGenerator;
  // Make userGuessTracker function available outside constructor
  this.userGuessTracker = userGuessTracker;

  // Scope of declared variables and functions below is limited to the object constructor itself
  // Declare variable to self reference object (for scope change when chaining functions)
  var self = this;
  // List of artists that have been selected
  var selectedArtistArray = [];
  // Tracks how many letters the user has guessed correctly.
  var userCorrectGuessesArray = [];
  // Tracks user guesses
  var userGuessArray = [];
  // Contains artist name
  var selectedArtistString;
  // Number of unique letters in the artist's name
  var artistLetterCount = 0;
  // Track number of wins;
  var wins = 0;
  // Object to track song names
  var songNameObj = {
    eminem: "My Name Is",
    "kanye west":  "Through The Wire",
    "50 cent":  "In Da Club",
    "lil wayne":  "A Mili",
    fabolous:  "I'm So Into You",
    tpain:  "Bartender",
    nelly:  "Dilemma",
    "the game":  "Hate It or Love It",
    "fat joe":  "What's Love?",
    outkast:  "Roses",
    nas:  "If I Ruled The World",
    aaliyah:  "Are You That Somebody?",
    "warren g":  "Regulate",
    "dr dre":  "Nuthin But A G Thang",
    "snoop dogg":  "Gin And Juice",
    "Jay Z":  "Feelin It",
    "ice cube":  "Check Yo Self",
    tupac:  "Dear Mama",
    "salt n pepa":  "Something",
    "notorious big":  "Juicy"
  };

  // Randomly select artist
  function artistGenerator () {
    if(self.isPlayingBoolean === true) {
      // Randomly selected an index number 
      var artistIndex = Math.floor(Math.random()*self.artistArray.length);
      // Assign artist name
      selectedArtistString = self.artistArray[artistIndex];
      console.log(selectedArtistString);
      // Check to see if artist has already been selected
      if(!(selectedArtistArray.indexOf(selectedArtistString) === -1)) {
        // Recursively call on function again to select a new name
        artistGenerator();
      }
      // Determine number of unique letters in artist name
      uniqueArtistLetterCount();
      // Add artist name to DOm
      insertArtistIntoDom();
      updateGuessDom();
    }
  }

  // Display letters user already guessed
  function userGuessTracker (key) {
    if(this.isPlayingBoolean === true){
      guessNumberCalculator();
      if(this.numberOfGuessesCount > 0){
        // Check if array is empty
        if(userGuessArray.length > 0){
          // Check if letter already in array
          if(userGuessArray.indexOf(key) === -1)
            userGuessArray.push(key);
        }
        else if (userGuessArray.length === 0) {
          userGuessArray.push(key);  
        }
        console.log(userGuessArray);
      }
      else if (this.numberOfGuessesCount <= 0){
        console.log("LOSS!");
        gameOverCheck();
      }
      userCorrectGuessTracker(key);
      updateAlreadyGuessedDom();
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
      wins++;
      console.log("WIN!");
      addArtistNametoDom();
      addAristSongNametoDom();
      updateWinCounterinDom();
      updateImgSongDom();
      correctlyGuessedArtists();
      gameOverCheck();
    }
  }

  // Number of guesses remaining
  function guessNumberCalculator () {
    self.numberOfGuessesCount--;
    updateGuessDom();
  }

  // Insert artist name into DOM
  function insertArtistIntoDom () {
    // Select UL by ID Name
    var artistUl = document.getElementById("hangman-ul");
    var artistLi = "";
    // Reset innerHTML to blank
    artistUl.innerHTML = "";
    // Loop through selectedArtistString and append <li> tags to them
    for(var i = 0; i < selectedArtistString.length; i++) {
      artistLi += "<li><h1 class=\"h1\"><span>" + selectedArtistString.charAt(i) + "</span></h1></li>";
    }
    // Insert the new <li> tags into the innerHTML of the UL
    artistUl.innerHTML = artistLi;
    // Call function to hide the content in the DOM
    hideArtistLetterInDom(artistUl);
  }

  // Hide letters in DOM
  function hideArtistLetterInDom (artistUl) {
    var artistSpan = artistUl.getElementsByTagName("span");
    for(var i = 0; i < artistSpan.length; i++) {
      if(artistSpan[i].innerHTML !== " ")
        artistSpan[i].style.visibility = "hidden";
    }
  }

  // Unhide correctly guessed letters
  function unhideArtistLetterInDom (key) {
    var artistUl = document.getElementById("hangman-ul");
    var artistSpan = artistUl.getElementsByTagName("span");
    for(var i = 0; i < artistSpan.length; i++) {
      if(artistSpan[i].innerHTML.toLowerCase() === key)
        artistSpan[i].style.visibility = "visible";
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

  // Check to end the game
  function gameOverCheck () {
    if(selectedArtistArray.length === self.artistArray.length) {
      self.isPlayingBoolean = false;
      var artistUl = document.getElementById("artist-name");
      artistUl.innerHTML = "<h1 class=\"h1\">Game Over!</h1>";
    }
    else if (selectedArtistArray.length < self.artistArray.length) {
      self.numberOfGuessesCount = numberOfGuessesCount;
      artistGenerator();
      resetArray(userGuessArray);
      resetArray(userCorrectGuessesArray);
    }
  }

  // If artist was correctly guessed add artist to selectedArtistArray
  function correctlyGuessedArtists () {
    if (selectedArtistArray.indexOf(selectedArtistString) === -1) {
      selectedArtistArray.push(selectedArtistString);
    }
  }

  // Add artist name into DOM
  function addArtistNametoDom () {
    var artistDiv = document.getElementById("artist-name");
    artistDiv.innerHTML = "<h1 class=\"h1\">Corret!  " + selectedArtistString + "</h1>";
  }

  function addAristSongNametoDom () {
    var artistSongDiv = document.getElementById("song-name");
    artistSongDiv.innerHTML = "<h1 class=\"h1\">Now Playing - " + songNameObj[selectedArtistString.toLowerCase()] + "</h1>";
  }

  // Update win counter in DOM
  function updateWinCounterinDom () {
    var winDom = document.getElementById("wins");
    winDom.innerHTML = wins;
  }

  // Update number of guesses remaining in DOM
  function updateGuessDom () {
    var guessDom = document.getElementById("guesses");
    guessDom.innerHTML = self.numberOfGuessesCount;
  }

  // Update letters already guessed in DOM
  function updateAlreadyGuessedDom () {
    console.log(userGuessArray + "this is what your looking for");
    var alreadyGuessedDom = document.getElementById("already-guessed");
    alreadyGuessedDom.innerHTML = userGuessArray.toString().toUpperCase();
  }

  // Update image and play song when artist is correctly guessed
  function updateImgSongDom () {
    var imgSelector = document.getElementById("artist-img");
    var audioSelector = document.getElementById("song-player")
    imgSelector.src="assets/images/"+selectedArtistString+".jpg";
    audioSelector.src="assets/audio/"+selectedArtistString+".mp3";
  }
}