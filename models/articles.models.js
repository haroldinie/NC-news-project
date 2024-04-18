const db = require("../db/connection.js");

function retrieveArticleById(article_id) {
    return db
      .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
      .then(({ rows }) => {
        return rows[0];
      });
  }
  
  function retrieveAllArticles(topic) {

    let sqlQueryString = `SELECT 
    articles.author,
    articles.title,
    articles.article_id,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT (comments.article_id) :: INT AS comment_count
    FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id `

    const queryVals = []

    if(topic) {
      sqlQueryString += `WHERE topic = $1 `
      queryVals.push(topic)
    }

    sqlQueryString += `GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`

    return db
      .query(
        sqlQueryString, queryVals
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

  module.exports = {   
    retrieveArticleById,
    retrieveAllArticles,
    updateVoteCount,
    checkArticleExists
};