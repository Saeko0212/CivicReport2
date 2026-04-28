import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const IntroSeleccion = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            backgroundColor: '#0a192f', // Fondo azul oscuro similar al de tu diseño
            minHeight: '100vh',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            {/* Encabezado */}
            <div className="text-center mb-5">
                <h5 className="fw-bold text-info mb-4">
                    <i className="bi bi-geo-alt-fill me-2"></i>CivicReports
                </h5>
                <h1 className="fw-bold display-4">Tu voz construye un<br/>mejor país</h1>
            </div>

            <Container>
                <Row className="justify-content-center gap-4">
                    {/* Tarjeta de Ciudadano */}
                    <Col xs={12} md={5} lg={4}>
                        <Card className="bg-transparent text-white h-100 p-3" style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px' }}>
                            <Card.Body className="d-flex flex-column">
                                <div className="d-flex align-items-center mb-3">
                                    <i className="bi bi-people-fill fs-2 me-3 text-info"></i>
                                    <h4 className="mb-0 fw-bold">soy ciudadano</h4>
                                </div>
                                <h5 className="text-info fw-bold mb-3">Reporta y participa</h5>
                                <ul className="list-unstyled flex-grow-1" style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
                                    <li>Registrar problemas y sugerencias</li>
                                    <li>Ver problemas y sugerencias</li>
                                    <li>Monitorear progreso</li>
                                </ul>
                                <Button 
                                    variant="outline-light" 
                                    className="mt-4 rounded-pill w-100"
                                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    onClick={() => navigate('/login-ciudadano')}
                                >
                                    Ingresar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Tarjeta de Administrador */}
                    <Col xs={12} md={5} lg={4}>
                        <Card className="bg-transparent text-white h-100 p-3" style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px' }}>
                            <Card.Body className="d-flex flex-column">
                                <div className="d-flex align-items-center mb-3">
                                    <i className="bi bi-person-badge-fill fs-2 me-3 text-warning"></i>
                                    <h4 className="mb-0 fw-bold">soy administrador</h4>
                                </div>
                                <h5 className="text-warning fw-bold mb-3">Gestiona y resuelve</h5>
                                <ul className="list-unstyled flex-grow-1" style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
                                    <li>Administrar reportes</li>
                                    <li>Ver mapa de calor</li>
                                    <li>Generar estadísticas</li>
                                </ul>
                                <Button 
                                    variant="outline-light" 
                                    className="mt-4 rounded-pill w-100"
                                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    onClick={() => navigate('/login-entidad')}
                                >
                                    Ingresar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default IntroSeleccion;