const timerHolder = document.querySelector("#pomodoro-time");

let isStarted = false;
let timerId = 0;

const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");

startButton.addEventListener("click", () => {
  if (isStarted) {
    stopTimer();
    return;
  }

  timerId = setInterval(() => {
    let [minutes, seconds] = timerHolder.textContent.split(":").map(Number);
    if (seconds > 0) {
      seconds -= 1;
    } else if (minutes > 0) {
      minutes -= 1;
      seconds = 59;
    }
    if (seconds >= 0 && minutes >= 0) {
      timerHolder.textContent = `${format(minutes)}:${format(seconds)}`;
    }
    if (!seconds && !minutes) {
      resetTimer();
    }
  }, 10);
  isStarted = !isStarted;
  startButton.textContent = isStarted ? "stop" : "start";
});

resetButton.addEventListener("click", resetTimer);

function resetTimer() {
  timerHolder.textContent = "25:00";
  stopTimer();
}

function format(val) {
  if (val < 10) {
    return `0${val}`;
  }
  return val;
}

function stopTimer() {
  isStarted = false;
  startButton.textContent = "start";
  clearTimeout(timerId);
}