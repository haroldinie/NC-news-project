const express = require('express')
const app = express()
const getTopics = require('./controller')
const endPoints = require('./endpoints.json')

app.get('/api/topics', getTopics) 

app.get('/api', (req, res) => {
    res.status(200).send(endPoints)
})

app.all('*', (req, res) => {
    res.status(404).send({message: "not found"})
})

app.use((err, req, res, next) => {
    res.status(500).send({message: "internal server error"})
})

module.exports = app
