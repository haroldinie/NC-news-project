const db = require("./db/connection.js");

function retreiveTopics() {
  const sqlQuery = `SELECT * FROM topics;`;

  return db.query(sqlQuery).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, message: "not found" });
    }
    return result;
  });
}

function retrieveArticleById(article_id) {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      return rows[0];
    });
}

module.exports = { retreiveTopics, retrieveArticleById };
