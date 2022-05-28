import React from 'react'
import styles from './styles.module.scss'

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.lds_facebook}>
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}