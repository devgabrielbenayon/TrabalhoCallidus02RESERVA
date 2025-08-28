"use client"

import { useState, useEffect } from "react"

function PomodoroTimer({ focusedTask, clearFocusedTask }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      // Auto switch between work and break
      if (!isBreak) {
        setTimeLeft(5 * 60) // 5 minute break
        setIsBreak(true)
      } else {
        setTimeLeft(25 * 60) // 25 minute work
        setIsBreak(false)
      }
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft, isBreak])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(25 * 60)
    setIsBreak(false)
  }

  return (
    <div className="pomodoro-timer">
      <div className="timer-circle">
        <div className="timer-display">{formatTime(timeLeft)}</div>
      </div>

      <div className="timer-controls">
        <button className={`timer-btn ${isActive ? "pause" : "start"}`} onClick={toggleTimer}>
          {isActive ? "PAUSAR" : "INICIAR"}
        </button>
      </div>

      {focusedTask && (
        <div className="focused-task">
          <p>
            Focando em: <strong>{focusedTask.title}</strong>
          </p>
          <button onClick={clearFocusedTask} className="clear-focus-btn">
            Limpar Foco
          </button>
        </div>
      )}
    </div>
  )
}

export default PomodoroTimer
