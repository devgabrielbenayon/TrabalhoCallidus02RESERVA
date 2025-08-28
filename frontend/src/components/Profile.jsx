"use client"

import { useState, useEffect } from "react"
import authService from "../services/authService"

function Profile({ onBack, tasks = [] }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser()
        setUser(userData)

        const totalTasks = tasks.length
        const completedTasks = tasks.filter((task) => task.status === "concluida").length
        const pendingTasks = tasks.filter((task) => task.status === "pendente").length
        const inProgressTasks = tasks.filter((task) => task.status === "em_progresso").length

        setStats({
          totalTasks,
          completedTasks,
          pendingTasks,
          inProgressTasks,
        })
      } catch (err) {
        setError("Erro ao carregar dados do usuário")
        console.error("Erro ao buscar dados do usuário:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [tasks])

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      authService.logout()
      window.location.reload()
    }
  }

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner"></div>
        <p>Carregando perfil...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <button onClick={onBack} className="back-btn">
            ← Voltar
          </button>
          <h2>Perfil</h2>
        </div>

        <div className="profile-content">
          <div className="error-message">
            <p>{error}</p>
            <p>Não foi possível carregar os dados do perfil.</p>
          </div>

          <div className="profile-actions">
            <button onClick={onBack} className="action-btn secondary">
              Voltar ao Dashboard
            </button>
            <button onClick={handleLogout} className="action-btn danger">
              Sair da Conta
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button onClick={onBack} className="back-btn">
          ← Voltar
        </button>
        <h2>Meu Perfil</h2>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">{user?.username?.charAt(0).toUpperCase() || "U"}</div>
          </div>

          <div className="profile-info">
            <div className="info-item">
              <label>Nome de Usuário:</label>
              <span>{user?.username}</span>
            </div>

            <div className="info-item">
              <label>Membro desde:</label>
              <span>{user?.created_at ? new Date(user.created_at).toLocaleDateString("pt-BR") : "N/A"}</span>
            </div>

            <div className="stats-section">
              <h3>Estatísticas de Tarefas</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">{stats.totalTasks}</span>
                  <span className="stat-label">Total de Tarefas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{stats.completedTasks}</span>
                  <span className="stat-label">Concluídas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{stats.pendingTasks}</span>
                  <span className="stat-label">Pendentes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{stats.inProgressTasks}</span>
                  <span className="stat-label">Em Progresso</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="action-btn secondary">Editar Perfil</button>
          <button onClick={handleLogout} className="action-btn danger">
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
