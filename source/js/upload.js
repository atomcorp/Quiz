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
	};

	var _getTitle = function() {
		var input = document.querySelectorAll('[data-watch="new-quiz-title"]');
		quizContent.title = input[0].value;
	};

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