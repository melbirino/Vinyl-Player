const record = document.getElementById('record');
const tonearm = document.getElementById('tonearm');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const audio = document.getElementById('audioPlayer');

let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play();
        
        record.classList.add('spinning');
        tonearm.classList.add('playing');
        playBtn.textContent = 'Pause';
        isPlaying = true;
    } else {
        audio.pause();
        
        record.classList.remove('spinning');
        playBtn.textContent = 'Play';
        isPlaying = false;
    }
});

stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    
    record.classList.remove('spinning');
    tonearm.classList.remove('playing');
    playBtn.textContent = 'Play';
    isPlaying = false;
});

audio.addEventListener('ended', () => {
    record.classList.remove('spinning');
    tonearm.classList.remove('playing');
    playBtn.textContent = 'Play';
    isPlaying = false;
});