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
		var newQuizStage = Object.create(addQuizStage);
		newQuizStage.createStage();
		newQuizStage.createQuestion();
		newQuizStage.createAnswersContainer();
		newQuizStage.createAnswer();
		newQuizStage.whatHappend();
		
	};

	var _getTitle = function() {
		var input = document.querySelectorAll('[data-watch="new-quiz-title"]');
		quizContent.title = input[0].value;
	};

	var addQuizStage = {

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

	var addQuizQuestion = {

		createQuestion() {



		}
	}

	var _getQuizStage = function() {
		var tempArray = {};
		tempArray.answers = [];
		var questionEl = document.querySelectorAll('[data-watch="new-quiz-question"]');
		tempArray.value = questionEl[0].value;
		var answersEl = document.querySelectorAll('[data-watch="new-quiz-answer"]');

		for (var i = 0; i < answersEl.length; i++) {
			var answerObj = {};
			answerObj.answer = answersEl[i].value;
			answerObj.isCorrect = answersEl[i].nextElementSibling.checked;
			answerObj.id = i;
			tempArray.answers.push(answerObj);
		}
		quizContent.quizStages.push(tempArray);
	};

	var _watchSubmit = function() {
		var submitButton = document.getElementById('upload-quiz');
		submitButton.addEventListener('click', _submitQuiz, false);
	};

	var _submitQuiz = function() {
		_getTitle();
		_getQuizStage();
		console.log(quizContent);
	};

	return {
		setUp: setUp,
	}
}

var addQuiz = UploadQuiz();

addQuiz.setUp();