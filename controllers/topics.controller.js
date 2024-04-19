const { retreiveTopics } = require("../models/topics.models.js")

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

  module.exports = {
    getTopics
  }