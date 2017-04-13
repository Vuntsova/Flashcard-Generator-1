// Require the inquirer package
var inquirer = require('inquirer');

// Import flash card constructor implementation
var flashCards = require('./Constructors.js');

// Import the list of questions
var questions = require('./Questions.js').questions;

// Array for the cloze-deleted questions list
var deletedQuestions = [];

// Populate the cloze-deleted questions list
for (var i = 0; i < questions.length; i++) {
    var newCard = new flashCards.ClozeCard(questions[i].full, questions[i].cloze);
    deletedQuestions.push(newCard);
}

// Current Question
var currentQuestion = 0;
// Correct Answers
var correctAnswers = 0;
// Incorrect Answers
var incorrectAnswers = 0;

//
function promptQuestion() {
    inquirer.prompt([
        {
            type: "input",
            message: deletedQuestions[currentQuestion].partial + '\nAnswer: ',
            name: "userAnswer"
        }
    ]).then(function (answers) {
        console.log("\n");

        // Check if the answer is correct
        if (answers.userAnswer === deletedQuestions[currentQuestion].cloze) {
            console.log("You got the correct answer!");
            correctAnswers++;
        } else {
            console.log("Incorrect!");
            incorrectAnswers++;
        }

        // Show the correct answer
        console.log(deletedQuestions[currentQuestion].full);
        console.log("-------------------------------------\n");

        // Next question
        if (currentQuestion < deletedQuestions.length - 1) {
            currentQuestion++;
            promptQuestion();
        } else {
            console.log("Game Over!");
            console.log("Correct Answers: " + correctAnswers);
            console.log("Incorrect Answers " + incorrectAnswers);
            console.log("-------------------------------------\n");

            // Prompt to play again
            inquirer.prompt([
                {
                    type: "confirm",
                    message: "Play again?",
                    name: "playAgain"
                }
            ]).then(function (answers) {
                if (answers.playAgain) {
                    currentQuestion = 0;
                    correctAnswers = 0;
                    incorrectAnswers = 0;

                    promptQuestion();
                } else {
                    console.log("Thanks for playing! Come back soon!")
                }
            })
        }
    })
}

promptQuestion();