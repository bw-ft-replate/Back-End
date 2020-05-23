const request = require('supertest')

const server = require("./server")

describe("Get server",()=>{
    it("Should return 200", async()=>{
        const home = await request(server)
            .get("/")
        expect(home.status).toEqual(200)
    })
    it("Should return a message", async()=>{
        const home = await request(server)
            .get("/")
        expect(home.body).toHaveProperty("message")
    })
    it("direct user to docs", async()=>{
        const home = await request(server)
            .get("/")
        expect(home.body).toMatchObject({"message": "Welcome to replate back-end check out the docs: https://github.com/bw-ft-replate/Back-End"})
    })
})