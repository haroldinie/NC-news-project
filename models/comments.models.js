const db = require("../db/connection.js");

function retrieveCommentsByArticleId(article_id) {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
}

function insertComments(article_id, newComment) {
  const { author, body } = newComment;

  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [article_id, author, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

function removeComment(comment_id) {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Comment not found",
        });
      }
    });
}

module.exports = {
  retrieveCommentsByArticleId,
  insertComments,
  removeComment,
};
