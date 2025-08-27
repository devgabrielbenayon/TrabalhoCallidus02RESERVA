import apiClient from '../api/apiClient';

// Rota para buscar todas as tarefas do usuário
const getTasks = () => {
  return apiClient.get('/tasks/');
};

// Rota para criar uma nova tarefa
const createTask = (taskData) => {
  // taskData deve ser um objeto, ex: { title: 'Nova Tarefa', description: 'Descrição' }
  return apiClient.post('/tasks/', taskData);
};

// Rota para atualizar uma tarefa
const updateTask = (taskId, taskData) => {
  return apiClient.patch(`/tasks/${taskId}`, taskData);
};

// Rota para deletar uma tarefa
const deleteTask = (taskId) => {
  return apiClient.delete(`/tasks/${taskId}`);
};

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;