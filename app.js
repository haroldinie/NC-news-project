const express = require("express");
const app = express();

const endPoints = require("./endpoints.json");
const {
  getArticleById,
  getAllArticles,
  patchVotes,
} = require("./controllers/articles.controller");

const {
  deleteComment,
  postComments,
  getCommentsByArticleId,
} = require("./controllers/comments.controller");

const { getTopics } = require("./controllers/topics.controller");

const {
  handleCustomErrors,
  handleAll404,
  handleInvalidPath,
  handleInvalidColumn,
  handleInvalidKey,
  handle400,
  handle500,
} = require("./errors/index");
const { getUsers } = require("./controllers/users.controller");

const cors = require('cors')

app.use(cors())

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", (req, res) => {
  res.status(200).send(endPoints);
});

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postComments);

app.patch("/api/articles/:article_id", patchVotes);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers);

app.use(handleCustomErrors);

app.use("*", handleAll404);

app.use(handleInvalidPath);

app.use(handleInvalidColumn);

app.use(handleInvalidKey);

app.use(handle400);

app.use(handle500);

module.exports = app;
