let user = "";
let index = 0;
let score = 0;

const defaultQuestions = [
    { q: "How do you insert COMMENTS in Java code?", options: ["#", "//", "*"], answer: 1 },
    { q: "Which is the Capital of France?", options: ["Berlin", "Paris", "Rome"], answer: 1 },
    { q: "5 * 3 + 5 = _", options: ["15", "10", "20"], answer: 2 },
    { q: "Which is the largest ocean in the world?", options: ["Atlantic", "Indian", "Pacific"], answer: 2 },
    { q: "H2O is?", options: ["Oxygen", "Water", "Hydrogen"], answer: 1 }
];

if (!localStorage.getItem("questions")) {
    localStorage.setItem("questions", JSON.stringify(defaultQuestions));
}

const questions = JSON.parse(localStorage.getItem("questions"));

function startQuiz() {
    user = document.getElementById("username").value;
    
    if (!user) {
        alert("Enter your name");
        return;
    }
    
    localStorage.setItem("username", user);
    
    document.getElementById("home").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    
    loadQuestion();
}

function loadQuestion() {
    if (index >= questions.length) {
        return showResult();
    }

    document.getElementById("question").textContent = questions[index].q;
    
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = ""; 
    
    questions[index].options.forEach((opt, i) => {
        optionsDiv.innerHTML += `
            <input type='radio' name='answer' value='${i}'> ${opt} <br>
        `;
    });
}

function nextQuestion() {
    const selected = document.querySelector("input[name='answer']:checked");

    if (!selected) {
        alert("Select an answer");
        return;
    }

    if (parseInt(selected.value) === questions[index].answer) {
        score += 1;
    } else {
        score -= 1;
    }

    index++;
    loadQuestion();
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").textContent = `${localStorage.getItem("username")}, Your Score: ${score}`;
}