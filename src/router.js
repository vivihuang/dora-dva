import React from 'react'
import { Router, Route } from 'dva/router'
import IndexPage from './routes/IndexPage'

import Users from './routes/Users.js'
import NoMatch from './routes/NoMatch.js'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path='/' component={IndexPage} />
      <Route path='/users' component={Users} />
      <Route path='*' component={NoMatch} />
    </Router>
  )
}

export default RouterConfig
