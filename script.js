const record = document.getElementById('record');
const tonearm = document.getElementById('tonearm');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const audio = document.getElementById('audioPlayer');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

let isPlaying = false;

function updatePlayButtonState() {
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        playBtn.setAttribute('aria-label', 'Пауза');
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        playBtn.setAttribute('aria-label', 'Воспроизвести');
    }
}

function stopPlayback(resetTime) {
    audio.pause();
    if (resetTime) audio.currentTime = 0;
    record.classList.remove('playing');
    tonearm.classList.remove('active');
    isPlaying = false;
    updatePlayButtonState();
}

playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                record.classList.add('playing');
                tonearm.classList.add('active');
                isPlaying = true;
                updatePlayButtonState();
            }).catch(error => {
                if (error.name === 'NotAllowedError') {
                    alert('Браузер заблокировал автовоспроизведение. Нажмите кнопку еще раз.');
                }
            });
        }
    } else {
        stopPlayback(false);
    }
});

stopBtn.addEventListener('click', () => {
    stopPlayback(true);
});

audio.addEventListener('ended', () => {
    stopPlayback(false);
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        playBtn.click();
    }
});