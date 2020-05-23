const router = require('express').Router();
const bcryptjs = require("bcryptjs")
const secrets = require("./secrets")
const Volunteers = require("../routers/volunteers/volunteers-model")
const Donors = require("../routers/donors/donors-model.js")
const Pickups = require("../routers/pickups/pickups-model.js")

const jwt = require("jsonwebtoken")

router.post('/register',credentialValidater, (req, res) => {
    const userDetails = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 2;
    userDetails.password = bcryptjs.hashSync(userDetails.password, rounds);
    if(userDetails.role === "donor" || userDetails.role === "business"){ 
        if(userDetails["name"] && userDetails["address"] && userDetails["phone"]){
            const donor = {
                username: userDetails.username,
                password: userDetails.password,
                "business-name": userDetails["name"],
                "business-address":userDetails["address"],
                "business-phone":userDetails["phone"]
            }
            donorRegister(donor);
        } else {
            res.status(400).json({message: "Error while registering donor, missing required: business-name/business-address/business-phone"})
        }
    } else {
        if(userDetails["name"] && userDetails["phone"]){
            const volunteer = {
                username: userDetails.username,
                password: userDetails.password,
                "volunteer-name": userDetails["name"],
                "volunteer-phone":userDetails["phone"]
            }
            volunteerRegister(volunteer);
        } else {
            res.status(400).json({message: "Error while registering volunteer, missing required: volunteer-name/volunteer-address"})
        }

    }


function donorRegister(user){
    console.log("donorRegister()")
    Donors.add(user)
        .then(user=>{
            console.log({user})
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({error: "Database error while registering donor", error:err})
        })
}

function volunteerRegister(user){
    Volunteers.add(user)
    .then(user=>{
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({error: "Database error while registering volunteer"})
    })
}
      
    
    
          

      
  });


function credentialValidater(req,res,next) {
    if (req.body.username && req.body.password && req.body.role && typeof req.body.password === "string"){
        next();
    } else {
        res.status(400).json({message:"Please provide valid username/password/role"})
    }
    
}  
  
module.exports = router;