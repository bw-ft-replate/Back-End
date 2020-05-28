const request = require('supertest')
const server = require("../../server")
const db = require("../../../data/dbConfig")

const url = "/api/pickups/"

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

describe("Get All",()=>{
    it("status to be 200", async ()=>{
        const pickups = await request(server)
            .get(url+"all")
        expect(pickups.status).toEqual(200)
    })
    it("Is not empty", async ()=>{
        const pickups = await request(server)
            .get(url+"all")
        expect(pickups.body).not.toHaveLength(0)
    })
    it("Has 3 pickups", async ()=>{
        const pickups = await request(server)
            .get(url+"all")
        expect(pickups.body).toHaveLength(3)
    })
})

describe("Get unassigned",()=>{
    it("status to be 200", async ()=>{
        const pickups = await request(server)
            .get(url+"unassigned")
            .set("authorization",volunteerToken)
        expect(pickups.status).toEqual(200)
    })
    it("Is not empty", async ()=>{
        const pickups = await request(server)
            .get(url+"unassigned")
            .set("authorization",volunteerToken)
        expect(pickups.body).not.toHaveLength(0)
    })
    it("Has 1 pickups", async ()=>{
        const pickups = await request(server)
            .get(url+"unassigned")
            .set("authorization",volunteerToken)
        expect(pickups.body).toHaveLength(1)
    })
    it("Has pickup date", async ()=>{
        const pickups = await request(server)
            .get(url+"unassigned")
            .set("authorization",volunteerToken)
        expect(pickups.body[0]).toHaveProperty("pickup-date")
    })
})

describe("Put",()=>{
    it("status to be 201", async ()=>{
        const pickups = await request(server)
            .put(url+"1")
            .set("authorization",donorToken)
            .send({type:"moon juice"})
        expect(pickups.status).toEqual(201)
    })
    it("to have property of type", async ()=>{
        const pickups = await request(server)
            .put(url+"1")
            .set("authorization",donorToken)
            .send({type:"moon juice"})
        expect(pickups.body).toHaveProperty("type")
    })
    it("to have type of moon juice", async ()=>{
        const pickups = await request(server)
            .put(url+"1")
            .set("authorization",donorToken)
            .send({type:"moon juice"})
        expect(pickups.body).toMatchObject({type:"moon juice"})
    })
})

describe("Delete",()=>{
    it("status to be 200", async ()=>{
        const pickups = await request(server)
            .del(url+"1")
            .set("authorization",donorToken)
        expect(pickups.status).toBe(200)
    })
    it("status to have property message", async ()=>{
        const pickups = await request(server)
            .del(url+"1")
            .set("authorization",donorToken)
        expect(pickups.body).toHaveProperty("message")
    })
    it("status to have property message", async ()=>{
        const pickups = await request(server)
            .del(url+"1")
            .set("authorization",donorToken)
        expect(pickups.body).toMatchObject({message: "successfully deleted"})
    })
    it("status to have actually deleted", async ()=>{
        await request(server)
            .del(url+"1")
            .set("authorization",donorToken)
        const pickups = await request(server)
            .get(url+"all")
            expect(pickups.body).toHaveLength(2)        
    })
})