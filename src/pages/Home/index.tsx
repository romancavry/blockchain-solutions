import React from 'react'
import styles from './styles.module.scss'
import { Chart, Converter } from './components'
import { useAppSelector } from '../../app/redux/hooks'
import { Loader } from '../../components/Loader'

export const Home = () => {
  const needToLoad = useAppSelector((state) => state.landing.needToLoad)

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