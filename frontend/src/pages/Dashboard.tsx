import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  const getPlans = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/plans', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPlans(res.data);
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <div className="p-4">
      <h1>Mis Planificaciones</h1>
      <button onClick={() => navigate('/planner/week')}>Planificar Semana</button>
      <button onClick={() => navigate('/planner/month')}>Planificar Mes</button>
      <button onClick={() => navigate('/planner/quarter')}>Planificar 3 Meses</button>

      <ul>
        {plans.map((plan: any) => (
          <li key={plan.id} onClick={() => navigate(`/plan/${plan.id}`)}>
            {plan.name} - {plan.coach}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;