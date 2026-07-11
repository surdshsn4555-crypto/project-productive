// Get Elements
const taskInput = document.getElementById("task");
const detailInput = document.getElementById("detail");
const taskColumn = document.getElementById("taskcolumn");
const addBtn = document.querySelector("button");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

// Load Goals on Page Load
window.addEventListener("DOMContentLoaded", () => {
    goals.forEach(goal => createGoalCard(goal));
});

addBtn.addEventListener("click", addGoal);

// Add Goal
function addGoal() {
    const title = taskInput.value.trim();
    const detail = detailInput.value.trim();

    if (title === "" || detail === "") {
        alert("Please enter Goal and Detail");
        return;
    }

    const goal = {
        id: Date.now(),
        title,
        detail,
        completed: false
    };

    goals.push(goal);
    saveGoals();

    createGoalCard(goal);

    taskInput.value = "";
    detailInput.value = "";
}

// Create Goal Card
function createGoalCard(goal) {

    const goalCard = document.createElement("div");
    goalCard.className = "bg-white rounded-lg shadow-md m-5 overflow-hidden";
    goalCard.dataset.id = goal.id;

    goalCard.innerHTML = `
        <div class="flex justify-between items-center bg-gray-700 text-white p-4">
            <h2 class="font-bold text-lg">${goal.title}</h2>

            <button class="deleteBtn bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                Delete
            </button>
        </div>

        <div class="p-4">
            <p class="goalDetail ${goal.completed ? "line-through text-gray-500" : ""}">
                ${goal.detail}
            </p>

            <button
                class="completeBtn px-4 py-2 rounded
                ${
                    goal.completed
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 hover:bg-yellow-500"
                }"
                ${goal.completed ? "disabled" : ""}
            >
                ${goal.completed ? "Completed" : "Mark Goal"}
            </button>
        </div>
    `;

    // Delete Goal
    goalCard.querySelector(".deleteBtn").addEventListener("click", () => {

        goals = goals.filter(g => g.id != goal.id);

        saveGoals();

        goalCard.remove();
    });

    // Mark Complete
    goalCard.querySelector(".completeBtn").addEventListener("click", function () {

        goal.completed = true;

        saveGoals();

        const text = goalCard.querySelector(".goalDetail");

        text.classList.add("line-through", "text-gray-500");

        this.innerText = "Completed";
        this.disabled = true;

        this.classList.remove("bg-yellow-400", "hover:bg-yellow-500");
        this.classList.add("bg-green-500", "text-white");
    });

    taskColumn.appendChild(goalCard);
}

// Save to Local Storage
function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(goals));
}