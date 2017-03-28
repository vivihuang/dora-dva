module.exports = (req, res, next) => {
  const data = JSON.parse(req.body)
  if (data.email && data.password) {
    res.send(200, { token: 111 })
  } else {
    res.send(404)
  }
  next()
}
