import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import PomodoroTimer from './components/PomodoroTimer';
import authService from './services/authService';
import taskService from './services/taskService';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isLoginView, setIsLoginView] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [focusedTask, setFocusedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (isAuthenticated) {
        try {
          const response = await taskService.getTasks();
          setTasks(response.data);
        } catch (error) {
          console.error('Erro ao buscar tarefas:', error);
          // Se o token for inválido, desloga o usuário
          if (error.response && error.response.status === 401) {
            handleLogout();
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setTasks([]);
    setFocusedTask(null);
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="App">
      <header>
        <h1>Callidus - Pomodoro & Tarefas</h1>
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        )}
      </header>
      <main>
        {!isAuthenticated ? (
          <div className="auth-container">
            {isLoginView ? (
              <>
                <Login onLoginSuccess={handleLoginSuccess} />
                <p>
                  Não tem uma conta?{' '}
                  <a href="#" onClick={() => setIsLoginView(false)}>
                    Registre-se
                  </a>
                </p>
              </>
            ) : (
              <>
                <Register onRegisterSuccess={() => setIsLoginView(true)} />
                <p>
                  Já tem uma conta?{' '}
                  <a href="#" onClick={() => setIsLoginView(true)}>
                    Faça login
                  </a>
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="app-container">
            <div className="tasks-section">
              <TaskForm onTaskCreated={handleTaskCreated} />
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                onSelectTask={setFocusedTask}
              />
            </div>
            <div className="pomodoro-section">
              <PomodoroTimer
                focusedTask={focusedTask}
                clearFocusedTask={() => setFocusedTask(null)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;