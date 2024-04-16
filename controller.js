const { retreiveTopics, retrieveArticleById, retrieveAllArticles } = require("./models.js");

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
    return retrieveAllArticles()
    .then((articles) => {
        res.status(200).send({articles})
    })
    .catch((err) => {
        next(err)
    })
}


module.exports = { getTopics, getArticleById, getAllArticles };
