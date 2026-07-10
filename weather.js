// ================= ELEMENT REFS =================

const locationInput  = document.getElementById('locationInput');
const searchBtn      = document.getElementById('searchBtn');
const statusMsg      = document.getElementById('statusMsg');
const weatherIconEl  = document.getElementById('weatherIcon');
const tempValueEl    = document.getElementById('tempValue');
const conditionTextEl= document.getElementById('conditionText');
const humidityValueEl= document.getElementById('humidityValue');
const windValueEl    = document.getElementById('windValue');

// ================= ICON SET (flat SVG, matches sun/cloud style) =================

const SUN = `
  <g>
    <circle cx="95" cy="85" r="34" fill="#F5A623"/>
    <g stroke="#F5A623" stroke-width="6" stroke-linecap="round">
      <line x1="95" y1="18" x2="95" y2="34"/>
      <line x1="95" y1="136" x2="95" y2="152"/>
      <line x1="28" y1="85" x2="44" y2="85"/>
      <line x1="146" y1="85" x2="162" y2="85"/>
      <line x1="46" y1="36" x2="57" y2="47"/>
      <line x1="133" y1="123" x2="144" y2="134"/>
      <line x1="144" y1="36" x2="133" y2="47"/>
      <line x1="57" y1="123" x2="46" y2="134"/>
    </g>
  </g>`;

const CLOUD = `
  <path d="M55 150c-19 0-34-14-34-32 0-16 12-29 28-32 5-19 22-33 43-33 21 0 39 14 44 33 17 2 30 16 30 33 0 18-15 32-34 32H55z" fill="#26C6DA"/>`;

const CLOUD_GREY = `
  <path d="M55 150c-19 0-34-14-34-32 0-16 12-29 28-32 5-19 22-33 43-33 21 0 39 14 44 33 17 2 30 16 30 33 0 18-15 32-34 32H55z" fill="#B0BEC5"/>`;

function raindrops(offsetY) {
  return `
  <g fill="#4FC3F7">
    <ellipse cx="70" cy="${160+offsetY}" rx="4" ry="8"/>
    <ellipse cx="95" cy="${168+offsetY}" rx="4" ry="8"/>
    <ellipse cx="120" cy="${160+offsetY}" rx="4" ry="8"/>
  </g>`;
}

function snowflakes(offsetY) {
  function flake(cx, cy) {
    return `<g stroke="#90CAF9" stroke-width="3" stroke-linecap="round">
      <line x1="${cx-6}" y1="${cy}" x2="${cx+6}" y2="${cy}"/>
      <line x1="${cx}" y1="${cy-6}" x2="${cx}" y2="${cy+6}"/>
      <line x1="${cx-4}" y1="${cy-4}" x2="${cx+4}" y2="${cy+4}"/>
      <line x1="${cx-4}" y1="${cy+4}" x2="${cx+4}" y2="${cy-4}"/>
    </g>`;
  }
  return flake(70, 162+offsetY) + flake(95, 170+offsetY) + flake(120, 162+offsetY);
}

const BOLT = `<polygon points="98,150 82,180 94,180 88,205 112,172 98,172 106,150" fill="#FDD835"/>`;

function fogLines() {
  return `<g stroke="#CFD8DC" stroke-width="6" stroke-linecap="round">
    <line x1="35" y1="150" x2="155" y2="150"/>
    <line x1="45" y1="164" x2="145" y2="164"/>
    <line x1="55" y1="178" x2="135" y2="178"/>
  </g>`;
}

