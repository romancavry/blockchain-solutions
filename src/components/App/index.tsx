import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { useAppDispatch } from '../../app/redux/hooks'
import {
  getBtcHistory,
  getBtcPrice,
  getEthHistory,
  getEthPrice,
  getUsdHistory,
  getUsdPrice,
} from '../../app/redux/landingSlice'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../Home'

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getBtcPrice())
    dispatch(getEthPrice())
    dispatch(getUsdPrice())

    dispatch(getBtcHistory())
    dispatch(getEthHistory())
    dispatch(getUsdHistory())
  }, [dispatch])

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
