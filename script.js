document.addEventListener("DOMContentLoaded", () => {
  // 1. Water Footprint Calculation
  const showerInput = document.getElementById("showers");
  const flushInput = document.getElementById("flushes");
  const washInput = document.getElementById("washing");
  const calcBtn = document.getElementById("calcBtn");
  const resultDisplay = document.getElementById("litersResult");
  const analysisMessage = document.getElementById("analysisMessage");

  function calculateUsage() {
    const showerMinutes = Math.max(0, parseFloat(showerInput.value) || 0);
    const flushes = Math.max(0, parseFloat(flushInput.value) || 0);
    const washLoads = Math.max(0, parseFloat(washInput.value) || 0);

    // Standard water coefficients:
    // 9L per shower minute, 6L per flush, 50L per washing cycle
    const totalLiters = Math.round(
      showerMinutes * 9 + flushes * 6 + washLoads * 50
    );

    resultDisplay.textContent = `${totalLiters} L`;

    if (totalLiters <= 135) {
      analysisMessage.textContent =
        "Excellent! Your usage is below the standard per capita benchmark (135 L).";
      analysisMessage.style.color = "#16a34a";
    } else if (totalLiters <= 250) {
      analysisMessage.textContent =
        "Moderate consumption. Consider cutting shower time by 3-5 minutes to save ~35 L daily.";
      analysisMessage.style.color = "#0284c7";
    } else {
      analysisMessage.textContent =
        "High water consumption detected. Check fixtures for concealed leaks or upgrade to aerated taps.";
      analysisMessage.style.color = "#ef4444";
    }
  }

  calcBtn.addEventListener("click", calculateUsage);

  // 2. Incident Leak Reporting Handler
  const leakForm = document.getElementById("leakForm");
  const reportList = document.getElementById("reportList");
  const activeReportsMetric = document.getElementById("activeReportsMetric");
  let activeReportsCount = 2; // Initial demo count

  leakForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const locationVal = document.getElementById("location").value.trim();
    const severityVal = document.getElementById("severity").value;
    const descVal = document.getElementById("description").value.trim();

    if (!locationVal || !descVal) return;

    // Create a new report log element
    const newReportItem = document.createElement("li");
    newReportItem.className =
      severityVal.includes("Critical") ? "report-item critical" : "report-item minor";

    newReportItem.innerHTML = `<strong>${locationVal}</strong> — ${severityVal} (${descVal})`;

    // Insert at the top of the list
    reportList.prepend(newReportItem);

    // Increment incident counter
    activeReportsCount++;
    activeReportsMetric.textContent = activeReportsCount;

    // Reset form fields
    leakForm.reset();
  });
});