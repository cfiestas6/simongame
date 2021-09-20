var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    
})
$(".start-btn").on("click", function () {
    $(".start-btn").addClass("hiden");
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");

    }, 100)
}



function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        console.log("success");
        if (userClickedPattern.length == gamePattern.length) {
            
            setTimeout(nextSequence, 1000);

        }
    }
    else {
            console.log("wrong");
            $("body").addClass("game-over");
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200)
            $("#level-title").text("Game Over, Press Any Key to Restart");
            started = false;
            $(".start-btn").removeClass("hiden");
            level = 0;
            gamePattern = [];
            userClickedPattern = [];

    }
    
}
