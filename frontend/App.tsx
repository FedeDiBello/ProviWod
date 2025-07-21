import React from 'react'; // ✅ esta línea es clave
import { Routes, Route } from 'react-router-dom';
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import Dashboard from './src/pages/Dashboard';
import Planner from './src/pages/Planner';
import ViewPlan from './src/pages/ViewPlan';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/planner/:mode" element={<Planner />} />
      <Route path="/plan/:id" element={<ViewPlan />} />
    </Routes>
  );
}

export default App;