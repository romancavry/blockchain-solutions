import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { Route, Routes } from 'react-router-dom'
import { Home, My, NotFoundPage } from '../../pages'
import { Header } from '../Header'
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks'
import {
  getBtcPrice,
  getEthPrice,
  getUsdPrice,
  getBtcHistory,
  getEthHistory,
  getUsdHistory,
  setNeedToLoad
} from '../../app/redux/landingSlice'

export const App = () => {
  const dispatch = useAppDispatch()
  const needToLoad = useAppSelector((state) => state.landing.needToLoad)

  useEffect(() => {
    if (needToLoad) {
      const promises = [
        dispatch(getBtcPrice()),
        dispatch(getEthPrice()),
        dispatch(getUsdPrice()),
    
        dispatch(getBtcHistory()),
        dispatch(getEthHistory()),
        dispatch(getUsdHistory()),
      ]
  
      Promise.all(promises).then(() => {
        dispatch(setNeedToLoad(false))
      })
    }
  }, [dispatch, needToLoad])
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
