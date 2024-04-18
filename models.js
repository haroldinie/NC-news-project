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

function retrieveAllArticles() {
  return db
    .query(
      `SELECT 
    articles.author,
    articles.title,
    articles.article_id,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT (comments.article_id) :: INT AS comment_count
    FROM articles
    LEFT JOIN comments
    ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => {
      return rows;
    });
}

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

function checkArticleExists(article_id) {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not found" });
      }
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

function updateVoteCount(article_id, patchVote) {
  const { inc_votes } = patchVote;

  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

function removeComment(comment_id) {
  return db
  .query(
    `DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [comment_id]
  )
  .then(({rows}) => {
    
    if (rows.length === 0) {
     return Promise.reject({
      status: 404,
      msg: "Comment not found" 
     }) 
    }
  })
}

module.exports = {
  retreiveTopics,
  retrieveArticleById,
  retrieveAllArticles,
  retrieveCommentsByArticleId,
  insertComments,
  checkArticleExists,
  updateVoteCount,
  removeComment,
};
