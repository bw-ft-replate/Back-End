const router = require('express').Router();
const Pickups = require("../pickups/pickups-model.js")
const Volunteers = require("../volunteers/volunteers-model")
const DonorVolunteerPickup = require ("./donor-volunteer-pickup-model")
const authenticator = require("../../auth/authenticator")

router.post("/", authenticator, (req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken === "business"){
        const concatPickup = {...req.body, "pickup-date": req.body["pickup-date"]}
        Pickups.add(concatPickup,req.decodedToken.userId).then(newPickup => {
            res.status(200).json(newPickup)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(404).json({error: "Access denied, only donors or businesses can create new pickups."})
    }
})

router.get("/", authenticator, async (req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken.role === "business"){
        let donorPickups = []
        await DonorVolunteerPickup.findById("donor",req.decodedToken.userId).then( async donorVolunteerPickups => {
           for(const pickup of  donorVolunteerPickups){
                await Volunteers.findById(pickup["volunteer-id"]).then((volunteer) => {
                    if(volunteer){
                        donorPickups.push({
                            "pickup-id": pickup["pickup-id"],
                            "type": pickup["type"],
                            "amount": pickup["amount"],
                            "pickup-date": pickup["pickup-date"],
                            "business-name": pickup["business-name"],
                            'business-phone': pickup['business-phone'],
                            'business-address': pickup['business-address'],
                            'volunteer-info': {
                                'volunteer-id': volunteer['volunteer-id'],
                                'volunteer-name': volunteer['volunteer-name'],
                                'volunteer-phone': volunteer['volunteer-phone']
                            }   
                        })
                    } else {
                        donorPickups.push({
                        "pickup-id": pickup["pickup-id"],
                        "type": pickup["type"],
                        "amount": pickup["amount"],
                        "pickup-date": pickup["pickup-date"],
                        "business-name": pickup["business-name"],
                        'business-phone': pickup['business-phone'],
                        'business-address': pickup['business-address'],
                        'volunteer-info': null
                        })
                    }
                   
                })
                .catch( err => {
                    res.status(500).json(err)
                })
            }
            res.status(200).json(donorPickups)
        })
    } else {
        console.log(req.decodedToken.role)
        role = "volunteer"
        DonorVolunteerPickup.findById("volunteer",req.decodedToken.userId).then(volunteerPickups => {
            res.status(200).json(volunteerPickups)
        })
        .catch( err => {
            res.status(500).json(err)
        })

    }

    
})
  
module.exports = router;

