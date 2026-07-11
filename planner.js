// Select all planner textareas
const planners = document.querySelectorAll(".planner");

// Load planner data
window.addEventListener("DOMContentLoaded", () => {

    const savedPlanner = JSON.parse(localStorage.getItem("plannerData")) || [];

    planners.forEach((planner, index) => {
        planner.value = savedPlanner[index] || "";
    });

});

// Save planner data
planners.forEach((planner, index) => {

    planner.addEventListener("input", () => {

        const plannerData = [];

        planners.forEach(textarea => {
            plannerData.push(textarea.value);
        });

        localStorage.setItem("plannerData", JSON.stringify(plannerData));

    });

});

// Clear planner
function clearPlanner() {

    if (confirm("Clear all planner data?")) {

        planners.forEach(planner => {
            planner.value = "";
        });

        localStorage.removeItem("plannerData");
    }

}