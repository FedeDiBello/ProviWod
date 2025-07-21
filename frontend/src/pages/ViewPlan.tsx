import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ViewPlan() {
  const { id } = useParams();
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    axios.get(`/api/plans/${id}`).then((res) => {
      setPlan(res.data);
    });
  }, [id]);

  if (!plan) return <div>Cargando...</div>;

  return (
    <div className="p-4">
      <h1>{plan.name}</h1>
      <p>Coach: {plan.coach}</p>
      {plan.image && <img src={plan.image} alt="plan" width="300" />}
      {Object.entries(plan.structure).map(([week, days]: any) => (
        <div key={week} className="mt-4">
          <h2>Semana {+week + 1}</h2>
          {Object.entries(days).map(([day, sections]: any) => (
            <div key={day}>
              <h3>{day}</h3>
              <ul>
                {sections.map((sec: string, i: number) => <li key={i}>{sec}</li>)}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ViewPlan;