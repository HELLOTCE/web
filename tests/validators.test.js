// tests/validators.test.js
// Tests for the login form and student form validation.
// Uses Node's built-in test runner (no extra library needed).
// Run with:  npm test

const test = require('node:test');
const assert = require('node:assert');
const { validateLogin, validateStudent } = require('../public/js/validators');

// ---------- Login form validation ----------
test('Login: valid email and password passes', () => {
  const result = validateLogin({ email: 'student@example.com', password: 'password123' });
  assert.strictEqual(result.valid, true);
});

test('Login: empty email and password fail', () => {
  const result = validateLogin({ email: '', password: '' });
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.email);
  assert.ok(result.errors.password);
});

test('Login: invalid email format fails', () => {
  const result = validateLogin({ email: 'not-an-email', password: 'password123' });
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.email);
});

test('Login: short password fails', () => {
  const result = validateLogin({ email: 'student@example.com', password: '123' });
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.password);
});

// ---------- Student form validation ----------
const goodStudent = { name: 'Asha Kumar', email: 'asha@example.com', department: 'Computer Science', yearOfStudy: '3' };

test('Student form: all fields filled passes', () => {
  assert.strictEqual(validateStudent(goodStudent).valid, true);
});

test('Student form: empty form shows errors for all four fields', () => {
  const result = validateStudent({});
  assert.strictEqual(result.valid, false);
  assert.deepStrictEqual(Object.keys(result.errors).sort(), ['department', 'email', 'name', 'yearOfStudy']);
});

test('Student form: missing name fails', () => {
  const result = validateStudent({ ...goodStudent, name: '   ' });
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.name);
});

test('Student form: invalid email fails', () => {
  const result = validateStudent({ ...goodStudent, email: 'asha@' });
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.email);
});

test('Student form: year outside 1-4 fails', () => {
  const result = validateStudent({ ...goodStudent, yearOfStudy: '9' });
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.yearOfStudy);
});
