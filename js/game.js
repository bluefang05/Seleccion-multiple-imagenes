"use strict";

var info = "Selecciona la respuesta correcta";

var roundNumber = -1;
var answerAmount = 4;
var numberOfRounds = 10;
shuffle(questions);
initButtons();
setRound(roundNumber);

function setRound() {
  roundNumber++;
  document.getElementById("next").classList.add("hidden");
  document.getElementById("answerBox").innerHTML = "";
  let selection = [];
  let questionsRef = []; 
  var uniqueAnswersSet = new Set();
  
  
  for (let i = 0; i < questions.length; i++) {
    questionsRef.push(questions[i][1]);
    
  }

  
  questionsRef = Array.from(new Set(questionsRef));
  console.log(questionsRef);
  let toAppend = "";
  let correctAnswer = questions[roundNumber][1];
  selection.push(
    "<div class='answer' >" +
      correctAnswer +
    "<img src='./assets/images/good.png' id='good' class='checked blink hidden' /></div>"
  );
  questionsRef = questionsRef.filter((item) => item !== correctAnswer);
  shuffle(questionsRef);

  for (let i = 1; i < answerAmount ; i++) {
    selection.push(
      "<div class='answer'>" + questionsRef[0]+ "<img src='./assets/images/bad.png' id='bad' class='checked blink hidden' /></div>"
    );
    questionsRef.splice(0, 1);
  }
  document.getElementById("questionBox").innerHTML = 
  "<img id='portrait' src='./assets/images/faces/"+questions[roundNumber][0]+"'>";
  shuffle(selection);
  selection.forEach((element) => {
    document.getElementById("answerBox").innerHTML += element;
  });
  makeButtonsClickable("answer");
}

function makeButtonsClickable(className) {
  var buttons = document.getElementsByClassName(className);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      selectAnswer(this.textContent, this);
    };
  }
}

function selectAnswer(answer, button) {
  document.getElementById("verify").classList.remove("hidden");
  if (document.getElementsByClassName("selected")[0]) {
    document.getElementsByClassName("selected")[0].classList.remove("selected");
  }
  button.classList.add("selected");
}

function verify() {
  let answer = document.getElementsByClassName("selected")[0].textContent;
  if (answer == questions[roundNumber][1]) {
    animateAnswer(true);
    for (let i = 0; i < answerAmount; i++) {
      document.getElementsByClassName("answer")[i].classList.add("disabled");
    }
    document.getElementById("verify").classList.add("hidden");

    if (roundNumber < numberOfRounds - 1) {
      right.play();
      document.getElementById("next").classList.remove("hidden");
    } else {
      finished.play();
      Swal.fire({
        icon: 'success',
        title: 'Buen trabajo',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("restart").classList.remove("hidden");
    }
  } else {
    wrong.play();
    animateAnswer(false);
    document.getElementById("verify").classList.add("hidden");
  }
}

function getInfo() {
  Swal.fire({
    confirmButtonColor: "gray",
    title: info,
    color: "gray"
  });
}

function initButtons() {
  document.getElementById("verify").addEventListener("click", verify);
  document.getElementById("next").addEventListener("click", setRound);
  document.getElementById("info").addEventListener("click", getInfo);
  document.getElementById("restart").addEventListener("click", function () {
    location.reload();
  });
  
}

function animateAnswer(bool) {
  const selected = document.getElementsByClassName("selected")[0];

  if (bool) {
    rightAnswerBlink() 
    setTimeout(() => {
      selected.classList.add("bounce");
    }, 100);
    setTimeout(() => {
      selected.classList.remove("bounce");
    }, 600);
  } else {
    badAnswerBlink()
    setTimeout(() => {
      selected.classList.add("shake");
    }, 100);
    setTimeout(() => {
      selected.classList.remove("shake");
    }, 600);
  }
}


function rightAnswerBlink() {
  document.getElementById("good").classList.remove("hidden");
  setTimeout(() => {
  document.getElementById("good").classList.add("hidden");
  }, 1000);
}
function badAnswerBlink() {
  const selectedIcon = document.getElementsByClassName("selected")[0].lastChild;
  selectedIcon.classList.remove('hidden');
  // document.getElementById("bad").classList.remove("hidden");
  setTimeout(() => {
    selectedIcon.classList.add('hidden');
  // document.getElementById("bad").classList.add("hidden");
  }, 1000);
}