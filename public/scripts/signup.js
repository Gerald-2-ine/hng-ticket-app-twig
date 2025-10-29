const form = document.getElementById('signup-form');
    const alertBox = document.getElementById('alert-box');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alertBox.innerHTML = "";

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value.trim();
      const confirmPassword = form.confirmPassword.value.trim();

      if (!name || !email || !password || !confirmPassword) {
        return showAlert("❌ All fields are required.", "error");
      }

      if (password.length < 6) {
        return showAlert("❌ Password must be at least 6 characters long.", "error");
      }

      if (password !== confirmPassword) {
        return showAlert("❌ Passwords do not match.", "error");
      }

      const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
      if (users.some(u => u.email === email)) {
        return showAlert("⚠️ This email is already registered. Please log in.", "error");
      }

      users.push({ name, email, password });
      localStorage.setItem("ticketapp_users", JSON.stringify(users));

      showAlert("✅ Signup successful! Redirecting to login...", "success");
      setTimeout(() => window.location.href = "/login", 1500);
    });

    function showAlert(message, type) {
      alertBox.innerHTML = `<div class="alert ${type}">${message}</div>`;
      setTimeout(() => alertBox.innerHTML = "", 2000);
    }