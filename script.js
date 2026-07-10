document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // Elements
    // ===============================

    const clock = document.getElementById("clock");
    const bigClock = document.getElementById("bigClock");
    const date = document.getElementById("date");

    const hour = document.getElementById("hour");
    const minute = document.getElementById("minute");
    const ampm = document.getElementById("ampm");

    const setTime = document.getElementById("setTime");
    const liveBtn = document.getElementById("liveBtn");

    let liveMode = true;
    let manualDate = new Date();

    // ===============================
    // Fill Select Options
    // ===============================

    for (let i = 1; i <= 12; i++) {

        const option = document.createElement("option");

        option.value = i;
        option.textContent = String(i).padStart(2, "0");

        hour.appendChild(option);

    }

    for (let i = 0; i < 60; i++) {

        const option = document.createElement("option");

        option.value = i;
        option.textContent = String(i).padStart(2, "0");

        minute.appendChild(option);

    }

    // ===============================
    // Update Clock
    // ===============================

    function updateClock() {

        let now;

        if (liveMode) {

            now = new Date();

        } else {

            now = manualDate;

            manualDate = new Date(manualDate.getTime() + 1000);

        }

        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();

        let period = h >= 12 ? "PM" : "AM";

        let displayHour = h % 12;

        if (displayHour === 0) {

            displayHour = 12;

        }

        // Navbar Clock

        clock.innerHTML =
            `${String(displayHour).padStart(2, "0")}:` +
            `${String(m).padStart(2, "0")}:` +
            `${String(s).padStart(2, "0")} ${period}`;

        // Large Clock

        bigClock.innerHTML =
            `${String(displayHour).padStart(2, "0")}:` +
            `${String(m).padStart(2, "0")} ${period}`;

        // Date

        date.innerHTML = now.toLocaleDateString("en-US", {

            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"

        });

        // Part 3B will use this

        window.currentHour = h;

    }

    updateClock();

    setInterval(updateClock, 1000);

    // ===============================
    // Manual Time
    // ===============================

    setTime.addEventListener("click", () => {

        let h = parseInt(hour.value);

        let m = parseInt(minute.value);

        if (ampm.value === "PM" && h !== 12) {

            h += 12;

        }

        if (ampm.value === "AM" && h === 12) {

            h = 0;

        }

        manualDate = new Date();

        manualDate.setHours(h);

        manualDate.setMinutes(m);

        manualDate.setSeconds(0);

        liveMode = false;

    });

    // ===============================
    // Resume Live Clock
    // ===============================

    liveBtn.addEventListener("click", () => {

        liveMode = true;

    });

    // ===============================
    // Remaining code comes in Part 3B
    // ===============================

});


// =====================================
// Background Elements
// =====================================

const scene = document.getElementById("scene");

const day1 = document.querySelector(".bg-day-1");
const day2 = document.querySelector(".bg-day-2");

const night1 = document.querySelector(".bg-night-1");
const night2 = document.querySelector(".bg-night-2");

const hoverLabel = document.getElementById("hoverLabel");

// =====================================
// Background Function
// =====================================

function updateBackground() {

    const hour = window.currentHour;

    // ---------------- DAY ----------------

    if (hour >= 6 && hour < 19) {

        scene.classList.remove("night");
        scene.classList.add("day");

        day1.style.opacity = "1";
        day2.style.opacity = "0";

        night1.style.opacity = "0";
        night2.style.opacity = "0";

        hoverLabel.textContent = "Brighter Morning";

    }

    // ---------------- NIGHT ----------------

    else {

        scene.classList.remove("day");
        scene.classList.add("night");

        day1.style.opacity = "0";
        day2.style.opacity = "0";

        night1.style.opacity = "1";
        night2.style.opacity = "0";

        hoverLabel.textContent = "Darker Night";

    }

}

updateBackground();

// =====================================
// Update Every Second
// =====================================

setInterval(updateBackground,1000);


// =====================================
// Hover Effect
// =====================================

scene.addEventListener("mouseenter",()=>{

    hoverLabel.classList.remove("opacity-0");

    hoverLabel.classList.add("opacity-100");

    if(scene.classList.contains("day")){

        day1.style.opacity="0";
        day2.style.opacity="1";

    }

    else{

        night1.style.opacity="0";
        night2.style.opacity="1";

    }

});


// =====================================
// Mouse Leave
// =====================================

scene.addEventListener("mouseleave",()=>{

    hoverLabel.classList.remove("opacity-100");

    hoverLabel.classList.add("opacity-0");

    if(scene.classList.contains("day")){

        day1.style.opacity="1";
        day2.style.opacity="0";

    }

    else{

        night1.style.opacity="1";
        night2.style.opacity="0";

    }

});


// ======================================
// THEME TOGGLE
// ======================================

const body = document.body;

const lightBtn = document.getElementById("lightBtn");
const darkBtn = document.getElementById("darkBtn");

function setLightTheme() {

    body.classList.add("light");
    body.classList.remove("dark");

    lightBtn.classList.add(
        "bg-white",
        "text-black"
    );

    darkBtn.classList.remove(
        "bg-white",
        "text-black"
    );

    localStorage.setItem("theme","light");

}

function setDarkTheme() {

    body.classList.add("dark");
    body.classList.remove("light");

    darkBtn.classList.add(
        "bg-white",
        "text-black"
    );

    lightBtn.classList.remove(
        "bg-white",
        "text-black"
    );

    localStorage.setItem("theme","dark");

}

// Buttons

lightBtn.addEventListener("click",setLightTheme);

darkBtn.addEventListener("click",setDarkTheme);


// ======================================
// LOAD SAVED THEME
// ======================================

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="light"){

    setLightTheme();

}
else{

    setDarkTheme();

}


// ======================================
// BUTTON HOVER EFFECT
// ======================================

const featureButtons =
document.querySelectorAll(".featureBtn");

featureButtons.forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform =
        "translateY(-6px) scale(1.05)";

        btn.style.boxShadow =
        "0 10px 35px rgba(255,255,255,.25)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform =
        "translateY(0) scale(1)";

        btn.style.boxShadow =
        "none";

    });

});


// ======================================
// NAVBAR SHADOW ON SCROLL
// ======================================

const nav = document.querySelector("nav");

window.addEventListener("scroll",()=>{

    if(window.scrollY>20){

        nav.classList.add(
            "shadow-2xl"
        );

    }

    else{

        nav.classList.remove(
            "shadow-2xl"
        );

    }

});


// ======================================
// CLOCK ANIMATION
// ======================================

setInterval(()=>{

    bigClock.animate(

        [

            {
                opacity:0.85
            },

            {
                opacity:1
            }

        ],

        {

            duration:900

        }

    );

},1000);


// ======================================
// INITIALIZE
// ======================================

updateClock();

updateBackground();

console.log(
"Dashboard Loaded Successfully 🚀"
);