let timer;
let startTime;
let pausedTime = 0;
let running = false;

const display = document.querySelector('.display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.querySelector('.laps');

function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    const elapsedTime = pausedTime + (running ? Date.now() - startTime : 0);
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!running) {
        running = true;
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(timer);
        pausedTime += Date.now() - startTime;
        updateDisplay();
    }
}

function resetTimer() {
    running = false;
    clearInterval(timer);
    startTime = null;
    pausedTime = 0;
    updateDisplay();
    lapsList.innerHTML = '';
}

function lapTimer() {
    if (running) {
        const lapTime = Date.now() - startTime + pausedTime;
        const lapItem = document.createElement('li');
        lapItem.textContent = formatTime(lapTime);
        lapsList.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
