import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Clock, Zap, Target, AlertCircle, Trophy, RotateCcw } from 'lucide-react';
import { typingApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type { TypingResult } from '../../types';
import './Typing.css';

type CharStatus = 'pending' | 'current' | 'correct' | 'incorrect';

interface CharState {
    char: string;
    status: CharStatus;
}

export const Typing = () => {
    const [text, setText] = useState<string>('');
    const [charStates, setCharStates] = useState<CharState[]>([]);
    const [typedText, setTypedText] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [result, setResult] = useState<TypingResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [wordCount, setWordCount] = useState<number>(30);

    const inputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<number | null>(null);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Fetch new text
    const fetchText = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await typingApi.getText(wordCount);
            const newText = response.text;
            setText(newText);
            setCharStates(
                newText.split('').map((char, index) => ({
                    char,
                    status: index === 0 ? 'current' : 'pending',
                }))
            );
            setTypedText('');
            setCurrentIndex(0);
            setIsStarted(false);
            setIsFinished(false);
            setElapsedTime(0);
            setResult(null);
        } catch (err) {
            setError('Failed to load text. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [wordCount]);

    // Initial load
    useEffect(() => {
        fetchText();
    }, [fetchText]);

    // Timer
    useEffect(() => {
        if (isStarted && !isFinished) {
            timerRef.current = window.setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 100);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isStarted, isFinished, startTime]);

    // Handle input change
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (isFinished || isLoading) return;

            // Start timer on first keypress
            if (!isStarted && e.key.length === 1) {
                setIsStarted(true);
                setStartTime(Date.now());
            }

            // Handle backspace
            if (e.key === 'Backspace' && currentIndex > 0) {
                e.preventDefault();
                const newIndex = currentIndex - 1;
                setCurrentIndex(newIndex);
                setTypedText((prev) => prev.slice(0, -1));

                setCharStates((prev) =>
                    prev.map((char, index) => ({
                        ...char,
                        status:
                            index === newIndex
                                ? 'current'
                                : index < newIndex
                                    ? char.status
                                    : 'pending',
                    }))
                );
                return;
            }

            // Handle regular character input
            if (e.key.length === 1 && currentIndex < text.length) {
                e.preventDefault();
                const expectedChar = text[currentIndex];
                const isCorrect = e.key === expectedChar;

                setTypedText((prev) => prev + e.key);

                setCharStates((prev) =>
                    prev.map((char, index) => {
                        if (index === currentIndex) {
                            return { ...char, status: isCorrect ? 'correct' : 'incorrect' };
                        }
                        if (index === currentIndex + 1) {
                            return { ...char, status: 'current' };
                        }
                        return char;
                    })
                );

                const newIndex = currentIndex + 1;
                setCurrentIndex(newIndex);

                // Check if finished
                if (newIndex === text.length) {
                    handleFinish();
                }
            }
        },
        [currentIndex, isFinished, isLoading, isStarted, text]
    );

    // Handle test completion
    const handleFinish = async () => {
        setIsFinished(true);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        const duration = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(duration);

        try {
            const response = await typingApi.submitResult({
                originalText: text,
                typedText: typedText + text[currentIndex],
                duration: duration,
            });
            setResult(response);
        } catch (err) {
            // Calculate locally if API fails
            const errors = charStates.filter((c) => c.status === 'incorrect').length;
            const correctChars = text.length - errors;
            const accuracy = (correctChars / text.length) * 100;
            const wpm = duration > 0 ? (correctChars / 5) / (duration / 60) : 0;

            setResult({
                wpm: Math.round(wpm * 100) / 100,
                accuracy: Math.round(accuracy * 100) / 100,
                errors,
                correctedChars: correctChars,
            });
        }
    };

    // Focus input
    const focusInput = () => {
        inputRef.current?.focus();
    };

    // Calculate live stats
    const liveStats = {
        wpm: isStarted && elapsedTime > 0
            ? Math.round((typedText.length / 5) / (elapsedTime / 60))
            : 0,
        accuracy: typedText.length > 0
            ? Math.round(
                (charStates.filter((c, i) => i < currentIndex && c.status === 'correct').length /
                    currentIndex) * 100
            )
            : 100,
        errors: charStates.filter((c) => c.status === 'incorrect').length,
    };

    // Format time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="typing-page">
            <div className="typing-container">
                {/* Header Controls */}
                <div className="typing-header">
                    <div className="word-selector">
                        <span className="selector-label">Words:</span>
                        {[15, 30, 50, 100].map((count) => (
                            <button
                                key={count}
                                className={`word-btn ${wordCount === count ? 'active' : ''}`}
                                onClick={() => setWordCount(count)}
                                disabled={isStarted && !isFinished}
                            >
                                {count}
                            </button>
                        ))}
                    </div>

                    <button
                        className="btn btn-secondary refresh-btn"
                        onClick={fetchText}
                        disabled={isLoading}
                    >
                        <RefreshCw size={18} className={isLoading ? 'spin' : ''} />
                        New Text
                    </button>
                </div>

                {/* Live Stats */}
                <div className="live-stats">
                    <div className="live-stat">
                        <Clock size={20} />
                        <span className="stat-value">{formatTime(elapsedTime)}</span>
                        <span className="stat-label">Time</span>
                    </div>
                    <div className="live-stat">
                        <Zap size={20} />
                        <span className="stat-value">{liveStats.wpm}</span>
                        <span className="stat-label">WPM</span>
                    </div>
                    <div className="live-stat">
                        <Target size={20} />
                        <span className="stat-value">{liveStats.accuracy}%</span>
                        <span className="stat-label">Accuracy</span>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="typing-error">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                        <button onClick={fetchText} className="btn btn-ghost">
                            Retry
                        </button>
                    </div>
                )}

                {/* Typing Area */}
                {!isFinished ? (
                    <div
                        className={`typing-area card ${isLoading ? 'loading' : ''}`}
                        onClick={focusInput}
                    >
                        {isLoading ? (
                            <div className="loading-spinner">
                                <RefreshCw size={32} className="spin" />
                                <p>Loading text...</p>
                            </div>
                        ) : (
                            <>
                                <div className="text-display">
                                    {charStates.map((char, index) => (
                                        <span
                                            key={index}
                                            className={`typing-char ${char.status}`}
                                        >
                                            {char.char}
                                        </span>
                                    ))}
                                </div>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="hidden-input"
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                />
                                {!isStarted && (
                                    <div className="start-hint">
                                        Click here and start typing...
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ) : (
                    /* Results */
                    <div className="results-area animate-slide-up">
                        <div className="results-header">
                            <Trophy size={48} className="trophy-icon" />
                            <h2>Test Complete!</h2>
                        </div>

                        <div className="results-grid">
                            <div className="result-card">
                                <Zap size={24} />
                                <span className="result-value">{result?.wpm.toFixed(1)}</span>
                                <span className="result-label">WPM</span>
                            </div>
                            <div className="result-card">
                                <Target size={24} />
                                <span className="result-value">{result?.accuracy.toFixed(1)}%</span>
                                <span className="result-label">Accuracy</span>
                            </div>
                            <div className="result-card error-card">
                                <AlertCircle size={24} />
                                <span className="result-value">{result?.errors}</span>
                                <span className="result-label">Errors</span>
                            </div>
                            <div className="result-card">
                                <Clock size={24} />
                                <span className="result-value">{formatTime(elapsedTime)}</span>
                                <span className="result-label">Time</span>
                            </div>
                        </div>

                        <div className="results-actions">
                            <button onClick={fetchText} className="btn btn-primary btn-lg">
                                <RotateCcw size={20} />
                                Try Again
                            </button>
                            {isAuthenticated && (
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="btn btn-secondary btn-lg"
                                >
                                    View Dashboard
                                </button>
                            )}
                            {!isAuthenticated && (
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="btn btn-secondary btn-lg"
                                >
                                    Sign Up to Save Results
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Progress Bar */}
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${(currentIndex / text.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
};
