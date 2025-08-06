const apiKey = "b1abf6004b2aa7cfcd4d93390f860505"; // ⚠️ Replace this with your OpenWeatherMap API key

// Clock updater
function updateTime() {
  const now = new Date();
  document.getElementById('current-time').textContent =
    now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateTime, 1000);
updateTime();

// Update weather metrics
async function fetchWeatherData(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    document.querySelector('#temperature-desc').nextElementSibling.innerHTML =
      `${data.main.temp.toFixed(1)} <small>°C</small>`;
    document.querySelector('#windspeed-desc').nextElementSibling.innerHTML =
      `${data.wind.speed} <small>m/s</small>`;
    document.querySelector('#humidity-desc').nextElementSibling.innerHTML =
      `${data.main.humidity} <small>%</small>`;
  } catch (error) {
    alert("Could not fetch weather data for " + city);
  }
}

// Map update
function updateMap(city) {
  document.getElementById("map-frame").src =
    `https://maps.google.com/maps?q=${encodeURIComponent(city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

// City switch
const cityButtons = document.querySelectorAll('.city-card');
const locationDisplay = document.querySelector('#location-display span');

cityButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    cityButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const city = btn.dataset.city;
    locationDisplay.textContent = city;
    updateMap(city);
    fetchWeatherData(city);
  });
});

// Form search
document.getElementById("city-form").addEventListener("submit", e => {
  e.preventDefault();
  const city = document.getElementById("city-input").value.trim();
  if (!city) return;
  locationDisplay.textContent = city;
  updateMap(city);
  fetchWeatherData(city);
  cityButtons.forEach(b => b.classList.remove('selected'));
});

// Chart
const tempChart = new Chart(document.getElementById('tempChart').getContext('2d'), {
  type: 'line',
  data: {
    labels: ['Aug 6', 'Aug 7', 'Aug 8', 'Aug 9', 'Aug 10'],
    datasets: [{
      label: 'Temperature (°C)',
      data: [29.2, 26.5, 26.7, 27.7, 29.3],
      borderColor: '#58a0ff',
      tension: 0.3,
      fill: false,
      borderWidth: 3,
      pointRadius: 5
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 40,
        ticks: { stepSize: 5, color: "#444" },
        grid: { color: "#eee" }
      },
      x: {
        ticks: { color: "#444" },
        grid: { color: "#f0f0f0" }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }
});

// Load default
window.onload = () => {
  fetchWeatherData("Kolkata");
};
