// Upload a new Quiz

var UploadQuiz = function() {
	
	var settings = {

	};

	var quizContent = {
		title: '',
		quizStages: []
	};

	// add warnings for unfilled answers, 

	var setUp = function() {
		_watchSubmit();
		_watchStageButton();
	};

	var _getTitle = function() {
		var input = document.querySelectorAll('[data-watch="new-quiz-title"]');
		quizContent.title = input[0].value;
	};

	// Simply makes the html for creating stages
	var createStageElements = {
		config: {
			answerCount: 0,
		},
		container: {

		},

		createStage: function() {
			// create container
			var stageContainer = document.createElement('div');
			stageContainer.className = 'new-quiz--stage';

			this.container = stageContainer;
		},

		createQuestion: function() {
			// create question
			var questionContainer = document.createElement('div');
			var questionLabel = document.createElement('label');
			var questionInput = document.createElement('input');
			questionContainer.className = 'new-quiz-question' ;
			questionInput.dataset.watch = 'new-quiz-question';
			questionInput.type = 'text';
			questionLabel.textContent = 'Question: ';

			questionContainer.appendChild(questionLabel);
			questionContainer.appendChild(questionInput);

			this.container.append(questionContainer);
		},

		createAnswersContainer: function() {
			// create answers
			var answersContainer = document.createElement('div');
			var answerLabel = document.createElement('label');
			answersContainer.className = 'new-quiz--answers';
			answerLabel.textContent = 'Answers: ';

			this.container.append(answersContainer);
		},

		createAnswer: function() {
			var answerContainer = document.createElement('div');
			var answerInput = document.createElement('input');
			var answerRadio = document.createElement('input');
			answerContainer.className = 'new-quiz--answer';
			answerInput.type = 'text';
			answerInput.dataset.watch = 'new-quiz-answer';
			answerRadio.type = 'radio';
			answerRadio.name = 'radio-sync--' + this.config.answerCount;

			answerContainer.append(answerInput);
			answerContainer.append(answerRadio);

			this.container.querySelector('.new-quiz--answers').append(answerContainer);
		},

		whatHappend: function() {
			console.log(this, this.container);
		},

	};

	var _watchStageButton = function() {
		var button = document.querySelector('[data-watch="add-stage"]');
		button.addEventListener('click', _addStage, false);
	}

	var _addStage = function() {
		var newQuizStage = Object.create(createStageElements);
		newQuizStage.createStage();
		newQuizStage.createQuestion();
		newQuizStage.createAnswersContainer();
		for (var i = 0; i < 4; i++) {
			newQuizStage.createAnswer();
		}
		newQuizStage.config.answerCount += 1;
		var container = document.querySelector('.new-quiz--stages');
		container.append(newQuizStage.container);

	}

	var _getQuizStages = function() {

		// get how many quiz stages are there?
		var stageEl = document.querySelectorAll('.new-quiz--stage');
		for (var i = 0; i < stageEl.length; i++) {
			var stageContainer = {};
			stageContainer.answers = [];

			var questionEl = stageEl[i].querySelectorAll('[data-watch="new-quiz-question"]');
			stageContainer.question = questionEl[0].value;
			var answersEl = stageEl[i].querySelectorAll('[data-watch="new-quiz-answer"]');

			for (var x = 0; x < answersEl.length; x++) {
				var answerObj = {};
				answerObj.answer = answersEl[x].value;
				answerObj.isCorrect = answersEl[x].nextElementSibling.checked;
				answerObj.id = x;
				stageContainer.answers.push(answerObj);
			}
			quizContent.quizStages.push(stageContainer);
		}
	};

	var _watchSubmit = function() {
		var submitButton = document.getElementById('upload-quiz');
		submitButton.addEventListener('click', _submitQuiz, false);
	};

	var _submitQuiz = function() {
		var promiseQuiz = new Promise(
			function(resolve, reject) {
				_getTitle();
				_getQuizStages();
				
				resolve(quizContent);
			}
		);
		promiseQuiz.then(
			function(val) {
				var newKey = database.ref().push().key;
				var updates = {};
				updates['/quiz/' + newKey] = quizContent;
				database.ref().update(updates);
				console.log(newKey);
			}
		).catch(
			function(reason) {
				console.log('broke', reason);
			}
		)
		// 
		// 
		// 
		// 
		
	};

	return {
		setUp: setUp,
	}
}

var addQuiz = UploadQuiz();

addQuiz.setUp();