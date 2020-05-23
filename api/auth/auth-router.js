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
        if(userDetails["business-name"] && userDetails["business-address"] && userDetails["business-phone"]){
            const donor = {
                username: userDetails.username,
                password: userDetails.password,
                "business-name": userDetails["business-name"],
                "business-address":userDetails["business-address"],
                "business-phone":userDetails["business-phone"]
            }
            console.log("donor in router",donor)
            donorRegister(donor);
        } else {
            res.status(400).json({message: "Error while registering donor, missing required: business-name/business-address/business-phone"})
        }
    } else {
        if(userDetails["volunteer-name"] && userDetails["volunteer-address"] && userDetails["volunteer-phone"]){
            const volunteer = {
                username: userDetails.username,
                password: userDetails.password,
                "volunteer-name": userDetails["volunteer-name"],
                "volunteer-address":userDetails["volunteer-address"]
            }
            donorRegister(volunteer);
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
            console.log("I'm a naughty boy and I'm returning 500")
            res.status(500).json({error: "Database error while registering donor", error:err})
        })
}

function volunteerRegister(){
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