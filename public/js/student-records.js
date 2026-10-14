// public/js/student-records.js
// Loads saved students from the backend (GET /api/students) and shows them in a table.

document.addEventListener('DOMContentLoaded', async function () {
  var tbody = document.getElementById('recordsBody');
  var messageBox = document.getElementById('recordsMessage');

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = 'message show ' + type;
  }

  // Put text safely into HTML (prevents users from injecting HTML)
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  try {
    var response = await fetch('/api/students');
    var body = await response.json();

    if (!response.ok) { showMessage('Error: ' + body.message, 'error'); return; }

    if (body.students.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">No student records yet. Add one using the Student Form.</td></tr>';
      return;
    }

    // Build one table row per student
    tbody.innerHTML = body.students.map(function (s, index) {
      return '<tr>' +
        '<td>' + (index + 1) + '</td>' +
        '<td>' + escapeHtml(s.name) + '</td>' +
        '<td>' + escapeHtml(s.email) + '</td>' +
        '<td>' + escapeHtml(s.department) + '</td>' +
        '<td>' + escapeHtml(String(s.yearOfStudy)) + '</td>' +
        '</tr>';
    }).join('');
  } catch (error) {
    showMessage('Error: could not reach the server. Is it running?', 'error');
  }
});
