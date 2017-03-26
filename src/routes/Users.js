import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';

const Users = () => (
  <div className={styles.normal}>
    Route Component: Users
  </div>
)

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(Users)
