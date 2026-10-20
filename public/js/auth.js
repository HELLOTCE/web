// Entry form format validation only; this project has no account authentication.
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('loginForm');
  if (!form) return;

  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var messageBox = document.getElementById('loginMessage');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var result = Validators.validateLogin({ email: emailInput.value, password: passwordInput.value });
    document.getElementById('emailError').textContent = result.errors.email || '';
    document.getElementById('passwordError').textContent = result.errors.password || '';

    if (!result.valid) {
      messageBox.textContent = 'Please fix the errors below.';
      messageBox.className = 'message show error';
      return;
    }
    window.location.href = 'student-form.html';
  });
});
