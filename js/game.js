const questions = [
  { room: "PANEL DE ENERGÍA", q: "¿Cuánto es 36 ÷ 4 + 7 × 2?", a: ["23", "32", "20", "18"], c: 0, why: "Primero división y multiplicación: 36 ÷ 4 = 9 y 7 × 2 = 14. Luego 9 + 14 = 23." },
  { room: "PUERTA DE LOS NÚMEROS", q: "Un objeto cuesta 240 monedas y tiene un descuento del 25%. ¿Cuánto se descuenta?", a: ["40 monedas", "50 monedas", "60 monedas", "80 monedas"], c: 2, why: "El 25% es la cuarta parte: 240 ÷ 4 = 60 monedas." },
  { room: "SECUENCIA SECRETA", q: "¿Qué número continúa la secuencia? 5, 10, 20, 40, ...", a: ["45", "60", "70", "80"], c: 3, why: "Cada término se obtiene multiplicando el anterior por 2: 40 × 2 = 80." },
  { room: "LABORATORIO", q: "Si 3x + 5 = 20, ¿cuánto vale x?", a: ["3", "5", "7", "15"], c: 1, why: "Restamos 5 a ambos lados: 3x = 15. Dividimos entre 3: x = 5." },
  { room: "CÓDIGO DE GEOMETRÍA", q: "Un rectángulo mide 8 cm de largo y 5 cm de ancho. ¿Cuál es su área?", a: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"], c: 2, why: "El área del rectángulo es largo × ancho: 8 × 5 = 40 cm²." },
  { room: "SALA DE FRACCIONES", q: "¿Cuál es el resultado de 1/2 + 1/4?", a: ["2/6", "3/4", "1/8", "2/4"], c: 1, why: "1/2 equivale a 2/4. Entonces 2/4 + 1/4 = 3/4." },
  { room: "REACTOR CENTRAL", q: "Un número negativo se multiplica por otro número negativo. ¿El resultado es...?", a: ["Negativo", "Cero siempre", "Positivo", "No se puede saber"], c: 2, why: "El producto de dos números negativos es positivo." },
  { room: "PUZZLE DE POTENCIAS", q: "¿Cuánto vale 2⁴ + 3²?", a: ["17", "20", "25", "49"], c: 2, why: "2⁴ = 16 y 3² = 9. La suma es 25." },
  { room: "BALANZA DEL TESORO", q: "Si 5 cuadernos cuestan 150 monedas, ¿cuánto cuestan 2 al mismo precio?", a: ["30 monedas", "50 monedas", "60 monedas", "75 monedas"], c: 2, why: "Cada cuaderno cuesta 150 ÷ 5 = 30. Dos cuestan 30 × 2 = 60." },
  { room: "CÓDIGO FINAL", q: "Un cofre tiene 120 gemas. Se reparten por igual entre 6 exploradores y cada uno entrega 3. ¿Cuántas gemas conserva cada uno?", a: ["15", "17", "20", "23"], c: 1, why: "120 ÷ 6 = 20. Luego 20 − 3 = 17 gemas." }
];

let current = 0, score = 0, attempts = 0, locked = false;
const $ = id => document.getElementById(id);
const icons = ["🔐", "🚪", "🔢", "🧪", "📐", "🧩", "⚡", "🔮", "⚖️", "🗝️"];

function renderQuestion() {
  locked = false;
  $("progressText").textContent = `Mecanismo ${current + 1} de 10`;
  $("scoreText").textContent = `⭐ Puntos: ${score}`;
  $("livesText").textContent = `Intentos: ${attempts}`;
  $("fill").style.width = `${current / 10 * 100}%`;
  $("vault").textContent = icons[current];
  $("kicker").textContent = questions[current].room;
  $("question").textContent = questions[current].q;
  $("answers").innerHTML = "";
  $("feedback").className = "feedback";
  $("feedback").textContent = "Elige una respuesta para activar el mecanismo.";
  $("next").style.display = "none";

  questions[current].a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
    button.addEventListener("click", () => chooseAnswer(index));
    $("answers").appendChild(button);
  });
}

function chooseAnswer(index) {
  if (locked) return;
  attempts++;
  $("livesText").textContent = `Intentos: ${attempts}`;
  const correct = index === questions[current].c;
  const buttons = [...$("answers").children];

  if (correct) {
    locked = true;
    score += 10;
    $("scoreText").textContent = `⭐ Puntos: ${score}`;
    $("feedback").className = "feedback good";
    $("feedback").textContent = `✓ ¡Mecanismo desbloqueado! ${questions[current].why}`;
    buttons.forEach(button => button.disabled = true);
    buttons[index].style.borderColor = "#31c98a";
    buttons[index].style.background = "#155b4c";
    $("next").textContent = current === 9 ? "ABRIR EL COFRE 🏆" : "SIGUIENTE MECANISMO →";
    $("next").style.display = "block";
  } else {
    $("feedback").className = "feedback bad";
    $("feedback").textContent = "✕ Esa no es la respuesta. Prueba otra vez: el mecanismo sigue bloqueado.";
    buttons[index].disabled = true;
    buttons[index].style.borderColor = "#ff9b71";
  }
}

function finishGame() {
  $("fill").style.width = "100%";
  $("progressText").textContent = "Misión completada";
  $("vault").textContent = "🏆";
  $("card").innerHTML = `
    <div class="result">
      <div class="treasure">💎</div>
      <h2>¡TESORO DESBLOQUEADO!</h2>
      <p>¡Lo lograste! Superaste los 10 mecanismos de la Cámara del Tesoro.<br>
      <strong>Tu puntuación: ${score} de 100 puntos</strong><br>
      Respuestas correctas: ${score / 10} de 10<br>
      Intentos realizados: ${attempts}</p>
      <p>${score === 100 ? "¡Perfecto! Eres un maestro de los desafíos matemáticos." :
        score >= 70 ? "¡Muy buen trabajo, explorador!" :
        "¡Misión cumplida! Sigue practicando y cada vez lo harás mejor."}</p>
      <button class="restart" id="restart" type="button">JUGAR OTRA VEZ ↻</button>
    </div>`;
  $("restart").addEventListener("click", () => location.reload());
}

$("next").addEventListener("click", () => {
  if (current < 9) { current++; renderQuestion(); }
  else finishGame();
});

renderQuestion();
