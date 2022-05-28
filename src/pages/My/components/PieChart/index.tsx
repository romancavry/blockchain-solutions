import React, { FC } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

interface PieChartProps {
  btc: number
  eth: number
  usd: number
}

export const PieChart: FC<PieChartProps> = ({ btc, eth, usd }) => {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const data = {
    labels: ['BTC', 'ETH', 'USD'],
    datasets: [
      {
        data: [btc, eth, usd],
        backgroundColor: ['red', 'blue', 'purple'],
        borderWidth: 0,
      },
    ],
  }

  return (
    <Pie data={data} />
  )
}
