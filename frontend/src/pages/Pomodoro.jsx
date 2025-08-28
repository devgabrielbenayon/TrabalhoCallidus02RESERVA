import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";

export default function Pomodoro() {
  // Lista de tarefas
  const [tasks, setTasks] = useState([
    { id: 1, title: "Estudar", date: "27/08/2025", time: "10:00", completed: false },
    { id: 2, title: "Leitura", date: "27/08/2025", time: "14:00", completed: false },
    { id: 3, title: "Academia", date: "27/08/2025", time: "17:30", completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Cronômetro
  const POMODORO = 25 * 60; // 25min
  const SHORT_BREAK = 5 * 60; // 5min
  const LONG_BREAK = 15 * 60; // 15min

  const [time, setTime] = useState(POMODORO);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Pomodoro"); // Pomodoro / Short Break / Long Break
  const [cycle, setCycle] = useState(0); // Contador de ciclos completos
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev === 0) {
            handleCompleteCycle();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleCompleteCycle = () => {
    setIsRunning(false);
    if (mode === "Pomodoro") {
      setCycle(cycle + 1);
      if ((cycle + 1) % 4 === 0) {
        setMode("Long Break");
        setTime(LONG_BREAK);
      } else {
        setMode("Short Break");
        setTime(SHORT_BREAK);
      }
    } else {
      setMode("Pomodoro");
      setTime(POMODORO);
    }
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Progresso visual
  const progress = ((mode === "Pomodoro" ? POMODORO : mode === "Short Break" ? SHORT_BREAK : LONG_BREAK) - time) /
                   (mode === "Pomodoro" ? POMODORO : mode === "Short Break" ? SHORT_BREAK : LONG_BREAK) * 100;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f0f4f8",
        p: { xs: 2, md: 4 },
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      {/* Cronômetro */}
      <Box sx={{ flex: 1, minWidth: 320, textAlign: "center" }}>
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, bgcolor: "#40E0D0" }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}>
            {mode} - Ciclo {cycle + 1}
          </Typography>

          <Box sx={{
            width: 260, height: 260, borderRadius: "50%",
            background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            mx: "auto", boxShadow: "0 6px 16px rgba(0,0,0,0.25)", fontSize: "3rem",
            position: "relative",
          }}>
            <Typography variant="h2">{formatTime(time)}</Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ mt: 3, height: 10, borderRadius: 5, bgcolor: "#b2ebf2", "& .MuiLinearProgress-bar": { bgcolor: "#00695c" } }}
          />

          <Box sx={{ mt: 3 }}>
            {!isRunning ? (
              <Button
                variant="contained"
                sx={{ mr: 1, bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}
                onClick={() => setIsRunning(true)}
              >
                INICIAR
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ mr: 1, bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}
                onClick={() => setIsRunning(false)}
              >
                PAUSAR
              </Button>
            )}
            <Button
              variant="contained"
              sx={{ bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}
              onClick={() => { setIsRunning(false); setTime(POMODORO); setMode("Pomodoro"); }}
            >
              RESET
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Tarefas pendentes */}
      <Box sx={{ flex: 1, minWidth: 1100, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>Tarefas Pendentes</Typography>
        {tasks.filter(t => !t.completed).map(task => (
          <Card key={task.id} sx={{ p: 2, borderRadius: 3, bgcolor: "#e0f7f7", boxShadow: 2 }}>
            <CardContent>
              <FormControlLabel
                control={<Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} />}
                label={
                  <Box>
                    <Typography sx={{ fontWeight: "bold" }}>{task.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{task.date} | {task.time}</Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>
        ))}

        <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: "bold" }}>Tarefas Concluídas</Typography>
        {tasks.filter(t => t.completed).map(task => (
          <Card key={task.id} sx={{ p: 2, borderRadius: 3, bgcolor: "#c8e6c9", boxShadow: 2 }}>
            <CardContent>
              <Typography sx={{ textDecoration: "line-through", fontWeight: "bold" }}>{task.title}</Typography>
              <Typography variant="body2" color="text.secondary">{task.date} | {task.time}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}