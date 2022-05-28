import React from 'react'
import styles from './styles.module.scss'
import { Chart, Converter } from './components'

export const Home = () => {
  return (
    <div className={styles.home}>
      <Converter />
      <Chart />
    </div>
  )
} 