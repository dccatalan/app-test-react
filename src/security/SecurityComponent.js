import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';

// Function that checks if the JWT is expired
const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const exp = decoded.exp;
        const currentTime = Date.now() / 1000;
        return exp < currentTime;
    } catch (err) {
        return true;
    }
}

// HOC that handles JWT and refresh token
const SecurityComponent = (WrappedComponent) => {
    return (props) => {
        const [isLoading, setIsLoading] = useState(true);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [token, setToken] = useState(null);

        // Check the JWT
        useEffect(() => {
            const checkJWT = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsLoading(false);
                    return;
                }
                if (isTokenExpired(token)) {
                    // If token expired try to refresh it
                    try {
                        const response = await fetch('/api/refresh_token', {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (response.ok) {
                            const data = await response.json();
                            const newToken = data.token;
                            setToken(newToken);
                            localStorage.setItem('token', newToken);
                            setIsAuthenticated(true);
                        } else {
                            // Failed to refresh token
                            localStorage.removeItem('token');
                            setIsAuthenticated(false);
                        }
                    } catch (error) {
                        console.error(error);
                        setIsAuthenticated(false);
                    }
                } else {
                    setIsAuthenticated(true);
                    setToken(token);
                }
                setIsLoading(false);
            }
            checkJWT();
        }, []);

        // Render the wrapped component if authenticated
        if (isLoading) {
            return <div>Loading...</div>
        }

        if (!isAuthenticated) {
            return <Redirect to='/login' />
        }

        return <WrappedComponent {...props} token={token} />
    }
}

export default SecurityComponent;
