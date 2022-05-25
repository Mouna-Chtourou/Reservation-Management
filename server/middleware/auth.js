const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const auth = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      // Verify token
      const verifie = jwt.verify(token, process.env.JWT_SECRET)
      // Get user from the token
      req.user = await User.findById(verifie.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error("Pas d'autorisation ")
    }
  }
  if (!token) {
    res.status(401)
    throw new Error("Pas d'autorisation, pas de token")
  }
})

module.exports = auth
