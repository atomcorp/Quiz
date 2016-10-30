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
			// answers should always be strings?
			answers: [
				{
					answer: '1',
					isCorrect: false
				}, {
					answer: '2',
					isCorrect: true
				}, {
					answer: '3',
					isCorrect: false
				}, {
					answer: '4',
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

	var settings = {
		quiz: {},
		maxQuizStages: 10,
		minQuizStages: 1,
		quizLength: 0,
		points: 0,
		htmlComponents: ['points', 'user', 'question']
	}

	var currentStage = {
		currentQuestion: '',
		currentCorrectAnswer: '',
		points: 0,
		position: 1,
	}

	var getHtmlComponents = {};

	var _setHtmlComponents = function(html) {
		for (var i = 0; i < html.length; i++) {
			getHtmlComponents[html[i]] = document.querySelectorAll('[data-update="' + html[i] + '"]')[0];
		}
	}

	// var _setHtmlComponents = {
	// 	points: function() {
	// 		getHtmlComponents.points = document.querySelectorAll('[data-update="points"]')[0];
	// 		console.log(getHtmlComponents);
	// 	},
	// 	user: function() {
	// 		getHtmlComponents.points = document.querySelectorAll('[data-update="user"]')[0];
	// 		console.log(getHtmlComponents);
	// 	},
	// 	question: function() {
	// 		getHtmlComponents.points = document.querySelectorAll('[data-update="question"]')[0];
	// 		console.log(getHtmlComponents);
	// 	},
	// 	function() {

	// 	}
	// }

	var elSetup = {
		nextButton: function() {
			var nextButton = document.getElementById('next');
			nextButton.addEventListener('click', _nextQuestion, false);
		}
	}

	// http://stackoverflow.com/questions/18534314/reuse-elements-of-html
	var answerHtml = {
		config: {
			text: '',
			id: ''
		},

		init: function() {
			var answerContainer = document.createElement('div');
			answerContainer.className = 'answer';
			answerContainer.dataset.update = 'answer';
			answerContainer.dataset.id = this.config.id;
			answerContainer.textContent = this.config.text;

			// Should just make one of these, easier to turn off
			return answerContainer;
		}
	}

	var init = function(id) {
		_setQuiz(id);
	}

	var _checkIfAnswerCorrect = function(event) {

		// We attach el to parent ('.answers'), 
		// el bubble down
		// however we make sure 
		if (event.target.className === 'answer') {
			if (event.target.textContent === currentStage.currentCorrectAnswer) {
				// Add the points one to the total points
				settings.points += currentStage.points;
				console.log('Right');
			} else {
				console.log('Wrong');
			}
			this.removeEventListener('click', _checkIfAnswerCorrect, false);
		}
		
	}

	var _setQuiz = function() {
		// is given quiz ID
		// would make a call to the database and grab the correct quiz 

		// for testing there's only one quiz to take 
		settings.quiz = quizJSON;
		settings.quizLength = settings.quiz.quiz.length;
		elSetup.nextButton();
		_setHtmlComponents(settings.htmlComponents);

	}

	var _setQuizStage = function() {
		var thisStage = settings.quiz.quiz;
		// check the quiz stage and get the correct question
		for (var i = 0; i < thisStage.length; i++) {
			if (currentStage.position === thisStage[i].quizStage) {
				currentStage.currentQuestion = thisStage[i];
				currentStage.currentCorrectAnswer = _getCorrectAnswer(thisStage[i].answers);
				currentStage.points = thisStage[i].points;
				return;
			}
		}

	}

	var _getCorrectAnswer = function(answers) {
		for (var i = 0; i < answers.length; i++) {
			if (answers[i].isCorrect === true) {
				return answers[i].answer;
			}
		}
	}

	var _paintQuizStage = function() {
		var domAnswersContainer = document.querySelectorAll('.answers');
		var thisQuestion = currentStage.currentQuestion;
		// how many answers are there
		if (thisQuestion.answers.length > 1) {
			for (var i = 0; i < thisQuestion.answers.length; i++) {
				// var createdAnswer = domAnswer[0].cloneNode(false);
				// createdAnswer.textContent = currentQuestion.answers[i].answer;
				// domAnswers[0].appendChild(createdAnswer);
				var addAnswer = Object.create(answerHtml);
				addAnswer.config.text = thisQuestion.answers[i].answer;
				addAnswer.config.id = i + 1;
				var addedAnswer = domAnswersContainer[0].appendChild(addAnswer.init());

			}
			console.log(document.querySelectorAll('.answers')[0]);
			document.querySelectorAll('.answers')[0].addEventListener('click', _checkIfAnswerCorrect, false);
		}
	}

	var _updatePoints = function() {

	}

	var _nextQuestion = function() {
		// get current stage,
		// is current stage + 1 more than quiz stages allowed?
		if (currentStage.position === settings.quizLength) {
			console.log('Stop quiz');
		} else {
			currentStage.position += 1;
			_setQuizStage();
			_paintQuizStage();

			// Update Points
			getHtmlComponents.points.textContent = settings.points;
		}
	}

	var _manageQuizState = function() {
		// get how many quiz stages
		// get current quiz stage 

		// next question el

		// start quiz
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

