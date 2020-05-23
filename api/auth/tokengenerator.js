module.exports = (user) => {
    const payload = {
        userId : user.id,
        username : user.username,
        role: user.role
    }
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn:"1d"
    }
    return jwt.sign(payload, secret, options)
  }
