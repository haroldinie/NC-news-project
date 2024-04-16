const { retreiveTopics, retrieveArticleById } = require("./models.js");

function getTopics(req, res, next) {
  const { query } = req;
  return retreiveTopics(query)
    .then(({ rows }) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      next(err);
    });
}

function getArticleById(req, res, next) {
  const { article_id } = req.params; // article_id: 2

  return retrieveArticleById(article_id)
    .then((article) => {
      return res.status(200).send(article);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getTopics, getArticleById };
