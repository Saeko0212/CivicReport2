import React from 'react';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../database/supabaseconfig';

const DashboardEntidad = () => {
    const navigate = useNavigate();

    const cerrarSesion = async () => {
        await supabase.auth.signOut();
        navigate('/'); 
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm border-bottom border-warning">
                <Container>
                    <Navbar.Brand className="text-warning fw-bold">
                        <i className="bi bi-building me-2"></i>Panel Institucional
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Button variant="outline-warning" size="sm" onClick={cerrarSesion}>
                                <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Container className="mt-5 text-center">
                <h2>Tablero de Gestión (Kanban)</h2>
                <p className="text-muted">
                    Aquí las entidades visualizarán el mapa de calor y organizarán las cuadrillas de trabajo.
                </p>
            </Container>
        </>
    );
};

export default DashboardEntidad;