function svgWrap(inner, viewBoxH) {
  return `<svg viewBox="0 0 190 ${viewBoxH}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

const ICONS = {
  clear:        () => svgWrap(SUN, 170),
  partlyCloudy: () => svgWrap(SUN + CLOUD, 170),
  cloudy:       () => svgWrap(CLOUD_GREY, 170),
  fog:          () => svgWrap(CLOUD_GREY + fogLines(), 190),
  drizzle:      () => svgWrap(SUN + CLOUD + raindrops(-25), 175),
  rain:         () => svgWrap(CLOUD_GREY + raindrops(-25), 175),
  thunderstorm: () => svgWrap(CLOUD_GREY + BOLT, 210),
  snow:         () => svgWrap(CLOUD_GREY + snowflakes(-25), 175),
};

// ================= WMO WEATHER CODE -> {icon, label} =================

function describeWeatherCode(code) {
  const map = {
    0:  { icon: 'clear',        label: 'Clear Sky' },
    1:  { icon: 'partlyCloudy', label: 'Mostly Clear' },
    2:  { icon: 'partlyCloudy', label: 'Partly Cloudy' },
    3:  { icon: 'cloudy',       label: 'Overcast' },
    45: { icon: 'fog',          label: 'Fog' },
    48: { icon: 'fog',          label: 'Freezing Fog' },
    51: { icon: 'drizzle',      label: 'Light Drizzle' },
    53: { icon: 'drizzle',      label: 'Drizzle' },
    55: { icon: 'drizzle',      label: 'Dense Drizzle' },
    56: { icon: 'drizzle',      label: 'Freezing Drizzle' },
    57: { icon: 'drizzle',      label: 'Freezing Drizzle' },
    61: { icon: 'drizzle',      label: 'Light Rain' },
    63: { icon: 'rain',         label: 'Rain' },
    65: { icon: 'rain',         label: 'Heavy Rain' },
    66: { icon: 'rain',         label: 'Freezing Rain' },
    67: { icon: 'rain',         label: 'Freezing Rain' },
    71: { icon: 'snow',         label: 'Light Snow' },
    73: { icon: 'snow',         label: 'Snow' },
    75: { icon: 'snow',         label: 'Heavy Snow' },
    77: { icon: 'snow',         label: 'Snow Grains' },
    80: { icon: 'drizzle',      label: 'Rain Showers' },
    81: { icon: 'rain',         label: 'Rain Showers' },
    82: { icon: 'rain',         label: 'Violent Showers' },
    85: { icon: 'snow',         label: 'Snow Showers' },
    86: { icon: 'snow',         label: 'Heavy Snow Showers' },
    95: { icon: 'thunderstorm', label: 'Thunderstorm' },
    96: { icon: 'thunderstorm', label: 'Thunderstorm w/ Hail' },
    99: { icon: 'thunderstorm', label: 'Severe Thunderstorm' },
  };
  return map[code] || { icon: 'partlyCloudy', label: 'Unknown' };
}

// ================= RENDER =================

function renderWeather({ tempC, humidity, windKmh, code }) {
  const { icon, label } = describeWeatherCode(code);
  weatherIconEl.innerHTML = ICONS[icon]();
  tempValueEl.textContent = `${Math.round(tempC)}°C`;
  conditionTextEl.textContent = label;
  humidityValueEl.textContent = `${Math.round(humidity)}%`;
  windValueEl.textContent = `${Math.round(windKmh)} km/h`;
}

function setStatus(msg) {
  statusMsg.textContent = msg || '';
}

// ================= API CALLS (Open-Meteo, no key required) =================

async function geocodeLocation(name) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocoding request failed');
  const data = await res.json();
  if (!data.results || data.results.length === 0) throw new Error('Location not found');
  const place = data.results[0];
  return {
    lat: place.latitude,
    lon: place.longitude,
    name: [place.name, place.admin1, place.country].filter(Boolean).join(', ')
  };
}

async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather request failed');
  const data = await res.json();
  const c = data.current;
  return {
    tempC: c.temperature_2m,
    humidity: c.relative_humidity_2m,
    windKmh: c.wind_speed_10m,
    code: c.weather_code
  };
}

async function loadWeatherForLocation(name) {
  try {
    setStatus('Searching…');
    const place = await geocodeLocation(name);
    locationInput.value = place.name;
    const weather = await fetchWeather(place.lat, place.lon);
    renderWeather(weather);
    setStatus('');
  } catch (err) {
    setStatus(err.message || 'Something went wrong');
  }
}

async function loadWeatherForCoords(lat, lon, label) {
  try {
    setStatus('Loading your local weather…');
    const weather = await fetchWeather(lat, lon);
    if (label) locationInput.value = label;
    renderWeather(weather);
    setStatus('');
  } catch (err) {
    setStatus(err.message || 'Something went wrong');
  }
}

// ================= EVENTS =================

searchBtn.addEventListener('click', () => {
  const q = locationInput.value.trim();
  if (q) loadWeatherForLocation(q);
});

locationInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const q = locationInput.value.trim();
    if (q) loadWeatherForLocation(q);
  }
});

// ================= INIT: try the browser's own geolocation first =================

(function init() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => loadWeatherForCoords(pos.coords.latitude, pos.coords.longitude, ''),
      () => loadWeatherForLocation('Patna') // fallback default
    );
  } else {
    loadWeatherForLocation('Patna');
  }
})();