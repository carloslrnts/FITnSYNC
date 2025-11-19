// FITnSYNC – Bodyweight Workout Page

// Ambil user
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Redirect kalau belum login
if (!currentUser) {
  window.location.href = "../login.html";
}

// Tampilkan nama user di navbar
document.getElementById("profileName").textContent = currentUser.username;
