# Student Portal (Model Lab Practical)

A simple, reusable Student Portal: **Node.js + Express + MongoDB (Mongoose)** backend, plain HTML/CSS/JavaScript frontend,
an AngularJS demo, an XML example, tests, and a Figma guide.

> The entry form checks email and password formats only. This project does not create accounts or authenticate users.

---

## 1. Folder structure

```
student-portal/
├── server.js                  Starts the server, connects to MongoDB
├── package.json               Project info + dependencies + scripts
├── .env.example               Configuration template (copy to .env)
├── models/Student.js          Mongoose model (fields of a student)
├── routes/
│   ├── studentRoutes.js       URLs: POST/GET /api/students
│   └── studentHandlers.js     The code that runs for those URLs
├── public/                    The website (served by Express)
│   ├── index.html             Login page
│   ├── about.html             About page
│   ├── student-form.html      Student information form
│   ├── student-records.html   Saved records table
│   ├── css/style.css          All styling (colours are at the top)
│   └── js/
│       ├── site-config.js     Website name (EDIT HERE)
│       ├── validators.js      Validation rules (browser, server, tests)
│       ├── auth.js            Entry form format validation
│       ├── student-form.js    Sends the form to the API
│       └── student-records.js Loads records from the API
├── examples/
│   ├── angularjs-demo.html    AngularJS demo
│   └── students.xml           XML example
├── tests/                     Test cases (npm test)
├── FIGMA_GUIDE.md             How to recreate the design in Figma
└── README.md                  This file
```

---

## 2. Install Node.js and MongoDB (one time)

1. Install **Node.js (LTS)** from https://nodejs.org . Check in Command Prompt:
   ```
   node --version
   npm --version
   ```
2. Install **MongoDB Community Server** from https://www.mongodb.com/try/download/community .
   Choose **"Install MongoDB as a Service"** in the installer (easiest).

---

## 3. Start MongoDB

**If you installed it as a Service** (recommended), MongoDB usually starts automatically. To start it manually,
open Command Prompt **as Administrator**:
```
net start MongoDB
```

**If you did not install it as a service**, create the data folder once and start MongoDB in its own Command Prompt window
(replace `8.0` with your installed version number; keep this window open):
```
mkdir C:\data\db
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe"
```

You do **not** need to create the `student_portal` database yourself. MongoDB creates it automatically
when the first student is saved.

---

## 4. Run the project (Windows Command Prompt)

Open Command Prompt and go into the project folder (change the path to where you unzipped it):
```
cd C:\Users\YourName\Downloads\student-portal
```
Then run these one by one:
```
npm install
copy .env.example .env
npm start
```
You should see:
```
Server running at http://localhost:3000
MongoDB connected: mongodb://127.0.0.1:27017/student_portal
```
Open **http://localhost:3000** in your browser. The entry form accepts any valid email and a password of at least 8 characters containing a letter and a number; it only checks format and does not authenticate an account.

> Always open the site through `http://localhost:3000`. Do **not** double-click the HTML files for the main
> pages, because the form and records need the server.

If you see `MongoDB connection FAILED`, MongoDB is not running: go back to Step 3 and restart `npm start`.
The pages still open, but saving/loading students will show a "database not connected" message.

### Configuration (`.env`)
| Variable | Meaning | Default |
|---|---|---|
| `PORT` | Port of the website | `3000` |
| `MONGODB_URI` | MongoDB address; the last part is the database name | `mongodb://127.0.0.1:27017/student_portal` |

Database settings live only on the server (`.env`), never in the frontend JavaScript.

---

## 5. API endpoints

| Method | URL | What it does |
|---|---|---|
| `GET` | `/api/health` | Shows if the server is running and if MongoDB is connected |
| `POST` | `/api/students` | Validates and saves one student. Body (JSON): `name`, `email`, `department`, `yearOfStudy` (1-4). Returns `201` on success, `400` if validation fails, `503` if MongoDB is not connected |
| `GET` | `/api/students` | Returns all saved students, newest first: `{ success, count, students }` |

Quick browser check: open http://localhost:3000/api/students

Command Prompt example (Windows 10/11 has `curl`):
```
curl -X POST http://localhost:3000/api/students -H "Content-Type: application/json" -d "{\"name\":\"Asha\",\"email\":\"asha@example.com\",\"department\":\"Computer Science\",\"yearOfStudy\":\"3\"}"
```

---

## 6. AngularJS demo and XML example

- AngularJS: start the server and open **http://localhost:3000/examples/angularjs-demo.html**
  (or double-click `examples/angularjs-demo.html`). It needs internet to load AngularJS from a CDN.
  Without internet, download `angular.min.js` into the `examples` folder and change the `<script src>` line.
  The file is commented line by line: `ng-app`, `ng-controller`, `ng-model`, `{{ }}`.
- XML: open `examples/students.xml` in a browser or Notepad.

### Selenium login-page demo

The Selenium script in `examples/selenium_login_test.py` checks invalid email, a password missing a number, and a valid format that continues to the student form. The form only checks input format; it does not authenticate an account.

With the portal running in one terminal (`npm start`), install Selenium and run the script in another:
```
python -m pip install selenium
python examples/selenium_login_test.py
```
The example opens Chrome. Selenium 4's Selenium Manager locates the browser driver. To run headless, set `HEADLESS=1`; to use another server address, set `PORTAL_URL` (for example `http://localhost:3001/`).

---

## 7. Testing

The tests use Node's **built-in** test runner (no extra library). Run:
```
npm test
```
| Test file | What it checks |
|---|---|
| `tests/validators.test.js` | Login form validation, student form validation |
| `tests/studentHandlers.test.js` | Successful submission (saved, status 201), rejected invalid data (400), database error (500), retrieving records |

The handler tests use a fake in-memory model, so they run **without MongoDB**.
They do not test the HTML pages in a browser; do that manually (see below).

**Manual test checklist:** invalid email/password formats show errors; valid formats open the student form;
empty student form shows errors; valid submission shows a success message; the record appears on Student Records.

---

## 8. Quick edits for the exam

| I want to change... | Edit this |
|---|---|
| Website name / tagline, demo email and password | `public/js/site-config.js` |
| Colours | top of `public/css/style.css` (`:root`) |
| About page text | `public/about.html` |
| Sidebar link names | the `<aside class="sidebar">` block in each page |
| Form labels, dropdown options | `public/student-form.html` |
| **Add a new form field** (e.g. phone) | 1) `student-form.html` (copy a field block, add `phoneError` div) 2) `fields` list in `js/student-form.js` 3) rules in `js/validators.js` 4) `models/Student.js` 5) the `Student.create({...})` call in `routes/studentHandlers.js` 6) a column in `student-records.html` and `js/student-records.js` |
| MongoDB collection name | `mongoose.model('Student', ...)` in `models/Student.js` (collection = lowercase plural, `students`) |

---

## 9. Figma

See `FIGMA_GUIDE.md`. No Figma design file is included.

## 10. Common problems

| Problem | Fix |
|---|---|
| `'npm' is not recognized` | Install Node.js, then close and reopen Command Prompt |
| `MongoDB connection FAILED` | Start MongoDB (Step 3) and run `npm start` again |
| `Port 3000 already in use` | Change `PORT` in `.env`, e.g. `3001` |
| Records page shows "Database is not connected" | MongoDB is not running |
