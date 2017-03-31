import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import * as authActions from '../../actions/auth'

import styles from './Header.scss'

const Header = ({ dispatch, location }) => {
  const logout = () => {
    dispatch(authActions.wrapNamespace(authActions.logout))
  }

  return (
    <Menu
      className={styles.menu}
      selectedKeys={[location.pathname]}
      mode='horizontal'
      theme='dark'
    >
      <Menu.Item key='/users'>
        <Link to='/users'><Icon type='bars' />Users</Link>
      </Menu.Item>
      <Menu.Item key='/'>
        <Link to='/'><Icon type='home' />Home</Link>
      </Menu.Item>
      <Menu.Item key='/404'>
        <Link to='/page-you-dont-know'><Icon type='frown-circle' />404</Link>
      </Menu.Item>
      <Menu.Item key='/antd'>
        <a href='https://github.com/dvajs/dva' target='_blank' rel='noopener noreferrer'>dva</a>
      </Menu.Item>
      <Menu.Item className={styles.logoutLink} key='/logout'>
        <a onClick={logout}><Icon type='logout' />Logout</a>
      </Menu.Item>
    </Menu>
  )
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired
}

export default connect()(Header)
