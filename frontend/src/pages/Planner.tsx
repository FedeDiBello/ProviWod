import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function Planner() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const [planName, setPlanName] = useState('');
  const [coach, setCoach] = useState('');
  const [image, setImage] = useState('');
  const [structure, setStructure] = useState<any>({});

  const totalWeeks = mode === 'week' ? 1 : mode === 'month' ? 4 : 12;

  const handleAddSection = (week: number, day: string) => {
    const section = prompt(`Agregar sección para ${day}`);
    if (!section) return;

    setStructure((prev: any) => {
      const copy = { ...prev };
      if (!copy[week]) copy[week] = {};
      if (!copy[week][day]) copy[week][day] = [];
      copy[week][day].push(section);
      return copy;
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    await axios.post('/api/plans', {
      name: planName,
      coach,
      image,
      structure,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    navigate('/dashboard');
  };

  return (
    <div className="p-4">
      <h1>Planificar ({mode})</h1>
      <input placeholder="Nombre del plan" value={planName} onChange={e => setPlanName(e.target.value)} />
      <input placeholder="Nombre del coach" value={coach} onChange={e => setCoach(e.target.value)} />
      <input placeholder="URL de imagen" value={image} onChange={e => setImage(e.target.value)} />

      {[...Array(totalWeeks)].map((_, weekIdx) => (
        <div key={weekIdx} className="border mt-4 p-2">
          <h2>Semana {weekIdx + 1}</h2>
          {DAYS.map((day) => (
            <div key={day} className="mb-2">
              <strong>{day}</strong>
              <ul>
                {(structure[weekIdx]?.[day] || []).map((sec: string, i: number) => (
                  <li key={i}>{sec}</li>
                ))}
              </ul>
              <button onClick={() => handleAddSection(weekIdx, day)}>+ Agregar sección</button>
            </div>
          ))}
        </div>
      ))}

      <button className="mt-4" onClick={handleSubmit}>Confirmar Planificación</button>
    </div>
  );
}

export default Planner;