$(document).ready(function(){

	var startTest;
	var questions;
	var clock;
	var counter = 30;
	var wins = 0;
	var losses = 0;
	var gameInfo;
	var queCounter = 0;
	var queCounter;
	var chosenAnswer;
	var correctAnswer = ["2","9","-1","15","2.5"];
	var quesOptions = ["1+1=?", "3x3=?", "5-6=?", "7+8=?", "5/2=?"];
	var ansOptions = [["3","5","4","2"],["1","9","6","8"],["-1","-3","5","9"],["13","14","15","16"],["3.1","2.4","5.9","2.5"]];

function splashScreen() {
	startTest = "<button type='button' class='btn btn-default startButton'><b>Click me to START</b></button>";
	$("#game").html(startTest);
}   
splashScreen();

$(".startButton").on("click", function(event) {
	Ques();
	Time();
})

function Time() {
    clock = setInterval(stopWatch, 1000);
    function stopWatch() {
    	if (counter > 0) {
            counter--;
    	}
    	if (counter === 0) {
    		clearInterval(clock);
    		losses++;
    		gameInfo = "<h2>You run out of time, click to next question</h2>";
    		$("#game").html(gameInfo);
    	}
        $(".timeConter").html(counter);
        click();
    }
}

function Ques() {
	questions = "<h2>Time Remaining: <span class='timeConter'>30</span></h2>" +
	            "<h2>" + quesOptions[queCounter] + "</h2>" +
	            "<h2 class='answer'>A. " + ansOptions[queCounter][0] + "</h2>" +
	            "<h2 class='answer'>B. " + ansOptions[queCounter][1] + "</h2>" +
	            "<h2 class='answer'>C. " + ansOptions[queCounter][2] + "</h2>" +
	            "<h2 class='answer'>D. " + ansOptions[queCounter][3] + "</h2>";
   
    $("#game").html(questions);
}

function countWin() {
	wins++;
    gameInfo = "<h3>correct!</h3>";
    $("#game").html(gameInfo);
    click();
}

function click() {
	$("body").on("click",function(){
		if (queCounter < 5) {
		queCounter++;
		Ques();
		counter = 30;
		Time();
	}
	else {
		gameInfo = " <h3>win: </h3>"+ wins +
		           " <h3>loss: </h3>" +losses+
		           " <h3><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Restart game!</a></h3>";
		$("#game").html(gameInfo);
		$(".reset-button").on("click", function(event) {
			Ques();
			Time();
		})
	};
	})
}



function countLoss() {
    losses++;
    gameInfo = "<h3>loss!</h3>";
    $("#game").html(gameInfo);
    click();
}

$(".answer").on("click", function(event) {
	chosenAnswer = $(this).text();
	if (chosenAnswer === correctAnswer[queCounter]) {
		countWin();
		clearInterval(clock);
	}
	else {
		countLoss();
		clearInterval(clock);
	}
});

});
