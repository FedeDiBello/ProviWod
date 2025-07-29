import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Login fallido: no se recibió token');
      }
    } catch (err: any) {
      console.error('Error de login:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login fallido. Intente nuevamente.');
      }
    }
  };

  return (
    <div className="login-container">
      {/* Lado izquierdo: imagen */}
      <div className="login-left">
        <img
          src="/assets/login-bg.jpg"
          alt="Entrenamiento CrossFit"
          className="login-image"
        />
      </div>

      {/* Lado derecho: formulario */}
      <div className="login-right">
        <div className="login-form">
          <h1 className="login-logo">VICF</h1>
          <h2 className="login-title">Bienvenido de nuevo</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Iniciar sesión</button>

          {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}

          <p className="login-register">
            ¿No tenés cuenta? <a href="/register">Registrarse</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;