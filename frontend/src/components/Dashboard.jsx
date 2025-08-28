"use client"

import { useState, useEffect } from "react"
import PomodoroTimer from "./PomodoroTimer"

function Dashboard({ tasks, focusedTask, setFocusedTask, onTaskCreated }) {
  const [stats, setStats] = useState({
    completedCycles: 2,
    tasksCompletedToday: 5,
    totalFocusTime: 120,
    productiveTimeWeek: 840,
  })

  const [currentTask, setCurrentTask] = useState(null)

  useEffect(() => {
    // Find current task or use focused task
    const pending = tasks.filter((task) => !task.status || task.status === "pendente")
    setCurrentTask(focusedTask || pending[0] || null)
  }, [tasks, focusedTask])

  const weeklyData = [100, 80, 90, 85, 110, 95, 75] // Sample weekly productivity data

  const completedTasks = tasks.filter((task) => task.status === "concluida")
  const completedToday = completedTasks.length // Could be enhanced with date filtering

  return (
    <div className="dashboard-container">
      {/* Left Sidebar - Statistics */}
      <div className="stats-sidebar">
        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <p className="stat-label">CICLOS DE POMODORO CONCLUÍDOS HOJE</p>
            <h2 className="stat-value">{stats.completedCycles}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <p className="stat-label">TAREFAS CONCLUÍDAS HOJE</p>
            <h2 className="stat-value">{completedToday}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <p className="stat-label">TEMPO TOTAL DE FOCO HOJE (MIN)</p>
            <h2 className="stat-value">{stats.totalFocusTime}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <p className="stat-label">TEMPO PRODUTIVO SEMANA (MIN)</p>
            <h2 className="stat-value">{stats.productiveTimeWeek}</h2>
          </div>
        </div>
      </div>

      {/* Center - Pomodoro Timer */}
      <div className="timer-section">
        <PomodoroTimer focusedTask={focusedTask} clearFocusedTask={() => setFocusedTask(null)} />
      </div>

      {/* Right Sidebar - Current Task & Productivity */}
      <div className="right-sidebar">
        <div className="current-task-section">
          <h3>TAREFA ATUAL</h3>
          <div className="task-checkboxes">
            {tasks
              .filter((task) => !task.status || task.status === "pendente")
              .slice(0, 3)
              .map((task) => (
                <label key={task.id} className="task-checkbox">
                  <input type="checkbox" checked={focusedTask?.id === task.id} onChange={() => setFocusedTask(task)} />
                  <span>{task.title}</span>
                </label>
              ))}
            {/* Show message if no pending tasks */}
            {tasks.filter((task) => !task.status || task.status === "pendente").length === 0 && (
              <p className="no-tasks">Nenhuma tarefa pendente</p>
            )}
          </div>
          <button
            className="view-tasks-btn"
            onClick={() => {
              const event = new CustomEvent("navigate-to-tasks")
              window.dispatchEvent(event)
            }}
          >
            VISUALIZAR TAREFAS
          </button>
        </div>

        <div className="productivity-section">
          <h3>PRODUTIVIDADE SEMANAL</h3>
          <div className="productivity-chart">
            {weeklyData.map((value, index) => (
              <div key={index} className="chart-bar">
                <div className="bar-fill" style={{ height: `${(value / 120) * 100}%` }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
