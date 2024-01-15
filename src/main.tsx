import React from 'react';
import reactDom from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './main.css';
import { Btn } from './pages/btn/Btn.tsx';
import { DndIndex } from './pages/dnd/DndIndex.tsx';
import { DndDnd } from './pages/dnd/dnd/DndDnd.tsx';
import { DndPointer } from './pages/dnd/pointer/DndPointer.tsx';
import { DndSortablejs } from './pages/dnd/sortablejs/DndSortablejs.tsx';
import { Index } from './pages/index/Index.tsx';
import { Query } from './pages/query/query.tsx';

reactDom.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='btn' element={<Btn />} />
                <Route path='dnd' element={<DndIndex />} />
                <Route path='dnd/dnd' element={<DndDnd />} />
                <Route path='dnd/pointer' element={<DndPointer />} />
                <Route path='dnd/sortablejs' element={<DndSortablejs />} />
                <Route path='query' element={<Query />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
