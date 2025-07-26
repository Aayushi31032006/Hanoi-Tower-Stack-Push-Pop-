const pegs = {
  A: document.getElementById("A"),
  B: document.getElementById("B"),
  C: document.getElementById("C")
};

const diskClasses = ["disk1", "disk2", "disk3", "disk4", "disk5"];
const moveList = document.getElementById("steps");
const sound = document.getElementById("move-sound");

let moves = [];

function moveHanoi(n, from, to, aux) {
  if (n === 1) {
    moves.push([from, to]);
  } else {
    moveHanoi(n - 1, from, aux, to);
    moves.push([from, to]);
    moveHanoi(n - 1, aux, to, from);
  }
}

function setupDisks() {
  pegs.A.innerHTML = '<span class="label">A</span>';
  pegs.B.innerHTML = '<span class="label">B</span>';
  pegs.C.innerHTML = '<span class="label">C</span>';
  for (let i = 0; i < diskClasses.length; i++) {
    const disk = document.createElement("div");
    disk.classList.add("disk", diskClasses[i]);
    pegs.A.appendChild(disk);
  }
  moveList.innerHTML = "";
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateMoves() {
  let step = 1;
  for (const [from, to] of moves) {
    const fromPeg = pegs[from];
    const toPeg = pegs[to];
    const disk = fromPeg.querySelector(".disk:last-of-type");
    if (!disk) continue;

    // Log move
    const log = document.createElement("div");
    log.textContent = `Step ${step++}: Move disk from ${from} ➜ ${to}`;
    moveList.appendChild(log);
    moveList.scrollTop = moveList.scrollHeight;

    // Play sound
    sound.currentTime = 0;
    sound.play();

    // Move disk
    toPeg.appendChild(disk);
    await delay(800);
  }
}

function startHanoi() {
  setupDisks();
  moves = [];
  moveHanoi(5, "A", "C", "B");
  animateMoves();
}
