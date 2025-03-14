window.onload = function() {
    loadQuestion(); // Ensure the first question is loaded after the page loads
};

const questions = [
    { 
        text: "On a scale of 1 to 10, how much does Achu love Niya?", 
        options: ["3", "-10", "100", "Other"], 
        correct: 3, 
        needsTextInput: true, 
        correctText: "-1/12"
    },
    { 
        text: "What does Achu love the most in this world?", 
        options: ["Niya", "Mandhi", "Mayonnaise", "Liverpool"], 
        correct: [1, 2] 
    },
    { 
        text: "How hot does Niya think Achu is?", 
        options: ["-1", "8", "4958640", "Can't even put into words"], 
        correct: 3 
    },
    { 
        text: "What would Niya choose?", 
        options: ["Achu", "Coffee", "Valorant", "None of the above"], 
        correct: 0, 
        specialMessage: "Hehe, you thought I'd say coffee for a second, didn't you? 😆"
    }
];

let currentQuestion = 0;

function loadQuestion() {
    let q = questions[currentQuestion];
    document.getElementById("question-text").innerText = q.text;
    
    let buttons = document.querySelectorAll("#options button");
    buttons.forEach((btn, i) => {
        if (q.options[i]) {
            btn.innerText = q.options[i];
            btn.style.display = "inline-block";
        } else {
            btn.style.display = "none";
        }
    });

    // Always hide the text input initially
    document.getElementById("other-answer").style.display = "none";
}

function checkTriviaAnswer(selected) {
    let q = questions[currentQuestion];

    // Handle "Other" option specially
    if (q.needsTextInput && selected === 3) {
        document.getElementById("other-answer").style.display = "block";
        return; // Don't proceed further, wait for text input
    }

    if (Array.isArray(q.correct)) {
        if (q.correct.includes(selected)) {
            moveToNextQuestion();
        } else {
            alert("Nope! Try again.");
        }
    } else if (selected === q.correct) {
        if (q.specialMessage) alert(q.specialMessage);
        moveToNextQuestion();
    } else {
        alert("Wrong! Try again.");
    }
}

function checkOtherAnswer() {
    let q = questions[currentQuestion];
    let userInput = document.getElementById("other-input").value.trim();
    
    if (userInput === q.correctText) {
        moveToNextQuestion();
    } else {
        alert("Nope! Try again.");
    }
}

function moveToNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        alert("You solved all trivia questions! Moving to the next stage.");
        nextStage("stage2");
    }
}
window.checkTriviaAnswer = checkTriviaAnswer;
window.checkOtherAnswer = checkOtherAnswer;
window.nextStage = nextStage;
