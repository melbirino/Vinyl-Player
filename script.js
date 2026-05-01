const record = document.getElementById('record');
const tonearm = document.getElementById('tonearm');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');

let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        record.classList.add('spinning');
        tonearm.classList.add('playing');
        playBtn.textContent = 'Pause';
        isPlaying = true;
    } else {
        record.classList.remove('spinning');
        playBtn.textContent = 'Play';
        isPlaying = false;
    }
});

stopBtn.addEventListener('click', () => {
    record.classList.remove('spinning');
    tonearm.classList.remove('playing');
    playBtn.textContent = 'Play';
    isPlaying = false;
});