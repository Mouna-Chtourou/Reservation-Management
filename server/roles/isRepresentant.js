const isRepresentant = (res, req, next) => {
  if (req.user.role != 'representant') {
    return res.status(403).send('Acces non autoriser')
  }
  next()
}

module.exports = isRepresentant
