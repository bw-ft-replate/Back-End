const request = require('supertest')
const server = require("../../server")
const db = require("../../../data/dbConfig")

const url = "/api/donors"


let donorToken;


beforeEach( async ()=> {
    await db.migrate.rollback()
        .then(()=> db.migrate.latest())
        .then(()=> db.seed.run())

    await request(server)
        .post("/api/auth/login")
        .send({
            username: "gord",
            password: "gord",
            role: "donor"
        })
        .then((res) => {
            donorToken = res.body.token
        })
})


describe("Get as donor", ()=>{
    it("returns status 200", async ()=>{
        const donorPickups = await request(server)
            .get(url)
            .set("authorization",donorToken)
        expect(donorPickups.status).toBe(200)    
    })
    it("Has property 'type'", async ()=>{
        const donorPickups = await request(server)
            .get(url)
            .set("authorization",donorToken)
        expect(donorPickups.body).toHaveProperty("donor-id")  
    })
    it("Has property 'business-name'", async ()=>{
        const donorPickups = await request(server)
            .get(url)
            .set("authorization",donorToken)
        expect(donorPickups.body).toHaveProperty("business-name")  
    })
})

describe("Put as donor", ()=>{
    it("returns status 201", async ()=>{
        const donorPickups = await request(server)
            .put(url)
            .set("authorization",donorToken)
            .send({"name":"edited business name"})
        expect(donorPickups.status).toBe(201)
    })
    it("returns status edited business name", async ()=>{
        const donorPickups = await request(server)
            .put(url)
            .set("authorization",donorToken)    
            .send({"name":"edited business name"}) 
        expect(donorPickups.body).toMatchObject({"business-name":"edited business name"})
    })
})

describe("Delete as donor", ()=>{
    it("returns status 200", async ()=>{
        const donorPickups = await request(server)
            .del(url)
            .set("authorization",donorToken)    
        expect(donorPickups.status).toBe(200)
    })
    it("returns status 200", async ()=>{
        const donorPickups = await request(server)
            .del(url)
            .set("authorization",donorToken)    
        expect(donorPickups.body).toMatchObject({message: "Donor deleted."})
    })
})