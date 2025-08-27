import { useEffect, useState } from 'react';
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      setTasks(data);

    };
      fetchTasks();
  }, []);

  const handleAdd = (newTask) => {
    setTasks([...tasks, newTask]);
  }

  return (
     <div>
      <h1>Gerenciador de Tarefas</h1>
      <TaskForm onAdd={handleAdd} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;