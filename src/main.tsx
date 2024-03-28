import React from 'react';
import reactDom from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './main.css';
import { Index } from './pages/Index.tsx';
import { Btn } from './pages/btn/Btn.tsx';
import { HTML5 } from './pages/dnd/HTML5.tsx';
import { Pointer } from './pages/dnd/Pointer.tsx';
import { Sortablejs } from './pages/dnd/Sortablejs.tsx';
import { DndIndex } from './pages/dnd/_DndIndex.tsx';
import { Js } from './pages/public/Js.tsx';
import { Query } from './pages/query/Query.tsx';

reactDom.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='btn' element={<Btn />} />
                <Route path='dnd' element={<DndIndex />} />
                <Route path='dnd/htmlapi' element={<HTML5 />} />
                <Route path='dnd/pointer' element={<Pointer />} />
                <Route path='dnd/sortablejs' element={<Sortablejs />} />
                <Route path='query' element={<Query />} />
                <Route path='public' element={<Js />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
