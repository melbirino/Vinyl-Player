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

function setTonearmPosition(shouldBeActive) {
    if (shouldBeActive) {
        tonearm.classList.add('active');
    } else {
        tonearm.classList.remove('active');
    }
}

playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play().catch(error => console.error("Playback failed:", error));
        setTonearmPosition(true);

        isPlaying = true;
        spinRecord();
    } else {
        audio.pause();
        cancelAnimationFrame(animationFrameId);
        setTonearmPosition(false);

        isPlaying = false;
    }
    updatePlayButtonState();
});

stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;

    cancelAnimationFrame(animationFrameId);
    setTonearmPosition(false);

    rotation = 0;
    record.style.transform = `rotate(0deg)`;

    isPlaying = false;
    updatePlayButtonState();
});

audio.addEventListener('ended', () => {
    cancelAnimationFrame(animationFrameId);
    setTonearmPosition(false);

    rotation = 0;
    record.style.transform = `rotate(0deg)`;

    isPlaying = false;
    updatePlayButtonState();
});