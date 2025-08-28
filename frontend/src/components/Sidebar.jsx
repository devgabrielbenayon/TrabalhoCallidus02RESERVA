import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", path: "/pomodoro-timer" },
    { text: "Minhas Tarefas", path: "/kanban" },
    { text: "Nova Tarefa", path: "/nova-tarefa" },
    { text: "Pomodoro", path: "/pomodoro" },
    { text: "Produtividade", path: "/produtividade" },
    { text: "Gerenciar Tarefas", path: "/gerenciar-tarefas" },
    { text: "Configurações", path: "/configuracoes" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
