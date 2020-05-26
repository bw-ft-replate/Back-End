const router = require('express').Router();
const bcryptjs = require("bcryptjs")
const secrets = require("../../auth/secrets")
const Pickups = require("./pickups-model.js")
const jwt = require("jsonwebtoken")
const moment = require("moment")
const authenticator = require("../../auth/authenticator")

router.get("/all", (req,res)=>{
    Pickups.find().then(allPickups => {
        
        res.status(200).json(allPickups)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    console.log(moment("23-03-2020","DD-MM-YYYY").format('ll'))
})
router.get("/unassigned",(req,res)=> {
    Pickups.findUnassigned().then(unassignedPickups => {
        res.status(200).json(unassignedPickups)
    })
    .catch(err => {
        res.status(500).json({message:"There was an error fetching unassigned pickups", err})
    })
})

router.post("/", authenticator, (req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        const concatPickup = {...req.body, "pickup-date": req.body["pickup-date"]}
        Pickups.add(concatPickup,req.decodedToken.userId).then(newPickup => {
            res.status(200).json(newPickup)
        })
        .catch(err => {
            res.status(500).json({message: "Error while posting to database: ",err})
        })
    } else {
        res.status(404).json({error: "Access denied, only donors or businesses can create new pickups."})
    }
})

router.put("/:id",authenticator,(req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        const {id} = req.params
        const changes = req.body
        Pickups.findById(id).then(pickup => {
            if(pickup){
                Pickups.update(changes,id).then(updatedPickup => {
                    res.status(201).json(updatedPickup)
                })
                .catch(err => {
                    res.status(500).json({message: "Error while updating pickup: ",err})
                })
            } else {
                res.status(400).json({message: `Pickup with id ${id} does not exist`})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Error while finding that pickup: ",err})
        })
    } else {
        res.status(404).json({error: "Access denied, only donors or businesses can create new pickups."})
    }
})

  
module.exports = router;