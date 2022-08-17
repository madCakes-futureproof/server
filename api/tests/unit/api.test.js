
const request = require("supertest")
const server = require("../../server")

beforeAll(() => {
    api = server.listen(3000, () => console.log("Test server running on port 3000"))
});

afterAll(done => {
    console.log("Stopping server")
    api.close(done)
});

test("It responds to get / with status code 200", done => {
    request().get("/").expect(200)
})


module.exports = api.test.js
