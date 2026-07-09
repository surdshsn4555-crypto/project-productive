// Get Elements
const taskInput = document.getElementById("task");
const detailInput = document.getElementById("detail");
const importantInput = document.getElementById("imp");
const taskColumn = document.getElementById("taskcolumn");
const addBtn = document.querySelector("button");

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

    // Create Task Card
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md m-5 overflow-hidden";

    card.innerHTML = `
        <!-- Header -->
        <div class="flex justify-between items-center bg-gray-700 text-white p-4">

            <h2 class="font-bold text-lg">
                ${task}
                ${important ? '<span class="text-red-500 text-xl">*</span>' : ""}
            </h2>

            <button class="completeBtn bg-white text-black px-3 py-1 rounded hover:bg-gray-200">
                Complete Task
            </button>

        </div>

        <!-- Body -->
        <div class="flex justify-between items-start p-4">

            <p class="taskDetail">${detail}</p>

            <button class="deleteBtn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                Delete
            </button>

        </div>
    `;

    // Complete Button
    card.querySelector(".completeBtn").addEventListener("click", function () {

        const text = card.querySelector(".taskDetail");

        text.classList.add("line-through", "text-gray-500");

        this.innerText = "Completed";
        this.disabled = true;

        this.classList.remove("bg-white");
        this.classList.add("bg-green-500", "text-white");
    });

    // Delete Button
    card.querySelector(".deleteBtn").addEventListener("click", function () {

        card.remove();

    });

    // Append Card
    taskColumn.appendChild(card);

    // Clear Inputs
    taskInput.value = "";
    detailInput.value = "";
    importantInput.checked = false;
}