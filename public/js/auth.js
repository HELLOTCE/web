// public/js/auth.js
// DEMO login only. This is NOT secure authentication - it is for practice.
// It just remembers "loggedIn" in the browser for this tab.

// Used on every page except the login page: send visitors back to login.
function requireLogin() {
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'index.html';
  }
}

// Called by the Logout button
function logout() {
  sessionStorage.removeItem('loggedIn');
  window.location.href = 'index.html';
}

// ----- Login page code (runs only if the login form exists on the page) -----
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('loginForm');
  if (!form) return; // not the login page

  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var rememberBox = document.getElementById('remember');
  var messageBox = document.getElementById('loginMessage');

  // "Remember me": fill the email if it was saved earlier
  var savedEmail = localStorage.getItem('rememberedEmail');
  if (savedEmail) { emailInput.value = savedEmail; rememberBox.checked = true; }

  // Forgot password link (demo: just shows a message)
  document.getElementById('forgotLink').addEventListener('click', function (event) {
    event.preventDefault();
    showMessage('Demo only: password reset is not implemented.', 'error');
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // stop the page from reloading

    var data = { email: emailInput.value, password: passwordInput.value };
    var result = Validators.validateLogin(data);

    // Show a message under each field that has an error
    document.getElementById('emailError').textContent = result.errors.email || '';
    document.getElementById('passwordError').textContent = result.errors.password || '';
    if (!result.valid) { showMessage('Please fix the errors below.', 'error'); return; }

    // Compare with the demo email and password from site-config.js
    if (data.email.trim() === DEMO_EMAIL && data.password === DEMO_PASSWORD) {
      if (rememberBox.checked) localStorage.setItem('rememberedEmail', data.email.trim());
      else localStorage.removeItem('rememberedEmail');
      sessionStorage.setItem('loggedIn', 'true');
      window.location.href = 'dashboard.html';
    } else {
      showMessage('Wrong email or password.', 'error');
    }
  });

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = 'message show ' + type;
  }
});
