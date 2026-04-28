import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../database/supabaseconfig';

const LoginEntidad = () => {
    const navigate = useNavigate();
    const [esRegistro, setEsRegistro] = useState(false);
    
    // Estados del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [codigoInvitacion, setCodigoInvitacion] = useState(''); // Específico de entidades
    
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setCargando(true);

        try {
            if (esRegistro) {
                // Aquí más adelante validaremos el código de invitación con la tabla 'entidades'
                // Por ahora, registramos al administrador normalmente

                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                });
                
                if (authError) throw authError;

                if (authData.user) {
                    const { error: perfilError } = await supabase.from('perfiles').insert([
                        {
                            id_perfil: authData.user.id,
                            nombre_completo: nombre,
                            rol: 'entidad' // Rol específico según tu BD
                        }
                    ]);
                    
                    if (perfilError) throw perfilError;
                }

                alert("¡Registro institucional exitoso! Ya puedes iniciar sesión.");
                setEsRegistro(false);
                
            } else {
                // Iniciar Sesión normal
                const { error: loginError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                
                if (loginError) throw loginError;
                navigate('/dashboard-entidad'); // Lo mandamos a su panel de control
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#0a192f' }}>
            <Card className="shadow-lg p-4 bg-dark text-white" style={{ border: '1px solid rgba(255,255,255,0.2)', maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
                <div className="text-center mb-4">
                    <i className="bi bi-person-badge-fill text-warning" style={{ fontSize: '3rem' }}></i>
                    <h3 className="fw-bold mt-2">
                        {esRegistro ? 'Registro Institucional' : 'Acceso Entidad'}
                    </h3>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={manejarSubmit}>
                    {esRegistro && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre del Funcionario</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ej. Ing. Carlos Ruiz" 
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required={esRegistro}
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Form.Label className="text-warning">Código de Invitación <i className="bi bi-key-fill"></i></Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ej. ENACAL-2026-XYZ" 
                                    value={codigoInvitacion}
                                    onChange={(e) => setCodigoInvitacion(e.target.value)}
                                    required={esRegistro}
                                />
                                <Form.Text className="text-muted">Proporcionado por el Super Administrador</Form.Text>
                            </Form.Group>
                        </>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Correo Electrónico Institucional</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="tu@institucion.gob.ni" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="******" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </Form.Group>

                    <Button variant="warning" type="submit" className="w-100 rounded-pill mb-3 fw-bold" disabled={cargando}>
                        {cargando ? 'Procesando...' : (esRegistro ? 'Validar y Registrar' : 'Ingresar al Panel')}
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <Button variant="link" className="text-info text-decoration-none" onClick={() => setEsRegistro(!esRegistro)}>
                        {esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿Tienes un código? Regístrate aquí'}
                    </Button>
                </div>
                
                <div className="text-center mt-2">
                    <Button variant="link" className="text-secondary text-decoration-none" onClick={() => navigate('/')}>
                        <i className="bi bi-arrow-left me-1"></i> Volver al inicio
                    </Button>
                </div>
            </Card>
        </Container>
    );
};

export default LoginEntidad;