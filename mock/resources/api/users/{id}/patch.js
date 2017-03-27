module.exports = (req, res, next) => {
  res.send(200, req.body)
  next()
}
