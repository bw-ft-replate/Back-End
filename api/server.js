const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const authenticate = require('./auth/authenticator');
const authRouter = require("./auth/auth-router")
const donorRouter = require('./routers/donors/donors-router');
const volunteerRouter = require('./routers/volunteers/volunteers-router');
const pickupRouter = require('./routers/pickups/pickups-router');
const donorVolunteerPickupRouter = require('./routers/donor-volunteer-pickup/donor-volunteer-pickup-router')


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/donors', donorRouter);
server.use('/api/volunteers', volunteerRouter);
// server.use('/api/pickups/all', pickupRouter);
server.use('/api/pickups', donorVolunteerPickupRouter, pickupRouter)


server.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to replate back-end check out the docs: https://github.com/bw-ft-replate/Back-End"})
})


module.exports = server;