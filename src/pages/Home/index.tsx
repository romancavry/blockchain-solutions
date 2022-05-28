import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { Chart, Converter } from './components'
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
import { Loader } from '../../components/Loader'

export const Home = () => {
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
    <div className={styles.home}>
      {needToLoad ? (
        <Loader />
      ) : (
        <>
          <Converter />
          <Chart />
        </>
      )}
    </div>
  )
} 