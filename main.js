import { questions } from "./questions.js";

let current = 0;
let correctCount = 0; // <-- Zähler für richtige Antworten

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next");

function showQuestion() {
  const q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  resultEl.textContent = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = `${opt.label}) №${opt.value}`;
    btn.onclick = () => checkAnswer(opt.value, btn);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(value, btn) {
  const correct = questions[current].correct;
  const buttons = document.querySelectorAll(".option");

  // Nach der Auswahl die restlichen Schaltflächen blockieren
  buttons.forEach(b => b.disabled = true);

  if (value === correct) {
    resultEl.textContent = "✅ Rechts";
    btn.classList.add("correct");
    correctCount++; // <-- Wir erhöhen den Zähler
  } else {
    resultEl.textContent = `❌ Falsch`;  //№${value} —Das ist nicht die richtige Antwort
    btn.classList.add("wrong");
  }
   // Sperrtasten nach Auswahl
  Array.from(optionsEl.children).forEach(b => b.disabled = true);
}

// Weiter-Schaltfläche
nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "Der Test ist abgeschlossen 🎉";
    resultEl.textContent = `Sie haben richtig geantwortet ${correctCount} von ${questions.length} Fragen`;

    optionsEl.innerHTML = "";
   // resultEl.innerHTML = "";
   // nextBtn.style.display = "none";
     nextBtn.style.display = "none"; //Die Schaltfläche „Weiter“ ausblenden
  }
};

// Erste Frage anzeigen
showQuestion();
