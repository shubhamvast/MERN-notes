// let timer = document.getElementById("timer")

let intervalId = setInterval(updateTime, 1000);

function updateTime() {
  let time = document.getElementById("timer");
  time.innerHTML = new Date().toLocaleTimeString();
}

function stopTimer() {
  clearInterval(intervalId);
}

let stop = document.getElementById("stop");

stop.onclick = stopTimer;

function statAgain() {
  intervalId = setInterval(updateTime, 1000);
}
let start = document.getElementById("start");

start.onclick = statAgain;
