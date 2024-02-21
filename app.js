const questions = [
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Charles Dickens", correct: false },
            { text: "Mark Twain", correct: false },


        ]
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },


        ]
    },
    {
        question: "What is the largest organ in the human body?",
        answers: [
            { text: "Liver", correct: false },
            { text: "Heart", correct: false },
            { text: "Skin", correct: true },
            { text: "Brain", correct: false },


        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },


        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-buttons");
const nextbtn = document.getElementById("btn-next");

let currentQuesIndex = 0;
let score = 0;

function startQuiz() {
    currentQuesIndex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showQuestion();

}
function showQuestion() {
    resetState();
    let currentQues = questions[currentQuesIndex];
    let questionNo = currentQuesIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQues.question;

    currentQues.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);


    });
}

function resetState() {
    nextbtn.style.display = "none";
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }

}

function selectAnswer(e) {
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if (isCorrect) {
        selectedbtn.classList.add("correct");
        score++;
    } else {
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbtn.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display = "block";
}

function handleNextbtn(){
    currentQuesIndex++;
    if (currentQuesIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextbtn.addEventListener("click", () => {
    if (currentQuesIndex < questions.length) {
        handleNextbtn();
    } else {
        startQuiz();
    }
});

startQuiz();