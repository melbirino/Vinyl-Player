const record = document.getElementById('record');
const tonearm = document.getElementById('tonearm');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const audio = document.getElementById('audioPlayer');

const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

let isPlaying = false;
let rotation = 0;
let animationFrameId;

function updatePlayButtonState() {
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

function spinRecord() {
    rotation += 0.5;
    if (rotation >= 360) {
        rotation -= 360;
    }
    record.style.transform = `rotate(${rotation}deg)`;
    animationFrameId = requestAnimationFrame(spinRecord);
}

playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play().catch(error => console.error("Playback failed:", error));
        tonearm.classList.add('active');

        isPlaying = true;
        spinRecord();
    } else {
        audio.pause();

        cancelAnimationFrame(animationFrameId);

        tonearm.classList.remove('active');

        isPlaying = false;
    }
    updatePlayButtonState();
});

stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;

    cancelAnimationFrame(animationFrameId);
    tonearm.classList.remove('active');

    rotation = 0;
    record.style.transform = `rotate(0deg)`;

    isPlaying = false;
    updatePlayButtonState();
});

audio.addEventListener('ended', () => {
    cancelAnimationFrame(animationFrameId);
    tonearm.classList.remove('active');

    rotation = 0;
    record.style.transform = `rotate(0deg)`;

    isPlaying = false;
    updatePlayButtonState();
});