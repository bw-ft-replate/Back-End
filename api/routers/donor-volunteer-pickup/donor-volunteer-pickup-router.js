const router = require('express').Router();
const Pickups = require("../pickups/pickups-model.js")
const Volunteers = require("../volunteers/volunteers-model")
const DonorVolunteerPickup = require ("./donor-volunteer-pickup-model")
const authenticator = require("../../auth/authenticator")


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

router.put("/assign/:id",authenticator, (req,res)=>{
    if(req.decodedToken.role === "donor" || req.decodedToken.role === "business"){
        res.status(403).json({message: "Donors can not assign volunteers on pickups, please log back in as a volunteer and assign pickups to yourself"})
    } else {
        Pickups.findById(req.params.id).then(pickup => {
            if (pickup){
                if(req.body["volunteer-id"]){
                    DonorVolunteerPickup.updateVolunteer(req.params.id, req.decodedToken.userId)
                    .then(updated=>{
                        console.log(updated)
                        res.status(201).json({message: `Pickup ${req.params.id} was successfully assigned to user: ${req.decodedToken.userId}`,updated})
                    })
                } else {
                    
                    DonorVolunteerPickup.updateVolunteer(req.params.id, null)
                    .then(updated=>{
                        res.status(201).json({message: `Pickup ${req.params.id} was successfully assigned to no user`,updated})
                    })
                }
                
            } else {
                res.status(404).json({message: "Could not find a pickup with the id: "+req.params.id})
            }
            
    
        }).catch(err => {
            res.status(500).json({message: "Error while posting to database: ",err})
        })
    }
    
})
  
module.exports = router;

