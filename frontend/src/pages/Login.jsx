import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';
import '../assets/Login.css';

const Login = ({ onLoginSuccess }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFacebookLogin = async () => {
    setError(null);
    try {
      const loginResponse = await auth.getFacebookLoginUrl();
      const loginUrl = loginResponse.data.loginUrl;
      if (loginUrl) {
        window.location.href = loginUrl;
      } else {
        setError('Facebook login URL not found.');
        console.error('Facebook login URL not found in response:', loginResponse);
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Facebook login error:', err);
    }
  };


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
        <h1>Sign in here</h1>
        <p>Access your account to connect, learn, and share your skills</p>
        {error && <div className="error-message">{error}</div>}
        <button
          className="google-login-button"
          onClick={handleGoogleLogin}
          aria-label="Sign in with Google"
          title="Sign in with Google"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            className="google-icon"
          />
          Sign in with Google
        </button>
        <button
          className="google-login-button"
          onClick={handleFacebookLogin}
          aria-label="Sign in with Facebook"
          title="Sign in with Facebook"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
            alt="Facebook logo"
            className="google-icon"
          />
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login; 