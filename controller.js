const retreiveTopics = require('./models.js');
// const retreiveEndPoints = require('./models.js')

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

// function endPoints(req, res, next) {
//     const { query } = req
//     return retreiveEndPoints(query)
// }

module.exports = getTopics
// module.exports = endPoints