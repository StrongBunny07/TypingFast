import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Trophy, Target, Zap, Clock, Hash, AlertCircle,
    TrendingUp, Calendar, BarChart3, RefreshCw
} from 'lucide-react';
import { dashboardApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type { UserProfile, UserStats, TypingHistory } from '../../types';
import './Dashboard.css';

export const Dashboard = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [history, setHistory] = useState<TypingHistory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError('');

            try {
                const [profileData, statsData, historyData] = await Promise.all([
                    dashboardApi.getProfile(),
                    dashboardApi.getStats(),
                    dashboardApi.getAllHistory(),
                ]);

                setProfile(profileData);
                setStats(statsData);
                setHistory(historyData);
            } catch (err) {
                setError('Failed to load dashboard data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [isAuthenticated, navigate]);

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Format time
    const formatTime = (seconds: number) => {
        if (seconds < 60) return `${seconds}s`;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    if (isLoading) {
        return (
            <div className="dashboard-page">
                <div className="loading-container">
                    <RefreshCw size={48} className="spin" />
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-page">
                <div className="error-container">
                    <AlertCircle size={48} />
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="btn btn-primary">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                {/* Header */}
                <div className="dashboard-header animate-slide-up">
                    <div className="user-profile-card">
                        <div className="profile-avatar">
                            <User size={32} />
                        </div>
                        <div className="profile-info">
                            <h1>Welcome, {user?.username}!</h1>
                            <p>Member since {profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/typing')}
                        className="btn btn-primary btn-lg"
                    >
                        <Zap size={20} />
                        Start Typing
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="stats-grid animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-card highlight">
                        <div className="stat-icon">
                            <Trophy size={24} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats?.bestWpm.toFixed(1) || 0}</span>
                            <span className="stat-label">Best WPM</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <Zap size={24} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats?.averageWpm.toFixed(1) || 0}</span>
                            <span className="stat-label">Average WPM</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <Target size={24} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats?.bestAccuracy.toFixed(1) || 0}%</span>
                            <span className="stat-label">Best Accuracy</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <Target size={24} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats?.averageAccuracy.toFixed(1) || 0}%</span>
                            <span className="stat-label">Avg Accuracy</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <Hash size={24} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats?.totalTests || 0}</span>
                            <span className="stat-label">Total Tests</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <Clock size={24} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{formatTime(stats?.totalTimeSeconds || 0)}</span>
                            <span className="stat-label">Total Time</span>
                        </div>
                    </div>
                </div>

                {/* Recent Performance */}
                <div className="recent-performance animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="section-header">
                        <h2>
                            <TrendingUp size={24} />
                            Recent Performance
                        </h2>
                    </div>
                    <div className="performance-cards">
                        <div className="performance-card">
                            <span className="perf-label">Recent Avg WPM</span>
                            <span className="perf-value">{stats?.recentAverageWpm.toFixed(1) || 0}</span>
                            <span className="perf-subtext">Last 10 tests</span>
                        </div>
                        <div className="performance-card">
                            <span className="perf-label">Recent Avg Accuracy</span>
                            <span className="perf-value">{stats?.recentAverageAccuracy.toFixed(1) || 0}%</span>
                            <span className="perf-subtext">Last 10 tests</span>
                        </div>
                        <div className="performance-card">
                            <span className="perf-label">Characters Typed</span>
                            <span className="perf-value">{(stats?.totalCharactersTyped || 0).toLocaleString()}</span>
                            <span className="perf-subtext">All time</span>
                        </div>
                        <div className="performance-card">
                            <span className="perf-label">Total Errors</span>
                            <span className="perf-value">{stats?.totalErrors || 0}</span>
                            <span className="perf-subtext">All time</span>
                        </div>
                    </div>
                </div>

                {/* History Table */}
                <div className="history-section animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="section-header">
                        <h2>
                            <BarChart3 size={24} />
                            Typing History
                        </h2>
                    </div>

                    {history.length === 0 ? (
                        <div className="empty-history">
                            <Calendar size={48} />
                            <p>No typing history yet</p>
                            <button onClick={() => navigate('/typing')} className="btn btn-primary">
                                Take Your First Test
                            </button>
                        </div>
                    ) : (
                        <div className="history-table-wrapper">
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>WPM</th>
                                        <th>Accuracy</th>
                                        <th>Duration</th>
                                        <th>Characters</th>
                                        <th>Errors</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.slice(0, 20).map((entry) => (
                                        <tr key={entry.id}>
                                            <td>{formatDate(entry.createdAt)}</td>
                                            <td>
                                                <span className="wpm-badge">{entry.wpm.toFixed(1)}</span>
                                            </td>
                                            <td>
                                                <span className={`accuracy-badge ${entry.accuracy >= 95 ? 'high' : entry.accuracy >= 85 ? 'medium' : 'low'}`}>
                                                    {entry.accuracy.toFixed(1)}%
                                                </span>
                                            </td>
                                            <td>{formatTime(entry.duration)}</td>
                                            <td>{entry.totalChars}</td>
                                            <td>
                                                <span className={`error-badge ${entry.errors === 0 ? 'perfect' : ''}`}>
                                                    {entry.errors}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
