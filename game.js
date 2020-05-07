var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var started = false;
var highScore = 0;
var currentScore =0;
$(document).keypress(function(event){
  if(!started){
    nextSequence();
    $("#level-title").text("Level: "+level);
    started = true;
  }


});

function nextSequence(){
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour)
level++;
  $("#level-title").text("Level: "+level);
  currentScore++;
  $(".current").text("Current Score: " +currentScore);
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress("."+userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
  $(currentColour).addClass("pressed");
setTimeout(function(){$(currentColour).removeClass("pressed");},100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
      if(userClickedPattern.length == gamePattern.length)
      {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

      if(currentScore>=highScore){
        highScore=currentScore;
        $(".high").text("High Score:" + highScore);
      }
      }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver()
      }
     }

function startOver(){
  level=0;
  started = false;
  gamePattern=[];
  currentScore=0;
}
