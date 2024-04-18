const db = require("../db/connection.js");

function retrieveUsers() {
const sqlQuery = `SELECT * FROM users;`

return db.query(sqlQuery).then((result) => {
    if (result.rows.length === 0) {
        return Promise.reject({ status: 404, message: "not found" });
      }
      return result;
})
}

module.exports = { retrieveUsers }