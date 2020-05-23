


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