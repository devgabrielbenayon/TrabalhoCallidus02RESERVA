import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  BarChart as ReBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dados de exemplo
const barData = [
  { name: "Seg", valor: 6 },
  { name: "Ter", valor: 4 },
  { name: "Qua", valor: 5 },
  { name: "Qui", valor: 3 },
  { name: "Sex", valor: 7 },
  { name: "Sáb", valor: 2 },
  { name: "Dom", valor: 0 },
];

const pieData = [
  { name: "Concluídas", value: 18 },
  { name: "Pendentes", value: 5 },
];

const COLORS = ["#00C49F", "#FF8042"];

export default function Produtividade() {
  const [tasksCompleted, setTasksCompleted] = useState([
    { id: 1, title: "Estudar", date: "25/08/2025", status: "Concluída" },
    { id: 2, title: "Leitura", date: "25/08/2025", status: "Concluída" },
    { id: 3, title: "Academia", date: "25/08/2025", status: "Pendente" },
    { id: 4, title: "Meditação", date: "25/08/2025", status: "Concluída" },
  ]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 6, md: 32 },
        bgcolor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Estatísticas principais */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          mt: { xs: 0, md: -30 }, // sobe os cards no desktop
          transition: "margin-top 0.3s ease",
        }}
      >
        <Card sx={{ p: 2, borderRadius: 3, bgcolor: "#40E0D0" }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 8, color: "#fff" }}>
              Ciclos Pomodoro Concluídos
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#fff" }}>
              12
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ p: 2, borderRadius: 3, bgcolor: "#40E0D0" }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1, color: "#fff" }}>
              Tarefas Concluídas
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#fff" }}>
              18
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Gráficos de produtividade */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 3 }}>
        <Card sx={{ p: 2, borderRadius: 3, bgcolor: "#e0f7f7" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Produtividade Semanal (Ciclos)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <ReBarChart data={barData}>
              <Bar dataKey="valor" fill="#00C49F" />
              <Tooltip />
            </ReBarChart>
          </ResponsiveContainer>
        </Card>

        <Card sx={{ p: 2, borderRadius: 3, bgcolor: "#e0f7f7" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Tarefas Concluídas x Pendentes
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Box>

      {/* Lista de tarefas */}
      <Card sx={{ p: 2, borderRadius: 3, bgcolor: "#e0f7f7" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Últimas Tarefas
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {tasksCompleted.map((task) => (
            <ListItem key={task.id} sx={{ bgcolor: "#fff", borderRadius: 2, mb: 1 }}>
              <ListItemText
                primary={task.title}
                secondary={`Data: ${task.date} | Status: ${task.status}`}
              />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}
