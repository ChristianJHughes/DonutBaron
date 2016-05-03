"use strict"

// A module to wrap the sqlite3 database.
var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('./database/donut_database.sqlite3');

module.exports = exports = db;
