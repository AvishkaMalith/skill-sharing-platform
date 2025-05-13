import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';
import '../assets/Login.css';

const Login = ({ onLoginSuccess }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      // Always fetch the login URL on button click
      const loginResponse = await auth.getLoginUrl();
      const loginUrl = loginResponse.data.loginUrl;
      if (loginUrl) {
        window.location.href = loginUrl;
      } else {
        setError('Google login URL not found.');
        console.error('Google login URL not found in response:', loginResponse);
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Google login error:', err);
    }
  };

  return (
    <div className={`login-container ${onLoginSuccess ? 'modal-login' : ''}`}>
      <div className="login-card">
        <h1>Skill Sharing Platform</h1>
        <p>Connect, learn, and share your skills with others</p>
        {error && <div className="error-message">{error}</div>}
        <button 
          className="google-login-button" 
          onClick={handleGoogleLogin}
          aria-label="Sign in with Google"
          title="Sign in with Google"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
            alt="Google logo" 
            className="google-icon" 
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login; 