import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useAppSelector } from '../../app/redux/hooks'
import { beautifyValue } from '../../app/utils/beautifyValue'
import { PieChart } from './components'

const CURRENCIES = ['btc', 'eth', 'usd']
type TButtonNames = 'btc' | 'eth' | 'usd'

export const My = () => {
  const coinsData = useAppSelector((state) => state.landing.coins)
  const needToLoad = useAppSelector((state) => state.landing.needToLoad)

  const [values, setValues] = useState({ btc: 10, eth: 21, usd: 420 })
  const [total, setTotal] = useState('0')

  const onButtonPress = (event: React.MouseEvent<HTMLButtonElement>) => {
    const splitedName = event.currentTarget.name.split('-')
    const currency = splitedName[0] as TButtonNames
    const action = splitedName[1]

    if (action === 'minus') {
      setValues((prev) => {
        return { ...prev, [currency]: prev[currency]-- }
      })
    } else {
      setValues((prev) => {
        return { ...prev, [currency]: prev[currency]++ }
      })
    }
  }

  const countTotal = useCallback(() => {
    const bitcoinsPrices = values.btc * coinsData.btc.price
    const ethereumPrices = values.eth * coinsData.eth.price
    const usdPrices = values.usd * coinsData.usd.price
    return beautifyValue(bitcoinsPrices + ethereumPrices + usdPrices)
  }, [coinsData.btc.price, coinsData.eth.price, coinsData.usd.price, values.btc, values.eth, values.usd])

  useEffect(() => {
    if (!needToLoad) {
      setTotal(countTotal())
    }
  }, [countTotal, needToLoad])
  
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p className={styles.title}>Balance</p>
        <ul className={styles.left_list}>
          {CURRENCIES.map((item, idx) => (
            <li className={styles.left_item} key={idx}>
              <button className={styles.left_button} onClick={onButtonPress} name={`${item}-minus`}>-</button>
              <span className={styles.left_value}>{values[item as TButtonNames]} {item.toUpperCase()}</span>
              <button className={styles.left_button} onClick={onButtonPress} name={`${item}-plus`}>+</button>
            </li> 
          ))}
        </ul>
        <p className={styles.total}>Total: <span>{total}$</span></p>
      </div>

      <div className={styles.right}>
        <p className={styles.title}>Pie</p>
        <PieChart btc={values.btc} eth={values.eth} usd={values.usd} />
      </div>
    </div>
  )
}