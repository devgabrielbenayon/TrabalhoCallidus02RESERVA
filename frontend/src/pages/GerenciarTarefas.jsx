import React, { useState, useEffect } from "react";
import taskService from "../services/taskService"; // serviço para lidar com o backend
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

export default function GerenciarTarefas() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", date: "", time: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Buscar tarefas do backend
  const fetchTasks = async () => {
    try {
      const res = await taskService.getAll(); // aqui vai o fetch real
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar tarefas do backend");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.date || !newTask.time) {
      setError("Preencha todos os campos!");
      return;
    }

    try {
      const res = await taskService.create(newTask); // POST para o backend
      setTasks((prev) => [...prev, res.data]);
      setSuccess("Tarefa adicionada com sucesso!");
      setNewTask({ title: "", date: "", time: "" });
    } catch (err) {
      console.error(err);
      setError("Não foi possível adicionar tarefa");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setSuccess("Tarefa excluída com sucesso!");
    } catch (err) {
      console.error(err);
      setError("Não foi possível excluir tarefa");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", p: { xs: 2, md: 6 }, bgcolor: "#f0f4f8", display: "flex", flexDirection: "column", gap: 4 }}>
      
      {/* Formulário de nova tarefa */}
      <Card sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, boxShadow: 4, bgcolor: "#40E0D0" }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#fff" }}>
          Adicionar Nova Tarefa
        </Typography>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 29 }}>
          <TextField
            label="Título"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            fullWidth
            sx={{ bgcolor: "#fff", borderRadius: 1 }}
          />
          <TextField
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            sx={{ width: { xs: "100%", md: 160 }, bgcolor: "#fff", borderRadius: 1 }}
          />
          <TextField
            type="time"
            value={newTask.time}
            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            sx={{ width: { xs: "100%", md: 140 }, bgcolor: "#fff", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleAddTask}
            sx={{
              bgcolor: "#00695c",
              "&:hover": { bgcolor: "#004d40" },
              color: "#fff",
              px: 4,
            }}
          >
            Adicionar
          </Button>
        </Box>
      </Card>

      {/* Lista de tarefas */}
      <Card sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, boxShadow: 3, bgcolor: "#fff" }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>Tarefas</Typography>
        <Divider sx={{ mb: 2 }} />
        {tasks.length === 0 ? (
          <Typography sx={{ color: "#555" }}>Nenhuma tarefa cadastrada.</Typography>
        ) : (
          tasks.map((task) => (
            <Card
              key={task.id}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                bgcolor: "#e0f7f7",
                boxShadow: 1,
                transition: "0.3s",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": { boxShadow: 4, transform: "scale(1.02)" },
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: "bold" }}>{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">{task.date} | {task.time}</Typography>
              </Box>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteTask(task.id)}
              >
                Excluir
              </Button>
            </Card>
          ))
        )}
      </Card>

      {/* Snackbars */}
      <Snackbar open={!!success} autoHideDuration={4000} onClose={() => setSuccess("")}>
        <Alert severity="success" sx={{ width: "100%" }}>{success}</Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError("")}>
        <Alert severity="error" sx={{ width: "100%" }}>{error}</Alert>
      </Snackbar>
    </Box>
  );
}
