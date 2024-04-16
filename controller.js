const retreiveTopics = require('./models.js');

function getTopics(req, res, next) {
    const { query } = req
    return retreiveTopics(query)

    .then(({rows}) => {
        res.status(200).send(rows)
    })
    .catch((next) => {
        
        next(err)
    })
}





module.exports = getTopics
