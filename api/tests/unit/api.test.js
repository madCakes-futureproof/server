


const request = require("supertest")
const server = require("../../../server")


// Make sure test suite runs fine: 
test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
      for (let b = 1; b < 10; b++) {
        expect(a + b).not.toBe(0);
      }
    }
  });

test('null', () => {
const n = null;
expect(n).toBeNull();
expect(n).toBeDefined();
expect(n).not.toBeUndefined();
expect(n).not.toBeTruthy();
expect(n).toBeFalsy();
});

test('zero', () => {
const z = 0;
expect(z).not.toBeNull();
expect(z).toBeDefined();
expect(z).not.toBeUndefined();
expect(z).not.toBeTruthy();
expect(z).toBeFalsy();
});


// Server tests: 

describe("API", () => {
  let api;

  beforeAll(() => {
    api = server.listen(3000);
  });

  afterAll((done) => {
    api.close(done);
  });
  
  describe("Test the root path", () => {
    test("It should response the GET method", done => {
      request(api)
        .get("/")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });

  describe("GET request to user", () => {
    it("Reponds to a GET request at '/users' with a 200 status", (done) => {
      request(api).get("/users").expect(200, done);
    })
  });

  describe("GET user by id", () => {

    describe("when passed a user id", () => {
      test("should respond with a 200 status code", async () => {
        const response = await request(api).get("/users/1")
        expect(response.statusCode).toBe(200)
      })
    })
  });
  
})



