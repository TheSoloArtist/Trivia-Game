$(document).ready(function(){

  // starting the game
  $("#start-button").on("click", gameState.startTimer);

});

// LETS PLAY
var gameState = {

  // 60 seconds count down by 1sec
  timeRemaining : 60,

  // starting timer transitioning start page
  startTimer: function() {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },

  // decrement the timer and update the UI; stop the timer at 0
  countdown: function() {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  // stop the timer and check the answers
  stopTimer: function() {
    clearInterval();
    trivia.checkAnswers();
  },

  // hide the quetions and display the end page with results
  showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct answers (Great!): " + numCorrect);
    $("#incorrect-answers").text("Incorrect answers (Oh No!): " + numIncorrect);
    $("#unanswered").text("Skipped questions (Meh): " + numUnanswered);
  }
}

// functions for scoring
var trivia = {

  // pulling questions for ui
  displayQuestions: function() {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append('<h2>Answer the following questions:</h2>');
            
    for (var i = 0; i < questionBank.length; i++) {

      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
    }

    // added  Done button 
    var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  // test if answers are correct or otherwise
  checkAnswers: function() {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    // loop comparing text to user answers
    // score increment
    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $('input[id=radio'+i+']:checked + label').text();

      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }

    // show end page score tally
    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}

// array:with questions and the correct answer
var questionBank =
[

  {
    question: "Who is Goku's father?",
    answers: ["Berter", "Broly", "Bardock"],
    correct: "Bardock"
  },
  {
    question: "How many Dragon Balls are there on Earth?",
    answers: ["Twelve", "Seven", "None"],
    correct: "Seven"
  },
  {
    question: "Who is Goku's longest Mentor?",
    answers: ["Grandpa Gohan", "Master Roshi", "King Kai"],
    correct: "Master Roshi"
  },
  {
    question: "What food can revive a gravely wounded warrior?",
    answers: ["Fruit of Might", "Dragon Roll", "Senzu Bean"],
    correct: "Senzu Bean"
  },
  {
    question: "Where did Goku learn Instant Transmission?",
    answers: ["Other World", "Planet of the Kais", "Yadrat"],
    correct: "Yadrat"
  },
  {
    question: "What is the Namekian Eternal Dragon's name?",
    answers: ["Puar", "Porunga", "Pilaf"],
    correct: "Porunga!"
  },
    {
      question: "Who isn't Goku's brother?",
      answers: ["Komquat", "Turles", "Raditz"],
      correct: "Komquat"
    },
    {
      question: "Who defeated Cell in the Cell games?",
      answers: ["Goten", "Gohan", "Hercule"],
      correct: "Gohan"
    },
    {
      question: "How many incarnations did Buu have?",
      answers: ["Four", "Seven", "Three"],
      correct: "Four"
    },
    {
      question: "What was Goku's power level when he fought Napa?",
      answers: ["200", "6900", "Over 9000!"],
      correct: "Over 9000!"
    }
  ]