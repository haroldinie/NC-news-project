const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed")
const db = require("../db/connection.js")
const request = require("supertest")
const app = require("../app.js")
const endPoints = require('../endpoints.json')

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
            expect(body).toHaveLength(3)
            body.forEach((topic) => {
                expect(topic).toMatchObject({ description: expect.any(String), slug: expect.any(String) })
            })
        })
    })
        // .then(({body}) => {
        //     expect(body).toHaveLength(3)
        //     expect(body).toMatchObject([
        //         {
        //           description: 'The man, the Mitch, the legend',
        //           slug: 'mitch'
        //         },
        //         {
        //           description: 'Not dogs',
        //           slug: 'cats'
        //         },
        //         {
        //           description: 'what books are made of',
        //           slug: 'paper'
        //         }
        //       ])
        // })

    describe("GET /api/topics", () => {
        test("responds with 404 when incorrect spelling", () => {
            return request(app)
            .get("/api/incorrectspelling")
            .expect(404)
        })
    })

describe("GET /api", () => {
    test("responds with object describing all available endpoints", () => {
        return request(app)
        .get ("/api")
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual(endPoints)
        })
    })
})
})
