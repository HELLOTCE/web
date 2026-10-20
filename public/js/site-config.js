// public/js/site-config.js
// EDIT HERE: the website name is kept in one place.
// Any element with  data-site-name  in the HTML automatically shows SITE_NAME.

var SITE_NAME = 'Student Portal';
var SITE_TAGLINE = 'College Model Lab Practical';

// Fill in the site name wherever the HTML asks for it
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-site-name]').forEach(function (el) { el.textContent = SITE_NAME; });
  document.querySelectorAll('[data-site-tagline]').forEach(function (el) { el.textContent = SITE_TAGLINE; });
});
