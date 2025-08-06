// Update time every second
function updateTime() {
    const now = new Date();
    const timeElem = document.getElementById('current-time');
    timeElem.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeElem.setAttribute('datetime', now.toISOString());
}
setInterval(updateTime, 1000);
updateTime();

// City selection and map update
const cityButtons = document.querySelectorAll('.city-card');
const mapFrame = document.getElementById('map-frame');
const locationDisplay = document.getElementById('location-display').querySelector('span');

cityButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        cityButtons.forEach(b => {
            b.classList.remove('selected');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
        const selectedCity = btn.dataset.city;
        locationDisplay.textContent = selectedCity;
        updateMap(selectedCity);
    });
});

function updateMap(city) {
    const safeCity = encodeURIComponent(city);
    const newSrc = `https://maps.google.com/maps?q=${safeCity}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    mapFrame.setAttribute('src', newSrc);
    mapFrame.setAttribute('title', 'Map showing location of ' + city);
}

// Placeholder weather and temp data
const temperatureData = [29.2, 26.5, 26.7, 27.7, 29.3];
const temperatureLabels = ['2025-08-06', '2025-08-07', '2025-08-08', '2025-08-09', '2025-08-10'];

// Chart.js instance for temperature trend
const ctx = document.getElementById('tempChart').getContext('2d');
const tempChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: temperatureLabels,
        datasets: [{
            label: 'Temperature (°C)',
            data: temperatureData,
            fill: false,
            borderColor: '#58a0ff',
            backgroundColor: '#58a0ff',
            tension: 0.3,
            pointRadius: 5,
            pointHitRadius: 20,
            pointHoverRadius: 7,
            pointBackgroundColor: '#1d2a78',
            borderWidth: 3,
            hoverBorderWidth: 4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 35,
                ticks: {
                    stepSize: 8,
                    color: "#555a6a",
                    font: {
                        size: 13
                    }
                },
                grid: {
                    color: "#eceff8",
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: "#555a6a",
                    font: { size: 12 },
                    callback: function (value) {
                        const date = new Date(this.getLabelForValue(value));
                        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                    }
                },
                grid: {
                    color: "#f6f7fb",
                    drawBorder: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#58a0ff',
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 12 },
                cornerRadius: 6,
                padding: 12,
                callbacks: {
                    label: (context) => context.parsed.y + ' °C'
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'nearest'
        }
    }
});

// Search function placeholder
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityName = cityInput.value.trim();
    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }

    let found = false;
    cityButtons.forEach(btn => {
        if (btn.dataset.city.toLowerCase() === cityName.toLowerCase()) {
            btn.click();
            found = true;
        }
    });

    if (!found) {
        locationDisplay.textContent = cityName;
        updateMap(cityName);
        cityButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.setAttribute('aria-pressed', 'false');
        });
    }

    cityInput.value = '';
});
