import React from 'react';
import "./index.css";

import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { AuthProvider } from './context/AuthContext';
import { ErrorProvider } from './context/ErrorContext.tsx';
import { ErrorModal } from './Modal/ErrorModal.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);