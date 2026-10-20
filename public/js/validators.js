// public/js/validators.js
// Validation rules used by the browser forms, the backend AND the tests.
// The wrapper below lets the same file work in the browser (window.Validators)
// and in Node.js (require). You do not need to change the wrapper.

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();   // Node.js
  } else {
    root.Validators = factory();  // Browser
  }
})(this, function () {

  // Simple email check: something@something.something
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
  }

  // Generic client-side credential format check (not account authentication).
  // Returns { valid: true/false, errors: { fieldName: 'message' } }
  function validateLogin(data) {
    var errors = {};
    var email = String((data && data.email) || '').trim();
    var password = String((data && data.password) || '');

    if (!email) errors.email = 'Email is required';
    else if (!isValidEmail(email)) errors.email = 'Enter a valid email address';

    if (!password) errors.password = 'Password is required';
    else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&._-]{8,}$/.test(password)) {
      errors.password = 'Use 8+ characters with at least one letter and one number';
    }

    return { valid: Object.keys(errors).length === 0, errors: errors };
  }

  // Student form: all four fields are required; year must be 1 to 4.
  function validateStudent(data) {
    var errors = {};
    var d = data || {};
    var name = String(d.name || '').trim();
    var email = String(d.email || '').trim();
    var department = String(d.department || '').trim();
    var year = Number(d.yearOfStudy);

    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    else if (!isValidEmail(email)) errors.email = 'Enter a valid email address';
    if (!department) errors.department = 'Department is required';
    if (!d.yearOfStudy) errors.yearOfStudy = 'Year of study is required';
    else if (!(year >= 1 && year <= 4)) errors.yearOfStudy = 'Year must be between 1 and 4';

    return { valid: Object.keys(errors).length === 0, errors: errors };
  }

  return { isValidEmail: isValidEmail, validateLogin: validateLogin, validateStudent: validateStudent };
});
