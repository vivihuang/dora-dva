import React, { PropTypes } from 'react'
import { connect } from 'dva'
import styles from './Users.css'
import UsersComponent from '../components/Users/Users'
import MainLayout from '../components/MainLayout/MainLayout'

const Users = ({ location }) => (
  <MainLayout location={location}>
    <div className={styles.normal}>
      <UsersComponent />
    </div>
  </MainLayout>
)

Users.propTypes = {
  location: PropTypes.shape({}).isRequired
}

export default connect()(Users)
