import { configureStore } from '@reduxjs/toolkit'
import landingSlice from './landingSlice'

export const store = configureStore({
  reducer: {
    landing: landingSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
