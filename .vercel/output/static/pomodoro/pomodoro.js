let timer; // 타이머 식별자
let minutes = 25; // 초기 설정: 분
let seconds = 0; // 초기 설정: 초
let isPaused = false; // 일시 정지 여부

/**
 * 타이머 시작 함수
 */
function startTimer() {
    if (!timer) {
        timer = setInterval(updateTimer, 1000);
    }
}

/**
 * 타이머 업데이트 함수
 */
function updateTimer() {
    if (!isPaused) {
        if (minutes === 0 && seconds === 0) {
            stopTimer();
            alert("Pomodoro session is over!");
        } else {
            updateRemainingTime();
            updateDisplay();
        }
    }
}

/**
 * 남은 시간을 업데이트하는 함수
 */
function updateRemainingTime() {
    if (seconds === 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
}

/**
 * 타이머 정지 함수
 */
function stopTimer() {
    clearInterval(timer);
    timer = null;
}

/**
 * 타이머 일시 정지/재개 함수
 */
function pauseTimer() {
    isPaused = !isPaused;
}

/**
 * 타이머 초기화 함수
 */
function resetTimer() {
    stopTimer();
    minutes = 25;
    seconds = 0;
    isPaused = false;
    updateDisplay();
}

/**
 * 화면에 시간을 업데이트하는 함수
 */
function updateDisplay() {
    const formattedMinutes = padZero(minutes);
    const formattedSeconds = padZero(seconds);
    document.getElementById('timer').textContent = `${formattedMinutes}:${formattedSeconds}`;
}

/**
 * 주어진 값이 10 미만일 경우 앞에 0을 추가하는 함수
 * @param {number} value - 포맷팅할 값
 * @returns {string} - 포맷팅된 값
 */
function padZero(value) {
    return value < 10 ? '0' + value : value;
}

// 초기 화면 업데이트
updateDisplay();
