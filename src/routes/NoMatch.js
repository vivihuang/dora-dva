import React from 'react'
import styles from './NoMatch.css'
import MainLayout from '../components/MainLayout/MainLayout'

const NoMatch = () => (
  <MainLayout location={location}>
    <div className={styles.normal}>
      <div className={styles.content}>
        Sorry. No page found here.
      </div>
    </div>
  </MainLayout>
)

export default NoMatch
