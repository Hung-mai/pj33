'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "project3"
});

db.queryDB = async (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (error, result) => {
      if (error) { reject(error) }
      else { resolve(result) }
    })
  })
}

module.exports = db