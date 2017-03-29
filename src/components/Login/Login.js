import React, { PropTypes } from 'react'
import { connect } from 'dva'
import styles from './Login.css'

import LoginForm from './LoginForm'

const Login = ({ dispatch }) => {
  const handleLogin = (values) => {
    dispatch({ type: 'auth/login', payload: { values } })
  }

  return (
    <div className={styles.normal}>
      <LoginForm
        className={styles.loginForm}
        handleLogin={handleLogin}
      />
    </div>
  )
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(Login)
