import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api'
import { COINS_IDS } from '../global-constants'
import { ICoin } from '../utils/types'

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

export const landingSlice = createSlice({
  name: 'landing',
  initialState: {
    coins: [] as ICoin[],
  },
  reducers: {
    setCoins(state, { payload }) {
      state.coins = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBtcPrice.fulfilled, (state, { payload }) => {
      console.log('getBtcPrice', payload)
    })
    builder.addCase(getBtcPrice.rejected, (state, { payload }) => {
      console.log('getBtcPrice', payload)
    })
  },
})

export const { setCoins } = landingSlice.actions
export default landingSlice.reducer
