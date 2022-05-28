import React, { FC } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { getNormalDateFromUnix } from '../../../../../../app/utils/getNormalDateFromUnix'
import { ICoinHistory } from '../../../../../../app/utils/types'

interface ChartComponentProps {
  coinHistory: ICoinHistory
  graphName: string
  lineColor: string
}

export const ChartComponent: FC<ChartComponentProps> = ({ coinHistory, graphName, lineColor }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
  )
  
  const labels: any = []
  const values: any = []

  coinHistory.forEach((item) => {
    labels.push(getNormalDateFromUnix(item[0]))
    values.push(item[1])
  })

  const graphOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: graphName,
        data: labels.map((_: any, idx: number) => values[idx]),
        borderColor: lineColor,
        backgroundColor: lineColor,
        yAxisID: 'y',
      },
    ],
  }

  return (
    <Line options={graphOptions} data={data} />
  )
}