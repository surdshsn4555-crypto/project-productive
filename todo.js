// Get Elements
const taskInput = document.getElementById("task");
const detailInput = document.getElementById("detail");
const importantInput = document.getElementById("imp");
const taskColumn = document.getElementById("taskcolumn");
const addBtn = document.querySelector("button");

// Local Storage Array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load Tasks
window.addEventListener("DOMContentLoaded", () => {
    tasks.forEach(task => createTaskCard(task));
});

// Add Task
addBtn.addEventListener("click", addTask);

function addTask() {

    const task = taskInput.value.trim();
    const detail = detailInput.value.trim();
    const important = importantInput.checked;

    if (task === "" || detail === "") {
        alert("Please enter Task and Detail");
        return;
    }

    const newTask = {
        id: Date.now(),
        task,
        detail,
        important,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();

    createTaskCard(newTask);

    taskInput.value = "";
    detailInput.value = "";
    importantInput.checked = false;
}

// Create Task Card
function createTaskCard(taskData) {

    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md m-5 overflow-hidden";
    card.dataset.id = taskData.id;

    card.innerHTML = `
        <div class="flex justify-between items-center bg-gray-700 text-white p-4">

            <h2 class="font-bold text-lg">
                ${taskData.task}
                ${
                    taskData.important
                        ? '<span class="text-red-500 text-xl">*</span>'
                        : ""
                }
            </h2>

            <button
                class="completeBtn px-3 py-1 rounded
                ${
                    taskData.completed
                        ? "bg-green-500 text-white"
                        : "bg-white text-black hover:bg-gray-200"
                }"
                ${taskData.completed ? "disabled" : ""}
            >
                ${taskData.completed ? "Completed" : "Complete Task"}
            </button>

        </div>

        <div class="flex justify-between items-start p-4">

            <p class="taskDetail ${
                taskData.completed ? "line-through text-gray-500" : ""
            }">
                ${taskData.detail}
            </p>

            <button class="deleteBtn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                Delete
            </button>

        </div>
    `;

    // Complete Task
    card.querySelector(".completeBtn").addEventListener("click", function () {

        taskData.completed = true;
        saveTasks();

        card.querySelector(".taskDetail")
            .classList.add("line-through", "text-gray-500");

        this.innerText = "Completed";
        this.disabled = true;

        this.classList.remove("bg-white", "text-black");
        this.classList.add("bg-green-500", "text-white");
    });

    // Delete Task
    card.querySelector(".deleteBtn").addEventListener("click", function () {

        tasks = tasks.filter(task => task.id != taskData.id);

        saveTasks();

        card.remove();
    });

    taskColumn.appendChild(card);
}

// Save to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}