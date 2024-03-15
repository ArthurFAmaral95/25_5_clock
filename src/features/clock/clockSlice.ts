import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

interface Clock {
  breakValue: number
  sessionValue: number
}

const initialState: Clock = {
  breakValue: 5,
  sessionValue: 25,
}

export const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    breakDecrement: state => {
      state.breakValue -= 1
    },
    breakIncrement: state => {
      state.breakValue += 1
    },
    sessionDecrement: state => {
      state.sessionValue -= 1
    },
    sessionIncrement: state => {
      state.sessionValue += 1
    },
    reset: state => {
      state.breakValue = 5
      state.sessionValue = 25
    },
  },
})

export const {
  breakDecrement,
  breakIncrement,
  sessionDecrement,
  sessionIncrement,
  reset,
} = clockSlice.actions

export const selectBreakValue = (state: RootState) => state.clock.breakValue
export const selectSessionValue = (state: RootState) => state.clock.sessionValue

export default clockSlice.reducer
