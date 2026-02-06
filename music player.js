const playlist = [
    { title: "Apne dil se Mera Haq Mitane Lage", artist: "Arijit Singh Asad khan", duration: "4:22", src: "songs/song1.mp3" },
    { title: "Bulleya", artist: "Arijit Singh", duration: "4:49", src: "songs/song2.mp3" },
    { title: "Baatain ye Kabi na Tu Bolna", artist: "Arijit Singh", duration: "4:29", src: "songs/song3.mp3" },
    { title: "Ashkon main hai yadein Teri", artist: "Arijit Singh", duration: "3:43", src: "songs/song4.mp3" },
    { title: "Bol Do Na Zara", artist: "Atif Aslam", duration: "3:49", src: "songs/song5.mp3" },
    { title: "Chahun Main Ya Na", artist: "Arman Malik", duration: "5:04", src: "songs/song6.mp3" },
    { title: "Gal Sun", artist: "Vishal Mishra", duration: "4:47", src: "songs/song7.mp3" },
    { title: "Humdum Hai jana", artist: "Kishor kumar", duration: "5:03", src: "songs/song8.mp3" },
    { title: "Mery Sapno Ke Rani", artist: "Arijit Singh", duration: "4:29", src: "songs/song9.mp3" },
    { title: "Tum Hi Ho", artist: "Sabat Batin", duration: "4:59", src: "songs/song10.mp3" }
];

const audio = document.getElementById('audio');
const playlistUl = document.getElementById('playlist');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const volumeSlider = document.getElementById('volume');

let currentSongIndex = 0;

// Initialize Playlist UI
function initPlaylist() {
    playlistUl.innerHTML = '';
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${song.title}</span> <span>${song.duration}</span>`;
        li.addEventListener('click', () => playSong(index));
        playlistUl.appendChild(li);
    });
    updateActiveSong();
}

function playSong(index) {
    currentSongIndex = index;
    audio.src = playlist[index].src; // Fixed pathing
    audio.play();
    updateActiveSong();
    playPauseBtn.textContent = 'Pause';
}

function updateActiveSong() {
    document.querySelectorAll('#playlist li').forEach((li, index) => {
        li.classList.toggle('active', index === currentSongIndex);
    });
}

// Controls
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        if (!audio.src) playSong(0); // Load first song if none loaded
        else audio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    }
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(currentSongIndex);
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    playSong(currentSongIndex);
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
    }
});

progressBar.addEventListener('click', (e) => {
    const clickX = e.offsetX;
    const width = progressBar.clientWidth;
    audio.currentTime = (clickX / width) * audio.duration;
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Auto-play next song
audio.addEventListener('ended', () => {
    nextBtn.click();
});

initPlaylist();