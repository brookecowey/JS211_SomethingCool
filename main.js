// Require the 'readline' module to read input from the console
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define an array of words for the game
const words = ['apple', 'banana', 'orange', 'kiwi', 'grape'];

// Define the game object
const game = {
  // Initialize the game with a random word from the array
  currentWord: words[Math.floor(Math.random() * words.length)],
  guesses: [],
  attempts: 5,

  // Define a function to check if a letter has already been guessed
  isAlreadyGuessed(letter) {
    return this.guesses.includes(letter);
  },

  // Define a function to check if the game has been won
  isGameWon() {
    return this.currentWord.split('').every(letter => this.isAlreadyGuessed(letter));
  },

  // Define a function to check if the game has been lost
  isGameLost() {
    return this.attempts === 0;
  },

  // Define a function to make a guess
  makeGuess(letter) {
    if (this.isAlreadyGuessed(letter)) {
      console.log(`You already guessed the letter ${letter}. Try another one.`);
    } else if (this.currentWord.includes(letter)) {
      console.log(`Good guess! The letter ${letter} is in the word.`);
      this.guesses.push(letter);
    } else {
      console.log(`Sorry, the letter ${letter} is not in the word.`);
      this.guesses.push(letter);
      this.attempts--;
    }
  },

  // Define a function to start the game
  start() {
    console.log(`Welcome to the guessing game! You have ${this.attempts} attempts to guess the word.`);
    rl.question('Guess a letter: ', guess => {
      this.makeGuess(guess);
      console.log(`Current word: ${this.currentWord.split('').map(letter => this.isAlreadyGuessed(letter) ? letter : '_').join(' ')}`);
      console.log(`Guessed letters: ${this.guesses.join(', ')}`);
      console.log(`Attempts remaining: ${this.attempts}`);
      if (this.isGameWon()) {
        console.log(`Congratulations! You guessed the word "${this.currentWord}" in ${this.guesses.length} guesses.`);
        rl.close();
      } else if (this.isGameLost()) {
        console.log(`Sorry, you ran out of attempts. The word was "${this.currentWord}".`);
        rl.close();
      } else {
        this.start();
      }
    });
  },
};

// Start the game
game.start();