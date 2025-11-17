// FITnSYNC – Diet Recommendations Script

// Get the currently logged-in user from localStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// If no user is logged in, redirect to the login page
if (!currentUser) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // Get the calorie calculator form
  const calorieForm = document.getElementById("calorie-form");

  // Add an event listener for the form's 'submit' event
  if (calorieForm) {
    calorieForm.addEventListener("submit", function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // --- Validation (optional but good practice) ---
      // You can check if fields are filled before redirecting
      const age = document.getElementById("age").value;
      const height = document.getElementById("height").value;
      const weight = document.getElementById("weight").value;
      const gender = document.querySelector('input[name="gender"]:checked');
      const activity = document.getElementById("activity").value;

      if (!age || !height || !weight || !gender || !activity) {
        alert("Please fill out all fields before calculating.");
        return; // Stop if form is incomplete
      }

      // --- Redirect to the results page ---
      // In the future, you would pass calculated data here
      window.location.href = "pages/diet-results.html";
    });
  }
});
