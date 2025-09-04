// Update nilai suhu & kelembaban
const suhuValue = document.getElementById("suhu-value");
const kelembabanValue = document.getElementById("kelembaban-value");
const suhuStatus = document.getElementById("suhu-status");
const kelembabanStatus = document.getElementById("kelembaban-status");

// Simulasi data (bisa diganti fetch dari server ESP8266 nanti)
let suhu = 29.7;
let kelembaban = 53.6;

function updateStatus() {
  // Suhu
  if (suhu > 35) {
    suhuStatus.textContent = "Terlalu Panas";
    suhuStatus.className = "status danger";
  } else if (suhu < 15) {
    suhuStatus.textContent = "Terlalu Dingin";
    suhuStatus.className = "status warning";
  } else {
    suhuStatus.textContent = "Normal";
    suhuStatus.className = "status normal";
  }

  // Kelembaban
  if (kelembaban > 70) {
    kelembabanStatus.textContent = "Rawan Jamur";
    kelembabanStatus.className = "status warning";
  } else {
    kelembabanStatus.textContent = "Aman";
    kelembabanStatus.className = "status normal";
  }
}

// Chart.js untuk suhu & kelembaban
const suhuChart = new Chart(document.getElementById("suhuChart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Suhu (°C)",
      data: [],
      borderColor: "#16a34a",
      fill: false,
      tension: 0.3
    }]
  }
});

const kelembabanChart = new Chart(document.getElementById("kelembabanChart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Kelembaban (%)",
      data: [],
      borderColor: "#0284c7",
      fill: false,
      tension: 0.3
    }]
  }
});

// Update data tiap 3 detik (simulasi)
setInterval(() => {
  // Random naik/turun
  suhu += (Math.random() - 0.5) * 1;
  kelembaban += (Math.random() - 0.5) * 2;

  suhuValue.textContent = suhu.toFixed(1) + " °C";
  kelembabanValue.textContent = kelembaban.toFixed(1) + " %";

  updateStatus();

  let waktu = new Date().toLocaleTimeString();

  if (suhuChart.data.labels.length > 10) {
    suhuChart.data.labels.shift();
    suhuChart.data.datasets[0].data.shift();
    kelembabanChart.data.labels.shift();
    kelembabanChart.data.datasets[0].data.shift();
  }

  suhuChart.data.labels.push(waktu);
  suhuChart.data.datasets[0].data.push(suhu);

  kelembabanChart.data.labels.push(waktu);
  kelembabanChart.data.datasets[0].data.push(kelembaban);

  suhuChart.update();
  kelembabanChart.update();

}, 3000);

updateStatus();
