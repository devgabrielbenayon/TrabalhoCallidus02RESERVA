import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Avatar,
  FormControlLabel,
  Switch,
  Snackbar,
  Alert,
} from "@mui/material";

export default function ConfigConta() {
  const [user, setUser] = useState({
    name: "Gabriel",
    username: "@gabriel",
    avatar: "https://via.placeholder.com/100",
    about: "Apaixonado por produtividade e automação",
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
  });

  const [goals, setGoals] = useState({
    dailyPomodoros: 4,
    weeklyTasks: 20,
  });

  const [success, setSuccess] = useState("");

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUser({
        ...user,
        username: value.startsWith("@") ? value : `@${value}`,
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handlePreferences = (e) =>
    setPreferences({ ...preferences, [e.target.name]: e.target.checked });

  const handleGoals = (e) => setGoals({ ...goals, [e.target.name]: e.target.value });

  const handleSave = () => setSuccess("Configurações salvas com sucesso!");

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setUser({ ...user, avatar: URL.createObjectURL(e.target.files[0]) });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 10, md: 70 },
        bgcolor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", md: 1200 },
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* Perfil do usuário - primeiro card subido */}
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
            mt: { xs: 0, md: -65 }, // sobe mais no desktop
            transition: "margin-top 0.3s ease",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
            <label htmlFor="avatar-upload">
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
              <Avatar
                src={user.avatar}
                sx={{ width: 100, height: 100, cursor: "pointer" }}
              />
            </label>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <TextField
                fullWidth
                label="Nome"
                name="name"
                value={user.name}
                onChange={handleChangeUser}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Nome de usuário"
                name="username"
                value={user.username}
                onChange={handleChangeUser}
              />
            </Box>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Sobre mim"
            name="about"
            value={user.about}
            onChange={handleChangeUser}
            sx={{ mt: 3 }}
          />
        </Card>

        {/* Preferências */}
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Preferências</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={preferences.darkMode}
                onChange={handlePreferences}
                name="darkMode"
              />
            }
            label="Modo Escuro"
          />
          <FormControlLabel
            control={
              <Switch
                checked={preferences.notifications}
                onChange={handlePreferences}
                name="notifications"
              />
            }
            label="Notificações"
          />
        </Card>

        {/* Metas de produtividade */}
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Metas de Produtividade</Typography>
          <TextField
            fullWidth
            type="number"
            label="Pomodoros diários"
            name="dailyPomodoros"
            value={goals.dailyPomodoros}
            onChange={handleGoals}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Tarefas semanais"
            name="weeklyTasks"
            value={goals.weeklyTasks}
            onChange={handleGoals}
          />
        </Card>

        {/* Salvar alterações */}
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
          >
            Salvar Alterações
          </Button>
        </Card>
      </Box>

      {/* Snackbar de sucesso */}
      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}
