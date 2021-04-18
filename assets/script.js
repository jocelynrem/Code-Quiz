var startButton = document.getElementById('start-btn')
var questionContainerEl = document.getElementById('question-container')

var shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions
    questionContainerEl.classList.remove('hide')
    setNextQuestion()    
}

function setNextQuestion() {

}

function selectAnswer() {

}

var questions = [
    {
        question: 'What is 2 + 2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    }
]
