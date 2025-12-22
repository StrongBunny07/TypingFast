import { Link, useNavigate } from 'react-router-dom';
import { Keyboard, User, LogOut, BarChart3, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">
                        <Keyboard size={24} />
                    </div>
                    <span className="logo-text">
                        Typing<span className="logo-accent">Fast</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="navbar-links">
                    <Link to="/typing" className="nav-link">
                        <Zap size={18} />
                        <span>Practice</span>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="nav-link">
                                <BarChart3 size={18} />
                                <span>Dashboard</span>
                            </Link>

                            <div className="nav-user">
                                <div className="user-avatar">
                                    <User size={18} />
                                </div>
                                <span className="user-name">{user?.username}</span>
                            </div>

                            <button onClick={handleLogout} className="btn btn-ghost nav-btn">
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost nav-btn">
                                Login
                            </Link>
                            <Link to="/signup" className="btn btn-primary nav-btn">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
