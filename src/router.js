import React, { PropTypes } from 'react'
import { Router, Route } from 'dva/router'
import IndexPage from './routes/IndexPage'

import Users from './routes/Users'
import NoMatch from './routes/NoMatch'

const RouterConfig = ({ history }) => (
  <Router history={history}>
    <Route path='/' component={IndexPage} />
    <Route path='/users' component={Users} />
    <Route path='*' component={NoMatch} />
  </Router>
)

RouterConfig.propTypes = {
  history: PropTypes.shape({}).isRequired
}

export default RouterConfig
