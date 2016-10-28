'use strict';

// Module
var QuizStage = (function() {
    
    var question = 'Not set';

    var _setQuestion = function(question) {
        console.log(this);
        this.question = question.toUpperCase();
        console.log(question);
    }

    var inputQuizStage = function(question, answer) {
        // receive the question and the answer
        console.log(this);
        _setQuestion(question);
        
    }

    // var _getQuizStage = function() {
    //     console.log(question);
    //     return question;
    // }

    function _getQuizStage() {
        console.log(question + '!');
        return question + '!';
    }

    return {
        inputQuizStage: inputQuizStage,
        getQuizStage: _getQuizStage
    }
})();

var Question = {
    setQuestion: function(question) {
        this.question = question;
    },
    getQuestion: function() {
        return this.question;
    } 
}

var newQuestion1 = Object.create(QuizStage);
var newQuestion2 = Object.create(QuizStage);

newQuestion1.inputQuizStage('Question 1', 'nothing');
newQuestion2.inputQuizStage('Question 2', 'nothing');
setTimeout( function() {
    newQuestion1.getQuizStage();
    newQuestion2.getQuizStage();
}, 500)