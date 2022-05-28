import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api'
import { COINS_IDS, DAYS_TO_HISTORY } from '../global-constants'
import { getInfo } from '../utils/getInfo'
import { ICoin, ICoinHistory } from '../utils/types'

export const getBtcPrice: any = createAsyncThunk('landing/getBtcPrice', async () => {
  const response = await api.get(`coins/${COINS_IDS.bitcoin}`)
  return response.data
})

export const getEthPrice: any = createAsyncThunk('landing/getEthPrice', async () => {
  const response = await api.get(`coins/${COINS_IDS.ethereum}`)
  return response.data
})

export const getUsdPrice: any = createAsyncThunk('landing/getUsdPrice', async () => {
  const response = await api.get(`coins/${COINS_IDS.usd}`)
  return response.data
})

export const getBtcHistory: any = createAsyncThunk('landing/getBtcHistory', async () => {
  const url = `coins/${COINS_IDS.bitcoin}/market_chart?vs_currency=usd&days=${DAYS_TO_HISTORY}&interval=daily`
  const response = await api.get(url)
  return response.data
})

export const getEthHistory: any = createAsyncThunk('landing/getEthHistory', async () => {
  const url = `coins/${COINS_IDS.ethereum}/market_chart?vs_currency=usd&days=${DAYS_TO_HISTORY}&interval=daily`
  const response = await api.get(url)
  return response.data
})

export const getUsdHistory: any = createAsyncThunk('landing/getUsdHistory', async () => {
  const url = `coins/${COINS_IDS.usd}/market_chart?vs_currency=usd&days=${DAYS_TO_HISTORY}&interval=daily`
  const response = await api.get(url)
  return response.data
})

export const landingSlice = createSlice({
  name: 'landing',
  initialState: {
    needToLoad: true,
    coins: {
      btc: {} as ICoin,
      eth: {} as ICoin,
      usd: {} as ICoin,
    },
    coinsHistory: {
      btc: [] as ICoinHistory,
      eth: [] as ICoinHistory,
      usd: [] as ICoinHistory,
    }
  },
  reducers: {
    setNeedToLoad(state, { payload }) {
      state.needToLoad = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBtcPrice.fulfilled, (state, { payload }) => {
      state.coins.btc = getInfo(payload)
    })
    builder.addCase(getEthPrice.fulfilled, (state, { payload }) => {
      state.coins.eth = getInfo(payload)
    })
    builder.addCase(getUsdPrice.fulfilled, (state, { payload }) => {
      state.coins.usd = getInfo(payload)
    })

    builder.addCase(getBtcHistory.fulfilled, (state, { payload }) => {
      state.coinsHistory.btc = payload.prices
    })
    builder.addCase(getEthHistory.fulfilled, (state, { payload }) => {
      state.coinsHistory.eth = payload.prices
    })
    builder.addCase(getUsdHistory.fulfilled, (state, { payload }) => {
      state.coinsHistory.usd = payload.prices
    })
  },
})

export const { setNeedToLoad } = landingSlice.actions
export default landingSlice.reducer
