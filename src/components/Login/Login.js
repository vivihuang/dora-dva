import React, { PropTypes } from 'react'
import { connect } from 'dva'
import styles from './Login.css'

import LoginForm from './LoginForm'

const mapStateToProps = state => ({
  auth: state.auth
})

const Login = ({ dispatch, auth }) => {
  const handleLogin = (values) => {
    dispatch({ type: 'auth/login', payload: { values } })
  }

  return (
    <div className={styles.normal}>
      <LoginForm
        className={styles.loginForm}
        errorMsg={auth.error}
        handleLogin={handleLogin}
      />
    </div>
  )
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps)(Login)
