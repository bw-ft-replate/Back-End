const router = require('express').Router();
const bcryptjs = require("bcryptjs")
const secrets = require("../../auth/secrets")
const Donors = require("./donors-model.js")
const jwt = require("jsonwebtoken")
const authenticator = require("../../auth/authenticator")

router.put("/",authenticator, (req,res)=>{
    console.log(req.body)
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        let changes = {
            "business-name": req.body.name,
            "business-address": req.body.address,
            "business-phone": req.body.phone
        }
        Donors.update(changes,req.decodedToken.userId).then((updatedVolunter)=> {
            console.log(updatedVolunter)
            res.status(201).json(updatedVolunter)
        }) .catch(error => {
            res.status(500).json({message: "There was an error udating the volunteer"})
        })
    } else {
        res.status(403).json({message: "only people signed in as donor can edit donor accounts"})        
    }
})

router.delete("/",authenticator,(req,res)=>{
    Donors.remove(req.decodedToken.userId).then((success) => {
        res.status(200).json({message: "Donor deleted."})
    })
})

  
module.exports = router;