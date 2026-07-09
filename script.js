
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // Elements
    // =========================
    const clock = document.getElementById("topbar-clock");
    const timeLine = document.getElementById("time-line");
    const dateLine = document.getElementById("date-line");

    const hourSelect = document.getElementById("hour-select");
    const minuteSelect = document.getElementById("minute-select");
    const periodSelect = document.getElementById("period-select");

    const setBtn = document.getElementById("set-time-btn");
    const liveBtn = document.getElementById("live-time-btn");

    const scene = document.getElementById("scene");

    const lightBtn = document.getElementById("theme-light-btn");
    const darkBtn = document.getElementById("theme-dark-btn");

    const hint = document.getElementById("hint-pill");
    const hintLabel = document.getElementById("hint-label");

    let liveClock = true;
    let manualDate = new Date();

    // =========================
    // Fill Dropdowns
    // =========================
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = String(i).padStart(2, "0");
        hourSelect.appendChild(option);
    }

    for (let i = 0; i < 60; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = String(i).padStart(2, "0");
        minuteSelect.appendChild(option);
    }

    // =========================
    // Clock Function
    // =========================
    function updateClock() {

        let now;

        if (liveClock) {
            now = new Date();
        } else {
            now = manualDate;
            manualDate = new Date(manualDate.getTime() + 1000);
        }

        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        const period = hours >= 12 ? "PM" : "AM";

        let displayHour = hours % 12;
        displayHour = displayHour === 0 ? 12 : displayHour;

        clock.textContent =
            `${String(displayHour).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")} ${period}`;

        timeLine.innerHTML =
            `${String(displayHour).padStart(2,"0")}:${String(minutes).padStart(2,"0")}<span class="tick">:</span>${String(seconds).padStart(2,"0")} <span class="text-2xl">${period}</span>`;

        dateLine.textContent = now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        if (hours >= 6 && hours < 18) {
            scene.dataset.period = "day";
        } else {
            scene.dataset.period = "night";
        }
    }

    updateClock();
    setInterval(updateClock, 1000);

    // =========================
    // Set Manual Time
    // =========================
    setBtn.addEventListener("click", () => {

        let h = parseInt(hourSelect.value);
        let m = parseInt(minuteSelect.value);
        let p = periodSelect.value;

        if (p === "PM" && h !== 12) h += 12;
        if (p === "AM" && h === 12) h = 0;

        manualDate = new Date();
        manualDate.setHours(h);
        manualDate.setMinutes(m);
        manualDate.setSeconds(0);

        liveClock = false;
    });

    // =========================
    // Resume Live Time
    // =========================
    liveBtn.addEventListener("click", () => {
        liveClock = true;
    });

    // =========================
    // Theme Toggle
    // =========================
    lightBtn.addEventListener("click", () => {

        document.body.classList.remove("bg-black");
        document.body.classList.add("bg-white");

        lightBtn.classList.add("bg-white", "text-black");
        darkBtn.classList.remove("bg-white", "text-black");
    });

    darkBtn.addEventListener("click", () => {

        document.body.classList.remove("bg-white");
        document.body.classList.add("bg-black");

        darkBtn.classList.add("bg-white", "text-black");
        lightBtn.classList.remove("bg-white", "text-black");
    });

    // =========================
    // Hover Hint
    // =========================
    scene.addEventListener("mouseenter", () => {

        hint.classList.remove("opacity-0", "-translate-y-1");
        hint.classList.add("opacity-100", "translate-y-0");

        if (scene.dataset.period === "day") {
            hintLabel.textContent = "Brighter Day";
        } else {
            hintLabel.textContent = "Darker Night";
        }

    });

    scene.addEventListener("mouseleave", () => {

        hint.classList.add("opacity-0", "-translate-y-1");
        hint.classList.remove("opacity-100");

    });

    // =========================
    // Feature Buttons
    // =========================
    document.getElementById("todo-toggle-btn").onclick = () => {
        alert("To-Do List Coming Soon!");
    };

    document.getElementById("goal-toggle-btn").onclick = () => {
        alert("Daily Goals Coming Soon!");
    };

    document.getElementById("planner-toggle-btn").onclick = () => {
        alert("Planner Coming Soon!");
    };

    document.getElementById("quotes-toggle-btn").onclick = () => {
        const quotes = [
            "Stay focused.",
            "Dream big.",
            "Never stop learning.",
            "Success is built daily.",
            "Discipline beats motivation."
        ];

        alert(quotes[Math.floor(Math.random() * quotes.length)]);
    };

    document.getElementById("timer-toggle-btn").onclick = () => {
        alert("Pomodoro Timer Coming Soon!");
    };

});


// =======================
// Theme Toggle
// =======================

const body = document.body;
const scene = document.getElementById("scene");

const lightBtn = document.getElementById("theme-light-btn");
const darkBtn = document.getElementById("theme-dark-btn");

// Set Dark Theme
function setDarkTheme() {
    body.classList.remove("bg-white");
    body.classList.add("bg-black");

    scene.classList.remove("light-theme");
    scene.classList.add("dark-theme");

    darkBtn.classList.add("bg-white", "text-black");
    lightBtn.classList.remove("bg-white", "text-black");

    localStorage.setItem("theme", "dark");
}

// Set Light Theme
function setLightTheme() {
    body.classList.remove("bg-black");
    body.classList.add("bg-white");

    scene.classList.remove("dark-theme");
    scene.classList.add("light-theme");

    lightBtn.classList.add("bg-white", "text-black");
    darkBtn.classList.remove("bg-white", "text-black");

    localStorage.setItem("theme", "light");
}

// Button Events
lightBtn.addEventListener("click", setLightTheme);
darkBtn.addEventListener("click", setDarkTheme);

// Load Saved Theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    setLightTheme();
} else {
    setDarkTheme();
}