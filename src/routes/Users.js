import React from 'react'
import { connect } from 'dva'
import styles from './Users.css'
import UsersComponent from '../components/Users/Users'

const Users = () => (
  <div className={styles.normal}>
    <UsersComponent />
  </div>
)

export default connect()(Users)
