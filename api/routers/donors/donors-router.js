const router = require('express').Router();
const bcryptjs = require("bcryptjs")
const secrets = require("../../auth/secrets")
const Donors = require("./donors-model.js")
const jwt = require("jsonwebtoken")
const authenticator = require("../../auth/authenticator")

router.put("/",authenticator, (req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        if (!req.body.name && !req.body.phone && !req.body.address){
            res.status(400).json({message: "Please include some changes like: { name: 'new donor name' } "})
        } else {
            let changes = {
                "business-name": req.body.name,
                "business-address": req.body.address,
                "business-phone": req.body.phone
            }
            Donors.update(changes,req.decodedToken.userId).then((updatedVolunter)=> {
                res.status(201).json(updatedVolunter)
            }) .catch(error => {
                res.status(500).json({message: "There was an error udating the donor"})
            })
        }
    } else {
        res.status(403).json({message: "only people signed in as donor can edit donor accounts"})        
    }
})

router.delete("/",authenticator,(req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        Donors.remove(req.decodedToken.userId).then((success) => {
            res.status(200).json({message: "Donor deleted."})
        })
    } else {
        res.status(403).json({message: "Only donors can delete donor accounts"})
    }
})

router.get("/",authenticator,(req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        Donors.findById(req.decodedToken.userId)
        .then((donor) => {
            res.status(200).json(donor)
        })
        .catch((err)=>{
            res.status(500).json({err})
        })
    } else {
        res.status(403).json({message: "Only donors can fetch donor accounts"})
    }
})

  
module.exports = router;