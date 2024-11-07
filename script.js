// script.js

let correctLetter = "";
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

// Atualiza o recorde exibido ao iniciar
document.getElementById("record-display").textContent = `Recorde: ${highScore}`;

const keyboardRows = [
  "QWERTYUIOP",
  "ASDFGHJKL",
  "ZXCVBNM"
];

// Gera o teclado
function generateKeyboard() {
  keyboardRows.forEach((row, rowIndex) => {
    const rowContainer = document.getElementById(`row${rowIndex + 1}`);
    for (let letter of row) {
      const letterDiv = document.createElement("div");
      letterDiv.classList.add("letter");
      letterDiv.textContent = letter;
      letterDiv.addEventListener("click", () => checkAnswer(letter));
      rowContainer.appendChild(letterDiv);
    }
  });
}

// Exibe uma nova letra em Libras aleatoriamente
function displayRandomSign() {
  const randomIndex = Math.floor(Math.random() * 26);
  correctLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[randomIndex];
  const signImg = document.getElementById("sign-img");
  signImg.src = `images/${correctLetter}.png`; // Caminho correto para a imagem
  signImg.alt = `Sinal de Libras para a letra ${correctLetter}`;

  // Limpa a mensagem de feedback ao mostrar uma nova letra
  const feedbackMessage = document.getElementById("feedback-message");
  feedbackMessage.textContent = "";
}

// Verifica se a letra selecionada é correta
function checkAnswer(selectedLetter) {
  const feedbackMessage = document.getElementById("feedback-message");
  const correctSound = document.getElementById("correct-sound");
  const wrongSound = document.getElementById("wrong-sound");

  // Verifica se o jogador acertou
  if (selectedLetter === correctLetter) {
    score++;
    document.getElementById("score-display").textContent = `Pontuação: ${score}`;
    
    // Exibe mensagem de acerto
    feedbackMessage.textContent = "Acertou!";
    feedbackMessage.style.color = "green";
    correctSound.play();

    // Atualiza o recorde, se necessário
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      document.getElementById("record-display").textContent = `Recorde: ${highScore}`;
    }

    // Aguarda um momento antes de exibir uma nova letra
    setTimeout(displayRandomSign, 1000); // 1 segundo de atraso para visualizar o feedback
  } else {
    // Exibe mensagem de erro
    feedbackMessage.textContent = "Errou!";
    feedbackMessage.style.color = "red";
    wrongSound.play();
    
    // Finaliza o jogo
    endGame();
  }
}

// Inicia o jogo
function startGame() {
  score = 0;
  document.getElementById("score-display").textContent = `Pontuação: ${score}`;
  document.getElementById("start-button").style.display = "none";
  document.getElementById("restart-button").style.display = "inline";
  displayRandomSign();
}

// Termina o jogo
function endGame() {
  const feedbackMessage = document.getElementById("feedback-message");
  feedbackMessage.textContent = `Fim do jogo! Sua pontuação final foi ${score}.`;
  feedbackMessage.style.color = "blue";
  
  // Mostra o botão de iniciar e oculta o botão de reiniciar
  document.getElementById("start-button").style.display = "inline";
  document.getElementById("restart-button").style.display = "none";
}

// Reinicia o jogo
function restartGame() {
  startGame();
}

// Eventos dos botões
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("restart-button").addEventListener("click", restartGame);

// Gera o teclado ao carregar a página
window.onload = generateKeyboard;
