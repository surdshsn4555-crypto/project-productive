// Select all planner textareas
const planners = document.querySelectorAll(".planner");

// Load saved data
window.onload = function () {

    planners.forEach((planner, index) => {

        const savedData = localStorage.getItem("planner_" + index);

        if (savedData) {
            planner.value = savedData;
        }

    });

};

// Save automatically while typing
planners.forEach((planner, index) => {

    planner.addEventListener("input", function () {

        localStorage.setItem("planner_" + index, planner.value);

    });

});

// Clear all planner data
function clearPlanner() {

    if (confirm("Clear all planner data?")) {

        planners.forEach((planner, index) => {

            planner.value = "";

            localStorage.removeItem("planner_" + index);

        });

    }

}