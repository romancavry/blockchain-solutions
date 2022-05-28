import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../app/redux/hooks'
import styles from './styles.module.scss'
import cn from 'classnames'
import { ChartComponent } from './components'

const TABS = ['BTC', 'ETH', 'USD']
type TTabs = 'BTC' | 'ETH' | 'USD'

export const Chart = () => {
  const coinsHistory = useAppSelector((state) => state.landing.coinsHistory)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TTabs>('BTC')

  const onTabChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget
    if (name === 'BTC' || name === 'ETH' || name === 'USD') {
      setActiveTab(name)
    }
  }

  useEffect(() => {
    if (coinsHistory?.btc.length) {
      setLoading(false)
    }
  }, [coinsHistory])

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {TABS.map((tab, idx) => (
          <button
            className={cn(styles.tab, activeTab === tab && styles.tab_active)}
            key={idx}
            name={tab}
            onClick={onTabChange}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.graphs}>
        {activeTab === 'BTC' && <ChartComponent graphName='Bitcoin' lineColor='red' coinHistory={coinsHistory.btc} />}
        {activeTab === 'ETH' && <ChartComponent graphName='Ethereum' lineColor='blue' coinHistory={coinsHistory.eth} />}
        {activeTab === 'USD' && <ChartComponent graphName='USD' lineColor='purple' coinHistory={coinsHistory.usd} />}
      </div>
    </div>
  )
}