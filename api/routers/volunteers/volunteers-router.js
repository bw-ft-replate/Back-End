const router = require('express').Router();
const bcryptjs = require("bcryptjs")
const secrets = require("../../auth/secrets")
const Volunteers = require("./volunteers-model.js")
const jwt = require("jsonwebtoken")
const authenticator = require("../../auth/authenticator")


  
module.exports = router;