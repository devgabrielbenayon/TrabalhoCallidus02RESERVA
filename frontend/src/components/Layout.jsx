import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import {
  Menu as MenuIcon,
  AddCircleOutline,
  Assignment,
  Timer,
  BarChart,
  ManageAccounts,
  Notifications,
  Settings
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (open) => () => setOpenDrawer(open);
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#fff", color: "black", boxShadow: 1 }}>
        <Toolbar>
          <IconButton edge="start" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          <IconButton>
            <Notifications color="primary" />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ 
              flexGrow: 1, 
              textAlign: "center", 
              fontWeight: "bold", 
              fontFamily: "'Quicksand', sans-serif" // nova fonte
            }}
          >
            POMODORO APP
          </Typography>

          {/* Engrenagem que leva para Configurações */}
          <IconButton onClick={() => navigate("/configuracoes")}>
            <Settings color="primary" />
          </IconButton>

          <Avatar src="https://via.placeholder.com/40" />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 280 }} role="presentation" onClick={toggleDrawer(false)}>
          <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>Menu</Typography>
          <Divider />
          <List>
            <ListItemButton component={Link} to="/dashboard">
              <ListItemIcon><AddCircleOutline /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton component={Link} to="/kanban">
              <ListItemIcon><Assignment /></ListItemIcon>
              <ListItemText primary="Minhas tarefas" />
            </ListItemButton>
            <ListItemButton component={Link} to="/gerenciar-tarefas">
              <ListItemIcon><AddCircleOutline /></ListItemIcon>
              <ListItemText primary="Gerenciar Tarefas" />
            </ListItemButton>
            <ListItemButton component={Link} to="/pomodoro">
              <ListItemIcon><Timer /></ListItemIcon>
              <ListItemText primary="Pomodoro" />
            </ListItemButton>
            <ListItemButton component={Link} to="/produtividade">
              <ListItemIcon><BarChart /></ListItemIcon>
              <ListItemText primary="Produtividade Detalhada" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton component={Link} to="/configuracoes">
              <ListItemIcon><ManageAccounts /></ListItemIcon>
              <ListItemText primary="Configurações da Conta" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Conteúdo */}
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
}