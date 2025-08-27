import React from 'react';
import taskService from '../services/taskService';

function TaskList({ tasks, setTasks, onSelectTask }) {
  const handleDelete = async (taskId) => {
    if (window.confirm('Tem certeza que deseja remover esta tarefa?')) {
      try {
        await taskService.deleteTask(taskId);
        setTasks(tasks.filter((task) => task.id !== taskId));
      } catch (err) {
        console.error('Erro ao deletar a tarefa', err);
        alert('Não foi possível remover a tarefa.');
      }
    }
  };

  if (tasks.length === 0) {
    return <p>Nenhuma tarefa encontrada. Adicione uma nova tarefa!</p>;
  }

  return (
    <div className="task-list">
      <h3>Minhas Tarefas</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
            </div>
            <div>
              <button onClick={() => onSelectTask(task)}>Iniciar Foco</button>
              <button onClick={() => handleDelete(task.id)} className="delete-btn">
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;