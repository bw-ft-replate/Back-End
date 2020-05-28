const router = require('express').Router();
const Volunteers = require("./volunteers-model.js")
const authenticator = require("../../auth/authenticator")

router.put("/",authenticator, (req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        res.status(403).json({message: "only people signed in as volunteers can edit volunteer accounts"})
    } else {
        if (!req.body.name && !req.body.phone){
            res.status(400).json({message: "Please include some changes like: { name: 'new volunteer name' } "})
        } else {
            let changes = {
                "volunteer-name": req.body.name,
                "volunteer-phone": req.body.phone
            }
            Volunteers.update(changes,req.decodedToken.userId).then((updatedVolunter)=> {
                res.status(201).json(updatedVolunter)
            }) .catch(error => {
                res.status(500).json({message: "There was an error udating the volunteer"})
            })
        }
        
    }
})

router.delete("/",authenticator,(req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        res.status(403).json({message: "Only volunteers can delete volunteer accounts"})
    } else {
        Volunteers.remove(req.decodedToken.userId).then((success) => {
            res.status(200).json({message: "Volunteer deleted."})
        })
    }
})

router.get("/",authenticator,(req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        res.status(403).json({message: "Only volunteers can fetch volunteer accounts"})
    } else {
        Volunteers.findById(req.decodedToken.userId)
        .then((volunteer) => {
            res.status(200).json(volunteer)
        })
        .catch((err)=>{
            res.status(500).json({err})
        })
        
    }
})
  
module.exports = router;