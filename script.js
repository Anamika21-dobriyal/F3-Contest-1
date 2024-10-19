document.getElementById('startTimerBtn').addEventListener('click', startNewTimer);

let timers = [];

function startNewTimer() {
    // Get user input for hours, minutes, seconds
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    // Calculate total time in seconds
    let totalTime = (hours * 3600) + (minutes * 60) + seconds;

    // Validate that time is greater than zero
    if (totalTime <= 0) {
        alert("Please enter a valid time.");
        return;
    }

    // Create a new timer object
    let timer = {
        id: Date.now(),
        timeRemaining: totalTime,
        interval: null
    };

    // Add the timer to the list
    timers.push(timer);

    // Display the timer in the Active Timers section
    displayTimers();

    // Start the countdown for this timer
    startCountdown(timer);
}

function startCountdown(timer) {
    timer.interval = setInterval(() => {
        timer.timeRemaining--;

        if (timer.timeRemaining <= 0) {
            clearInterval(timer.interval);
            timerEnded(timer.id);
        }

        displayTimers();
    }, 1000);
}

function displayTimers() {
    const activeTimers = document.getElementById('activeTimers');
    activeTimers.innerHTML = '';

    timers.forEach(timer => {
        let timerDiv = document.createElement('div');
        timerDiv.className = 'timer';
        if (timer.timeRemaining <= 0) {
            timerDiv.classList.add('timer-end');
        }

        // Convert timeRemaining to hours, minutes, seconds
        let hours = Math.floor(timer.timeRemaining / 3600);
        let minutes = Math.floor((timer.timeRemaining % 3600) / 60);
        let seconds = timer.timeRemaining % 60;

        // Create the display for remaining time
        let timeDisplay = document.createElement('div');
        timeDisplay.className = 'time-remaining';
        timeDisplay.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timerDiv.appendChild(timeDisplay);

        // Create the stop button
        let stopButton = document.createElement('button');
        stopButton.innerText = 'Stop Timer';
        stopButton.addEventListener('click', () => stopTimer(timer.id));
        timerDiv.appendChild(stopButton);

        activeTimers.appendChild(timerDiv);
    });
}

function stopTimer(timerId) {
    timers = timers.filter(timer => timer.id !== timerId);
    displayTimers();
}

function timerEnded(timerId) {
    let alertSound = new Audio('alarm.mp3');
    alertSound.play();

    // Update the timer's display to show it's ended
    displayTimers();
}
