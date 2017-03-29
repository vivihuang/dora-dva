import React, { PropTypes } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

import styles from './Header.css'

const Header = ({ location }) => (
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
      <Link to='/logout'><Icon type='logout' />Logout</Link>
    </Menu.Item>
  </Menu>
)

Header.propTypes = {
  location: PropTypes.shape({}).isRequired
}

export default Header
