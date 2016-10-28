// Tasks

// Upload a Quiz

// Access a Quiz and take it
// 1. Get 



'use strict';

var quizJSON = {
	id: 1,
	quiz: [
		{
			quizStage: 1,
			question: 'What is 1 + 1?',
			answers: [
				{
					answer: 1,
					isCorrect: false
				}, {
					answer: 2,
					isCorrect: true
				}, {
					answer: 3,
					isCorrect: false
				}, {
					answer: 4,
					isCorrect: false
				}
			],
			points: 10
		}, 
		{
			quizStage: 2,
			question: 'What is the capital of France?',
			answers: [
				{
					answer: 'Paris',
					isCorrect: true
				}, {
					answer: 'Madrid',
					isCorrect: false
				}, {
					answer: 'Berlin',
					isCorrect: false
				}, {
					answer: 'London',
					isCorrect: false
				}
			],
			points: 5
		}
	]
}

var Score = function() {
	// users name
	// current score
	// questions answered correctly 
	// create 
	// put the score in database when complete
	var settings =  {

	}
}

// Allows a user to answer questions and receive points
// for correct answers for a Quiz
var TakeQuiz = function() {
	// give TakeQuiz a quizJSON

	var quiz, currentStage;

	var settings = {
		maxQuizStages: 10,
		minQuizStages: 1,
		currentQuizStage: 1,

	}

	var init = function(id) {
		_setQuiz(id);
	}

	var _setQuiz = function() {
		// is given quiz ID
		// would make a call to the databse and grab the correct quiz 

		// for testing there's only one quiz to take 
		quiz = quizJSON;
	}

	var _setQuizStage = function() {

		// check the quiz stage and get the correct question
		for (var i = 0; i < quiz.quiz.length; i++) {
			if (settings.currentQuizStage = quiz.quiz[i]) {
				currentStage = quiz.quiz[i];
			}
		}
	}

	var _paintQuizStage = function() {
		var domQuestion = document.querySelectorAll('[data-update="question"]');
		var domAnswers = document.querySelectorAll('.answers');
		var domAnswer = document.querySelectorAll('[data-update="answer"]');
		domQuestion[0].textContent = currentStage.question;
		
		console.log(currentStage.answers.length);

		// how many answers are there
		if (currentStage.answers.length > 1) {
			for (var i = 0; i < currentStage.answers.length; i++) {
				var createdAnswer = domAnswer[0].cloneNode(false);
				createdAnswer.textContent = currentStage.answers[i].answer;
				domAnswers[0].appendChild(createdAnswer);
			}
		}
	}

	var showQuiz = function() {
		_setQuizStage();
		_paintQuizStage();
	}

	return {
		init: init, // init quiz
		showQuiz: showQuiz
	}
}

var SetQuiz = function() {

}

window.test = TakeQuiz();

// Invoke the module
var myQuiz = TakeQuiz();

// Pass Quiz a quiz
myQuiz.init(1);
myQuiz.showQuiz();
// User clicks Start Quiz

