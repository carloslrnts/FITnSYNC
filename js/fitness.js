// FITnSYNC – Fitness Programs Script

// Ambil user yang login
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Jika user tidak ada → redirect ke login
if (!currentUser) {
  window.location.href = "login.html";
}

// Saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {

  // Tampilkan username di navbar
  const nameSpan = document.getElementById("profileName");
  if (nameSpan && currentUser.username) {
    nameSpan.textContent = currentUser.username;
  }

  // CLICK HANDLER – WEIGHT LOSS
  const weightLossCard = document.querySelector(".weightloss-card");
  const learnMoreWeightLoss = document.querySelector(".learnmore-weightloss");

  // klik seluruh card
  if (weightLossCard) {
    weightLossCard.addEventListener("click", () => {
      window.location.href = "pages/weightloss.html";
    });
  }

  // klik tombol Learn More → jangan trigger klik card
  if (learnMoreWeightLoss) {
    learnMoreWeightLoss.addEventListener("click", (e) => {
      e.stopPropagation();
      window.location.href = "pages/weightloss.html";
    });
  }

});

// Fungsi untuk program lainnya (opsi)
function openProgramDetail(programName) {
  localStorage.setItem("selectedProgram", programName);
  window.location.href = "program-detail.html";
}
