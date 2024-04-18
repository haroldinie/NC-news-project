const { insertComments, removeComment, retrieveCommentsByArticleId } = require("../models/comments.models.js")

const {checkArticleExists } = require("../models/articles.models.js")

function postComments(req, res, next) {
    const { author, body } = req.body;
    const { article_id } = req.params;
  
    return insertComments(article_id, { author, body })
      .then((comment) => {
        return res.status(201).send({ comment });
      })
      .catch((err) => {
        next(err);
      });
  }
  
  function getCommentsByArticleId(req, res, next) {
    const { article_id } = req.params;
    Promise.all([
      retrieveCommentsByArticleId(article_id),
      checkArticleExists(article_id),
    ])
      .then((comments) => {
        return res.status(200).send({ comments: comments[0] });
      })
      .catch((err) => {
        next(err);
      });
  }
  
  
  function deleteComment(req, res, next) {
    const { comment_id } = req.params
  
    return removeComment(comment_id)
    .then(() => {
      return res.status(204).send()
    })
    .catch((err) => {
      next(err)
    })
  }
  
  
  module.exports = {
  
    postComments,
    getCommentsByArticleId,
    deleteComment
  };