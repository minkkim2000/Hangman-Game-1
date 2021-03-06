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
  var winsCount = 0;
  // Enables key tracking on game
  var enableKeyTrackingBoolean;
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

  // Id's for elements on DOM to be manipulated
  // Artist name displayed when correctly guessed
  var artistNameId = "artist-name";
  // Image displayed and changed when correctly guessed
  var artistImgId = "artist-img";
  // Song name updated when correctly guessed
  var songNameId = "song-name";
  // Artist name displayed and reveals correctly guessed letters
  var artistNameDispalyId = "hangman-ul";
  // Number of correctly guessed artists
  var winCountId = "wins";
  // Number of guesses remaining
  var guessRemainId = "guesses";
  // Letters arleady guessed
  var alreadyGuessedId = "already-guessed";
  // Music player (audio tag)
  var audioId = "song-player";
  // Div that will display game over
  var gameOverId = "game-over";

  // Functions to determine game logic
  // Randomly select artist
  function artistGenerator () {
    if(self.isPlayingBoolean === true) {
      // Randomly select an index number 
      var artistIndex = Math.floor(Math.random()*self.artistArray.length);
      // Assign artist name
      selectedArtistString = self.artistArray[artistIndex];
      // Check to see if artist has already been selected
      if(!(selectedArtistArray.indexOf(selectedArtistString) === -1)) {
        // Recursively call on function to select a new name
        return artistGenerator();
      }
      // Determine number of unique letters in artist name
      uniqueArtistLetterCount();
      // Update with artist name and remaining guesses
      insertArtistIntoDom();
      updateGuessesRemainingDom();
      // enable key tracking
      enableKeyTrackingBoolean = true;
    }
  }

  // Track and display letters user already guessed
  function userGuessTracker (key) {
    // Only allow game to work if the game is still running
    if(this.isPlayingBoolean === true){
      // Block key tracking from firing when game is either win or loss
      if(enableKeyTrackingBoolean === true) {
        guessNumberCalculator();
        // Check if there's any guesses left
        if(this.numberOfGuessesCount > 0){
          if(userGuessArray.length > 0){
            // Check if letter already in array
            if(userGuessArray.indexOf(key) === -1)
              // Add to array if it's not in yet
              userGuessArray.push(key);
          }
          // Add to array if it's empty
          else if (userGuessArray.length === 0)
            userGuessArray.push(key); 
        }
        //  If user runs out of guesses run through gameOverCheck function
        else if (this.numberOfGuessesCount <= 0){
          enableKeyTrackingBoolean = false;
          gameOverCheck();
        }
        // Track correct guesses
        userCorrectGuessTracker(key);
        // Update Dom to indicate letters already guessed
        updateAlreadyGuessedDom();
      }
    }
  }

  // Track how many letters the user has guessed correctly
  function userCorrectGuessTracker (key) {
    var hasOccurredBoolean = false;
    // Check if key is a correct letter
    if(!(selectedArtistString.toLowerCase().indexOf(key) === -1)) {
      // Loop to check if the correct letter has already been entered
      for(var i = 0; i < userCorrectGuessesArray.length; i++){
        if(userCorrectGuessesArray[i] === key) {
          hasOccurredBoolean = true;
          break;
        }
      }
      // Add to the userCorrectGuessesArray if it's the right letter and has not occurred yet
      if(hasOccurredBoolean === false) {
        userCorrectGuessesArray.push(key);
        // Unhide the letter if it's correctly guessed
        unhideArtistLetterInDom(key);
      }
    }
    // Once the correct number of letters has been guessed, generate a new artist name 
    if(userCorrectGuessesArray.length === artistLetterCount){
      winsCount++;
      enableKeyTrackingBoolean = false;
      // Update song playing in DOM
      updateSongPlayingDom();
      // Update win counter in DOM
      updateWinCounterinDom();
      addFade(artistImgId);
      addFade(artistNameId);
      addFade(songNameId);
      // Delay to wait for 1s ease in from fade
      setTimeout(function () {
        // Update artist name in DOM
        addArtistNametoDom(removeFade);
        // Update song name in DOM
        addArtistSongNametoDom(removeFade);
        // Update artist image in DOM
        updateImgDom(removeFade);
        // Add artist to the list of correctly guessed artists
        addSelectedArtistArray(gameOverCheck);
        // Remove fade only after URL has been updated
      },1000);
    }
  }

  // Number of guesses remaining
  function guessNumberCalculator () {
    self.numberOfGuessesCount--;
    // Update DOM to show number of guesses used
    updateGuessesRemainingDom();
  }  

  // Calculate how many unique letters in the artists name
  function uniqueArtistLetterCount () {
    // Set artistLetterCount to 0, this will reset the artist count variable when the user runs into the next round
    artistLetterCount = 0;
    var hasOccuredBoolean = false;
    // Remove formatting from artist name
    var artistNameFormattedString = selectedArtistString.replace(/ /g, "").toLowerCase();
    console.log(artistNameFormattedString);
    // Initial loop to select letter to check
    for (var i = 1; i < artistNameFormattedString.length + 1; i++) {
      // Loop through all prior letters in the artist's name to identify if they've occurred before
      for (var j = 0; j < i; j++) {
        // Set the hasOccurredboolean to true if there has been a previous occurrance of the letter and break out of current loop
        if(artistNameFormattedString.charAt(i-1) === artistNameFormattedString.charAt(j-1)){
          hasOccuredBoolean = true;
          break;
        }
      }
      // Add to the count if there has been no occurance of the letter in the artist name in any positions prior to the current one (if hasOccuredBoolean == true)
      artistLetterCount = hasOccuredBoolean === true ? artistLetterCount + 0 : artistLetterCount + 1;
      hasOccuredBoolean = false;
    }
  }

  // Function to reset arrays for new rounds
  function resetArray (array) {
    array.length = 0;
  }

  // Check to end the game
  function gameOverCheck () {
    // End the game if the selectedArtistArray and artistArray are the same length
    if(selectedArtistArray.length === self.artistArray.length) {
      self.isPlayingBoolean = false;
      var artistUl = document.getElementById(gameOverId);
      setTimeout(function () {
        artistUl.innerHTML = "<h1 class=\"h1\">Game Over!</h1>";
      }, 1200)
    }
    // Keep going if the selectedArtistArray < artistArray length
    else if (selectedArtistArray.length < self.artistArray.length) {
      self.numberOfGuessesCount = numberOfGuessesCount;
      artistGenerator();
      resetArray(userGuessArray);
      resetArray(userCorrectGuessesArray);
      updateAlreadyGuessedDom();
    }
  }

  // If artist was correctly guessed add artist to selectedArtistArray
  function addSelectedArtistArray (gameOverCB) {
    if (selectedArtistArray.indexOf(selectedArtistString) === -1) {
      selectedArtistArray.push(selectedArtistString);
      // Once artist has been entered into array check to see if game should end
      gameOverCB();
    }
  }

  // All DOM manipulation functions 
  // Insert artist name into DOM
  function insertArtistIntoDom () {
    // Select UL by ID Name
    var artistUl = document.getElementById(artistNameDispalyId);
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
    var artistUl = document.getElementById(artistNameDispalyId);
    var artistSpan = artistUl.getElementsByTagName("span");
    for(var i = 0; i < artistSpan.length; i++) {
      if(artistSpan[i].innerHTML.toLowerCase() === key)
        artistSpan[i].style.visibility = "visible";
    }
  }

  // Add artist name into DOM
  function addArtistNametoDom (removeFadeCB) {
    var artistDiv = document.getElementById(artistNameId);
    artistDiv.innerHTML = "<h1 class=\"h3\">Correct!  " + selectedArtistString + "</h3>";
    removeFadeCB(artistNameId);
  }

  // Display currently playing song
  function addArtistSongNametoDom (removeFadeCB) {
    var artistSongDiv = document.getElementById(songNameId);
    artistSongDiv.innerHTML = "<h1 class=\"h3\">Now Playing - " + songNameObj[selectedArtistString.toLowerCase()] + "</h3>";
    removeFadeCB(songNameId);
  }

  // Update win counter in DOM
  function updateWinCounterinDom () {
    var winDom = document.getElementById(winCountId);
    winDom.innerHTML = winsCount;
  }

  // Update number of guesses remaining in DOM
  function updateGuessesRemainingDom () {
    var guessDom = document.getElementById(guessRemainId);
    guessDom.innerHTML = self.numberOfGuessesCount;
  }

  // Update letters already guessed in DOM
  function updateAlreadyGuessedDom () {
    var alreadyGuessedDom = document.getElementById(alreadyGuessedId);
    alreadyGuessedDom.innerHTML = userGuessArray.toString().toUpperCase();
  }

  // Update image when artist is correctly guessed
  function updateImgDom (removeFadeCB) {
    var imgSelector = document.getElementById(artistImgId);
    imgSelector.src="assets/images/" + selectedArtistString.toLowerCase() + ".jpg";
    removeFadeCB(artistImgId);
  }

  // Update song playing in DOM 
  function updateSongPlayingDom () {
    var audioSelector = document.getElementById("song-player");
    audioSelector.src="assets/audio/" + selectedArtistString.toLowerCase() + ".mp3";
  }

  // Add fade to DOM
  function addFade (id) {
    var imgSelector = document.getElementById(id);
    imgSelector.classList.add("fade");
  }

  // Remove fade from DOM
  function removeFade (id) {
    var imgSelector = document.getElementById(id);
    imgSelector.classList.remove("fade");
  }
}