// Color Possibilities
let buttonColors = Array("blue", "red", "yellow", "green");

// Color sequence of ht e game
let gamePattern = Array();

// clicked buttons counter
let cont = 0;

// gameLevel
let level = 1;

// Random number generator function
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  generateSound(randomChosenColour);
  buttonAnimation(randomChosenColour);
  gamePattern.push(randomChosenColour);
  return gamePattern;
}

// Generate Color Sound function
function generateSound(action = "") {
  switch (action) {
    case "red":
      let red = new Audio("./sounds/red.mp3");
      red.play();
      break;

    case "blue":
      let blue = new Audio("./sounds/blue.mp3");
      blue.play();
      break;

    case "green":
      let green = new Audio("./sounds/green.mp3");
      green.play();
      break;

    case "yellow":
      let yellow = new Audio("./sounds/yellow.mp3");
      yellow.play();
      break;

    case "gameOver":
      let gameOver = new Audio("./sounds/wrong.mp3");
      gameOver.play();
      break;

    default:
      break;
  }
}

// Button Animation function
function buttonAnimation(param) {
  $(`div .${param}`).addClass("pressed");
  setTimeout(() => {
    $(`div .${param}`).removeClass("pressed");
  }, 100);
}

// // Control Game Function
function controlGame(btn) {
  if (btn) {
    if (btn == gamePattern[cont]) {
      if (cont == 0 && gamePattern.length - 1 == 0) {
        setTimeout(() => {
          nextSequence();
          level++;
          $("#level-title").text(`Level ${level}`);
          cont = 0;
        }, 1000);
      } else if (cont < gamePattern.length - 1) {
        cont++;
      } else if (cont == gamePattern.length - 1) {
        setTimeout(() => {
          nextSequence();
          level++;
          $("#level-title").text(`Level ${level}`);
          cont = 0;
        }, 1000);
      }
    } else gameOver();
  }
}

// Adding click event to all buttons
function clickedBtn(btn = "") {
  if (btn) {
    generateSound(btn);
    buttonAnimation(btn);
    controlGame(btn);
  }
}

// Game Over Function
function gameOver() {
  generateSound("gameOver");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  gamePattern = [];
  level = 1;
  cont = 0;
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 300);
}

// Main Game
$(document).on("keypress", (evt) => {
  if (evt.key != "" && gamePattern == "") {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
  }
});
