import { Link } from 'react-router-dom';
import { Keyboard, Zap, Target, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import './Home.css';

export const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content animate-slide-up">
                    <div className="hero-badge">
                        <Zap size={14} />
                        <span>Free Typing Practice</span>
                    </div>

                    <h1 className="hero-title">
                        Master Your <span className="text-gradient">Typing Speed</span>
                    </h1>

                    <p className="hero-description">
                        Improve your typing speed and accuracy with our modern,
                        distraction-free typing practice platform. Track your progress
                        and become a faster typist.
                    </p>

                    <div className="hero-cta">
                        <Link to="/typing" className="btn btn-primary btn-lg">
                            <Keyboard size={20} />
                            Start Typing
                            <ArrowRight size={18} />
                        </Link>
                        <Link to="/signup" className="btn btn-secondary btn-lg">
                            Create Account
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-value">100+</span>
                            <span className="hero-stat-label">WPM Goal</span>
                        </div>
                        <div className="hero-stat-divider"></div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">99%</span>
                            <span className="hero-stat-label">Accuracy</span>
                        </div>
                        <div className="hero-stat-divider"></div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">∞</span>
                            <span className="hero-stat-label">Practice</span>
                        </div>
                    </div>
                </div>

                {/* Animated Keyboard Visual */}
                <div className="hero-visual animate-fade-in">
                    <div className="keyboard-visual">
                        <div className="key-row">
                            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key, i) => (
                                <div
                                    key={key}
                                    className="key"
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                    {key}
                                </div>
                            ))}
                        </div>
                        <div className="key-row">
                            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key, i) => (
                                <div
                                    key={key}
                                    className="key"
                                    style={{ animationDelay: `${(i + 10) * 0.05}s` }}
                                >
                                    {key}
                                </div>
                            ))}
                        </div>
                        <div className="key-row">
                            {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key, i) => (
                                <div
                                    key={key}
                                    className="key"
                                    style={{ animationDelay: `${(i + 19) * 0.05}s` }}
                                >
                                    {key}
                                </div>
                            ))}
                        </div>
                        <div className="key-row">
                            <div className="key space-key">SPACE</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <div className="section-header">
                        <h2>Why Choose <span className="text-gradient">TypingFast</span>?</h2>
                        <p>Everything you need to become a typing master</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card card card-glow">
                            <div className="feature-icon">
                                <Target size={28} />
                            </div>
                            <h3>Accurate Tracking</h3>
                            <p>
                                Real-time WPM and accuracy tracking with detailed
                                analysis of your typing performance.
                            </p>
                        </div>

                        <div className="feature-card card card-glow">
                            <div className="feature-icon">
                                <TrendingUp size={28} />
                            </div>
                            <h3>Progress Analytics</h3>
                            <p>
                                Track your improvement over time with comprehensive
                                statistics and history.
                            </p>
                        </div>

                        <div className="feature-card card card-glow">
                            <div className="feature-icon">
                                <Zap size={28} />
                            </div>
                            <h3>Instant Feedback</h3>
                            <p>
                                Get immediate visual feedback on correct and
                                incorrect keystrokes as you type.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits">
                <div className="container">
                    <div className="benefits-content">
                        <div className="benefits-text">
                            <h2>Take Your Typing to the <span className="text-gradient">Next Level</span></h2>
                            <p>
                                Join thousands of users who have improved their typing speed
                                and accuracy with TypingFast.
                            </p>

                            <ul className="benefits-list">
                                <li>
                                    <CheckCircle size={20} className="check-icon" />
                                    <span>Clean, distraction-free interface</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="check-icon" />
                                    <span>Random text generation for variety</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="check-icon" />
                                    <span>Personal dashboard with statistics</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="check-icon" />
                                    <span>Complete typing history</span>
                                </li>
                            </ul>

                            <Link to="/typing" className="btn btn-primary btn-lg mt-4">
                                Start Practicing Now
                                <ArrowRight size={18} />
                            </Link>
                        </div>

                        <div className="benefits-visual">
                            <div className="stats-preview card">
                                <div className="preview-stat">
                                    <span className="stat-value">85</span>
                                    <span className="stat-label">WPM</span>
                                </div>
                                <div className="preview-stat">
                                    <span className="stat-value">97%</span>
                                    <span className="stat-label">Accuracy</span>
                                </div>
                                <div className="preview-stat">
                                    <span className="stat-value">42</span>
                                    <span className="stat-label">Tests</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <Keyboard size={24} />
                            <span>TypingFast</span>
                        </div>
                        <p className="footer-text">
                            © 2025 TypingFast. Practice makes perfect.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
