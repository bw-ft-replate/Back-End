const router = require('express').Router();
const bcryptjs = require("bcryptjs")
const secrets = require("../../auth/secrets")
const Pickups = require("./pickups-model.js")
const jwt = require("jsonwebtoken")
const authenticator = require("../../auth/authenticator")

router.get("/",(req,res)=>{
    Pickups.find().then(allPickups => {
        res.status(200).json(allPickups)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post("/",(req,res)=>{

    const concatPickup = {...req.body, "pickup-date": "2222-02-22"}
    Pickups.add(concatPickup).then(newPickup => {
        res.status(200).json(newPickup)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

  
module.exports = router;