const express = require("express");
const app = express();

const endPoints = require("./endpoints.json");
const { getTopics, getArticleById, getAllArticles, getCommentsByArticleId, postComments } = require("./controller");

app.use(express.json())

app.get("/api/topics", getTopics);

app.get("/api", (req, res) => {
  res.status(200).send(endPoints);
});

app.get("/api/articles", getAllArticles)

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.post("/api/articles/:article_id/comments", postComments)

app.all("*", (req, res, next) => {
  res.status(404).send({ message: "not found" });
});

app.use((err, req, res, next) => {
    res.status(400).send({message: "Bad request"})
})


app.use((err, req, res, next) => {
  res.status(500).send({ message: "internal server error" });
});

module.exports = app;

