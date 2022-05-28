import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Chart, Converter } from './components'
import { useAppDispatch } from '../../app/redux/hooks'
import {
  getBtcPrice,
  getEthPrice,
  getUsdPrice,
  getBtcHistory,
  getEthHistory,
  getUsdHistory
} from '../../app/redux/landingSlice'

export const Home = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const promises = [
      dispatch(getBtcPrice()),
      dispatch(getEthPrice()),
      dispatch(getUsdPrice()),
  
      dispatch(getBtcHistory()),
      dispatch(getEthHistory()),
      dispatch(getUsdHistory()),
    ]

    Promise.all(promises).then(() => {
      setLoading(false)
    })
  }, [dispatch])
  
  return (
    <div className={styles.home}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Converter />
          <Chart />
        </>
      )}
    </div>
  )
} 