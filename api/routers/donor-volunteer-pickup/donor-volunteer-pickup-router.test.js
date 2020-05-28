const request = require('supertest')
const server = require("../../server")
const db = require("../../../data/dbConfig")

const url = "/api/pickups"

let volunteerToken;
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
            role: "volunteer"
        })
        .then((res) => {
            volunteerToken = res.body.token
        })

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
        expect(volunteerPickups.body[0]).toHaveProperty("type")  
    })
    it("Has property 'business-name'", async ()=>{
        const volunteerPickups = await request(server)
            .get(url)
            .set("authorization",volunteerToken)
        expect(volunteerPickups.body[0]).toHaveProperty("business-name")  
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
        expect(donorPickups.body[0]).toHaveProperty("type")  
    })
    it("Has property 'business-name'", async ()=>{
        const donorPickups = await request(server)
            .get(url)
            .set("authorization",donorToken)
        expect(donorPickups.body[0]).toHaveProperty("business-name")  
    })
    it("Has property 'volunteer-name'", async ()=>{
        const donorPickups = await request(server)
            .get(url)
            .set("authorization",donorToken)
        expect(donorPickups.body[0]["volunteer-info"]).toHaveProperty("volunteer-name")  
    })
})

describe("Put as volunteer", ()=>{
    it("returns status 201", async ()=>{
        const volunteerPickups = await request(server)
            .put(url+"/assign/3")
            .set("authorization",volunteerToken)
        expect(volunteerPickups.status).toBe(201)    
    })
    it("does update", async ()=>{
        const volunteerPickups = await request(server)
            .put(url+"/assign/3")
            .set("authorization",volunteerToken)

        expect(volunteerPickups.body).toHaveProperty("updated")   
    })
    it("assigns logged in user", async ()=>{
        const volunteerPickups = await request(server)
            .put(url+"/assign/3")
            .set("authorization",volunteerToken)
            .send({"volunteer-id":"1"})

        expect(volunteerPickups.body)
            .toMatchObject({"message": "Pickup 3 was successfully assigned to user: 1"})   
    })
})