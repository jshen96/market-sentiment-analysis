const config = require('../config.js');
const db = new require('pg').Pool(config.db);

db.connect();

module.exports = db;