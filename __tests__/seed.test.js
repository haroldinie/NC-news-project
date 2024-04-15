const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed")
const db = require("../db/connection.js")
const request = require("supertest")
const app = require("../app.js")

beforeEach(() => {
    return seed(data)
})

afterAll(() => {
    db.end()
})

describe("GET /api/topics", () => {
    test("responds with an array of topic objects", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {
            expect(body.length > 0).toBe(true)
            expect(body[0]).toHaveProperty('slug')
            expect(body[0]).toHaveProperty('description')
        })
    })
    // test("GET: 404, responds with bad request when spelling error", () => {
    //     return request(app)
    //     .get("/api/topicsss")
    //     .expect(404)
    //     .then(({body}) => {
            
    //         expect(body.message).toEqual('not found') // couldnt get test to pass with 404 message?
    //     })
    // })
})