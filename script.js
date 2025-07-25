const songs = [
  { file: "music/song1.mp3", cover: "covers/song1.jpg" },
  { file: "music/song2.mp3", cover: "covers/song2.jpg" },
  { file: "music/song3.mp3", cover: "covers/song3.jpg" },
  { file: "music/song4.mp3", cover: "covers/song4.jpg" },
  { file: "music/song5.mp3", cover: "covers/song5.jpg" }
];
let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  cover.src = song.cover;
  title.textContent = "The Song That Is Playing Now: " + song.file.split("/").pop();
}
function playPause() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶️";
  } else {
    audio.play();
    playBtn.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
}
function nextSong() {
  if (isShuffle) {
    currentIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
  }
  loadSong(currentIndex);
  if (isPlaying) audio.play();
}
function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  if (isPlaying) audio.play();
}
function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffleBtn.style.background = isShuffle ? "#d1b3ff" : "white";
}
function toggleRepeat() {
  isRepeat = !isRepeat;
  repeatBtn.style.background = isRepeat ? "#d1b3ff" : "white";
}
audio.addEventListener("timeupdate", () => {
  const current = audio.currentTime;
  const total = audio.duration;
  progress.value = (current / total) * 100 || 0;
  currentTimeEl.textContent = formatTime(current);
  durationEl.textContent = formatTime(total);
});
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});
function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextSong(); 
  }
});
playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
shuffleBtn.addEventListener("click", toggleShuffle);
repeatBtn.addEventListener("click", toggleRepeat);
loadSong(currentIndex);
