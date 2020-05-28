const request = require('supertest')
const server = require("../../server")
const db = require("../../../data/dbConfig")

const url = "/api/volunteers"


let volunteerToken;


beforeEach( async ()=> {
    await db.migrate.rollback()
        .then(()=> db.migrate.latest())
        .then(()=> db.seed.run())

    await request(server)
        .post("/api/auth/login")
        .send({
            username: "gord",
            password: "gord",
            role: "v"
        })
        .then((res) => {
            volunteerToken = res.body.token
        })
})


describe("Get as volunteer", ()=>{
    it("returns status 200", async ()=>{
        const volunteerPickups = await request(server)
            .get(url)
            .set("authorization",volunteerToken)
        expect(volunteerPickups.status).toBe(200)    
    })
    it("Has property 'type'", async ()=>{
        const volunteerPickups = await request(server)
            .get(url)
            .set("authorization",volunteerToken)
        expect(volunteerPickups.body).toHaveProperty("volunteer-id")  
    })
    it("Has property 'volunteer-name'", async ()=>{
        const volunteerPickups = await request(server)
            .get(url)
            .set("authorization",volunteerToken)
        expect(volunteerPickups.body).toHaveProperty("volunteer-name")  
    })
})

describe("Put as volunteer", ()=>{
    it("returns status 201", async ()=>{
        const volunteerPickups = await request(server)
            .put(url)
            .set("authorization",volunteerToken)
            .send({"name":"edited volunteer name"})
        expect(volunteerPickups.status).toBe(201)
    })
    it("returns status edited volunteer name", async ()=>{
        const volunteerPickups = await request(server)
            .put(url)
            .set("authorization",volunteerToken)    
            .send({"name":"edited volunteer name"}) 
        expect(volunteerPickups.body).toMatchObject({"volunteer-name":"edited volunteer name"})
    })
})

describe("Delete as volunteer", ()=>{
    it("returns status 200", async ()=>{
        const volunteerPickups = await request(server)
            .del(url)
            .set("authorization",volunteerToken)    
        expect(volunteerPickups.status).toBe(200)
    })
    it("returns status 200", async ()=>{
        const volunteerPickups = await request(server)
            .del(url)
            .set("authorization",volunteerToken)    
        expect(volunteerPickups.body).toMatchObject({message: "Volunteer deleted."})
    })
})