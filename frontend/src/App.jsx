"use client"

import { useState, useEffect } from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import TaskList from "./components/TaskList"
import Dashboard from "./components/Dashboard"
import Profile from "./components/Profile"
import authService from "./services/authService"
import taskService from "./services/taskService"
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"))
  const [isLoginView, setIsLoginView] = useState(true)
  const [tasks, setTasks] = useState([])
  const [focusedTask, setFocusedTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState("dashboard") // dashboard, tasks, profile

  useEffect(() => {
    const fetchTasks = async () => {
      if (isAuthenticated) {
        try {
          const response = await taskService.getTasks()
          setTasks(response.data)
        } catch (error) {
          console.error("Erro ao buscar tarefas:", error)
          if (error.response && error.response.status === 401) {
            console.log("[v0] Token inválido, fazendo logout")
            handleLogout()
          }
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [isAuthenticated])

  useEffect(() => {
    const handleNavigateToTasks = () => {
      setCurrentView("tasks")
    }

    window.addEventListener("navigate-to-tasks", handleNavigateToTasks)

    return () => {
      window.removeEventListener("navigate-to-tasks", handleNavigateToTasks)
    }
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    console.log("[v0] Fazendo logout")
    authService.logout()
    setIsAuthenticated(false)
    setTasks([])
    setFocusedTask(null)
    setCurrentView("dashboard")
  }

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="modern-header">
        <div className="header-left">
          <button className="menu-btn">☰</button>
          <span className="notification-btn">🔔</span>
        </div>
        <h1 className="app-title">POMODORO APP</h1>
        <div className="header-right">
          {isAuthenticated && (
            <>
              <button className="settings-btn">⚙️</button>
              <button onClick={() => setCurrentView("profile")} className="profile-btn">
                👤
              </button>
            </>
          )}
        </div>
      </header>

      <main className="main-content">
        {!isAuthenticated ? (
          <div className="auth-container">
            {isLoginView ? (
              <>
                <Login onLoginSuccess={handleLoginSuccess} />
                <p>
                  Não tem uma conta?{" "}
                  <a href="#" onClick={() => setIsLoginView(false)}>
                    Registre-se
                  </a>
                </p>
              </>
            ) : (
              <>
                <Register onRegisterSuccess={() => setIsLoginView(true)} />
                <p>
                  Já tem uma conta?{" "}
                  <a href="#" onClick={() => setIsLoginView(true)}>
                    Faça login
                  </a>
                </p>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="nav-tabs">
              <button
                className={currentView === "dashboard" ? "tab active" : "tab"}
                onClick={() => setCurrentView("dashboard")}
              >
                Dashboard
              </button>
              <button
                className={currentView === "tasks" ? "tab active" : "tab"}
                onClick={() => setCurrentView("tasks")}
              >
                Tarefas
              </button>
              <button
                className={currentView === "profile" ? "tab active" : "tab"}
                onClick={() => setCurrentView("profile")}
              >
                Perfil
              </button>
            </div>

            {currentView === "dashboard" ? (
              <Dashboard
                tasks={tasks}
                focusedTask={focusedTask}
                setFocusedTask={setFocusedTask}
                onTaskCreated={handleTaskCreated}
                onTaskUpdated={handleTaskUpdated}
              />
            ) : currentView === "tasks" ? (
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                onSelectTask={setFocusedTask}
                onTaskCreated={handleTaskCreated}
                onTaskUpdated={handleTaskUpdated}
              />
            ) : (
              <Profile onBack={() => setCurrentView("dashboard")} tasks={tasks} />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
