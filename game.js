var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

document.addEventListener("keypress", function(){
  if(!started)
  {
    document.getElementById("level-title").innerHTML = "Level " + level;
    newSequence();
    started = true;
  }
});

function newSequence() {

  userClickedPattern = [];
  level++;

  document.getElementById("level-title").innerHTML = "Level " + level;

  //generating pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  

  gamePattern.push(randomChosenColour);

  //flash

  animatePress(randomChosenColour);
  playAudio(randomChosenColour);
}

// record the users pattern

for (let i = 0; i < buttonColours.length; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    var userChosenColour = this.id;
    animatePress(userChosenColour);
    playAudio(userChosenColour);
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

  });
}


//audio
function playAudio(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animation for press

function animatePress(currentColour)
{
  var activeButton = document.querySelector("." + currentColour);
  activeButton.classList.add("pressed");

  setTimeout(function() {
  activeButton.classList.remove("pressed");
  }, 100);
}

//check answer

function checkAnswer(currentLevel) {
 if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
 console.log("success");

 if(userClickedPattern.length === gamePattern.length){
   setTimeout(function (){
     newSequence();
   }, 1000);
 }

} else {
  playAudio("wrong");
  document.getElementById("level-title").innerHTML = "Game Over, Press Any Key to Restart";
  document.getElementsByTagName("body")[0].classList.add("game-over");
  setTimeout(function() {
  document.getElementsByTagName("body")[0].classList.remove("game-over");
  }, 200);

  startOver();
}
}

//game over
function startOver()
{
  started = false;
  level = 0;
  gamePattern = [];
}