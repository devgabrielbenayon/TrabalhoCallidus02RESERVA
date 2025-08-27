import apiClient from '../api/apiClient';

// Rota para iniciar uma nova sessão
const startSession = (taskId = null) => {
  // O task_id é opcional
  return apiClient.post('/sessions/start', { task_id: taskId });
};

// Rota para parar uma sessão
const stopSession = (sessionId) => {
  return apiClient.post(`/sessions/${sessionId}/stop`);
};

const pomodoroService = {
  startSession,
  stopSession,
};

export default pomodoroService;