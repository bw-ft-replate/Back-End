const router = require('express').Router();
const bcryptjs = require("bcryptjs")
const secrets = require("../../auth/secrets")
// const Pickups = require("../pickups/pickups-model.js")
const DonorVolunteerPickup = require ("./donor-volunteer-pickup-model")
const jwt = require("jsonwebtoken")
const moment = require("moment")
const authenticator = require("../../auth/authenticator")

router.get("/", (req,res)=>{
    DonorVolunteerPickup.find().then(allDonorVolunteerPickups => {
        
        res.status(200).json(allDonorVolunteerPickups)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// router.post("/", authenticator, (req,res)=>{
//     if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
//         const concatPickup = {...req.body, "pickup-date": req.body["pickup-date"]}
//         Pickups.add(concatPickup,req.decodedToken.userId).then(newPickup => {
//             res.status(200).json(newPickup)
//         })
//         .catch(err => {
//             res.status(500).json(err)
//         })
//     } else {
//         res.status(404).json({error: "Access denied, only donors or businesses can create new pickups."})
//     }
// })

  
module.exports = router;