import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import IntroSeleccion from '../views/publicas/IntroSeleccion';
import LoginCiudadano from '../views/publicas/LoginCiudadano';
import LoginEntidad from '../views/publicas/LoginEntidad';
import DashboardEntidad from '../views/entidad/DashboardEntidad';



import DashboardCiudadano from '../views/ciudadano/DashboardCiudadano'; 

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<IntroSeleccion />} />
                <Route path="/login-ciudadano" element={<LoginCiudadano />} />
                <Route path="/login-entidad" element={<LoginEntidad />} />
                
                {/* Rutas Privadas (Ciudadano) */}
                <Route path="/dashboard-ciudadano" element={<DashboardCiudadano />} /> 
                <Route path="/dashboard-entidad" element={<DashboardEntidad />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;