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
        const donorKeys = ["business-name","business"]
        if(userDetails.)
    }


    function donorRegister(){
        Donors.add(userDetails)
            .then(user=>{
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({error: "Database error while registering donor"})
            })
    }
    function volunteerRegister(){
        Volunteers.add(userDetails)
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