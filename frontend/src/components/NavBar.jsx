import { useState } from 'react';
import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  Info,
  LogIn,
  Rocket,
  PenSquare,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/api';
import Login from '../pages/Login';
import '../assets/Navbar.css';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Learning Goals', href: '/learning-goals', icon: BookOpen },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Create Post', href: '/create-post', icon: PenSquare },
    { name: 'Chat', href: '/chat', icon: Rocket },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    try {
      await auth.logout();
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="text-3xl font-bold text-blue-500">
                Skill
                <span className="text-black">Era</span>
              </Link>
            </div>

            <div className="sm:hidden">
              <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="hidden sm:flex sm:items-center sm:space-x-12">
              {navLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  to={href}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Icon className="mr-1" size={18} /> {name}
                </Link>
              ))}
            </div>

            <div className="hidden sm:flex items-center space-x-4">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-blue-600 px-4 py-2 transition-colors"
                >
                  <LogIn size={18} className="mr-1" /> Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="flex items-center text-gray-700 hover:text-blue-600 px-4 py-2 transition-colors"
                  >
                    <LogIn size={18} className="mr-1" /> Log In
                  </button>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Rocket size={18} className="mr-1" /> Get Started
                  </button>
                </>
              )}
            </div>
          </div>

          {menuOpen && (
            <div className="sm:hidden mt-2 space-y-2">
              {navLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  to={href}
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <Icon className="mr-2" size={18} /> {name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200 space-y-2">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-blue-600 w-full"
                  >
                    <LogIn size={18} className="mr-2" /> Logout
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="flex items-center text-gray-700 hover:text-blue-600 w-full"
                    >
                      <LogIn size={18} className="mr-2" /> Log In
                    </button>
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
                    >
                      <Rocket size={18} className="mr-2" /> Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="close-button"
              onClick={() => setShowLoginModal(false)}
            >
              ×
            </button>
            <Login 
              onLoginSuccess={() => {
                setShowLoginModal(false);
                setIsAuthenticated(true);
              }} 
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar; 