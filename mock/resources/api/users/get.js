import users from '../../../entity/users'

module.exports = (req, res, next) => {
  const { params } = req
  const page = parseInt(params.page, 10)
  const limit = parseInt(params.limit, 10)
  const startPos = (page - 1) * limit
  const endPos = startPos + limit
  const currentUsers = users.slice(startPos, endPos)
  res.setHeader('x-total-count', users.length)
  res.send(200, currentUsers)
  next()
}
