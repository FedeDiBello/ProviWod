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
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2 border-red-600">Planificación ({mode})</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          className="bg-zinc-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Nombre del plan"
          value={planName}
          onChange={e => setPlanName(e.target.value)}
        />
        <input
          className="bg-zinc-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Nombre del coach"
          value={coach}
          onChange={e => setCoach(e.target.value)}
        />
        <input
          className="bg-zinc-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="URL de imagen"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
      </div>

      {[...Array(totalWeeks)].map((_, weekIdx) => (
        <div key={weekIdx} className="bg-zinc-900 rounded-lg p-5 mb-6 shadow-lg">
          <h2 className="text-xl font-semibold text-red-500 mb-4">Semana {weekIdx + 1}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DAYS.map((day) => (
              <div key={day} className="bg-zinc-800 p-4 rounded-md">
                <h3 className="font-bold text-lg text-white mb-2">{day}</h3>
                <ul className="list-disc list-inside text-sm text-zinc-300 mb-2">
                  {(structure[weekIdx]?.[day] || []).map((sec: string, i: number) => (
                    <li key={i}>{sec}</li>
                  ))}
                </ul>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleAddSection(weekIdx, day)}
                >
                  + Agregar sección
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-semibold mt-4 transition-all"
        onClick={handleSubmit}
      >
        Confirmar Planificación
      </button>
    </div>
  );
}

export default Planner;