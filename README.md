# Student Portal

A student information portal built with Node.js, Express, MongoDB Atlas, Mongoose, HTML, CSS, and JavaScript. It includes a student form, a records page, an About page, an AngularJS example, and a Selenium demo.

> The entry page checks email and password formats only. It does not create accounts or authenticate users. Do not enter a real password.

## Requirements

- Windows 10 or 11
- Git
- Node.js LTS (includes npm)
- A MongoDB Atlas cluster, database user, and your PC's IP address allowed in Atlas Network Access
- Python and Chrome only if you want to run the Selenium demo

### Install Git and Node.js from Windows Terminal

Check if they are installed:

```powershell
git --version
node --version
npm --version
```

If a command is not found, install the missing tool:

```powershell
winget install --id Git.Git -e --source winget
winget install --id OpenJS.NodeJS.LTS -e --source winget
```

Close and reopen the terminal after installation, then run the version checks again.

## Download and run the project

In Windows Terminal or PowerShell, run:

```powershell
git clone https://github.com/HELLOTCE/web.git
cd web
npm install
copy .env.example .env
notepad .env
```

In `.env`, replace the `MONGODB_URI` placeholders with your Atlas connection string. It should follow this pattern:

```text
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/student_portal?retryWrites=true&w=majority
```

Use your Atlas **database user** credentials, not your Atlas website login. If the database password contains reserved URL characters, URL-encode them. Save `.env` and close Notepad. Keep `.env` private; it is excluded from Git.

In Atlas, add your current public IP under **Network Access** and ensure the database user has permission to read and write to the database. The app uses the `student_portal` database and creates its collection when the first student record is saved.

Start the server:

```powershell
npm start
```

Open [http://localhost:3000](http://localhost:3000). To check the server and database status, visit [http://localhost:3000/api/health](http://localhost:3000/api/health); the database value should be `connected`.

Keep the terminal running while using the site. Press `Ctrl+C` in that terminal to stop the server.

## Pages and examples

- `/` — email/password format-check entry page
- `/about.html` — About
- `/student-form.html` — add a student record
- `/student-records.html` — view saved records
- `/examples/angularjs-demo.html` — small AngularJS demo (loads AngularJS from a CDN)
- `/examples/students.xml` — sample XML file

The student form saves data through the Express API to MongoDB Atlas. Always access the pages through the local server at `http://localhost:3000`, rather than opening the HTML files directly.

## Selenium login-page demo

The script checks that invalid email and password formats show errors, and that valid formats continue to the student form. This tests format validation only, not account authentication.

With the portal running, open a second terminal in the project directory and run:

```powershell
python -m pip install selenium
python examples/selenium_login_test.py
```

The demo opens Chrome. Selenium 4 uses Selenium Manager to locate the browser driver. For headless mode in PowerShell:

```powershell
$env:HEADLESS = "1"
python examples/selenium_login_test.py
```

## Tests

Run the Node.js tests with:

```powershell
npm test
```

The tests cover form validation and API handlers using a fake model; they do not require a database.

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server and database connection status |
| `GET` | `/api/students` | List saved students |
| `POST` | `/api/students` | Validate and save a student (`name`, `email`, `department`, `yearOfStudy`) |

## Troubleshooting

- **`git` is not recognized:** Install Git, then reopen the terminal.
- **`npm` or `node` is not recognized:** Install Node.js LTS, then reopen the terminal.
- **MongoDB connection failed:** Check that `.env` contains the correct Atlas URI, the database user/password are correct, and Atlas Network Access allows your IP.
- **Port 3000 is busy:** Change `PORT` in `.env` (for example, `PORT=3001`) and open `http://localhost:3001`.
- **Selenium cannot start Chrome:** Install or update Chrome and try the Selenium command again.
