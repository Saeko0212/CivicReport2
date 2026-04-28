import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../database/supabaseconfig';

const LoginCiudadano = () => {
    const navigate = useNavigate();
    const [esRegistro, setEsRegistro] = useState(false); // Alternar entre Login y Registro
    
    // Estados del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState(''); // Solo se usa al registrar
    
    // Estados de UI
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setCargando(true);

        try {
            if (esRegistro) {
                // 1. Registrar usuario en la bóveda de Auth de Supabase
                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                });
                
                if (authError) throw authError;

                // 2. Guardar el perfil público en nuestra tabla 'perfiles'
                if (authData.user) {
                    const { error: perfilError } = await supabase.from('perfiles').insert([
                        {
                            id_perfil: authData.user.id,
                            nombre_completo: nombre,
                            rol: 'ciudadano'
                        }
                    ]);
                    
                    if (perfilError) throw perfilError;
                }

                alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
                setEsRegistro(false); // Lo devolvemos a la vista de login
                
            } else {
                // Iniciar Sesión normal
                const { error: loginError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                
                if (loginError) throw loginError;

                // Si todo sale bien, lo mandamos a su panel (que crearemos después)
                navigate('/dashboard-ciudadano');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Card className="shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
                <div className="text-center mb-4">
                    <i className="bi bi-person-circle text-primary" style={{ fontSize: '3rem' }}></i>
                    <h3 className="fw-bold mt-2">
                        {esRegistro ? 'Crear Cuenta' : 'Acceso Ciudadano'}
                    </h3>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={manejarSubmit}>
                    {esRegistro && (
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ej. Juan Pérez" 
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required={esRegistro}
                            />
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="tu@correo.com" 
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

                    <Button variant="primary" type="submit" className="w-100 rounded-pill mb-3" disabled={cargando}>
                        {cargando ? 'Procesando...' : (esRegistro ? 'Registrarme' : 'Ingresar')}
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <Button variant="link" className="text-decoration-none" onClick={() => setEsRegistro(!esRegistro)}>
                        {esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                    </Button>
                </div>
                
                <div className="text-center mt-2">
                    <Button variant="link" className="text-muted text-decoration-none" onClick={() => navigate('/')}>
                        <i className="bi bi-arrow-left me-1"></i> Volver al inicio
                    </Button>
                </div>
            </Card>
        </Container>
    );
};

export default LoginCiudadano;