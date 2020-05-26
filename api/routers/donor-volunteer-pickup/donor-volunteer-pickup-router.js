const router = require('express').Router();
const bcryptjs = require("bcryptjs")
const secrets = require("../../auth/secrets")
// const Pickups = require("../pickups/pickups-model.js")
const Volunteers = require("../volunteers/volunteers-model")
const DonorVolunteerPickup = require ("./donor-volunteer-pickup-model")
const jwt = require("jsonwebtoken")
const moment = require("moment")
const authenticator = require("../../auth/authenticator")

router.get("/", authenticator, (req,res)=>{

    let role;

    if(req.decodedToken.role === "donor" || req.decodedToken.role === "business"){
        role = "donor"
        let pickups = [];
        DonorVolunteerPickup.findById(role,req.decodedToken.userId)
            .then(donorVolunteerPickups => {
                donorVolunteerPickups.forEach((item,index) => {
                    Volunteers.findById(item["volunteer-id"]).then(volunteerInfo => {
                        pickups.push(
                            {
                                "pickup-id": item["pickup-id"],
                                "type": item["type"],
                                "amount": item["amount"],
                                "pickup-date": item["pickup-date"],
                                "business-name": item["business-name"],
                                'business-phone': item['business-phone'],
                                'business-address': item['business-address'],
                                'volunteer-info': {
                                    'volunteer-id': volunteerInfo['volunteer-id'],
                                    'volunteer-name': volunteerInfo['volunteer-name'],
                                    'volunteer-phone': volunteerInfo['volunteer-phone']
                                }   
                            }
                        )
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
                    
                })
            })
            .then( ( ) => {
                res.status(200).json(pickups)
            })
            
            .catch(err => {
                res.status(500).json(err)
            })
    } else {
        console.log(req.decodedToken.role)
        role = "volunteer"

    }
    
})

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

  
module.exports = router;



 //     console.log(">...........",returnedDonorVolunteerPickup)
            //     informationToSendToJson =[]

                // returnedDonorVolunteerPickup.map((item,index) =>
                //  return  {
                    //     "pickup-id": item["pickup-id"],
                    //     type: item[type],
                    //     amount: item[amount],
                    //     "pickup-date": item["pickup-date"],
                    //     "business-name": item["business-name"],
                    //     'business-phone': item['business-phone'],
                    //     'business-address': item['business-address'],
                    //     'volunteer-info': {
                    //         'volunteer-id': item['volunteer-info'],
                    //         'volunteer-name': item['volunteer-name'],
                    //         'volunteer-phone': item['volunteer-phone']
                    //     }
                    // } 





// DonorVolunteerPickup.findById(role,req.decodedToken.userId).then(donorVolunteerPickups => {
    //     res.status(200).json(donorVolunteerPickups)
    // })
    // .catch(err => {
    //     res.status(500).json(err)
    // })



    //  return  {
                //         "pickup-id": item["pickup-id"],
                //         type: item[type],
                //         amount: item[amount],
                //         "pickup-date": item["pickup-date"],
                //         "business-name": item["business-name"],
                //         'business-phone': item['business-phone'],
                //         'business-address': item['business-address'],
                //         'volunteer-info': {
                //             'volunteer-id': item['volunteer-info'],
                //             'volunteer-name': item['volunteer-name'],
                //             'volunteer-phone': item['volunteer-phone']
                //         }
                //     }