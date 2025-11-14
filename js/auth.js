// === AUTHENTICATION (login/signup/logout) ===

// Ambil data user dari localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];

// Sign Up
function handleSignup(event) {
  event.preventDefault();
  const username = event.target.querySelector('input[placeholder="Username"]').value;
  const email = event.target.querySelector('input[placeholder="Email"]').value;
  const password = event.target.querySelector('input[placeholder="Password"]').value;
  const confirm = event.target.querySelector('input[placeholder="Confirm Password"]').value;

  if (password !== confirm) {
    alert("Password dan konfirmasi tidak sama!");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registrasi berhasil! Silakan login.");
  window.location.href = "login.html";
}

// Login
function handleLogin(event) {
  event.preventDefault();
  const username = event.target.querySelector('input[placeholder="Username"]').value;
  const password = event.target.querySelector('input[placeholder="Password"]').value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login berhasil! Selamat datang, " + username);
    window.location.href = "dashboard.html";
  } else {
    alert("Username atau password salah!");
  }
}