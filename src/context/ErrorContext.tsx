// src/context/ErrorContext.tsx
import React, { createContext, useContext, useState } from "react";

type ErrorType = "AUTH" | "NETWORK" | "SERVER" | "UNKNOWN";

interface ErrorState {
    type: ErrorType;
    message: string;
    redirect?: string;
}

interface ErrorContextType {
    error: ErrorState | null;
    setError: (error: ErrorState | null) => void;
    clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [error, setError] = useState<ErrorState | null>(null);

    const clearError = () => setError(null);

    return (
        <ErrorContext.Provider value={{ error, setError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useError must be used within an ErrorProvider");
    }
    return context;
};
