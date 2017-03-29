import React, { PropTypes, Component } from 'react'
import { connect } from 'dva'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

import styles from './Header.css'

class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({}).isRequired
  }

  logout = () => {
    const { dispatch } = this.props
    dispatch({ type: 'auth/logout' })
  }

  render() {
    const { location } = this.props
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
          <a onClick={this.logout}><Icon type='logout' />Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default connect()(Header)
