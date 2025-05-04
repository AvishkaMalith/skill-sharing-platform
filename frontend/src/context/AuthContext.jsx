import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check for token in URL (from OAuth2 redirect)
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get('token');
        
        if (tokenFromUrl) {
            localStorage.setItem('token', tokenFromUrl);
            axios.defaults.headers.common['Authorization'] = `Bearer ${tokenFromUrl}`;
            // Clean up URL
            navigate(location.pathname, { replace: true });
        } else {
            // Check for token in localStorage
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }
        setLoading(false);
    }, [location, navigate]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email,
                password
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };

    const register = async (email, password, fullName) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                email,
                password,
                fullName
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };

    const loginWithGoogle = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            loginWithGoogle,
            logout
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}; 