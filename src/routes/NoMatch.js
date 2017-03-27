import React, { PropTypes } from 'react'
import styles from './NoMatch.css'
import MainLayout from '../components/MainLayout/MainLayout'

const NoMatch = ({ location }) => (
  <MainLayout location={location}>
    <div className={styles.normal}>
      <div className={styles.content}>
        Sorry. No page found here.
      </div>
    </div>
  </MainLayout>
)

NoMatch.propTypes = {
  location: PropTypes.shape({}).isRequired
}

export default NoMatch
