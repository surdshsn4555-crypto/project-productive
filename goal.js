// Get Elements
const taskInput = document.getElementById("task");
const detailInput = document.getElementById("detail");
const taskColumn = document.getElementById("taskcolumn");
const addBtn = document.querySelector("button");

addBtn.addEventListener("click", addGoal);

// Add Goal Function
function addGoal() {
    const title = taskInput.value.trim();
    const detail = detailInput.value.trim();

    if (title === "" || detail === "") {
        alert("Please enter Goal and Detail");
        return;
    }

    // Create Goal Card
    const goalCard = document.createElement("div");
    goalCard.className = "bg-white rounded-lg shadow-md m-5 overflow-hidden";

    goalCard.innerHTML = `
        <!-- Header -->
        <div class="flex justify-between items-center bg-gray-700 text-white p-4">
            <h2 class="font-bold text-lg">${title}</h2>

            <button class="deleteBtn bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                Delete
            </button>
        </div>

        <!-- Body -->
        <div class="p-4">
            <p class="goalDetail mb-4">${detail}</p>

            <button class="completeBtn bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded">
                Mark Goal
            </button>
        </div>
    `;

    // Delete Button
    goalCard.querySelector(".deleteBtn").addEventListener("click", function () {
        goalCard.remove();
    });

    // Complete Button
    goalCard.querySelector(".completeBtn").addEventListener("click", function () {

        const text = goalCard.querySelector(".goalDetail");

        text.classList.add("line-through", "text-gray-500");

        this.innerText = "Completed";
        this.disabled = true;

        this.classList.remove("bg-yellow-400", "hover:bg-yellow-500");
        this.classList.add("bg-green-500", "text-white");
    });

    // Add Card
    taskColumn.appendChild(goalCard);

    // Clear Inputs
    taskInput.value = "";
    detailInput.value = "";
}