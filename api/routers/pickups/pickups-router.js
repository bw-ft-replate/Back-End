const router = require('express').Router();
const bcryptjs = require("bcryptjs")
const secrets = require("../../auth/secrets")
const Pickups = require("./pickups-model.js")
const DonorVolunteerPickup = require("../donor-volunteer-pickup/donor-volunteer-pickup-model")
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
router.get("/unassigned", authenticator,(req,res)=> {
    if(req.decodedToken.role !== "donor" && req.decodedToken !== "business"){
        Pickups.findUnassigned().then(unassignedPickups => {
            res.status(200).json(unassignedPickups)
        })
        .catch(err => {
            res.status(500).json({message:"There was an error fetching unassigned pickups", err})
        })
    } else {
        res.status(403).json({message: "Unassigned pickups are only viewable by volunteers"})
    }
    
})

router.post("/", authenticator, (req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        const concatPickup = {...req.body, "pickup-date": req.body["pickup-date"]}
        Pickups.add(concatPickup,req.decodedToken.userId).then(newPickup => {
            res.status(201).json(newPickup)
        })
        .catch(err => {
            res.status(500).json({message: "Error while posting to database: ",err})
        })
    } else {
        res.status(401).json({error: "Access denied, only donors or businesses can create new pickups."})
    }
})

router.put("/:id",authenticator,(req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        const id = req.params.id
        const changes = req.body
        Pickups.findById(id).then(async pickup => {
            await DonorVolunteerPickup.findByPickupId(id).then( async found => {
                if(found["donor-id"] === req.decodedToken.userId){
                    if(pickup){
                        await Pickups.update(changes,id).then(updatedPickup => {
                            res.status(201).json(updatedPickup)
                        })
                        .catch(err => {
                            res.status(500).json({message: "Error while updating pickup: ",err})
                        })
                    } else {
                        res.status(400).json({message: `Pickup with id ${id} does not exist`})
                    }
                } else {
                    res.status(401).json({error: "Access denied, only donors or businesses that created this pickup can update it."})
                }
            })
            
        })
        .catch(err => {
            res.status(500).json({message: "Error while finding that pickup: ",err})
        })
    } else {
        res.status(401).json({error: "Access denied, only donors or businesses can create new pickups."})
    }
})

router.delete("/:id",authenticator,(req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        const id = req.params.id
        const changes = req.body
        Pickups.findById(id).then(async pickup => {
            await DonorVolunteerPickup.findByPickupId(id).then( async found => {
                if(found["donor-id"] === req.decodedToken.userId){
                    if(pickup){
                        await DonorVolunteerPickup.remove(id)
                        .then(() => console.log("donor-volunteer-pickup removed"))
                        .then(async ()=> {
                            await Pickups.remove(id).then(() => console.log("pickup removed"))
                            .catch(err => {
                                res.status(500).json({message: "Error while removing pickup: ",err})
                            })
                        })
                        .catch(err => {
                            res.status(500).json({message: "Error while removing donor-volunteer-pickup: ",err})
                        })
                    } else {
                        res.status(400).json({message: `Pickup with id ${id} does not exist`})
                    }
                    res.status(200).json({message: "successfully deleted"})
                } else {
                    res.status(401).json({error: "Access denied, only donors or businesses that created this pickup can remove it."})
                }
            })
            
        })
        .catch(err => {
            res.status(500).json({message: "Error while finding that pickup: ",err})
        })
    } else {
        res.status(401).json({error: "Access denied, only donors or businesses can create new pickups."})
    }
})



  
module.exports = router;