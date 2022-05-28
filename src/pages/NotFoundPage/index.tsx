import React from 'react'
import styles from './styles.module.scss'

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.code}>404</p>
      <p className={styles.error}>Page not found</p>
    </div>
  )
}