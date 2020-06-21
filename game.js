var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red","blue","green","yellow"];

var level = 0;

var started = false;

$(document).keypress(function(){

  if(!started){
    $("#level-title").text("LEVEL " + level);

    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4) ;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;
  $("#level-title").text("LEVEL " + level);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+'.mp3');
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("SUCCESS");

    if(gamePattern.length == userClickedPattern.length){

      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else {
    console.log("WRONG");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $(document.body).addClass("game-over");

    setTimeout(function(){
      $(document.body).removeClass("game-over");
    },200);

    $("#level-title").text("GAME OVER, Press any key to restart");

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
