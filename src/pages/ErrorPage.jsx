import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/home');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Oops! Etwas ist schiefgelaufen.</h1>
            <p style={styles.message}>Wir konnten die angeforderte Seite nicht finden.</p>
            <button style={styles.button} onClick={handleNavigateHome}>
                Zurück zur Startseite
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '10px',
    },
    message: {
        fontSize: '1rem',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default ErrorPage;