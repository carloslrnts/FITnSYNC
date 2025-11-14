// === PROFILE PAGE ===

// Ambil user login aktif
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  window.location.href = "login.html";
} else {
  document.getElementById("profileName").textContent = currentUser.username;
  document.getElementById("usernameDisplay").textContent = currentUser.username;
  document.getElementById("username").textContent = currentUser.username;
  document.getElementById("email").textContent = currentUser.email || `${currentUser.username}@gmail.com`;
}
