import React from 'react';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../database/supabaseconfig';

const DashboardCiudadano = () => {
    const navigate = useNavigate();

    // Función para cerrar la sesión en Supabase
    const cerrarSesion = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            navigate('/'); // Lo devolvemos a la pantalla principal
        }
    };

    return (
        <>
            {/* Barra de navegación superior */}
            <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand>
                        <i className="bi bi-geo-alt-fill me-2"></i>CiudadActiva
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Button variant="outline-light" size="sm" onClick={cerrarSesion}>
                                <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            {/* Contenido principal */}
            <Container className="mt-5 text-center">
                <h2>¡Bienvenido a tu panel de Ciudadano!</h2>
                <p className="text-muted">
                    Desde aquí podrás reportar incidencias en la infraestructura de tu comunidad y darles seguimiento.
                </p>
                
                <Button variant="success" size="lg" className="mt-4 shadow">
                    <i className="bi bi-plus-circle me-2"></i> Reportar Nuevo Daño
                </Button>
            </Container>
        </>
    );
};

export default DashboardCiudadano;