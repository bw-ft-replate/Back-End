const router = require('express').Router();
const bcryptjs = require("bcryptjs")
const secrets = require("../../auth/secrets")
const Volunteers = require("./volunteers-model.js")
const jwt = require("jsonwebtoken")
const authenticator = require("../../auth/authenticator")

router.put("/",authenticator, (req,res)=>{
    console.log(req.body)
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        res.status(403).json({message: "only people signed in as volunteers can edit volunteer accounts"})
    } else {
        let changes = {
            "volunteer-name": req.body.name,
            "volunteer-phone": req.body.phone
        }
        Volunteers.update(changes,req.decodedToken.userId).then((updatedVolunter)=> {
            console.log(updatedVolunter)
            res.status(201).json(updatedVolunter)
        }) .catch(error => {
            res.status(500).json({message: "There was an error udating the volunteer"})
        })
    }
})
  
module.exports = router;