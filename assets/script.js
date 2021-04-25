var shuffledQuestions, currentQuestionIndex;
var startButton = document.getElementById("start-btn");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerBtnEl = document.getElementById("answer-buttons");
var timer = document.getElementById("timer");
var endMessage = document.getElementById("endMessage");
var rightAns = document.getElementById("right-answers");
var score = document.getElementById("score");
var questStatus = document.getElementById("question-status");
var statusBar = document.getElementById('progressBar');
var countQuestions = 0;
var countRightAnswers = 0;
var timeLeft = 30;


//timer and score display all the time
timer.textContent = "Seconds Remaining: 30";
rightAns.textContent = "Correct Answers: 0";
statusBar.textContent = "0/5";

//start and restart
function startGame() {
  timeLeft = 30;
  countQuestions = 0;
  countRightAnswers = 0;
  statusBar.style.width = `0%`;
  rightAns.textContent = "Correct Answers: " + countRightAnswers;
  statusBar.textContent = countQuestions + "/5";
  endMessage.classList.add("hide");
  score.classList.add("hide");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove("hide");
  answerBtnEl.classList.remove("hide");
  setNextQuestion();
}

//countdown timer and interval
function countDown() {
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

//click events
startButton.addEventListener("click", startGame);
startButton.addEventListener("click", countDown);
answerBtnEl.addEventListener("click", () => {
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    setTimeout(() => {
      currentQuestionIndex++;
      setNextQuestion();
    }, 1000);
  } else {
    setTimeout(() => {
      endGame();
    }, 1000);
  }
});

//end game
function endGame() {
  timeLeft = 0;
  questionEl.classList.add("hide");
  answerBtnEl.classList.add("hide");
  endMessage.classList.remove("hide");
  score.classList.remove("hide");

  if (countRightAnswers === 5) {
    endMessage.innerText = "Perfect Score!";
  } else {
    endMessage.innerText = "Game Over";
  }
  score.innerText = "Your score: " + countRightAnswers + " out of 5";
  startButton.innerText = "Restart";
  startButton.classList.remove("hide");
}

//functions that control the gameplay
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

function resetState() {
  clearStatusClass(document.body);
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild);
  }
}

//counts correct answers, moves to next question if available or ends game
function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerBtnEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  countQuestions++;
  statusBar.textContent = countQuestions + "/5";
  statusBar.style.width = `${(countQuestions / 5) * 100}%`;
  if (correct) {
    countRightAnswers++;
    rightAns.textContent = "Correct Answers: " + countRightAnswers;
  } else {
    timeLeft -= 5;
  }
}

//what happens when a user chooses an answer
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

//resets buttons for next question
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
  questionEl.classList.remove("hide");
}

//quiz questions array
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
