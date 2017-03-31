import React, { PropTypes } from 'react'
import { connect } from 'dva'
import * as authActions from '../../actions/auth'
import styles from './Login.scss'

import LoginForm from './LoginForm'

const mapStateToProps = state => ({
  auth: state.auth
})

const Login = ({ dispatch, auth }) => {
  const handleLogin = (values) => {
    dispatch(authActions.wrapNamespace(authActions.login, values))
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
