//Global Variables
var questionNumber = 0;

//Main countdown clock
var countDown = 75;

//User Score
var score = 75;

//User High Score
var highScore = 0;

//Variable for quiz time
var quizTime;

//Initiate the quiz on click of the start button

document.getElementById("start-button").addEventListener("click", function () {
    document.getElementById("start-quiz").classList.add("d-none");
    document.getElementById("quiz-questions").classList.remove("d-none");
    setTime();
    renderQuestions();
    quizTime = setInterval(setTime, 1000);
});

// This function renders the questions

function renderQuestions() {
    var questionsIndexLength = questions.length - 1;
    console.log(questionsIndexLength);
    if (questionNumber <= questionsIndexLength) {
        document.getElementById("question").innerHTML = questions[questionNumber].title;
        renderQuestionChoices();
    }
    endQuiz();
}

// This function renders the multiple choice options on the HTML as buttons

function renderQuestionChoices() {
    var question = questions[questionNumber].choices;
    console.log(question);
    for (var option = 0; option < question.length; option++) {
        var questionOptionsDiv = document.getElementById("question-choices");
        var questionButtons = document.createElement('button');
        questionButtons.className = "btn btn-outline-primary btn-lg d-flex justify-content-around";
        questionButtons.innerHTML = question[option];

        // This initiates the check answer function when the user clicks one of the choices

        questionButtons.setAttribute("onclick", "checkAnswer(" + questionNumber + "," + option + ");"
        );
        questionOptionsDiv.append(questionButtons);
    }
    endQuiz();
}

//This function clears the divs for the next question

function clearQuestionDiv() {
    console.log("Clearing divs");
    document.getElementById("question-choices").innerHTML = "";
    endQuiz();
}

// This function checks whether the user selected the correct answer

function checkAnswer(question, answer) {
    console.log("Question : ", question);
    console.log("Answer : ", answer);
    var correctAnswer = questions[question].answer;
    var userAnswer = questions[question].choices[answer];
    if (correctAnswer === userAnswer) {
        questionNumber = questionNumber + 1;
        console.log(score);
        console.log("Correct");
    }

    //else if answer is wrong, program deducts 15 secs from the quiz clock

    else {
        questionNumber = questionNumber + 1;
        countDown = countDown - 15;
        score = score - 15;
        console.log("Next question : ", questionNumber);
        console.log("Incorrect");
    }

    clearQuestionDiv();
    renderQuestions();
    endQuiz();
}
//This function starts the countdown for the time left quiz timer when user clicks the start button

function setTime() {
    document.getElementById("quiz-time").innerHTML = countDown + "secs left";
    countDown--;
    if (countDown === -1) {
        clearInterval(quizTime);
    }
    endQuiz();
}

// This function checks to see whether these conditions are being met
function endQuiz() {
    if (questionNumber >= 4 || countDown <= 0) {
        document.getElementById("quiz-questions").classList.add("d-none");
        document.getElementById("all-done").classList.remove("d-none");
        document.getElementById("quiz-time").innerHTML = countDown + "secs left";
        document.getElementById("final-score").innerHTML = countDown;

        clearInterval(quizTime);
    }

}

//Event listener initiates the function that allows the user to save their initials and high scores
document.getElementById("initials-button").addEventListener("click", saveScore);

//Function for saving High scores and Initials

function saveScore() {
    var userInitials = document.querySelector("#initial-input").value;
    var finalScore = countDown;

    //Storing Initials and High scores
    var scoreObject = {initials: userInitials, score: finalScore};

    var highScores = localStorage.getItem("highScoreList");


    if (highScores === null) {
        localStorage.setItem("highScoreList", JSON.stringify([scoreObject]));
        console.log(highScores);
    } else {
        var highScoreList = JSON.parse(highScores);
        console.log(typeof highScoreList);
        highScoreList.push(scoreObject);
        localStorage.setItem("highScoreList", JSON.stringify(highScoreList));

    }

}