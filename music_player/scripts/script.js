const songList = [
	{
		title: "Love Slow Motion",
		file: "love-slow-motion.mp3",
		cover: "equals.jpg",
	},

	{
		title: "Let It Be Me",
		file: "let_it_be_me.mp3",
		cover: "steve_aoki_let_it_be_me.jpg",
	},

	{
		title: "Penguins",
		file: "penguins.mp3",
		cover: "equals.jpg",
	},

	{
		title: "Happier",
		file: "happier.mp3",
		cover: "divide.jpg",
	},

	{
		title: "10,000 Hours",
		file: "10000-hours.mp3",
		cover: "10000Hours.jpg",
	},
];

// Canción actual
let currentSong = null;

// Capturar elementos del DOM para trabajar con JSON
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const progressContainer = document.getElementById("progress-container");
progressContainer.addEventListener("click", (event) => setProgress(event));
const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");

// Escuchar el elemento <audio>
audio.addEventListener("timeupdate", () => updateProgress());

// Evento click para los controles
play.addEventListener("click", () => (audio.paused ? playSong() : pauseSong()));

prev.addEventListener("click", () => prevSong());
next.addEventListener("click", () => nextSong());

// Cargar canciones y montar el listado
function loadSongs() {
	// Recorrer el array de canciones
	songList.forEach((song, index) => {
		// Crear un elemento <li>
		const li = document.createElement("li");

		// Agregar el elemento <li> al elemento <ul>
		songs.appendChild(li);

		// Crear un elemento <a>
		const a = document.createElement("a");

		// Agregar el elemento <a> al elemento <li>
		li.appendChild(a);

		// Agregar el titulo de la canción al elemento <a>
		a.textContent = song.title;

		// Agregar el atributo href a la cancion
		a.href = "#";

		// Evento click para cargar la cancion
		a.addEventListener("click", () => loadSong(index));
	});
}

// Cargar canción seleccionada
function loadSong(songIndex) {
	if (songIndex !== currentSong) {
		changeActiveClass(currentSong, songIndex);
		currentSong = songIndex;
		audio.src = "../assets/audio/" + songList[songIndex].file;
		playSong();
		changeTitle(songIndex);
		changeCover(songIndex);
		updateProgress();
	}
}

// Actualizar barra de progreso de la canción
function updateProgress() {
	// Total y el actual
	const { duration, currentTime } = audio;

	// Calcular el porcentaje de progreso
	const percent = (currentTime / duration) * 100;

	// Actualizar la barra de progreso
	progress.style.width = `${percent}%`;
}

// Hacer la barra de progreso clickeable
function setProgress(event) {
	const width = event.target.clientWidth;
	const clickX = event.offsetX;
	const percent = (clickX / width) * 100;
	audio.currentTime = (audio.duration / 100) * percent;
}

// Actualizar controles
function updateControls() {
	if (audio.paused) {
		play.classList.remove("fa-pause");
		play.classList.add("fa-play");
	} else {
		play.classList.remove("fa-play");
		play.classList.add("fa-pause");
	}
}

// Reproducir canción
function playSong() {
	if (currentSong !== null) {
		audio.play();
		updateControls();
	}
}

// Pausar canción
function pauseSong() {
	audio.pause();
	updateControls();
}

// Cambiar clase activar
function changeActiveClass(lastIndex, newIndex) {
	const links = document.querySelectorAll("a");
	if (lastIndex !== null) {
		links[lastIndex].classList.remove("active");
	}
	links[newIndex].classList.add("active");
}

// Cambiar el cover de la canción
function changeCover(songIndex) {
	cover.src = "../assets/images/" + songList[songIndex].cover;
}

// Cmbiar el titulo de la canción
function changeTitle(songIndex) {
	title.innerText = songList[songIndex].title;
}

// Anterior canción
function prevSong() {
	if (currentSong > 0) {
		loadSong(currentSong - 1);
	} else {
		loadSong(songList.length - 1);
	}
}

// Siguiente canción
function nextSong() {
	if (currentSong < songList.length - 1) {
		loadSong(currentSong + 1);
	} else {
		loadSong(0);
	}
}

// Lanzar siguiente canción
audio.addEventListener("ended", () => nextSong());

// GO!
loadSongs();
