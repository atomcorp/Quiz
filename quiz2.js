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
					isCorrect: false,
					id: 1
				}, {
					answer: '2',
					isCorrect: true,
					id: 2
				}, {
					answer: '3',
					isCorrect: false,
					id: 3
				}, {
					answer: '4',
					isCorrect: false,
					id: 4
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
					isCorrect: true,
					id: 1
				}, {
					answer: 'Madrid',
					isCorrect: false,
					id: 2
				}, {
					answer: 'Berlin',
					isCorrect: false,
					id: 3
				}, {
					answer: 'London',
					isCorrect: false,
					id: 4
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
		htmlComponents: ['points', 'player', 'question', 'answers'],
		player: 'Default'
	}

	var currentStage = {
		currentQuestion: '',
		currentCorrectAnswer: '', // make this answer id
		points: 0,
		position: 1,
	}

	var getHtmlComponents = {};

	// todo: should make this more general, or use ids
	var _setHtmlComponents = function(html) {
		for (var i = 0; i < html.length; i++) {
			getHtmlComponents[html[i]] = document.querySelectorAll('[data-fetch="' + html[i] + '"]');

			// this means we can use elements with more than one element
			if (getHtmlComponents[html[i]].length === 1) {
				getHtmlComponents[html[i]] = getHtmlComponents[html[i]][0];
			}
		}
	}

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
			answerContainer.dataset.fetch = 'answer';
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
			console.log(event.target.getAttribute('data-id'), currentStage.currentCorrectAnswer);
			if (parseInt(event.target.getAttribute('data-id')) === parseInt(currentStage.currentCorrectAnswer)) {
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
				currentStage.currentCorrectAnswer = _setCorrectAnswer(thisStage[i].answers);
				currentStage.points = thisStage[i].points;
				return;
			}
		}
	}

	var _setCorrectAnswer = function(answers) {
		for (var i = 0; i < answers.length; i++) {
			if (answers[i].isCorrect === true) {
				return answers[i].id;
			}
		}
	}

	// todo: review, and break up if needed
	var _paintQuizStage = function() {
		var domAnswersContainer = getHtmlComponents.answers;
		console.log(domAnswersContainer);
		var thisQuestion = currentStage.currentQuestion;
		getHtmlComponents.question.textContent = thisQuestion.question;

		// if previous answers remove them
		var answers = document.querySelectorAll(".answer");
		if (answers.length) {
			// was: http://stackoverflow.com/questions/13125817/how-to-remove-elements-that-were-fetched-using-queryselectorall
			// now: http://stackoverflow.com/a/16053436
			answers.forEach(function(answer) {
				answer.parentNode.removeChild( answer );
			})

		}
		// add all the answers to the page
		if (thisQuestion.answers.length > 1) {
			for (var i = 0; i < thisQuestion.answers.length; i++) {
				// 
				var addAnswer = Object.create(answerHtml);
				addAnswer.config.text = thisQuestion.answers[i].answer;
				addAnswer.config.id = thisQuestion.answers[i].id;
				var addedAnswer = domAnswersContainer.appendChild(addAnswer.init());

			}

			// add event listeners for picking an answer
			document.querySelectorAll('.answers')[0].addEventListener('click', _checkIfAnswerCorrect, false);
		}
	}

	var _updatePoints = function() {

	}

	var addPlayer = function(player) {
		settings.player = player;
		getHtmlComponents.player.textContent = settings.player;
	}

	var _nextQuestion = function() {
		// remove previous answers

		// get current stage,
		// is current stage + 1 more than quiz stages allowed?
		if (currentStage.position === settings.quizLength) {
			console.log('Stop quiz');
		} else {
			currentStage.position += 1;
			_setQuizStage();
			_paintQuizStage();
		}
		// Update Points
		getHtmlComponents.points.textContent = settings.points;
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
		showQuiz: showQuiz,
		addPlayer: addPlayer
	}
}

var SetQuiz = function() {

}

// Invoke the module
var myQuiz = TakeQuiz();

// Pass Quiz a quiz
myQuiz.init(1);
myQuiz.addPlayer('Tom');
myQuiz.showQuiz();
// User clicks Start Quiz

