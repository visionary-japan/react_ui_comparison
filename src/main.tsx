import React from 'react';
import reactDom from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App.tsx';
import { Index } from './Index.tsx';
import './main.css';

reactDom.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='dnd' element={<App />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
