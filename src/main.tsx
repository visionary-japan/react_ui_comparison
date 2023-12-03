import React from 'react';
import reactDom from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';

reactDom.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
