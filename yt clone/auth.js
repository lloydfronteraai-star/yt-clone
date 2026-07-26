const API = "http://localhost:5000/api/auth";

// Register
async function register() {
  const user = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  await fetch(API + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  alert("Registered! Now login.");
}

// Login
async function login() {
  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  const data = await res.json();

  // Save logged-in user
  localStorage.setItem("user", JSON.stringify(data));

  alert("Logged in!");
  window.location.href = "index.html";
}