// ================= ELEMENT REFERENCES =================

const scene       = document.getElementById('scene');
const clockEl      = document.getElementById('clock');
const bigClockEl   = document.getElementById('bigClock');
const dateEl       = document.getElementById('date');
const hourSel      = document.getElementById('hour');
const minuteSel    = document.getElementById('minute');
const ampmSel      = document.getElementById('ampm');
const setBtn       = document.getElementById('setTime');
const liveBtn      = document.getElementById('liveBtn');
const hoverLabel   = document.getElementById('hoverLabel');
const lightBtn     = document.getElementById('lightBtn');
const darkBtn      = document.getElementById('darkBtn');

const bgLayers = document.querySelectorAll('.bg-layer');

let liveMode = true;
let liveInterval = null;
// manualDate holds the frozen point in time used whenever liveMode is false
let manualDate = new Date();

// ================= BUILD TIME DROPDOWNS =================

function buildOptions(select, count, pad) {
  for (let i = 1; i <= count; i++) {
    const opt = document.createElement('option');
    const value = pad ? String(i).padStart(2, '0') : i;
    opt.value = value;
    opt.textContent = value;
    select.appendChild(opt);
  }
}

// hour: 1-12
buildOptions(hourSel, 12, true);
// minute: 0-59 -> build 0..59
hourSel.innerHTML = '';
for (let h = 1; h <= 12; h++) {
  const opt = document.createElement('option');
  opt.value = h;
  opt.textContent = String(h).padStart(2, '0');
  hourSel.appendChild(opt);
}
for (let m = 0; m < 60; m++) {
  const opt = document.createElement('option');
  opt.value = m;
  opt.textContent = String(m).padStart(2, '0');
  minuteSel.appendChild(opt);
}

// ================= BACKGROUND SWITCHING =================

// Decide which of the 4 background layers should be visible for a given hour (0-23)
// 5am - 6pm  (5-18)  -> "day" bucket   (uses day-1 for the morning half, day-2 for the afternoon half)
// 7pm - 5am (19-23,0-4) -> "night" bucket (uses night-1 for evening, night-2 for the deep-night/pre-dawn half)
function layerForHour(hour) {
  if (hour >= 5 && hour < 12) return 'bg-day-1';    // morning
  if (hour >= 12 && hour <= 18) return 'bg-day-2';  // afternoon
  if (hour >= 19 || hour === 0) return 'bg-night-1'; // evening / just after midnight
  return 'bg-night-2'; // 1am - 4:59am, deep night
}

function labelForHour(hour) {
  if (hour >= 5 && hour < 12) return 'Brighter Morning';
  if (hour >= 12 && hour <= 18) return 'Brighter Afternoon';
  return 'Brighter Night';
}

// each layer's hover partner - the picture shown when the user hovers the scene
const altLayer = {
  'bg-day-1':   'bg-day-2',
  'bg-day-2':   'bg-day-1',
  'bg-night-1': 'bg-night-2',
  'bg-night-2': 'bg-night-1'
};

let currentHourBucket = null;
let baseLayerClass = null; // the time-correct picture
let isHovering = false;

function showLayer(targetClass) {
  bgLayers.forEach(layer => {
    layer.classList.toggle('active', layer.classList.contains(targetClass));
  });
}

function applyBackgroundForHour(hour) {
  baseLayerClass = layerForHour(hour);
  currentHourBucket = hour;
  // if the user is currently hovering, keep showing the hover picture instead
  showLayer(isHovering ? altLayer[baseLayerClass] : baseLayerClass);
}

// ================= DISPLAY UPDATES =================

const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function renderTime(date) {
  const hour24 = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // top-right small clock, 24hr HH:MM:SS
  clockEl.textContent =
    String(hour24).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0');

  // big 12hr clock with AM/PM
  let hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;
  const ampm = hour24 >= 12 ? 'PM' : 'AM';
  bigClockEl.textContent =
    String(hour12).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ' ' + ampm;

  dateEl.textContent = weekdays[date.getDay()];

  applyBackgroundForHour(hour24);
}

// ================= LIVE MODE =================

function startLive() {
  liveMode = true;
  liveBtn.classList.add('active');
  setBtn.classList.remove('active');
  if (liveInterval) clearInterval(liveInterval);
  renderTime(new Date());
  liveInterval = setInterval(() => renderTime(new Date()), 1000);
}

function stopLive() {
  liveMode = false;
  liveBtn.classList.remove('active');
  if (liveInterval) clearInterval(liveInterval);
}

liveBtn.addEventListener('click', startLive);

// ================= MANUAL "SET" TIME =================

setBtn.addEventListener('click', () => {
  stopLive();

  const hour12 = parseInt(hourSel.value, 10);
  const minutes = parseInt(minuteSel.value, 10);
  const ampm = ampmSel.value;

  let hour24 = hour12 % 12;
  if (ampm === 'PM') hour24 += 12;

  manualDate = new Date();
  manualDate.setHours(hour24, minutes, 0, 0);

  setBtn.classList.add('active');
  renderTime(manualDate);
});

// ================= HOVER: SWAP TO ALTERNATE PICTURE =================

scene.addEventListener('mouseenter', () => {
  isHovering = true;
  scene.classList.add('is-hovering');
  hoverLabel.textContent = labelForHour(currentHourBucket === null ? new Date().getHours() : currentHourBucket);
  hoverLabel.classList.add('show');
  if (baseLayerClass) showLayer(altLayer[baseLayerClass]);
});

scene.addEventListener('mouseleave', () => {
  isHovering = false;
  scene.classList.remove('is-hovering');
  hoverLabel.classList.remove('show');
  if (baseLayerClass) showLayer(baseLayerClass);
});

// ================= LIGHT / DARK THEME TOGGLE =================

lightBtn.addEventListener('click', () => {
  document.body.classList.add('light-theme');
  lightBtn.classList.add('bg-white', 'text-black');
  darkBtn.classList.remove('bg-white', 'text-black');
});

darkBtn.addEventListener('click', () => {
  document.body.classList.remove('light-theme');
  darkBtn.classList.add('bg-white', 'text-black');
  lightBtn.classList.remove('bg-white', 'text-black');
});

// ================= INIT =================

// default dropdown values to the current time so "Set" starts sensible
(function initDropdownsToNow() {
  const now = new Date();
  let h12 = now.getHours() % 12;
  if (h12 === 0) h12 = 12;
  hourSel.value = h12;
  minuteSel.value = now.getMinutes();
  ampmSel.value = now.getHours() >= 12 ? 'PM' : 'AM';
})();

startLive();