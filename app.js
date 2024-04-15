const express = require('express')
const app = express()
const getTopics = require('./controller')

app.get('/api/topics', getTopics)


app.use((err, req, res, next) => {
    res.status(404).send({message: "not found"})
})


app.use((err, req, res, next) => {
    res.status(500).send({message: "internal server error"})
})

module.exports = app