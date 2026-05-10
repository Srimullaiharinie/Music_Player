const songs = [

{
    title:"Blinding Lights",
    artist:"The Weeknd",
    src:"songs/song1.mp3",
    cover:"images/cover1.jpg"
},

{
    title:"Faded",
    artist:"Alan Walker",
    src:"songs/song2.mp3",
    cover:"images/cover2.jpg"
},

{
    title:"Closer",
    artist:"Chainsmokers",
    src:"songs/song3.mp3",
    cover:"images/cover3.jpg"
}

];

const audio =
document.getElementById("audio");

const title =
document.getElementById("title");

const artist =
document.getElementById("artist");

const cover =
document.getElementById("cover");

const playBtn =
document.getElementById("play");

const nextBtn =
document.getElementById("next");

const prevBtn =
document.getElementById("prev");

const progress =
document.getElementById("progress");

const progressContainer =
document.getElementById("progress-container");

const currentTimeEl =
document.getElementById("current-time");

const durationEl =
document.getElementById("duration");

const volume =
document.getElementById("volume");

const playlist =
document.getElementById("playlist");

let songIndex = 0;

let isPlaying = false;

/* LOAD SONG */

function loadSong(song){

    title.innerText = song.title;

    artist.innerText = song.artist;

    cover.src = song.cover;

    audio.src = song.src;
}

loadSong(songs[songIndex]);

/* PLAY */

function playSong(){

    isPlaying = true;

    audio.play();

    playBtn.innerHTML =
    `<i class="fa-solid fa-pause"></i>`;
}

/* PAUSE */

function pauseSong(){

    isPlaying = false;

    audio.pause();

    playBtn.innerHTML =
    `<i class="fa-solid fa-play"></i>`;
}

playBtn.addEventListener("click",()=>{

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
});

/* NEXT */

function nextSong(){

    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

/* PREV */

function prevSong(){

    songIndex--;

    if(songIndex < 0){
        songIndex =
        songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

nextBtn.addEventListener("click",nextSong);

prevBtn.addEventListener("click",prevSong);

/* PROGRESS */

audio.addEventListener(
"timeupdate",
updateProgress
);

function updateProgress(e){

    const {
        duration,
        currentTime
    } = e.srcElement;

    const progressPercent =
    (currentTime / duration) * 100;

    progress.style.width =
    `${progressPercent}%`;

    /* DURATION */

    let durationMin =
    Math.floor(duration / 60);

    let durationSec =
    Math.floor(duration % 60);

    if(durationSec < 10){
        durationSec =
        `0${durationSec}`;
    }

    if(durationSec){
        durationEl.innerText =
        `${durationMin}:${durationSec}`;
    }

    /* CURRENT */

    let currentMin =
    Math.floor(currentTime / 60);

    let currentSec =
    Math.floor(currentTime % 60);

    if(currentSec < 10){
        currentSec =
        `0${currentSec}`;
    }

    currentTimeEl.innerText =
    `${currentMin}:${currentSec}`;
}

/* SET PROGRESS */

progressContainer.addEventListener(
"click",
setProgress
);

function setProgress(e){

    const width =
    this.clientWidth;

    const clickX =
    e.offsetX;

    const duration =
    audio.duration;

    audio.currentTime =
    (clickX / width) * duration;
}

/* VOLUME */

volume.addEventListener("input",(e)=>{

    audio.volume =
    e.target.value;
});

/* AUTOPLAY */

audio.addEventListener(
"ended",
nextSong
);

/* PLAYLIST */

songs.forEach((song,index)=>{

    const div =
    document.createElement("div");

    div.classList.add(
    "playlist-item"
    );

    div.innerHTML = `

    <img src="${song.cover}">

    <div>

      <h4>${song.title}</h4>

      <p>${song.artist}</p>

    </div>

    `;

    div.addEventListener(
    "click",
    ()=>{

        songIndex = index;

        loadSong(
        songs[songIndex]
        );

        playSong();
    });

    playlist.appendChild(div);
});