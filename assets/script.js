var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerBtnEl = document.getElementById("answer-buttons");
var shuffledQuestions, currentQuestionIndex;
var countRightAnswers = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  countRightAnswers = 0;
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
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
  if(selectedButton.dataset = correct) {
      countRightAnswers++;
  }
  document.getElementById('right-answers').innerText = "Correct Answers: " + countRightAnswers;
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

var questions = [
  {
    question: "Commonly used Data Types do not include:",
    answers: [
      { text: "Strings", correct: false },
      { text: "Booleans", correct: false },
      { text: "Alerts", correct: true },
      { text: "Numbers", correct: false },
    ],
  },
  {
    question: "The condition in an if/else statement is enclosed within _______.?",
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
    question: "String values must be enclosed within _______ when being assigned to variables.",
    answers: [
      { text: "Commas", correct: false },
      { text: "Curly Brackets", correct: false },
      { text: "Quotes", correct: true },
      { text: "Parenthesis", correct: false },
    ],
  },
  {
    question: "A very useful tool used during development and debugging for printing and testing content is:",
    answers: [
      { text: "JavaScript", correct: false },
      { text: "Terminal/Bash", correct: false },
      { text: "For Loops", correct: false },
      { text: "Console.log", correct: true },
    ],
  },
];
