"use client"

import { useState } from "react"
import taskService from "../services/taskService"

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title) {
      alert("O título da tarefa é obrigatório.")
      return
    }
    try {
      const response = await taskService.createTask({ title, description })
      onTaskCreated(response.data) // Passa a nova tarefa para o componente pai
      setTitle("")
      setDescription("")
    } catch (error) {
      console.error("Erro ao criar tarefa:", error)
      alert("Não foi possível criar a tarefa.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Nova Tarefa</h3>
      <input type="text" placeholder="Título da Tarefa" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Adicionar Tarefa</button>
    </form>
  )
}

export default TaskForm
