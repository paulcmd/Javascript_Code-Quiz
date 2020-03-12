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

document.getElementById("start-button").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("start-quiz").classList.add("d-none");
    document.getElementById("quiz-questions").classList.remove("d-none");
    setTime();
    renderQuestions();
    quizTime = setInterval(setTime, 1000);
});

// This function renders the questions

function renderQuestions() {
    var questionsIndexLength = questions.length - 1;
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

        questionButtons.setAttribute("onclick", "checkAnswer(" + questionNumber + "," + option + ");");
        questionOptionsDiv.append(questionButtons);
    }
    endQuiz();
}

