
// const startButton = document.getElementById("start-btn");
// const nextButton = document.getElementById("next-btn");

// const questionContainerElement = document.getElementById("question-container");
// const questionElement = document.getElementById("question");
// const answerButtonElement = document.getElementById("answer-button");

// let shuffledQuestion,currentQuestion;
// let quizScore = 0;



// startButton.addEventListener('click', startGame);

// nextButton.addEventListener('click', () => {
//     currentQuestionIndex++;
//     setNextQuestion();
// });



// function startGame()
// {
//     startButton.classList.add('hide')
//     shuffledQuestion=questions.sort(() =>Math.random() -0.5)
//     currentQuestionIndex = 0;
//     questionContainerElement.classList.remove('hide')
//     setnextQuestion()
//     quizScore = 0
// }

// function setnextQuestion()
// {
//     resetState();
//     showQuestion(shuffledQuestion[currentQuestionIndex])
// }


// function showQuestion(question)
// {
//     questionElement.innerText = question.question;
//     question.anwers.forEach((answer) =>{
//         const button= document.createElement('button')
//         button.innerText = answer.text;
//         button.classList.add('btn')
//         if(answer.correct)
//         {
//             button.dataset.correct = answer.correct
//         }
//         button.addEventListener('click', selectAnswer)
//         answerButtonElement.appendChild(button)
//     })
// }



// function resetState()
// {
//     clearStatusClass(document.body)
//     nextButton.classList.add('hide')
//     while(answerButtonElement.firstChild)
//     {
//         answerButtonElement.removeChild(answerButtonElement.firstChild)
//     }

// }


// function selectAnswer(e)
// {
//     const selectedButton = e.target
//     const correct = selectedButton.dataset.correct

//     setStatusClass(document.body, correct)
//     Array.from(answerButtonElement.children).forEach((button)=>{
//        setStatusClass(button,button.dataset.correct)
//     })

//     if(shuffledQuestion.length> currentQuestionIndex +1)
//     {
//         nextButton.classList.remove("hide")
//     }
//     else
//     {
//         startButton.innerText = "restart"
//         startButton.classList.remove("hide")
//     }
//     if(selectedButton.dataset = correct)
//     {
//         quizScore++
//     }
//     document.getElementById('right-answers').innerText=quizScore
// }



// function setStatusClass(element, correct)
// {
//     clearStatusClass(element)
//     if(correct)
//     {
//         element.classList.add("correct");
//     }
//     else{
//         element.classList.add("wrong");
//     }
// }



// function clearStatusClass(element)
// {
//     element.classList.remove('correct');
//     element.classList.remove('wrong');
// }
// const question = [
//     {
//         question: "which one of these a Javascript framework?",
//         answers: [
//              {text: 'Python', correct : false},
//              {text: 'Django', correct : false},
//              {text: 'React', correct : true},
//              {text: 'Elipse', correct : false}
            
//         ],
//     },

//     {
//         question: "Who is the Prime-Minister of India?",
//         answers: [
//              {text: 'Narendra Modi', correct : true},
//              {text: 'AmitSha', correct : false},
//              {text: 'Murmu', correct : false},
//              {text: 'Gandhi', correct : false}
            
//         ],
//     },

//     {
//         question: "Which is the Nation Flower of India?",
//         answers: [
//              {text: 'Rose', correct : false},
//              {text: 'Sunflower', correct : false},
//              {text: 'Lotus', correct : true},
//              {text: 'Jasmin', correct : false}
            
//         ],
//     },

//     {
//         question: "Who is Founder of KLE technological University ?",
//         answers: [
//              {text: 'Vijayallaxmi', correct : false},
//              {text: 'Nikhil', correct : false},
//              {text: 'Amogh Joshi', correct : false},
//              {text: 'Prabhakar kore', correct : true}
            
//         ],
//     },
// ]




const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-button");

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }

    if (correct) {
        quizScore++;
    }
    document.getElementById('right-answers').innerText = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: "Which one of these is a JavaScript framework?",
        answers: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Eclipse', correct: false }
        ]
    },
    {
        question: "Who is the Prime Minister of India?",
        answers: [
            { text: 'Narendra Modi', correct: true },
            { text: 'Amit Shah', correct: false },
            { text: 'Murmu', correct: false },
            { text: 'Gandhi', correct: false }
        ]
    },
    {
        question: "Which is the National Flower of India?",
        answers: [
            { text: 'Rose', correct: false },
            { text: 'Sunflower', correct: false },
            { text: 'Lotus', correct: true },
            { text: 'Jasmine', correct: false }
        ]
    },
    {
        question: "Who is the Founder of KLE Technological University?",
        answers: [
            { text: 'Vijayalakshmi', correct: false },
            { text: 'Nikhil', correct: false },
            { text: 'Amogh Joshi', correct: false },
            { text: 'Prabhakar Kore', correct: true }
        ]
    }
];
