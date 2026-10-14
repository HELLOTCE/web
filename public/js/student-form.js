// public/js/student-form.js
// Validates the student form and sends it to the backend (POST /api/students).

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('studentForm');
  var messageBox = document.getElementById('formMessage');
  // Field names here must match the "id" of the inputs in student-form.html
  var fields = ['name', 'email', 'department', 'yearOfStudy'];

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = 'message show ' + type;
  }

  function clearErrors() {
    fields.forEach(function (f) { document.getElementById(f + 'Error').textContent = ''; });
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    clearErrors();

    // Collect the values typed by the user
    var data = {};
    fields.forEach(function (f) { data[f] = document.getElementById(f).value; });

    // Check required fields in the browser first
    var result = Validators.validateStudent(data);
    if (!result.valid) {
      fields.forEach(function (f) { document.getElementById(f + 'Error').textContent = result.errors[f] || ''; });
      showMessage('Please fill in all required fields correctly.', 'error');
      return;
    }

    // Send to the server
    try {
      var response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      var body = await response.json();

      if (response.ok) {
        showMessage('Success: ' + body.message, 'success');
        form.reset();
      } else {
        showMessage('Error: ' + (body.message || 'Could not save student'), 'error');
      }
    } catch (error) {
      showMessage('Error: could not reach the server. Is it running?', 'error');
    }
  });

  // Reset button also clears messages
  form.addEventListener('reset', function () {
    clearErrors();
    messageBox.className = 'message';
  });
});
