import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EnhancedNotificationBell from './EnhancedNotificationBell';

export default function Header() {
  const { state, dispatch } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const navigationLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/courts', label: 'Canchas' },
    { path: '/bookings', label: 'Mis Reservas' },
    { path: '/support', label: 'Soporte' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C7.58172 2 4 5.58172 4 10C4 16.5 12 22 12 22C12 22 20 16.5 20 10C20 5.58172 16.4183 2 12 2Z" fill="#4CAF50" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="10" r="3" fill="white" stroke="white" strokeWidth="1.5"/>
            </svg>
            <span className="text-xl font-bold text-gray-900">SportReserva</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {state.isAuthenticated ? (
              <>
                {/* Notifications */}
                <EnhancedNotificationBell />

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="hidden sm:block text-sm text-gray-700">
                      {state.currentUser?.nombre}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-red-600"
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-green-700 hover:text-green-600"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="py-2 space-y-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}