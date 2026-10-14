// tests/studentHandlers.test.js
// Tests for "successful form submission" and "retrieving student records".
// A FAKE student model (a simple array) is used, so MongoDB is NOT needed to run these tests.
// Run with:  npm test

const test = require('node:test');
const assert = require('node:assert');
const createStudentHandlers = require('../routes/studentHandlers');

// Fake model that pretends to be the Mongoose Student model
function makeFakeModel() {
  const saved = [];
  return {
    saved,
    create: async (data) => { const doc = { _id: String(saved.length + 1), ...data }; saved.push(doc); return doc; },
    find: () => ({ sort: async () => [...saved].reverse() })
  };
}

// Fake response object that remembers the status code and JSON body
function makeFakeRes() {
  return {
    statusCode: 200, body: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; }
  };
}

test('Submit: valid student is saved (status 201)', async () => {
  const model = makeFakeModel();
  const { createStudent } = createStudentHandlers(model);
  const res = makeFakeRes();

  await createStudent({ body: { name: 'Asha Kumar', email: 'asha@example.com', department: 'Computer Science', yearOfStudy: '3' } }, res);

  assert.strictEqual(res.statusCode, 201);
  assert.strictEqual(res.body.success, true);
  assert.strictEqual(model.saved.length, 1);
  assert.strictEqual(model.saved[0].yearOfStudy, 3); // converted to a number
});

test('Submit: invalid student is rejected (status 400) and not saved', async () => {
  const model = makeFakeModel();
  const { createStudent } = createStudentHandlers(model);
  const res = makeFakeRes();

  await createStudent({ body: { name: '', email: 'bad', department: '', yearOfStudy: '' } }, res);

  assert.strictEqual(res.statusCode, 400);
  assert.strictEqual(res.body.success, false);
  assert.strictEqual(model.saved.length, 0);
});

test('Submit: database error returns status 500', async () => {
  const brokenModel = { create: async () => { throw new Error('DB down'); } };
  const { createStudent } = createStudentHandlers(brokenModel);
  const res = makeFakeRes();

  await createStudent({ body: { name: 'Asha', email: 'asha@example.com', department: 'IT', yearOfStudy: '1' } }, res);

  assert.strictEqual(res.statusCode, 500);
});

test('Retrieve: returns all saved students with a count', async () => {
  const model = makeFakeModel();
  const { createStudent, getStudents } = createStudentHandlers(model);
  await createStudent({ body: { name: 'A', email: 'a@example.com', department: 'IT', yearOfStudy: '1' } }, makeFakeRes());
  await createStudent({ body: { name: 'B', email: 'b@example.com', department: 'Civil', yearOfStudy: '2' } }, makeFakeRes());

  const res = makeFakeRes();
  await getStudents({}, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.count, 2);
  assert.strictEqual(res.body.students[0].name, 'B'); // newest first
});

test('Retrieve: empty database returns an empty list', async () => {
  const { getStudents } = createStudentHandlers(makeFakeModel());
  const res = makeFakeRes();
  await getStudents({}, res);
  assert.strictEqual(res.body.count, 0);
});
