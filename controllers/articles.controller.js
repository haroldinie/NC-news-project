const {
  retrieveArticleById,
  retrieveAllArticles,
  updateVoteCount,
} = require("../models/articles.models.js");

function getArticleById(req, res, next) {
  const { article_id } = req.params;

  return retrieveArticleById(article_id)
    .then((article) => {
      return res.status(200).send(article);
    })
    .catch((err) => {
      next(err);
    });
}

function getAllArticles(req, res, next) {
  const { topic } = req.query;
  return retrieveAllArticles(topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

function patchVotes(req, res, next) {
  const { inc_votes } = req.body;
  const { article_id } = req.params;

  return updateVoteCount(article_id, { inc_votes })
    .then((article) => {
      return res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getArticleById,
  getAllArticles,
  patchVotes,
};
