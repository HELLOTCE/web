"""Selenium demo that checks the Student Portal entry form.

Start the site with `npm start`, then run:
    python -m pip install selenium
    python examples/selenium_login_test.py

Selenium 4 uses Selenium Manager to find/download the Chrome driver when needed.
Set PORTAL_URL to use a different local URL, for example http://localhost:3001.
"""

import os
import unittest
from urllib.parse import urljoin

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


PORTAL_URL = os.environ.get("PORTAL_URL", "http://localhost:3000/")


class LoginPageFormatTest(unittest.TestCase):
    def setUp(self):
        options = webdriver.ChromeOptions()
        if os.environ.get("HEADLESS") == "1":
            options.add_argument("--headless=new")
        self.driver = webdriver.Chrome(options=options)
        self.wait = WebDriverWait(self.driver, 5)
        self.driver.get(PORTAL_URL)

    def tearDown(self):
        self.driver.quit()

    def enter_credentials(self, email, password):
        email_input = self.driver.find_element(By.ID, "email")
        password_input = self.driver.find_element(By.ID, "password")
        email_input.clear()
        email_input.send_keys(email)
        password_input.clear()
        password_input.send_keys(password)
        self.driver.find_element(By.CSS_SELECTOR, "#loginForm button[type='submit']").click()

    def test_invalid_email_shows_error(self):
        self.enter_credentials("not-an-email", "password123")
        error = self.wait.until(EC.visibility_of_element_located((By.ID, "emailError")))
        self.assertIn("valid email", error.text.lower())
        self.assertTrue(self.driver.find_element(By.ID, "loginForm").is_displayed())

    def test_password_without_number_shows_error(self):
        self.enter_credentials("student@example.com", "passwordonly")
        error = self.wait.until(EC.visibility_of_element_located((By.ID, "passwordError")))
        self.assertIn("letter and one number", error.text.lower())

    def test_valid_format_opens_student_form(self):
        self.enter_credentials("student@example.com", "password123")
        self.wait.until(EC.url_contains("student-form.html"))
        self.assertTrue(self.driver.current_url.endswith(urljoin(PORTAL_URL, "student-form.html")))


if __name__ == "__main__":
    unittest.main(verbosity=2)
