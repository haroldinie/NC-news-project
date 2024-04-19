const { retrieveUsers } = require("../models/users.models.js");

function getUsers(req, res, next) {
  const { query } = req;
  return retrieveUsers(query)
    .then(({ rows }) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getUsers };
