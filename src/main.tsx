import React from 'react';
import reactDom from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dnd } from './components/dnd/Dnd.tsx';
import { Index } from './components/index/Index.tsx';
import './main.css';

reactDom.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='dnd' element={<Dnd />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
