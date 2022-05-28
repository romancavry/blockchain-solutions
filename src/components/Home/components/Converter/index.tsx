import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import transferIcon from '../../images/transfer.svg'
import { useAppSelector } from '../../../../app/redux/hooks'
import { formatPrice } from '../../../../app/utils/formatPrice'
import { ICoin } from '../../../../app/utils/types'
import { ONLY_DIGITS_REGEX } from '../../../../app/global-constants'

interface ITab extends ICoin {
  value: string
}

interface IConvertTarget {
  price: number
}

interface IConvertCurrent extends IConvertTarget {
  amount: number
}

const INITIAL_TABS_STATE = {
  value: '0',
  full_name: '',
  short_name: '',
  price: 0,
}

type PossibleCurrencyName = 'btc' | 'eth' | 'usd'

export const Converter = () => {
  const coinsData = useAppSelector((state) => state.landing.coins)
  const [loading, setLoading] = useState(true)

  const [firstTab, setFirstTab] = useState<ITab>(INITIAL_TABS_STATE)
  const [secondTab, setSecondTab] = useState<ITab>(INITIAL_TABS_STATE)

  const onTabChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const splitedName = event.currentTarget.name.split('-')
    const whichTab = splitedName[0]
    const whichCurrency: PossibleCurrencyName = splitedName[1].includes('usd') ? 'usd' : splitedName[1] as PossibleCurrencyName

    const activeTab = coinsData[whichCurrency]
    if (!activeTab) {
      return
    }

    const targetData: IConvertTarget = {
      price: activeTab.price
    }

    if (whichTab === 'first') {
      const currentData: IConvertCurrent = {
        amount: Number(secondTab.value),
        price: secondTab.price
      }
  
      setFirstTab({ ...activeTab, value: convert(currentData, targetData) })
    }

    if (whichTab === 'second') {
      const currentData: IConvertCurrent = {
        amount: Number(firstTab.value),
        price: firstTab.price
      }

      setSecondTab({ ...activeTab, value: convert(currentData, targetData) })
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    if (!value.match(ONLY_DIGITS_REGEX)) {
      return
    }

    if (name === 'first') {
      const currentData: IConvertCurrent = {
        amount: Number(value),
        price: firstTab.price
      }

      const targetData: IConvertTarget = {
        price: secondTab.price
      }

      setFirstTab({ ...firstTab, value })
      setSecondTab({ ...secondTab, value: convert(currentData, targetData) })
    }

    if (name === 'second') {
      const currentData: IConvertCurrent = {
        amount: Number(value),
        price: secondTab.price
      }

      const targetData: IConvertTarget = {
        price: firstTab.price
      }

      setSecondTab({ ...secondTab, value })
      setFirstTab({ ...firstTab, value: convert(currentData, targetData) })
    }
  }

  const convert = (current: IConvertCurrent, target: IConvertTarget): string => {
    const currentPrice = current.amount * current.price
    const amountToBuy = currentPrice / target.price
    return isNaN(amountToBuy) ? 'Invalid' : beautifyValue(amountToBuy)
  }

  const beautifyValue = (value: number) => {
    return String(Number(value.toFixed(4)))
  }

  const transfer = () => {
    setSecondTab(firstTab)
    setFirstTab(secondTab)
  }

  useEffect(() => {
    if (
      Object.keys(coinsData.btc).length !== 0 &&
      Object.keys(coinsData.eth).length !== 0 &&
      Object.keys(coinsData.usd).length !== 0
    ) {
      setFirstTab({ ...coinsData.btc, value: '0' })
      setSecondTab({ ...coinsData.eth, value: '0' })
      setLoading(false)
    }
  }, [coinsData])

  return (
    loading ? (
      <div>Loading...</div>
    ) : (
      <div className={styles.container}>
        <div className={styles.justifySpaceBetween}>
          <div className={styles.currency_buttons}>
            {Object.values(coinsData).map((coin) => (
              <button
                key={coin.price}
                className={
                  cn(styles.currency_button, firstTab.short_name === coin.short_name && styles.currency_button_active)
                }
                name={`first-${coin.short_name}`}
                onClick={onTabChange}
              >
                {coin.short_name.toUpperCase()}
              </button>
            ))}
          </div>
  
          <div className={styles.currency_buttons}>
            {Object.values(coinsData).map((coin) => (
              <button
                key={coin.price}
                className={
                  cn(styles.currency_button, secondTab.short_name === coin.short_name && styles.currency_button_active)
                }
                name={`second-${coin.short_name}`}
                onClick={onTabChange}
              >
                {coin.short_name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
  
        <div className={styles.justifySpaceBetween}>
          <input
            type='text'
            className={styles.input}
            value={firstTab.value}
            onChange={onInputChange}
            name='first'
          />
        
          <button className={styles.transfer} onClick={transfer}>
            <img src={transferIcon} alt='transfer' />
          </button>
  
          <input
            type='text'
            className={styles.input}
            value={secondTab.value}
            onChange={onInputChange}
            name='second'
          />
        </div>
  
        <div className={styles.justifySpaceBetween}>
          <span className={styles.rate}>
            1 {firstTab.short_name.toUpperCase()} = {formatPrice(firstTab.price)}$
          </span>
          <span className={styles.rate}>
            1 {secondTab.short_name.toUpperCase()} = {formatPrice(secondTab.price)}$
          </span>
        </div>
      </div>
    )
  )
}