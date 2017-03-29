const adminEmail = 'admin@admin.com'
const adminPassword = 'admin'

module.exports = (req, res, next) => {
  const data = JSON.parse(req.body)
  if (data.email === adminEmail && data.password === adminPassword) {
    res.send(200, { token: 111 })
  } else {
    res.send(401)
  }
  next()
}
