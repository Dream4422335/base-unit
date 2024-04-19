var currentQuestionIndex = 0;
var chosenQuestions = []

function displayQuestion(questionObj) {
    var questionDiv = document.createElement("div");
    questionDiv.classList.add("question-container");
    
    var questionImage = document.createElement("img");
    questionImage.src = questionObj.questionImage;
    questionImage.classList.add("question-image");
    questionDiv.appendChild(questionImage);
    
    var answers = questionObj.answers.slice().sort(() => Math.random() - 0.5);
    answers.forEach(function(answer) {
        var answerDiv = document.createElement("div");
        answerDiv.classList.add("answer");
        if (answer.includes("(correct)")) {
            answerDiv.classList.add("correct");
        } else {
            answerDiv.classList.add("wrong");
        }
        answerDiv.innerHTML = `<div class="answerText">${answer.replace(" (correct)", "")}</div>`;
        questionDiv.appendChild(answerDiv);
    });
    
    var explanationDiv = document.createElement("div");
    explanationDiv.classList.add("explanation");
    explanationDiv.textContent = questionObj.explanation;
    questionDiv.appendChild(explanationDiv);

    var nextButton = document.createElement("button");
    nextButton.classList.add("nextbutton");
    nextButton.textContent = "Continue >";
    nextButton.onclick = nextQuestionPlease
    questionDiv.appendChild(nextButton);
    
    document.body.innerHTML = ""; 
    document.body.appendChild(questionDiv);
}

function nextQuestionPlease() {
    currentQuestionIndex++;
    if (currentQuestionIndex < chosenQuestions.length) {
        displayQuestion(chosenQuestions[currentQuestionIndex]);
    } else {
        alert("End of the quiz!");
    }
}

function userAnsweredCorrectly() {
    document.querySelector(".explanation").style.display = "inline-block";
    document.querySelector(".nextbutton").style.display = "inline-block";
    document.querySelectorAll(".answer").forEach(function(answer) {
        answer.classList.add("disabled");
    });
}

async function doSomething() {
    const response = await fetch("questions_v1.json");
    const allQuestions = await response.json();
  
    for (let questionSet of allQuestions) {
        var selectedQuestion = questionSet.sort(() => Math.random() - 0.5)[0];
        chosenQuestions.push(selectedQuestion);
    }
    chosenQuestions.sort(() => Math.random() - 0.5);
    
    displayQuestion(chosenQuestions[currentQuestionIndex]);
    
    document.addEventListener("click", function(event) {
        let target = event.target;
        if (target.classList.contains("answerText")) {
            target = target.parentElement;
        }
        if (target.classList.contains("answer") && !target.classList.contains("disabled")) {
            if (target.classList.contains("correct")) {
                target.classList.add("correct-displayed");
                userAnsweredCorrectly();
            } else if (target.classList.contains("wrong")) {
                target.classList.add("wrong-displayed");
            } else {
                alert('YAYYYY! SOMETHING WENT WRONG.');
            }
        }
    });
}

doSomething();
