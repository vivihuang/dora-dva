import React, { PropTypes, Component } from 'react'
import { connect } from 'dva'
import styles from './Login.css'

import LoginForm from './LoginForm'

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(values) {
    const { dispatch } = this.props
    dispatch({ type: 'auth/login', payload: { values } })
  }

  render() {
    return (
      <div className={styles.normal}>
        <LoginForm
          className={styles.loginForm}
          handleLogin={this.handleLogin}
        />
      </div>
    )
  }
}

export default connect()(Login)
