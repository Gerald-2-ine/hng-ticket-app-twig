document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const alertContainer = document.getElementById("alert-container");

  const showAlert = (message, type) => {
    alertContainer.innerHTML = `<div class="alert ${type}">${message}</div>`;
    setTimeout(() => (alertContainer.innerHTML = ""), 2000);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const storedUsers = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    const validUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      showAlert("✅ Login successful! Redirecting to dashboard...", "success");
      localStorage.setItem("ticketapp_session", JSON.stringify({ email }));

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } else {
      showAlert("❌ Invalid email or password. Please try again.", "error");
    }
  });
});
