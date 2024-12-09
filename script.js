const bdayMSGText = `Hello Alex,<br><br>
Happiest birthday sayooo. OMYGOD 21 ka naaa, certified adult ka na talaga bhiee. I know things have been tough, but I want you to know that there 
is always somebody that supports you and proud of you, that includes me. Meron ka laging kadamay, hinding hindi ka mawawalan ng mga shoulder 
to cry on. <br><br>

Kahit 21 ka na, there is still many more things to enjoy in life. It's not called "young adult" for nothing, so don't forget to enjoy life. 
I know hindi me masyadong expressive sa messages, but I want to try giving my all in this message. If you need, kadamay, kachikahan, kabardagulan 
and more, you can always contact me.<br><br>

In other words, andito lang ako palagi for you if you need me. Anyways, I really appreciate you taking time and effort to read my message 
and I hope you'll enjoy the rest of your day! Happy birthday ALEXX!<br><br>

Yours Sincerely,<br>
Eli`;

document.getElementById('bdayMSG').innerHTML = bdayMSGText;

const audio = document.getElementById('voiceAudio');
const seekBar = document.getElementById('seekBar');
const timeLabel = document.getElementById('timeLabel');
const volumeSlider = document.getElementById('volumeSlider');
const bgMusic = document.getElementById('bgMusic');


bgMusic.volume = 0.05;
bgMusic.play(); 


audio.addEventListener('timeupdate', updateSeekBar);
audio.addEventListener('loadedmetadata', () => {
    seekBar.max = 100; 
    updateSeekBar(); 
});

function toggleAudio(event) {
    const audioElement = document.querySelector('.audio');
    const button = event.target;
    button.style.transform = 'translateY(-10px)';

    setTimeout(() => {
        button.style.transform = 'translateY(0)';
        if (audioElement.style.display === 'none' || audioElement.style.display === '') {
            audioElement.style.display = 'block'; 
            playAudio(); 
        } else {
            audioElement.style.display = 'none'; 
            pauseAudio(); 
        }
    }, 300); 
}

function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

function updateSeekBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    seekBar.value = progress;

    // Update time label
    const currentTime = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    timeLabel.textContent = `${currentTime} / ${duration}`;
}

function setAudioTime() {
    const newTime = (seekBar.value * audio.duration) / 100;
    audio.currentTime = newTime;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Volume control functions
function toggleVolume() {
    if (audio.volume > 0) {
        audio.volume = 0; // Mute
        document.getElementById('volumeIcon').classList.remove('fa-volume-up');
        document.getElementById('volumeIcon').classList.add('fa-volume-mute');
        volumeSlider.value = 0; // Update slider
    } else {
        audio.volume = 1; // Unmute
        document.getElementById('volumeIcon').classList.remove('fa-volume-mute');
        document.getElementById('volumeIcon').classList.add('fa-volume-up');
        volumeSlider.value = 100; // Update slider
    }
}

function setVolume() {
    audio.volume = volumeSlider.value / 100; 
}

function toggleBgMusic() {
    if (bgMusic.paused) {
        bgMusic.play(); // Play background music
        document.getElementById('bgMusicIcon').classList.remove('fa-volume-mute');
        document.getElementById('bgMusicIcon').classList.add('fa-volume-up'); 
    } else {
        bgMusic.pause(); // Pause background music
        document.getElementById('bgMusicIcon').classList.remove('fa-volume-up');
        document.getElementById('bgMusicIcon').classList.add('fa-volume-mute'); 
    }
}


bgMusic.addEventListener('ended', () => {
    bgMusic.currentTime = 0; 
    bgMusic.play(); 
});
