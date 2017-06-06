# Go1 Pilot

[![Build Status](http://img.shields.io/travis/phuonghuynh/go1-pilot.svg?style=flat-square)](https://travis-ci.org/phuonghuynh/go1-pilot)
[![Code Climate](http://img.shields.io/codeclimate/github/phuonghuynh/go1-pilot.svg?style=flat-square)](https://codeclimate.com/github/phuonghuynh/go1-pilot)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/phuonghuynh/go1-pilot.svg?style=flat-square)](https://codeclimate.com/github/codeclimate/codeclimate/coverage)
[![License](http://img.shields.io/:license-apache-blue.svg?style=flat-square)](http://www.apache.org/licenses/LICENSE-2.0.html)


This project uses ES6 with webpack bundle. Supporting ESLint & Code Coverage.

## Prerequisites
* Node.js
* Node Package Manager

## Structure:

```
project
│   .eslintrc.json      // ESLint rules
│   .gitignore          // Git ignore
│   karma.conf.js       // Karma task runner
│   package-lock.json   // NPM package caching
│   package.json        // NPM packages
│   README.md           // Document
│
└───src
│   │   app.js          // Main file
│   
└───test
    │   app.spec.js     // Unit test for app.js
```

## Installation
Install NodeJS packages:
```
npm install
```

## Testing

```
npm test
```

ESLint will be processed before excuting test cases.

Code coverage report will be generated in folder coverage.