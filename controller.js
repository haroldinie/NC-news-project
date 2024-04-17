const articles = require("./db/data/test-data/articles.js");
const { retreiveTopics, retrieveArticleById, retrieveAllArticles, retrieveCommentsByArticleId, insertComments } = require("./models.js");

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

function getCommentsByArticleId(req, res, next) {
    const {article_id} = req.params
    return retrieveCommentsByArticleId(article_id)
    .then((comments) => {
        return res.status(200).send({comments})
    })
    .catch((err) => {
        next(err)
    })
}

function postComments(req, res, next) {
  const { author, body } = req.body
  const { article_id } = req.params
  
  return insertComments(article_id, {author, body})
  .then((comment) => {
  return res.status(201).send({comment})
  })
  .catch((err) => {
    next(err)
  })
}


module.exports = { getTopics, getArticleById, getAllArticles, getCommentsByArticleId, postComments };
