import { configureStore } from "@reduxjs/toolkit"
import clockReducer from '../features/clock/clockSlice'

export const store = configureStore({
  reducer: {
    clock: clockReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
