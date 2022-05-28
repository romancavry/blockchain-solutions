import React from 'react'
import styles from './styles.module.scss'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../Home'

export const App = () => {
  return (
    <div className={styles.main_container}>
      <header style={{ height: '100px'}} />

      <main className={styles.main}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path="*"
            element={<Home />}
          />
        </Routes>
      </main>
    </div>
  )
}
