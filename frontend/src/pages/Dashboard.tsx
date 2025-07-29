import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [plans, setPlans] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPlans = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/api/plans', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(res.data.plans)) {
          setPlans(res.data.plans);
        } else {
          console.warn('Respuesta inesperada del backend:', res.data);
          setPlans([]);
        }
      } catch (error) {
        console.error('Error al obtener los planes:', error);
        setPlans([]);
      }
    };

    getPlans();
  }, []);

  return (
    <div className="container plan-section">
      <h2>Mis Planificaciones</h2>

      <div className="mb-2">
        <button onClick={() => navigate('/planner/week')}>Planificar Semana</button>
        <button onClick={() => navigate('/planner/month')}>Planificar Mes</button>
        <button onClick={() => navigate('/planner/quarter')}>Planificar 3 Meses</button>
      </div>

      {plans.length > 0 ? (
        <div>
          {plans.map((plan: any) => (
            <div
              key={plan.id}
              className="plan-card"
              onClick={() => navigate(`/plan/${plan.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <h3>{plan.name}</h3>
              <p>Coach: {plan.coach}</p>
            </div>
          ))}
        </div>
      ) : (
        (<p className="no-plans">No hay planes disponibles.</p>)
      )}
    </div>
  );
}

export default Dashboard;