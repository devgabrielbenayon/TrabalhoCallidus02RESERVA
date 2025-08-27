import React, { useState } from 'react';
import authService from '../services/authService';

function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.register(username, password);
      alert('Registro bem-sucedido! Por favor, faça o login.');
      onRegisterSuccess();
    } catch (err) {
      setError('Usuário já existe ou ocorreu um erro.');
      console.error('Erro de registro:', err);
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleRegister}>
        <h2>Registrar</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Register;