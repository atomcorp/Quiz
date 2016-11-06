// Tasks

"use strict";

var quizJSON = {
	quizStages: [
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
		}, 
		{
			quizStage: 3,
			question: 'Who is Arsenal\'s historic top scorer?',
			answers: [
				{
					answer: 'Denis Bergkamp',
					isCorrect: false,
					id: 1
				}, {
					answer: 'Ian Wright',
					isCorrect: false,
					id: 2
				}, {
					answer: 'Robin van Persie',
					isCorrect: false,
					id: 3
				}, {
					answer: 'Thierry Henry',
					isCorrect: true,
					id: 4
				}
			],
			points: 5
		}
	]
};

var Score = function() {
	// users name
	// current score
	// questions answered correctly 
	// create 
	// put the score in database when complete
	var settings =  {

	}
};

// Allows a user to answer questions and receive points
// for correct answers for a Quiz
var TakeQuiz = function() {
	// SET UP LOCAL SCOPE

	var settings = {
		databaseId: '',
		quiz: {},
		maxQuizStages: 10,
		minQuizStages: 1,
		quizLength: 0,
		points: 0,
		// make this use document, find the selectors below
		htmlComponents: ['points', 'player', 'question', 'answers', 'current-stage', 'no-of-stages', 'next'],
		player: 'Default',
		answerCorrect: 0,
		answerIncorrect: 0,
	};

	var currentStage = {
		currentQuestion: '',
		currentCorrectAnswer: '', // make this answer id
		points: 0,
		position: 1,
	};

	var getHtmlComponents = {};

	// SET UP REUSABLE COMPONANTS

	// todo: should make this more general, or use ids
	var _setHtmlComponents = function(html) {
		for (var i = 0; i < html.length; i++) {
			getHtmlComponents[html[i]] = document.querySelectorAll('[data-fetch="' + html[i] + '"]');

			// this means we can use elements with more than one element
			if (getHtmlComponents[html[i]].length === 1) {
				getHtmlComponents[html[i]] = getHtmlComponents[html[i]][0];
			}
		}
	};

	var elSetup = {
		nextButton: function() {
			var nextButton = getHtmlComponents.next;
			nextButton.addEventListener('click', _nextQuestion, false);
		}
	};


	// This creates the .answer html containers
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
	};

	// SET UP QUIZ


	var init = function(id, player) {
		_setQuiz(id);
		settings.player = player;
		settings.databaseId = id;
	};

	var _setQuiz = function(id) {
		// send and get quiz from DB
		database.ref('/quiz/' + id).once('value').then(function(snapshot) {
			console.log(snapshot.val());
			settings.quiz = snapshot.val();

			// set up quiz
			settings.quizLength = settings.quiz.quizStages.length;
			_setHtmlComponents(settings.htmlComponents);
			elSetup.nextButton();
			addPlayer();
		}).then(function() {
			// run the quiz
			myQuiz.runQuiz();
		});
		// would make a call to the database and grab the correct quiz 
		// for testing there's only one quiz to take 
		
	};

	var runQuiz = function() {
		_setQuizStage();
		_paintQuizStage();
	};

	// MANAGE QUIZ STAGES

	var _setQuizStage = function() {
		var thisStage = settings.quiz.quizStages;
		// check the quiz stage and get the correct question
		for (var i = 0; i < thisStage.length; i++) {
			if (currentStage.position === thisStage[i].quizStage) {
				currentStage.currentQuestion = thisStage[i];
				currentStage.currentCorrectAnswer = _setCorrectAnswer(thisStage[i].answers);
				currentStage.points = thisStage[i].points;
				return;
			}
		}
	};

	// todo: review, and break up if needed
	var _paintQuizStage = function() {
		var domAnswersContainer = getHtmlComponents.answers;
		var thisQuestion = currentStage.currentQuestion;

		// add the question
		getHtmlComponents.question.textContent = thisQuestion.question;
		_updateQuizProgress();

		// if previous answers remove them
		var answers = document.querySelectorAll(".answer");
		if (answers.length) {

			// was: http://stackoverflow.com/questions/13125817/how-to-remove-elements-that-were-fetched-using-queryselectorall
			// now: http://stackoverflow.com/a/16053436
			answers.forEach(function(answer) {
				answer.parentNode.removeChild( answer );
			});

		}

		// add all the answers to the page
		if (thisQuestion.answers.length > 1) {
			for (var i = 0; i < thisQuestion.answers.length; i++) {
				var addAnswer = Object.create(answerHtml);
				addAnswer.config.text = thisQuestion.answers[i].answer;
				addAnswer.config.id = thisQuestion.answers[i].id;
				var addedAnswer = domAnswersContainer.appendChild(addAnswer.init());

			}

			// add event listeners for picking an answer
			domAnswersContainer.addEventListener('click', _checkIfAnswerCorrect, false);
		}
	};

	// QUIZ ACTIONS

	var _updateQuizProgress = function() {
		getHtmlComponents['current-stage'].textContent = currentStage.position;
		getHtmlComponents['no-of-stages'].textContent = settings.quizLength;
	}

	var _checkIfAnswerCorrect = function(event) {

		// We attach el to parent ('.answers'), 
		// el bubble down
		// however we make sure 
		if (event.target.className === 'answer') {
			if (parseInt(event.target.getAttribute('data-id')) === parseInt(currentStage.currentCorrectAnswer)) {
				// Add the points one to the total points
				settings.points += currentStage.points;
				event.target.className += ' correct';
				settings.answerCorrect += 1;
				console.log('Right');
			} else {
				event.target.className += ' incorrect';
				settings.answerIncorrect += 1;
				console.log('Wrong');
			}

			// remove el so clicking it doesn't so anything anymore
			this.removeEventListener('click', _checkIfAnswerCorrect, false);
			// Update Points
			getHtmlComponents.points.textContent = settings.points;
		}
		
	};

	var _setCorrectAnswer = function(answers) {
		for (var i = 0; i < answers.length; i++) {
			if (answers[i].isCorrect === true) {
				return answers[i].id;
			}
		}
	};

	var _nextQuestion = function() {
		// remove previous answers

		// get current stage,
		// is current stage + 1 more than quiz stages allowed?
		if (currentStage.position === settings.quizLength) {
			console.log('Stop quiz');
			_endQuiz();
		} else {
			currentStage.position += 1;
			_setQuizStage();
			_paintQuizStage();
		}
	};

	var _endQuiz = function() {
		// todo: send score data to database
		_sendScore();
		getHtmlComponents.next.textContent = 'Complete quiz';
	}

	var _sendScore = function() {
		var complete = {
			score: settings.points,
			player: settings.player,
			date: Date.now(),
			correct: settings.answerCorrect,
			incorrect: settings.answerIncorrect,
		}
		
		// Adds to 
		var newKey = database.ref().push().key;
		var updates = {};
		updates['/scores/' + settings.databaseId + '/' + newKey] = complete;
		database.ref().update(updates);
	};

	// PUBLIC APIs

	var addPlayer = function() {
		getHtmlComponents.player.textContent = settings.player;
	};


	// for debugging
	var restartQuiz = function() {
		var restartId = document.getElementById('restart');
		restartId.addEventListener('click', run, false);
		function run() {
			currentStage.position = 1;
			_setQuizStage();
			_paintQuizStage();
			settings.points = 0;
			getHtmlComponents.points.textContent = 0;
		}
	};

	return {
		init: init, // init quiz
		runQuiz: runQuiz,
		addPlayer: addPlayer,
		restartQuiz: restartQuiz,
	};
}

var SetQuiz = function() {
	
};

// Invoke the module
// var myQuiz = TakeQuiz();

// Pass Quiz a quiz
// myQuiz.init('-KVb2_a2C21II5ptjsSa', 'Tom');

// User clicks Start Quiz

