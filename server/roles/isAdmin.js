const isAdmin = (res, req, next) => {
  if (req.user.role != 'admin') {
    return res.status(403).send('Acces non autoriser')
  }
  next()
}

module.exports = isAdmin
