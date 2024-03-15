import { Button } from "./components/Button"
import { Label } from "./components/Label"
import { Value } from "./components/Value"
import "./styles/globals.css"

import { useAppDispatch, useAppSelector } from "./app/hooks"
import {
  selectBreakValue,
  selectSessionValue,
  breakDecrement,
  breakIncrement,
  sessionDecrement,
  sessionIncrement,
  reset,
} from "./features/clock/clockSlice"

const App = () => {
  const breakValue = useAppSelector(selectBreakValue)
  const sessionValue = useAppSelector(selectSessionValue)

  const timerClockValue = document.getElementById("time-left")!
  const timerClockTitleElement = document.getElementById("timer-label")!

  const dispatch = useAppDispatch()

  let timeLeft
  let minutesLeft = sessionValue
  let secondsLeft = 0

  let interval: number | undefined
  let secondsDiscount = 0
  let running = false

  let timerClockTitle = "Session"

  function runClock() {
    secondsDiscount += 1000

    if (timerClockTitle === "Session") {
      timeLeft = sessionValue * 60 * 1000 - secondsDiscount
      minutesLeft = new Date(timeLeft).getMinutes()
      secondsLeft = new Date(timeLeft).getSeconds()

      timerClockValue.textContent =
        timeLeft === 60 * 60 * 1000
          ? "60:00"
          : `${minutesLeft < 10 ? "0" + minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`
    } else {
      timeLeft = breakValue * 60 * 1000 - secondsDiscount
      minutesLeft = new Date(timeLeft).getMinutes()
      secondsLeft = new Date(timeLeft).getSeconds()

      timerClockValue.textContent =
        timeLeft === 60 * 60 * 1000
          ? "60:00"
          : `${minutesLeft < 10 ? "0" + minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`
    }

    clockBeep(minutesLeft, secondsLeft)

    checkEndOfTime(minutesLeft, secondsLeft, secondsDiscount)
  }

  function clockBeep(minutes: number, seconds: number) {
    if (minutes === 0 && seconds === 0) {
      const audioElement: any = document.getElementById("beep")

      audioElement.play()
    }
  }

  function checkEndOfTime(minutes: number, seconds: number, discount: number) {
    if (
      minutes === 59 &&
      seconds === 59 &&
      timerClockTitle === "Session" &&
      discount > 1000
    ) {
      timerClockTitle = "Break"
      secondsDiscount = 0
      timerClockValue.textContent = `${breakValue}:00`
      timerClockTitleElement.textContent = "Break"
    } else if (
      minutes === 59 &&
      seconds === 59 &&
      timerClockTitle === "Break" &&
      discount > 1000
    ) {
      timerClockTitle = "Session"
      secondsDiscount = 0
      timerClockValue.textContent = `${sessionValue}:00`
      timerClockTitleElement.textContent = "Session"
    }
  }

  function handleClick(id: string) {
    switch (id) {
      case "break-decrement":
        if (breakValue <= 1) {
          return
        }
        dispatch(breakDecrement())
        break
      case "break-increment":
        if (breakValue >= 60) {
          return
        }
        dispatch(breakIncrement())
        break
      case "session-decrement":
        if (sessionValue <= 1) {
          return
        }
        dispatch(sessionDecrement())
        break
      case "session-increment":
        if (sessionValue >= 60) {
          return
        }
        dispatch(sessionIncrement())
        break
      case "start-stop":
        if (running) {
          clearInterval(interval)
          running = false
        } else {
          interval = setInterval(runClock, 1000)
          running = true
        }
        break
      case "reset":
        const audioElement: any = document.getElementById("beep")!
        audioElement.pause()
        audioElement.currentTime = 0

        secondsDiscount = 0
        timerClockValue.textContent = `${sessionValue}:00`
        timerClockTitleElement.textContent = "Session"

        dispatch(reset())
        break
      default:
        break
    }
  }

  return (
    <div id="clock-container">
      <h1>25 + 5 Clock</h1>
      <div id="settings-container">
        <div id="break-length-container">
          <Label id="break-label" text="Break Length" key="break-label" />
          <div className="button-container">
            <Button
              id="break-decrement"
              icon="fa fa-arrow-down"
              handleClick={handleClick}
              key="break-decrement"
            />
            <Value id="break-length" value={breakValue} key="break-length" />
            <Button
              id="break-increment"
              icon="fa fa-arrow-up"
              handleClick={handleClick}
              key="break-increment"
            />
          </div>
        </div>
        <div id="session-length-container">
          <Label id="session-label" text="Session Length" key="session-label" />
          <div className="button-container">
            <Button
              id="session-decrement"
              icon="fa fa-arrow-down"
              handleClick={handleClick}
              key="session-decrement"
            />
            <Value
              id="session-length"
              value={sessionValue}
              key="session-length"
            />
            <Button
              id="session-increment"
              icon="fa fa-arrow-up"
              handleClick={handleClick}
              key="session-increment"
            />
          </div>
        </div>
      </div>
      <div id="session-container">
        <Label id="timer-label" text={timerClockTitle} key="timer-label" />
        <div className="button-container">
          <Value
            id="time-left"
            value={
              timeLeft === 60 * 60 * 1000
                ? "60:00"
                : `${minutesLeft < 10 ? "0" + minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`
            }
            key="time-left"
          />
        </div>
      </div>
      <div className="button-container">
        <Button
          id="start-stop"
          icon={"fa fa-play"}
          handleClick={handleClick}
          key="start-stop"
        />
        <Button
          id="reset"
          icon="fa fa-refresh"
          handleClick={handleClick}
          key="reset"
        />
      </div>
      <audio
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        id="beep"
      ></audio>
    </div>
  )
}

export default App
