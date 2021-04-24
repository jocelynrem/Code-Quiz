var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerBtnEl = document.getElementById("answer-buttons");
var timer = document.getElementById("timer");
var endMessage = document.getElementById("endMessage");
var shuffledQuestions, currentQuestionIndex;
var countRightAnswers = 0;
var rightAns = document.getElementById("right-answers");
var score = document.getElementById("score");
timer.textContent = "Seconds Remaining: 60";
rightAns.textContent = "Correct Answers: " + countRightAnswers;

function countDown() {
  var timeLeft = 5;

  var timerInterval = setInterval(function () {
    if (timeLeft > 1) {
      timer.textContent = "Seconds Remaining: " + timeLeft;
      timeLeft--;
    } else if (timeLeft === 1) {
      timer.textContent = "Second Remaining: " + timeLeft;
      timeLeft--;
    } else {
      timer.textContent = "Seconds Remaining: 0";
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  questionEl.classList.add("hide");
  nextButton.classList.add("hide");
  answerBtnEl.classList.add("hide");
  score.classList.remove("hide");
  endMessage.innerHTML = "Game Over";
  score.innerText = "Your score: " + countRightAnswers + " out of 5";
}

startButton.addEventListener("click", startGame);
startButton.addEventListener("click", countDown);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  endMessage.classList.add("hide");
  score.classList.add("hide");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtnEl.appendChild(button);
  });
}

// when user clicks an answer:
//hide all answers but the correct answer
// flash message indicating if user was right or wrong
//wait __ seconds and automatically move on to the next question
// or user can click the next button to move on faster
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild);
  }
}

function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerBtnEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (correct) {
    countRightAnswers++;
    rightAns.textContent = "Correct Answers: " + countRightAnswers;
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    endGame();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
    questionEl.classList.add("hide");
  } else {
    element.classList.add("wrong");
    questionEl.classList.add("hide");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
  questionEl.classList.remove("hide");
}

var questions = [
  {
    question: "Which is not a commonly used data type:",
    answers: [
      { text: "Strings", correct: false },
      { text: "Booleans", correct: false },
      { text: "Alerts", correct: true },
      { text: "Numbers", correct: false },
    ],
  },
  {
    question:
      "The condition in an if/else statement is enclosed within _______.",
    answers: [
      { text: "Quotes", correct: false },
      { text: "Curly brackets", correct: true },
      { text: "Parenthesis", correct: false },
      { text: "Square brackets", correct: false },
    ],
  },
  {
    question: "Arrays in JavaScript can be used to store _____.",
    answers: [
      { text: "Numbers and strings", correct: false },
      { text: "Other arrays", correct: false },
      { text: "Booleans", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question:
      "String values must be enclosed within _______ when being assigned to variables.",
    answers: [
      { text: "Commas", correct: false },
      { text: "Curly Brackets", correct: false },
      { text: "Quotes", correct: true },
      { text: "Parenthesis", correct: false },
    ],
  },
  {
    question: "A function used for printing and testing javascript is:",
    answers: [
      { text: "JavaScript", correct: false },
      { text: "Terminal/Bash", correct: false },
      { text: "For Loops", correct: false },
      { text: "Console.log", correct: true },
    ],
  },
];
