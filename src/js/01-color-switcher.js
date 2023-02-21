const startBtn = document.querySelector('button[data-start');
const stopBtn = document.querySelector('button[data-stop');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  setSwitcherInterval();
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});

setCurrentColor();

function setSwitcherInterval() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    localStorage.setItem('current-color', getRandomHexColor());
  }, 1000);
}

function setCurrentColor() {
  document.body.style.backgroundColor = localStorage.getItem('current-color');
  localStorage.clear();
}
