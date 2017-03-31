import dva from 'dva'
import createLoading from 'dva-loading'
import './index.scss'

import routers from './router'
import usersModel from './models/users'
import authModel from './models/auth'

// 1. Initialize
const app = dva()
app.model(usersModel)
app.model(authModel)

// 2. Plugins
// app.use({})
app.use(createLoading())

// 3. Model
// app.model(require('./models/example'))

// 4. Router
app.router(routers)

// 5. Start
app.start('#root')
