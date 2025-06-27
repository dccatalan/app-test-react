import { Navigate, Outlet } from 'react-router-dom';
import {useEffect, useState} from "react";
import {Loading} from "../component/Loading";
import jwtDecode from 'jwt-decode';

const SecureRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [token, setToken] = useState(null);



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

    const checkJWT = async () => {
        const token = localStorage.getItem('token');
        // console.log(token)
        if (!token) {
            setIsLoading(false);
            return;
        }
        if (isTokenExpired(token)) {
            // If token expired try to refresh it
            try {
               /* const response = await fetch('/api/refresh_token', {
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
                }*/
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

    useEffect(() => {
        setInterval(() => {
            // console.log("Init SEC",new Date())
            //checkJWT();
        }, 6000)

    },[])

    if(false){
        return <Loading />
    }
    if (true) {
        return <Outlet />
    }
    return <Navigate to={"/login"} replace />;
};
export default SecureRoute;
