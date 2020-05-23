const router = require('express').Router();
const bcryptjs = require("bcryptjs")
const secrets = require("../../auth/secrets")
const Pickups = require("./pickups-model.js")
const jwt = require("jsonwebtoken")

function generateToken(user){
    const payload = {
        userId : user.id,
        username : user.username
    }
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn:"1d"
    }
    return jwt.sign(payload, secret, options)
  }
  
  module.exports = router;