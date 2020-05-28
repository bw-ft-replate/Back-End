const request = require('supertest')
const server = require("../server")
const db = require("../../data/dbConfig")

const url = "/api/auth/"

const bcryptjs = require("bcryptjs")
let password = bcryptjs.hashSync("gord", 2)

beforeEach(()=> {
    return db.migrate.rollback()
        .then(()=> db.migrate.latest())
        .then(()=> db.seed.run())
})

describe("Register",()=>{
    it("can register donor", async ()=>{
        const register = await request(server)
            .post(url+"register")
            .send({
                username: "gordilocks",
                password: `${password}`,
                role: "donor",
                name: "Gordilocks And The Three Bears",
                phone: "123 123 1234",
                address: "1 Mordor Way, Middle Earth"
            })
        expect(register.status).toEqual(201)
        expect(register.body).toHaveProperty("business-name")
        
    })
})

describe("Register",()=>{
    it("can decide if donor or volunteer", async ()=>{

        const registerDonor = await request(server)
            .post(url+"register")
            .send({
                username: "gordilocks",
                password: `${password}`,
                role: "donor",
                name: "Gordilocks And The Three Bears",
                phone: "123 123 1234",
                address: "1 Mordor Way, Middle Earth"
            })
        expect(registerDonor.body).toHaveProperty("business-name")
        const registerVolunteer = await request(server)
            .post(url+"register")
            .send({
                username: "gordilocks",
                password: `${password}`,
                role: "volunteer",
                name: "Gordilocks And The Three Bears",
                phone: "123 123 1234",
            })
        expect(registerVolunteer.body).toHaveProperty("volunteer-name")
    })
})

describe("Login",()=>{
    it (" can login as volunteer", async () => {
        const login = await request(server)
            .post(url+"login")
            .send({
                username: "gord",
                password: "gord",
                role: "volunteer",
            })
        expect(login.status).toEqual(201)
    })
})
describe("Login",()=>{
    it (" can login as donor", async () => {
        const login = await request(server)
            .post(url+"login")
            .send({
                username: "gord",
                password: "gord",
                role: "donor",
            })
        expect(login.status).toEqual(201)
    })
})

describe("Login",()=>{
    it (" Login returns token", async () => {
        const login = await request(server)
            .post(url+"login")
            .send({
                username: "gord",
                password: "gord",
                role: "volunteer",
            })
        expect(login.body).toHaveProperty('token')
    })
})