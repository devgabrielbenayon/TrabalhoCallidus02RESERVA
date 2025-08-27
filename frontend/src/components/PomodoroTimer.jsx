import React, { useState, useEffect } from 'react';
import pomodoroService from '../services/pomodoroService';

function PomodoroTimer({ focusedTask, clearFocusedTask }) {
  const [session, setSession] = useState(null);
  const [time, setTime] = useState(25 * 60); // 25 minutos
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      // Opcional: Lógica para quando o tempo acabar (ex: notificação, pausa)
      handleStop();
      alert("Sessão Pomodoro finalizada!");
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStart = async () => {
    try {
      const response = await pomodoroService.startSession(focusedTask?.id);
      setSession(response.data);
      setIsActive(true);
      setTime(25 * 60); // Reinicia o timer
    } catch (error) {
      console.error('Erro ao iniciar a sessão:', error);
      alert('Não foi possível iniciar a sessão Pomodoro.');
    }
  };

  const handleStop = async () => {
    if (!session) return;
    try {
      await pomodoroService.stopSession(session.id);
      setIsActive(false);
      setSession(null);
      clearFocusedTask(); // Limpa a tarefa em foco
    } catch (error) {
      console.error('Erro ao parar a sessão:', error);
      alert('Não foi possível parar a sessão Pomodoro.');
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pomodoro-timer">
      <h3>Pomodoro Timer</h3>
      {focusedTask && <p>Foco: <strong>{focusedTask.title}</strong></p>}
      <div className="timer-display">{formatTime()}</div>
      <div className="timer-controls">
        {!isActive ? (
          <button onClick={handleStart} disabled={!focusedTask}>
            Iniciar
          </button>
        ) : (
          <button onClick={handleStop}>Parar</button>
        )}
      </div>
    </div>
  );
}

export default PomodoroTimer;