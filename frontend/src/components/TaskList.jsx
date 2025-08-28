"use client"

import { useState } from "react"
import TaskForm from "./TaskForm"
import taskService from "../services/taskService"

function TaskList({ tasks, setTasks, onSelectTask, onTaskCreated }) {
  const [filter, setFilter] = useState("all")

  const handleDelete = async (taskId) => {
    if (window.confirm("Tem certeza que deseja remover esta tarefa?")) {
      try {
        await taskService.deleteTask(taskId)
        setTasks(tasks.filter((task) => task.id !== taskId))
      } catch (err) {
        console.error("Erro ao deletar a tarefa", err)
        alert("Não foi possível remover a tarefa.")
      }
    }
  }

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateTask(taskId, { status: newStatus })
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
    } catch (err) {
      console.error("Erro ao atualizar tarefa", err)
    }
  }

  const getFilteredTasks = (status) => {
    return tasks.filter((task) => {
      if (status === "pending") return !task.status || task.status === "pendente"
      if (status === "in_progress") return task.status === "em_progresso"
      if (status === "completed") return task.status === "concluida"
      return true
    })
  }

  const pendingTasks = getFilteredTasks("pending")
  const inProgressTasks = getFilteredTasks("in_progress")
  const completedTasks = getFilteredTasks("completed")

  return (
    <div className="task-management">
      <TaskForm onTaskCreated={onTaskCreated} />

      <div className="kanban-board">
        <div className="kanban-column">
          <h3 className="column-header">PENDENTE</h3>
          <div className="task-cards">
            {pendingTasks.map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-checkbox">
                  <input type="checkbox" onChange={() => handleStatusChange(task.id, "em_progresso")} />
                </div>
                <div className="task-content">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span className="task-date">25/08/2025</span>
                    <span className="task-time">12:15</span>
                  </div>
                </div>
                <div className="task-avatar">👤</div>
                <div className="task-actions">
                  <button onClick={() => onSelectTask(task)} className="focus-btn">
                    Focar
                  </button>
                  <button onClick={() => handleDelete(task.id)} className="delete-btn">
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="kanban-column">
          <h3 className="column-header">EM PROGRESSO</h3>
          <div className="task-cards">
            {inProgressTasks.map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-checkbox">
                  <input type="checkbox" onChange={() => handleStatusChange(task.id, "concluida")} />
                </div>
                <div className="task-content">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span className="task-date">25/08/2025</span>
                    <span className="task-time">11:00</span>
                  </div>
                </div>
                <div className="task-avatar">👤</div>
                <div className="task-actions">
                  <button onClick={() => onSelectTask(task)} className="focus-btn">
                    Focar
                  </button>
                  <button onClick={() => handleDelete(task.id)} className="delete-btn">
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="kanban-column">
          <h3 className="column-header">CONCLUÍDAS</h3>
          <div className="task-cards">
            {completedTasks.map((task) => (
              <div key={task.id} className="task-card completed">
                <div className="task-checkbox">
                  <input type="checkbox" checked readOnly />
                </div>
                <div className="task-content">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span className="task-date">25/08/2025</span>
                    <span className="task-time">07:00</span>
                  </div>
                </div>
                <div className="task-avatar">👤</div>
                <div className="task-actions">
                  <button onClick={() => handleDelete(task.id)} className="delete-btn">
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskList
