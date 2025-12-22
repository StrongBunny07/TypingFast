// ============================================
// TypeScript Types for TypingFast
// ============================================

// User Types
export interface User {
    id: number;
    username: string;
    email: string;
}

// Auth Types
export interface AuthResponse {
    token: string;
    userId: number;
    username: string;
    email: string;
    message: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface SignupRequest {
    username: string;
    email: string;
    password: string;
}

// Typing Types
export interface TypingText {
    text: string;
}

export interface TypingSubmitRequest {
    originalText: string;
    typedText: string;
    duration: number;
}

export interface TypingResult {
    wpm: number;
    accuracy: number;
    errors: number;
    correctedChars: number;
}

// Dashboard Types
export interface UserProfile {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    totalTests: number;
    bestWpm: number;
    bestAccuracy: number;
}

export interface UserStats {
    bestWpm: number;
    bestAccuracy: number;
    averageWpm: number;
    averageAccuracy: number;
    totalTests: number;
    totalTimeSeconds: number;
    totalCharactersTyped: number;
    totalErrors: number;
    recentAverageWpm: number;
    recentAverageAccuracy: number;
}

export interface TypingHistory {
    id: number;
    duration: number;
    totalChars: number;
    correctChars: number;
    errors: number;
    wpm: number;
    accuracy: number;
    createdAt: string;
}

export interface PaginatedHistory {
    content: TypingHistory[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

// Auth Context Types
export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}
