// public/js/site-config.js
// EDIT HERE: the website name and demo login details are kept in one place.
// Any element with  data-site-name  in the HTML automatically shows SITE_NAME.

var SITE_NAME = 'Student Portal';
var SITE_TAGLINE = 'College Model Lab Practical';

// DEMO LOGIN (practice only - NOT real security, anyone can read this file)
var DEMO_EMAIL = 'student@example.com';
var DEMO_PASSWORD = 'password123';

// Fill in the site name wherever the HTML asks for it
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-site-name]').forEach(function (el) { el.textContent = SITE_NAME; });
  document.querySelectorAll('[data-site-tagline]').forEach(function (el) { el.textContent = SITE_TAGLINE; });
});
