// todo: should Question contain: question, answers, correct answer ID. Maybe...

// Object Literal is an declared object variable with comma seperated key, values
// var objectLiteral = {a: 1, b: 2};

// ???
// Can we use Modules for tasks
// then create Obj Literals for mass producing those taks everytimes

// Make Object literals

'use strict ';

//
// QUESTION
//

var Question = {
  assignQuestion: function(question) {
    this.question = question;
  },
  assignAnswers: function(answers) {

    this.answers = answers.returnAnswers();
    this.prepareCorrectAnswer();
  },
  prepareCorrectAnswer: function() {
    for (var i = 0; i < this.answers.length; i++) {
      if (this.answers[i].answerCorrect) {
        this.correctAnswer = this.answers[i].id;
      }
    }
  },
  returnQuestion: function() {
    return this.question;
  },
  returnAnswers: function() {
    return this.answers;
  },
  returnCorrectAnswer: function() {
    return this.correctAnswer;
  }
}

//
// ANSWER
//

var Answer = {
	gatherAnswers: function(answers) {
    this.storeAnswers = [];
		for (var i = 0; i < answers.length; i++) {
			answers[i].id = i;
			this.storeAnswers.push(answers[i]);
			this.storeAnswers.answerCount = i;
		}
	},
	returnAnswers: function() {
		return this.storeAnswers;
	}
}

var testQuestion = Object.create(Question);
var testQuestion2 = Object.create(Question);
var testAnswer = Object.create(Answer);
var testAnswer2 = Object.create(Answer);


testQuestion.assignQuestion('Did Kanye West Live In China For A Year When He Was 10?');
testQuestion2.assignQuestion('Blah blah blah?');
testAnswer.gatherAnswers([
	{
		answerText: 'Yes',
		answerCorrect: true
	},
	{
		answerText: 'No',
		answerCorrect: false
	}
]);

testAnswer2.gatherAnswers([
  {
    answerText: 'Whatever',
    answerCorrect: false
  },
  {
    answerText: 'Just Trying',
    answerCorrect: true
  }
]);

testQuestion.assignAnswers(testAnswer);
testQuestion2.assignAnswers(testAnswer2);

//
// QUIZ
//

var QuizStage = {
  creator: function(name) {
    this.creator = name;
  },
  assignQuestions: function(questions) {
  	// if only one question
  	if (!Array.isArray(questions)) {
  		questions = [questions];
  	} 
    var counter = 0;
    this.quizStages = [];
    for (var question of questions) {
      questions.id = counter++;
      this.quizStages.push(question);
    }
  },
  formatQuestions: function() {
  	var question, answers = [];
  	// for each question and related answers
  	for (var i = 0; i < this.quizStages.length; i++) {
  	 	question = 'Question: ' + this.quizStages[i].returnQuestion();
  	 	for (var x = 0; x < this.quizStages[i].returnAnswers().length; x++) {
  	 		answers.push('Answer ' + (x + 1) + ': ' + this.quizStages[i].returnAnswers()[x].answerText);
  	 	}
  	} 
  	var answer = answers.join(', ');
  	return question + ' - ' + answer;
  },
  manageQuizStage: {
    setupQuizStage: function() {
      this.quizStageCount = 0;
    },
    increment: function() {
      console.log(this);
      this.quizStageCount++;
    },
    decrement: function() {
      this.quizStageCount--;
    },
    returnQuizStage: function() {
      return this.quizStageCount;
    }
  }
}

var testQuiz = Object.create(Quiz);

testQuiz.creator('Tom');
testQuiz.assignQuestions(testQuestion);

var testQuiz2 = Object.create(Quiz);

testQuiz2.creator('Max');
testQuiz2.assignQuestions(testQuestion2);

console.log(testQuiz.formatQuestions(), testQuiz2.formatQuestions());

console.log(testQuiz.quizStages[0].answers[testQuiz.quizStages[0].correctAnswer].answerText);

testQuiz.manageQuizStage.setupQuizStage()
testQuiz.manageQuizStage.increment()

console.log(testQuiz.manageQuizStage.returnQuizStage());

//
// RESPONSE
//

var Response = {
  participant: function(name) {
    this.participant = name;
  },
  manageScore:  {
    startScore: function() {
      this.score = 0;
    },
    correctAnswer: function() {
      this.score + 10;
    },
    incorrectAnswer: function() {
      this.score - 5;
    },
    returnScore: function() {
      // doubles as final score
      return this.score;
    }
  },
  manageGuesses: {
    participantsGuess: function() {

    }
  }
}

var testResponse = Object.create(Response);
testResponse.participant('TMS');
