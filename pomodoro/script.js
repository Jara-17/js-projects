const Tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const addbtn = document.getElementById("addbtn");
const itTask = document.getElementById("itTask");
const form = document.getElementById("form");
const taskName = document.querySelector("#time #taskName");

renderTime();
renderTasks();

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (itTask.value != "") {
		createTask(itTask.value);
		itTask.value = "";
		renderTasks();
	}
});

function createTask(value) {
	const newTask = {
		id: (Math.random() * 100).toString(36).slice(3),
		title: value,
		completed: false,
	};

	Tasks.unshift(newTask);
}

function renderTasks() {
	const HTML = Tasks.map((task) => {
		return `
      <div class="task">
        <div class="completed">${
					task.completed
						? `<span class="done">Done</span>`
						: `<button class="start-button" data-id="${task.id}">Start</button>`
				}</div>
        <div class="title">${task.title}</div>
      </div>
    `;
	});

	const tasksContainer = document.getElementById("tasks");
	tasksContainer.innerHTML = HTML.join("");

	const btnStart = document.querySelectorAll(".task .start-button");
	btnStart.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			if (!timer) {
				const id = btn.getAttribute("data-id");
				startButtonHandler(id);
				btn.textContent = "In progress...";
			}
		});
	});
}

function startButtonHandler(id) {
	time = 25 * 60;
	current = id;
	const taskIndex = Tasks.findIndex((task) => task.id === id);

	taskName.textContent = Tasks[taskIndex].title;
	renderTime();
	timer = setInterval(() => {
		timeHandler(id);
	}, 1000);
}

function timeHandler(id) {
	time--;
	renderTime();

	if (time == 0) {
		clearInterval(timer);
		markCompleted(id);
		timer = null;
		renderTasks();
		startBreak();
	}
}

function startBreak(id) {
	time = 5 * 60;
	taskName.textContent = "Break";
	renderTime();
	timerBreak = setInterval(() => {
		timerBreakHandler();
	}, 1000);
}

function timerBreakHandler() {
	time--;
	renderTime();

	if (time == 0) {
		clearInterval(timerBreak);
		current = null;
		timerBreak = null;
		taskName.textContent = "";
		renderTasks();
	}
}

function renderTime() {
	const timeDiv = document.querySelector("#time #value");
	const minutes = parseInt(time / 60);
	const seconds = parseInt(time % 60);

	timeDiv.textContent = `${minutes < 10 ? "0" : ""} ${minutes} : ${
		seconds < 10 ? "0" : ""
	} ${seconds}`;
}

function markCompleted(id) {
	const taskIndex = Tasks.findIndex((task) => task.id === id);
	Tasks[taskIndex].completed = true;
}
