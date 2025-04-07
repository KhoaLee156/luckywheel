const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const resultText = document.getElementById("result");
const spinsLeftDisplay = document.getElementById("spinsLeft");

const zodiacSigns = [
  "Rat", "Ox", "Tiger", "Rabbit",
  "Dragon", "Snake", "Horse", "Goat",
  "Monkey", "Rooster", "Dog", "Pig"
];

let spinsLeft = 3;
let isSpinning = false;

const spinSound = new Audio("spin.mp3");
const winSound = new Audio("win.mp3");

function updateSpinsDisplay() {
  spinsLeftDisplay.textContent = `Spins Left: ${spinsLeft}`;
}

function getRandomAngle() {
  const base = 360 * 5; // 5 full spins
  const randomDegree = Math.floor(Math.random() * 360);
  return base + randomDegree;
}

function getResultFromAngle(angle) {
  const normalized = angle % 360;
  const index = Math.floor((360 - normalized) / 30) % 12;
  return zodiacSigns[index];
}

spinBtn.addEventListener("click", () => {
  if (isSpinning || spinsLeft <= 0) return;

  isSpinning = true;
  spinsLeft--;
  updateSpinsDisplay();
  resultText.textContent = "Spinning...";

  const angle = getRandomAngle();
  spinSound.play();

  wheel.style.transition = "transform 5s ease-out";
  wheel.style.transform = `rotate(${angle}deg)`;

  setTimeout(() => {
    const result = getResultFromAngle(angle);
    winSound.play();
    resultText.textContent = `You got: ${result}! 🎉`;
    isSpinning = false;
  }, 5200);
});

// Initial display
updateSpinsDisplay();
