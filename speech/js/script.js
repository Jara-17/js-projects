// Init Speach Synth
const message = new SpeechSynthesisUtterance();
let voices = [];

// Get available voices

speechSynthesis.addEventListener("voiceschanged", () => {
	const voices = speechSynthesis.getVoices();
	loadVoice(voices);
});

// DOM Elements
const quotesElement = document.querySelector(".quotes");
const custom = document.querySelector(".custom");
const selectElement = document.querySelector(".custom-select");
const textareaElement = document.querySelector(".custom-textarea");

// Lead select with voices
function loadVoice(voices) {
	voices.forEach((voice) => {
		const { name, lang } = voice;
		const optionElement = document.createElement("option");
		optionElement.innerText = `${name} - ${lang}`;
		optionElement.value = name;
		selectElement.appendChild(optionElement);
	});
}

// Listen for change event on select element
selectElement.addEventListener("change", (e) => {
	const name = e.target.value;
	message.voice = speechSynthesis
		.getVoices()
		.find((voice) => voice.name === name);
});

// Function to speak the text
custom.addEventListener("submit", (e) => {
	const customText = textareaElement.value;
	message.text = customText;
	speechSynthesis.speak(message);
	e.preventDefault();
});

// App data
const quotes = [
	{
		text: "Te conviertes en lo que le das a tu atención»",
		author: "Epictecto",
	},
	{
		text: "«Las obras se tienen medio terminadas cuando se han comenzado bien.» ",
		author: "Séneca",
	},
	{
		text: "«Es esencial que recuerdes que la atención que le des a cualquier acción debe ser proporcional a su valor.»",
		author: "Marco Aurelio",
	},
	{
		text: "«No nos atrevemos a muchas cosas porque son difíciles, pero son difíciles porque no nos atrevemos a hacerlas».",
		author: "Séneca",
	},
	{
		text: "«Si logras algo bueno con trabajo duro, el trabajo pasa rápido, pero el bien perdura. Si haces algo vergonzoso en busca del placer, el placer pasa rápidamente, pero la vergüenza perdura.»",
		author: "Musonio Rufo",
	},
	{
		text: "«No te sabotees a ti mismo adoptando involuntariamente actitudes negativas e improductivas a través de tus relaciones con otros.»",
		author: "Epictecto",
	},
	{
		text: "«No hay viento favorable para el que no sabe donde va.»",
		author: "Séneca",
	},
	{
		text: "«¿No sabes que un buen hombre no hace nada por las apariencias, sino por hacer lo correcto?» ",
		author: "Epictecto",
	},
	{
		text: "«La mayoría de lo que hacemos y decimos no es esencial. Pregúntate en cada momento, ¿es esto necesario?» ",
		author: "Marco Aurelio",
	},
	{
		text: "«No es que tengamos poco tiempo, sino que perdemos mucho.»",
		author: "Séneca",
	},
	{
		text: "«Toma este momento. Sumérgete en sus detalles. Responde a esta persona, este desafío, esta acción. Deja las evasiones.» ",
		author: "Epictecto",
	},
	{
		text: "«En cada momento mantén la atención en la tarea que tienes entre manos. Realiza cada tarea como si fuera la última, evitando la distracción, el drama, la vanidad y la queja por tu situación.» ",
		author: "Marco Aurelio",
	},
	{
		text: "«Lo innecesario, aunque cueste solo un poco, es caro».",
		author: "Séneca",
	},
	{
		text: "«Que no te arrastren los accidentes exteriores; procúrate tiempo libre para aprender algo bueno y cesa ya de girar como un trompo.»  ",
		author: "Marco Aurelio",
	},
	{
		text: "«Largo es el camino de la enseñanza por medio de teorías; breve y eficaz por medio de la práctica»",
		author: "Séneca",
	},
];

// Lead quotes in the DOM
quotes.forEach((quote) => {
	const { text, author } = quote;
	const quoteTemplate = `
    <section class="quote">
      <h2 class="quote-text">${text}</h2>
      <h4 class="quote-author">${author}</h4>
    </section>
  `;
	quotesElement.innerHTML += quoteTemplate;
});

// Listen for click on quotes
const quotesCollection = document.querySelectorAll(".quote");
quotesCollection.forEach((quotesElement) => {
	quotesElement.addEventListener("click", (event) => {
		message.text = event.target.innerText;
		speechSynthesis.speak(message);
	});
});

// Listen for error

try {
	const name = "Juan";
	name = "Andrés";
} catch (error) {
	console.log(error.message);
	message.text = error.message;
	speechSynthesis.speak(message);
}
