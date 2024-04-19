const db = require("../db/connection.js");

function retreiveTopics() {
  const sqlQuery = `SELECT * FROM topics;`;

  return db.query(sqlQuery).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, message: "not found" });
    }
    return result;
  });
}

module.exports = {
  retreiveTopics,
};
