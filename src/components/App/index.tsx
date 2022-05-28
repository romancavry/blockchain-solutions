import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { useAppDispatch } from '../../app/redux/hooks'
import { getBtcPrice, getEthPrice, getUsdPrice, setCoins } from '../../app/redux/landingSlice'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../Home'
import { getInfo } from '../../app/utils/getInfo'

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const promises = [
      dispatch(getBtcPrice()),
      dispatch(getEthPrice()),
      dispatch(getUsdPrice()),
    ]

    Promise.all(promises).then((res) => {
      const coinsData = res.map((item) => getInfo(item))
      dispatch(setCoins(coinsData))
    })
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
