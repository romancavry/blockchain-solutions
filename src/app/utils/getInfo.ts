import { ICoin } from './types'

export const getInfo = (data: any): ICoin => {
  const info = data

  return {
    full_name: info.name,
    short_name: info.symbol,
    price: info.market_data.current_price.usd,
  }
}