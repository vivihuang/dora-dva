import React, { PropTypes } from 'react'
import { Router, Route } from 'dva/router'

import MainLayout from './components/MainLayout/MainLayout'

import IndexPage from './routes/IndexPage'
import Users from './routes/Users'
import NoMatch from './routes/NoMatch'


const RouterConfig = ({ history }) => (
  <Router history={history}>
    <Route component={MainLayout}>
      <Route path='/' component={IndexPage}>
        <Route path='/users' component={Users} />
      </Route>
      <Route path='*' component={NoMatch} />
    </Route>
  </Router>
)

RouterConfig.propTypes = {
  history: PropTypes.shape({}).isRequired
}

export default RouterConfig
