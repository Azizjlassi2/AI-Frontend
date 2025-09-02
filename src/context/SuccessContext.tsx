// src/context/ErrorContext.tsx
import React, { createContext, useContext, useState } from "react";

type SuccessType = "MODEL_ADDED" | "MODEL_UPDATED" | "MODEL_DELETED" | "DATASET_ADDED" | "DATASET_UPDATED" | "DATASET_DELETED" | "MODEL_FAVORITED";

interface SuccessState {
    type: SuccessType;
    message: string;
    redirect?: string;
}

interface SuccessContextType {
    success: SuccessState | null;
    setSuccess: (success: SuccessState | null) => void;
    clearSuccess: () => void;
}

const SuccessContext = createContext<SuccessContextType | undefined>(undefined);



export const SuccessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [success, setSuccess] = useState<SuccessState | null>(null);

    const clearSuccess = () => setSuccess(null);

    return (
        <SuccessContext.Provider value={{ success, setSuccess, clearSuccess }}>
            {children}
        </SuccessContext.Provider>
    );
};

export const useSuccess = (): SuccessContextType => {
    const context = useContext(SuccessContext);
    if (!context) {
        throw new Error("useSuccess must be used within a SuccessProvider");
    }
    return context;
};
