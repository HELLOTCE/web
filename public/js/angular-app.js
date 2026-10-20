/* AngularJS application shared by every Student Portal page. */
(function () {
  'use strict';

  var app = angular.module('studentPortalApp', []);

  app.constant('PortalSettings', {
    siteName: 'Student Portal',
    tagline: 'College Model Lab Practical',
    pages: [
      { label: 'About', href: 'about.html' },
      { label: 'Student Form', href: 'student-form.html' },
      { label: 'Student Records', href: 'student-records.html' }
    ]
  });

  app.service('ValidationService', function () {
    this.isValidEmail = function (email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
    };

    this.validateCredentials = function (credentials) {
      var errors = {};
      var email = String(credentials.email || '').trim();
      var password = String(credentials.password || '');
      if (!email) errors.email = 'Email is required';
      else if (!this.isValidEmail(email)) errors.email = 'Enter a valid email address';
      if (!password) errors.password = 'Password is required';
      else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&._-]{8,}$/.test(password)) {
        errors.password = 'Use 8+ characters with at least one letter and one number';
      }
      return errors;
    };

    this.validateStudent = function (student) {
      var errors = {};
      if (!String(student.name || '').trim()) errors.name = 'Name is required';
      if (!String(student.email || '').trim()) errors.email = 'Email is required';
      else if (!this.isValidEmail(student.email)) errors.email = 'Enter a valid email address';
      if (!String(student.department || '').trim()) errors.department = 'Department is required';
      if (!student.yearOfStudy) errors.yearOfStudy = 'Year of study is required';
      else if (!(Number(student.yearOfStudy) >= 1 && Number(student.yearOfStudy) <= 4)) {
        errors.yearOfStudy = 'Year must be between 1 and 4';
      }
      return errors;
    };
  });

  app.service('StudentApiService', function ($http) {
    this.getStudents = function () {
      return $http.get('/api/students').then(function (response) { return response.data; });
    };
    this.createStudent = function (student) {
      return $http.post('/api/students', student).then(function (response) { return response.data; });
    };
  });

  app.controller('PortalController', function (PortalSettings) {
    this.siteName = PortalSettings.siteName;
    this.tagline = PortalSettings.tagline;
    this.pages = PortalSettings.pages;
  });

  app.controller('EntryController', function ($window, ValidationService) {
    var vm = this;
    vm.credentials = { email: '', password: '' };
    vm.errors = {};
    vm.message = '';

    vm.continue = function () {
      vm.errors = ValidationService.validateCredentials(vm.credentials);
      if (Object.keys(vm.errors).length) {
        vm.message = 'Please fix the errors below.';
        return;
      }
      // This format-only check intentionally does not create or verify accounts.
      $window.location.href = 'student-form.html';
    };
  });

  app.controller('AboutController', function () {
    this.sections = [
      { title: 'Introduction', text: 'The Student Portal is a simple website where students can submit their details and view saved student records.' },
      { title: 'Purpose', text: 'The purpose of this website is to make collecting and viewing student information easy and organised.' },
      { title: 'Mission', text: 'Our mission is to provide a clear, simple and reliable system for managing student information.' }
    ];
    this.features = [
      'Student information form with validation',
      'Records saved in a MongoDB database',
      'Student records page showing saved students',
      'Email and password format validation'
    ];
  });

  app.controller('StudentFormController', function (StudentApiService, ValidationService) {
    var vm = this;
    vm.departments = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil'];
    vm.years = [
      { label: '1st Year', value: '1' }, { label: '2nd Year', value: '2' },
      { label: '3rd Year', value: '3' }, { label: '4th Year', value: '4' }
    ];
    vm.student = {};
    vm.errors = {};
    vm.message = '';
    vm.messageType = '';

    vm.reset = function (form) {
      vm.student = {};
      vm.errors = {};
      vm.message = '';
      vm.messageType = '';
      if (form) form.$setPristine();
    };

    vm.submit = function (form) {
      vm.errors = ValidationService.validateStudent(vm.student);
      if (Object.keys(vm.errors).length) {
        vm.message = 'Please fill in all required fields correctly.';
        vm.messageType = 'error';
        return;
      }
      vm.message = 'Saving student...';
      vm.messageType = '';
      StudentApiService.createStudent(vm.student).then(function (body) {
        vm.message = body.message || 'Student saved successfully';
        vm.messageType = 'success';
        vm.reset(form);
        vm.message = body.message || 'Student saved successfully';
        vm.messageType = 'success';
      }).catch(function (response) {
        vm.message = response.data && response.data.message
          ? response.data.message
          : 'Could not reach the server. Is it running?';
        vm.messageType = 'error';
      });
    };
  });

  app.controller('StudentRecordsController', function (StudentApiService) {
    var vm = this;
    vm.students = [];
    vm.search = '';
    vm.sortBy = 'name';
    vm.loading = true;
    vm.message = '';
    vm.messageType = '';
    StudentApiService.getStudents().then(function (body) {
      vm.students = body.students || [];
      vm.loading = false;
    }).catch(function (response) {
      vm.loading = false;
      vm.message = response.data && response.data.message
        ? response.data.message
        : 'Could not reach the server. Is it running?';
      vm.messageType = 'error';
    });
  });
})();
