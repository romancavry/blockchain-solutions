import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../app/redux/hooks'
import styles from './styles.module.scss'

export const Chart = () => {
  const coinsHistory = useAppSelector((state) => state.landing.coinsHistory)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (coinsHistory?.btc.length) {
      setLoading(false)
    }
  }, [coinsHistory])

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className={styles.container}>
      <p>CHART</p>
    </div>
  )
}