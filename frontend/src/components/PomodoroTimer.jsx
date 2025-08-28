import React from "react";
import { Box, Card, CardContent, Typography, Button, Checkbox, FormControlLabel } from "@mui/material";
import { CheckCircle, ListAlt, HourglassBottom } from "@mui/icons-material";
import { BarChart as ReBarChart, Bar, ResponsiveContainer, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const dataBar = [
  { name: "S", value: 6 },
  { name: "T", value: 2 },
  { name: "Q", value: 3 },
  { name: "Q", value: 4 },
  { name: "S", value: 6 },
  { name: "S", value: 5 },
  { name: "D", value: 4 },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box className="dash-main" sx={{ display: "flex", gap: 38, flexWrap: "wrap" }}>
      {/* Coluna esquerda */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1.5 }}>
        <Card sx={{ bgcolor: "#40E0D0", borderRadius: 3 }}>
          <CardContent>
            <CheckCircle fontSize="large" />
            <Typography variant="subtitle1">CICLOS DE POMODORO CONCLUÍDOS HOJE</Typography>
            <Typography variant="h4">2</Typography>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: "#40E0D0", borderRadius: 3 }}>
          <CardContent>
            <ListAlt fontSize="large" />
            <Typography variant="subtitle1">TAREFAS CONCLUÍDAS HOJE</Typography>
            <Typography variant="h4">5</Typography>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: "#40E0D0", borderRadius: 3 }}>
          <CardContent>
            <HourglassBottom fontSize="large" />
            <Typography variant="subtitle1">TEMPO TOTAL DE FOCO HOJE (MIN)</Typography>
            <Typography variant="h4">120</Typography>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: "#40E0D0", borderRadius: 3 }}>
          <CardContent>
            <HourglassBottom fontSize="large" />
            <Typography variant="subtitle1">TEMPO PRODUTIVO SEMANA (MIN)</Typography>
            <Typography variant="h4">840</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Coluna direita */}
      <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Cronômetro + Checkboxes */}
        <Card sx={{ p: 3, borderRadius: 3, bgcolor: "#40E0D0", display: "flex", gap: 25, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Box sx={{
              width: 220, height: 220, borderRadius: "50%", background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
            }}>
              <Typography variant="h3">25:00</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" sx={{ mr: 1, bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}>INICIAR</Button>
              <Button variant="contained" sx={{ bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}>PAUSAR</Button>
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Card sx={{ p: 2, borderRadius: 3, bgcolor: "#e0f7f7" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>TAREFA ATUAL</Typography>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Estudar" />
              <FormControlLabel control={<Checkbox />} label="Leitura" />
              <FormControlLabel control={<Checkbox />} label="Academia" />
              <Button onClick={() => navigate("/kanban")} sx={{ mt: 2, bgcolor: "#000", color: "#fff", width: "100%", "&:hover": { bgcolor: "#333" } }}>VISUALIZAR TAREFAS</Button>
            </Card>
          </Box>
        </Card>

        {/* Gráfico */}
        <Card sx={{ p: 2, borderRadius: 3, bgcolor: "#e0f7f7" }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>PRODUTIVIDADE SEMANAL</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <ReBarChart data={dataBar}>
              <Bar dataKey="value" fill="#00C49F" />
              <Tooltip />
            </ReBarChart>
          </ResponsiveContainer>
        </Card>
      </Box>
    </Box>
  );
}