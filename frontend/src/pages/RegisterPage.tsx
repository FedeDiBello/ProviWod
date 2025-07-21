import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
  try {
    await axios.post('http://localhost:4000/api/auth/register', { email, password });
    alert('Revisa tu email para confirmar la cuenta');
    navigate('/');
  } catch (error) {
    alert('Error al registrarse');
  }
};;

  return (
    <div className="p-4">
      <h1>Registrarse</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
}

export default RegisterPage;