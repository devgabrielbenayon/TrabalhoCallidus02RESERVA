"use client"

import { useState } from "react"
import authService from "../services/authService"

function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Senhas não coincidem")
      return
    }
    try {
      await authService.register(username, password)
      onRegisterSuccess()
    } catch (error) {
      setError("Erro ao criar conta")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}

export default Register
