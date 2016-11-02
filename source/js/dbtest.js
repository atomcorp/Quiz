// var database = firebase.database();

var quiz = {
	id: 1,
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
					answer: 'Dennis Bergkamp',
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


// returns the 
// database.ref('/quiz/quiz/-KVX4PQehuonYO_dA4hG').once('value').then(function(snapshot) {
// 	console.log(snapshot.val());
// });

// This works
// var database = firebase.database();
// // Get a key for a new Post
// var newKey = database.ref().push().key;
// var updates = {};
// updates['/quiz/' + newKey] = quiz;
// database.ref().update(updates);

// var database = firebase.database();
// var complete = {
// 	score: 10,
// 	player: 'Tom',
// 	complete: true
// }

// var updates = {};
// updates['/scores/' + '123456789'] = complete;
// database.ref().update(updates);