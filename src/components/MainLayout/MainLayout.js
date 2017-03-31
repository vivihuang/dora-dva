import React, { PropTypes } from 'react'
import styles from './MainLayout.scss'
import Header from './Header'

const MainLayout = ({ children, location }) => (
  <div className={styles.normal}>
    <Header location={location} />
    <div className={styles.content}>
      <div className={styles.main}>
        {children}
      </div>
    </div>
  </div>
)

MainLayout.propTypes = {
  location: PropTypes.shape({}).isRequired,
  children: PropTypes.element
}

export default MainLayout
