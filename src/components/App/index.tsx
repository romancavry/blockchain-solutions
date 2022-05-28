import React from 'react'
import styles from './styles.module.scss'
import { Route, Routes } from 'react-router-dom'
import { Home, My, NotFoundPage } from '../../pages'
import { Header } from '../Header'

export const App = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/my' element={<My />} />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>
    </>
  )
}
