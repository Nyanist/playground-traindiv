const questions = [
    {
        questions: "apa itu rasi bintang orion?",
        answers: [
            { Text:"rasi bintang orion adalah rasi bintang yang [a;ing tua, terkenal dan terang", iscorrect: true},
            { Text:"rasi bintang yang bentuknya kaya terong dan terang", iscorrect: false},
            { Text:"duh gatau bwanggg", iscorrect: false},
        ]
        
    },
    {
        questions: "apa itu rasi bintang scorpio?",
        answers: [
            { Text:"rasi bintang scorpio adalah rasi yang bentuknya kaya kalajengking", iscorrect: true},
            { Text:"rasi yang bentuknya banteng", iscorrect: false},
            { Text:"alamakkkk nyerahh banggg", iscorrect: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answersbuttons = document.getElementById("answer-button");
const nextbutton = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;

function startquiz() {
    currentquestionindex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showquestion();
}

function showquestion() {
    resetState();
    let currentQuestion = questions[currentquestionindex];
    let questionNo = currentquestionindex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answersbuttons.appendChild(button);
        if(answer.iscorrect){
            button.dataset.iscorrect = answer.iscorrect;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextbutton.style.display = "none";
    while (answersbuttons.firstChild){
        answersbuttons.removeChild(answersbuttons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e. target;
    const iscorrect = selectedBtn.dataset.iscorrect === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answersbuttons.children).forEach(button => {
        if(button.dataset.iscorrect === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}

function showscore(){
    resetState();
    questionElement.innerHTML = `skor kamu ${score} dari ${questions.length}!`;
    nextbutton.innerHTML = "play again";
    nextbutton.style.display = "block"
}

function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex < questions.length){
        showquestion();
    }else{
        showscore();
    }
}


nextbutton.addEventListener("click", () =>{
    if(currentquestionindex < questions.length){
        handlenextbutton();
    }else{
        startquiz();
    }
})
startquiz();