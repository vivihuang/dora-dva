import users from '../../../entity/users'

module.exports = (req, res, next) => {
  const { page, limit } = req.params
  const startPos = (page - 1) * limit
  const endPos = startPos + limit
  const currentUsers = users.slice(startPos, endPos)
  res.setHeader('x-total-count', users.length)
  res.send(200, currentUsers)
  next()
}
